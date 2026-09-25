import Link from "next/link";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import AdminNewsList from "@/components/admin/AdminNewsList";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("news").select("*").order("published_at", { ascending: false });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Actualités</h1>
          <p className="mt-1 text-sm text-navy-500">Gérez les articles publiés sur le site public.</p>
        </div>
        <Link href="/admin/actualites/nouveau" className="btn-primary text-sm">
          <Plus className="h-4 w-4" /> Nouvel article
        </Link>
      </div>

      <AdminNewsList items={data ?? []} />
    </div>
  );
}
