import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ClassLevelForm from "@/components/admin/ClassLevelForm";

export default function NewClassLevelPage() {
  return (
    <div>
      <Link href="/admin/classes" className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy">
        <ArrowLeft className="h-4 w-4" /> Retour aux classes
      </Link>
      <h1 className="mt-4 font-display text-2xl font-semibold text-navy">Nouveau niveau</h1>
      <div className="mt-6">
        <ClassLevelForm />
      </div>
    </div>
  );
}
