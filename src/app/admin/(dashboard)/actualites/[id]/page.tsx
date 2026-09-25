import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import NewsForm from "@/components/admin/NewsForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("news").select("*").eq("id", id).single();

  if (!data) notFound();

  return (
    <div>
      <Link href="/admin/actualites" className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy">
        <ArrowLeft className="h-4 w-4" /> Retour aux actualités
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold text-navy">Modifier l&apos;article</h1>
      <div className="mt-6">
        <NewsForm initial={data} />
      </div>
    </div>
  );
}
