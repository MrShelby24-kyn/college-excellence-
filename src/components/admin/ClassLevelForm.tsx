"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import type { ClassLevel } from "@/types/database";

export default function ClassLevelForm({ initial }: { initial?: ClassLevel }) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [cycle, setCycle] = useState<"college" | "lycee">(initial?.cycle ?? "college");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [mainSubjects, setMainSubjects] = useState((initial?.main_subjects ?? []).join("\n"));
  const [objectives, setObjectives] = useState((initial?.objectives ?? []).join("\n"));
  const [admissionConditions, setAdmissionConditions] = useState((initial?.admission_conditions ?? []).join("\n"));
  const [annualFee, setAnnualFee] = useState(initial?.annual_fee_fcfa?.toString() ?? "");
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass = "w-full rounded border border-navy-200 px-3 py-2 text-sm outline-none focus:border-gold-500";
  const labelClass = "mb-1 block text-sm font-medium text-navy-700";
  const helpClass = "mb-1 text-xs text-navy-400";

  function toList(text: string) {
    return text.split("\n").map((s) => s.trim()).filter(Boolean);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      id: initial?.id,
      name,
      cycle,
      description,
      main_subjects: toList(mainSubjects),
      objectives: toList(objectives),
      admission_conditions: toList(admissionConditions),
      annual_fee_fcfa: annualFee ? Number(annualFee) : null,
      sort_order: sortOrder,
    };

    const res = await fetch("/api/admin/classes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Une erreur est survenue.");
      return;
    }

    router.push("/admin/classes");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Nom du niveau *</label>
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ex : 2nde" />
        </div>
        <div>
          <label className={labelClass}>Cycle</label>
          <select className={inputClass} value={cycle} onChange={(e) => setCycle(e.target.value as "college" | "lycee")}>
            <option value="college">Collège</option>
            <option value="lycee">Lycée</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea rows={3} className={inputClass} value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Matières principales</label>
        <p className={helpClass}>Une matière par ligne</p>
        <textarea rows={4} className={inputClass} value={mainSubjects} onChange={(e) => setMainSubjects(e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Objectifs</label>
        <p className={helpClass}>Un objectif par ligne</p>
        <textarea rows={3} className={inputClass} value={objectives} onChange={(e) => setObjectives(e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Conditions d&apos;admission</label>
        <p className={helpClass}>Une condition par ligne</p>
        <textarea rows={3} className={inputClass} value={admissionConditions} onChange={(e) => setAdmissionConditions(e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Frais de scolarité annuels (FCFA)</label>
          <input type="number" className={inputClass} value={annualFee} onChange={(e) => setAnnualFee(e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Ordre d&apos;affichage</label>
          <input type="number" className={inputClass} value={sortOrder} onChange={(e) => setSortOrder(Number(e.target.value))} />
        </div>
      </div>

      {error && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" /> {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary text-sm">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {initial ? "Enregistrer les modifications" : "Créer le niveau"}
      </button>
    </form>
  );
}
