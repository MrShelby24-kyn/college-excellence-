import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import NewsForm from "@/components/admin/NewsForm";

export default function NewNewsPage() {
  return (
    <div>
      <Link href="/admin/actualites" className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy">
        <ArrowLeft className="h-4 w-4" /> Retour aux actualités
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold text-navy">Nouvel article</h1>
      <div className="mt-6">
        <NewsForm />
      </div>
    </div>
  );
}
