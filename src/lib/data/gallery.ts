import { createClient } from "@/lib/supabase/server";
import { demoGallery } from "@/lib/demo-data";
import type { GalleryItem } from "@/types/database";

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!supabaseConfigured) return demoGallery;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) return demoGallery;

    // image_path stocke le chemin Supabase Storage : on résout l'URL publique.
    return data.map((item) => ({
      ...item,
      image_path: item.image_path.startsWith("http")
        ? item.image_path
        : supabase.storage.from("gallery").getPublicUrl(item.image_path).data.publicUrl,
    })) as GalleryItem[];
  } catch {
    return demoGallery;
  }
}
