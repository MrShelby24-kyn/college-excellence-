import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

const MAX_SIZE = 8 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const formData = await request.formData();
  const id = formData.get("id") as string | null;
  const title = (formData.get("title") as string) || "";
  const category = (formData.get("category") as string) || "Général";
  const excerpt = (formData.get("excerpt") as string) || "";
  const content = (formData.get("content") as string) || "";
  const published = formData.get("published") === "true";
  const file = formData.get("file") as File | null;
  const existingCoverUrl = (formData.get("existing_cover_url") as string) || null;

  if (!title.trim() || !content.trim()) {
    return NextResponse.json({ error: "Le titre et le contenu sont obligatoires." }, { status: 400 });
  }

  let coverUrl = existingCoverUrl;

  if (file && file.size > 0) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Format d'image non supporté." }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "Image trop volumineuse (8 Mo max)." }, { status: 400 });
    }
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("news").upload(path, file, { contentType: file.type });
    if (uploadError) {
      return NextResponse.json({ error: "Échec de l'upload de l'image." }, { status: 500 });
    }
    coverUrl = supabase.storage.from("news").getPublicUrl(path).data.publicUrl;
  }

  const payload = {
    title: title.trim(),
    category,
    excerpt: excerpt.trim() || null,
    content: content.trim(),
    cover_image_url: coverUrl,
    published,
    published_at: new Date().toISOString(),
  };

  if (id) {
    const { error } = await supabase.from("news").update(payload).eq("id", id);
    if (error) return NextResponse.json({ error: "Échec de la mise à jour." }, { status: 500 });
  } else {
    let slug = slugify(title);
    // Garantit l'unicité du slug en cas de titres identiques.
    const { data: existing } = await supabase.from("news").select("slug").ilike("slug", `${slug}%`);
    if (existing && existing.length > 0) {
      slug = `${slug}-${existing.length + 1}`;
    }
    const { error } = await supabase.from("news").insert({ ...payload, slug });
    if (error) return NextResponse.json({ error: "Échec de la création." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
