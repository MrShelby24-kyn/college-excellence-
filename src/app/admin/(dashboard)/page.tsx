import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { ApplicationStatus } from "@/types/database";

export const dynamic = "force-dynamic";

async function getCounts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("applications").select("status");

  if (error || !data) {
    return { total: 0, nouvelle: 0, en_cours: 0, acceptee: 0, refusee: 0 };
  }

  const counts: Record<ApplicationStatus, number> = {
    nouvelle: 0,
    en_cours: 0,
    acceptee: 0,
    refusee: 0,
  };
  for (const row of data) counts[row.status as ApplicationStatus]++;

  return { total: data.length, ...counts };
}

export default async function AdminHomePage() {
  const counts = await getCounts();

  const cards = [
    { label: "Total des demandes", value: counts.total },
    { label: "Nouvelles", value: counts.nouvelle },
    { label: "En cours", value: counts.en_cours },
    { label: "Acceptées", value: counts.acceptee },
    { label: "Refusées", value: counts.refusee },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy">Tableau de bord</h1>
      <p className="mt-1 text-sm text-navy-500">Vue d&apos;ensemble des demandes de préinscription.</p>

      <div className="mt-8 grid gap-px overflow-hidden border border-navy-100 bg-navy-100 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((c) => (
          <div key={c.label} className="bg-white p-5">
            <p className="font-display text-3xl font-semibold text-navy">{c.value}</p>
            <p className="mt-1 text-sm text-navy-500">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link href="/admin/demandes" className="btn-primary text-sm">
          Voir toutes les demandes
        </Link>
      </div>
    </div>
  );
}
