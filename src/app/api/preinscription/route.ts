import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/server";
import { studentSchema, parentSchema } from "@/lib/validations";
import type { DocumentType } from "@/types/database";

const MAX_SIZE = 6 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
const DOCUMENT_FIELDS: DocumentType[] = [
  "extrait_naissance",
  "bulletin_scolaire",
  "photo_identite",
  "certificat_scolarite",
  "autre",
];

export async function POST(request: Request) {
  const formData = await request.formData();

  const student = studentSchema.safeParse({
    last_name: formData.get("last_name"),
    first_names: formData.get("first_names"),
    birth_date: formData.get("birth_date"),
    birth_place: formData.get("birth_place"),
    gender: formData.get("gender"),
    requested_class: formData.get("requested_class"),
    previous_school: formData.get("previous_school") || "",
  });

  const parent = parentSchema.safeParse({
    full_name: formData.get("parent_full_name"),
    relationship: formData.get("relationship"),
    phone: formData.get("phone"),
    whatsapp: formData.get("whatsapp") || "",
    email: formData.get("email") || "",
    address: formData.get("address") || "",
  });

  if (!student.success || !parent.success) {
    return NextResponse.json(
      {
        error: "Données invalides",
        details: {
          student: student.success ? null : student.error.flatten().fieldErrors,
          parent: parent.success ? null : parent.error.flatten().fieldErrors,
        },
      },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  const { data: studentRow, error: studentError } = await supabase
    .from("students")
    .insert({
      last_name: student.data.last_name,
      first_names: student.data.first_names,
      birth_date: student.data.birth_date,
      birth_place: student.data.birth_place,
      gender: student.data.gender,
      requested_class: student.data.requested_class,
      previous_school: student.data.previous_school || null,
    })
    .select("id")
    .single();

  if (studentError || !studentRow) {
    return NextResponse.json({ error: "Échec de l'enregistrement de l'élève." }, { status: 500 });
  }

  const { data: parentRow, error: parentError } = await supabase
    .from("parents")
    .insert({
      full_name: parent.data.full_name,
      relationship: parent.data.relationship,
      phone: parent.data.phone,
      whatsapp: parent.data.whatsapp || null,
      email: parent.data.email || null,
      address: parent.data.address || null,
    })
    .select("id")
    .single();

  if (parentError || !parentRow) {
    return NextResponse.json({ error: "Échec de l'enregistrement du parent." }, { status: 500 });
  }

  const { data: applicationRow, error: applicationError } = await supabase
    .from("applications")
    .insert({ student_id: studentRow.id, parent_id: parentRow.id })
    .select("id, reference_number")
    .single();

  if (applicationError || !applicationRow) {
    return NextResponse.json({ error: "Échec de la création du dossier." }, { status: 500 });
  }

  // Upload des documents joints (facultatifs)
  for (const type of DOCUMENT_FIELDS) {
    const file = formData.get(`document_${type}`) as File | null;
    if (!file || file.size === 0) continue;

    if (!ALLOWED_TYPES.includes(file.type)) continue; // ignoré silencieusement, validé côté client
    if (file.size > MAX_SIZE) continue;

    const ext = file.name.split(".").pop();
    const path = `${applicationRow.id}/${type}-${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("application-documents")
      .upload(path, file, { contentType: file.type });

    if (!uploadError) {
      await supabase.from("application_documents").insert({
        application_id: applicationRow.id,
        type,
        file_path: path,
        file_name: file.name,
        file_size_bytes: file.size,
      });
    }
  }

  return NextResponse.json({
    success: true,
    referenceNumber: applicationRow.reference_number,
  });
}
