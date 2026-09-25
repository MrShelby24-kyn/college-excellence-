import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getPageContent } from "@/lib/data/content";
import { aboutContentDefaults } from "@/lib/content-defaults";
import ContentAboutForm from "@/components/admin/ContentAboutForm";

export const dynamic = "force-dynamic";

export default async function AdminContentAboutPage() {
  const content = await getPageContent("about", aboutContentDefaults);

  return (
    <div>
      <Link href="/admin/contenu" className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy">
        <ArrowLeft className="h-4 w-4" /> Retour
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold text-navy">Contenu — À propos</h1>
      <div className="mt-6">
        <ContentAboutForm initial={content} />
      </div>
    </div>
  );
}
