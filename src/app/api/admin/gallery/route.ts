import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const MAX_SIZE = 8 * 1024 * 1024; // 8 Mo
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const title = (formData.get("title") as string) || null;
  const category = (formData.get("category") as string) || "Établissement";

  if (!file) return NextResponse.json({ error: "Aucun fichier fourni" }, { status: 400 });
  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Format non supporté (JPEG, PNG ou WEBP uniquement)" }, { status: 400 });
  }
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Fichier trop volumineux (8 Mo maximum)" }, { status: 400 });
  }

  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(path, file, { contentType: file.type });

  if (uploadError) {
    return NextResponse.json({ error: "Échec de l'upload" }, { status: 500 });
  }

  const { error: insertError } = await supabase
    .from("gallery")
    .insert({ title, category, image_path: path });

  if (insertError) {
    await supabase.storage.from("gallery").remove([path]);
    return NextResponse.json({ error: "Échec de l'enregistrement" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
