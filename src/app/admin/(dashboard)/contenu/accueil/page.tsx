import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPageContent } from "@/lib/data/content";
import { homeContentDefaults } from "@/lib/content-defaults";
import ContentHomeForm from "@/components/admin/ContentHomeForm";

export const dynamic = "force-dynamic";

export default async function AdminContentHomePage() {
  const content = await getPageContent("home", homeContentDefaults);

  return (
    <div>
      <Link href="/admin/contenu" className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold text-navy">Contenu — Accueil</h1>
      <div className="mt-6">
        <ContentHomeForm initial={content} />
      </div>
    </div>
  );
}
