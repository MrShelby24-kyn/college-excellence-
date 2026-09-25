import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import ClassLevelForm from "@/components/admin/ClassLevelForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditClassLevelPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("class_levels").select("*").eq("id", id).single();

  if (!data) notFound();

  return (
    <div>
      <Link href="/admin/classes" className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy">
        <ArrowLeft className="h-4 w-4" /> Retour aux classes
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold text-navy">Modifier le niveau</h1>
      <div className="mt-6">
        <ClassLevelForm initial={data} />
      </div>
    </div>
  );
}
