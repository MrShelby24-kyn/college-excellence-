import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import type { ApplicationStatus } from "@/types/database";

export const dynamic = "force-dynamic";

const statusLabels: Record<ApplicationStatus, string> = {
  nouvelle: "Nouvelle",
  en_cours: "En cours",
  acceptee: "Acceptée",
  refusee: "Refusée",
};

const statusStyles: Record<ApplicationStatus, string> = {
  nouvelle: "bg-navy-50 text-navy-700",
  en_cours: "bg-gold-50 text-gold-700",
  acceptee: "bg-green-50 text-green-700",
  refusee: "bg-red-50 text-red-700",
};

interface Props {
  searchParams: Promise<{ statut?: string }>;
}

export default async function AdminApplicationsPage({ searchParams }: Props) {
  const { statut } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("applications")
    .select("id, reference_number, status, created_at, students(last_name, first_names, requested_class), parents(full_name, phone)")
    .order("created_at", { ascending: false });

  if (statut && statut !== "toutes") {
    query = query.eq("status", statut);
  }

  const { data } = await query;
  const applications = data ?? [];

  const filters: { key: string; label: string }[] = [
    { key: "toutes", label: "Toutes" },
    { key: "nouvelle", label: "Nouvelles" },
    { key: "en_cours", label: "En cours" },
    { key: "acceptee", label: "Acceptées" },
    { key: "refusee", label: "Refusées" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy">Demandes de préinscription</h1>

      <div className="mt-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f.key}
            href={f.key === "toutes" ? "/admin/demandes" : `/admin/demandes?statut=${f.key}`}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              (statut ?? "toutes") === f.key
                ? "border-navy bg-navy text-white"
                : "border-navy-200 text-navy-600 hover:border-navy-400"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto border border-navy-100 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-navy-100 bg-surface text-xs uppercase tracking-wide text-navy-400">
            <tr>
              <th className="px-4 py-3">Numéro</th>
              <th className="px-4 py-3">Élève</th>
              <th className="px-4 py-3">Classe</th>
              <th className="px-4 py-3">Parent</th>
              <th className="px-4 py-3">Téléphone</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-50">
            {applications.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-navy-400">
                  Aucune demande pour ce filtre.
                </td>
              </tr>
            )}
            {applications.map((app: any) => (
              <tr key={app.id} className="hover:bg-surface">
                <td className="px-4 py-3">
                  <Link href={`/admin/demandes/${app.id}`} className="font-medium text-gold-700 underline underline-offset-2 hover:text-gold-800">
                    {app.reference_number} →
                  </Link>
                </td>
                <td className="px-4 py-3">
                  {app.students?.last_name} {app.students?.first_names}
                </td>
                <td className="px-4 py-3">{app.students?.requested_class}</td>
                <td className="px-4 py-3">{app.parents?.full_name}</td>
                <td className="px-4 py-3">{app.parents?.phone}</td>
                <td className="px-4 py-3 text-navy-500">{formatDate(app.created_at)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[app.status as ApplicationStatus]}`}>
                    {statusLabels[app.status as ApplicationStatus]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
