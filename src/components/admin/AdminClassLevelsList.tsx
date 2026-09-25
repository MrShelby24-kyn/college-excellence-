"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { formatFCFA } from "@/lib/utils";
import type { ClassLevel } from "@/types/database";

export default function AdminClassLevelsList({ items }: { items: ClassLevel[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Supprimer définitivement ce niveau ? Il n'apparaîtra plus sur le site.")) return;
    setDeletingId(id);
    await fetch("/api/admin/classes/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setDeletingId(null);
    router.refresh();
  }

  if (items.length === 0) {
    return <p className="mt-6 text-sm text-navy-500">Aucun niveau pour le moment.</p>;
  }

  return (
    <div className="mt-6 divide-y divide-navy-100 border border-navy-100 bg-white">
      {items.map((item) => (
        <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
          <div>
            <p className="font-semibold text-navy">{item.name} <span className="text-xs font-normal text-navy-400">({item.cycle === "college" ? "Collège" : "Lycée"})</span></p>
            <p className="mt-1 text-xs text-navy-400">
              {item.main_subjects.length} matière(s) · {item.annual_fee_fcfa ? formatFCFA(item.annual_fee_fcfa) : "Frais non renseignés"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/admin/classes/${item.id}`} className="flex items-center gap-1.5 text-sm text-navy-600 hover:text-gold-700">
              <Pencil className="h-3.5 w-3.5" /> Modifier
            </Link>
            <button
              onClick={() => handleDelete(item.id)}
              disabled={deletingId === item.id}
              className="flex items-center gap-1.5 text-sm text-red-600 hover:text-red-700"
            >
              {deletingId === item.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
