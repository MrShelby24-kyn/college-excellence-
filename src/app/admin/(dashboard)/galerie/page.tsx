import { createClient } from "@/lib/supabase/server";
import GalleryUploadForm from "@/components/admin/GalleryUploadForm";
import AdminGalleryGrid from "@/components/admin/AdminGalleryGrid";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });

  const items = (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category,
    imagePath: row.image_path,
    publicUrl: supabase.storage.from("gallery").getPublicUrl(row.image_path).data.publicUrl,
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy">Galerie</h1>
      <p className="mt-1 text-sm text-navy-500">
        Ajoutez ou supprimez les photos affichées sur le site public.
      </p>

      <div className="mt-6">
        <GalleryUploadForm />
      </div>

      <AdminGalleryGrid items={items} />
    </div>
  );
}
