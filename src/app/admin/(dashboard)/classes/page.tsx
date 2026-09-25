import Link from "next/link";
import { Plus } from "lucide-react";
import { getClassLevels } from "@/lib/data/classLevels";
import AdminClassLevelsList from "@/components/admin/AdminClassLevelsList";

export const dynamic = "force-dynamic";

export default async function AdminClassesPage() {
  const levels = await getClassLevels();

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy">Nos classes</h1>
          <p className="mt-1 text-sm text-navy-500">Gérez les niveaux proposés sur le site public.</p>
        </div>
        <Link href="/admin/classes/nouveau" className="btn-primary text-sm">
          <Plus className="h-4 w-4" /> Nouveau niveau
        </Link>
      </div>

      <AdminClassLevelsList items={levels} />
    </div>
  );
}
