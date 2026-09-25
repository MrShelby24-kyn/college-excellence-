"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AdmissionsContent } from "@/lib/content-defaults";
import { SubmitBar } from "@/components/admin/ContentHomeForm";

function pairsToText(list: { [k: string]: string }[], keys: [string, string]): string {
  return list.map((item) => `${item[keys[0]]} | ${item[keys[1]]}`).join("\n");
}
function textToPairs(text: string, keys: [string, string]) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [a, b] = line.split("|").map((s) => s.trim());
      return { [keys[0]]: a || "", [keys[1]]: b || "" };
    });
}

export default function ContentAdmissionsForm({ initial }: { initial: AdmissionsContent }) {
  const router = useRouter();
  const [requiredDocumentsText, setRequiredDocumentsText] = useState(initial.requiredDocuments.join("\n"));
  const [feesText, setFeesText] = useState(initial.feesText);
  const [stepsText, setStepsText] = useState(pairsToText(initial.steps, ["title", "text"]));
  const [datesText, setDatesText] = useState(pairsToText(initial.importantDates, ["label", "date"]));
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const inputClass = "w-full rounded border border-navy-200 px-3 py-2 text-sm outline-none focus:border-gold-500";
  const labelClass = "mb-1 block text-sm font-medium text-navy-700";
  const helpClass = "mb-1 text-xs text-navy-400";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    const data: AdmissionsContent = {
      requiredDocuments: requiredDocumentsText.split("\n").map((s) => s.trim()).filter(Boolean),
      feesText,
      steps: textToPairs(stepsText, ["title", "text"]) as AdmissionsContent["steps"],
      importantDates: textToPairs(datesText, ["label", "date"]) as AdmissionsContent["importantDates"],
    };

    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "admissions", data }),
    });

    setStatus(res.ok ? "success" : "error");
    if (res.ok) router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-8">
      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Pièces à fournir</h2>
        <p className={helpClass}>Une pièce par ligne</p>
        <textarea rows={5} className={inputClass} value={requiredDocumentsText} onChange={(e) => setRequiredDocumentsText(e.target.value)} />
      </section>

      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Frais</h2>
        <textarea rows={3} className={inputClass} value={feesText} onChange={(e) => setFeesText(e.target.value)} />
      </section>

      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Étapes de l&apos;inscription</h2>
        <p className={helpClass}>Une étape par ligne, au format : Titre | Description</p>
        <textarea rows={4} className={inputClass} value={stepsText} onChange={(e) => setStepsText(e.target.value)} />
      </section>

      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Dates importantes</h2>
        <p className={helpClass}>Une date par ligne, au format : Libellé | Date</p>
        <textarea rows={4} className={inputClass} value={datesText} onChange={(e) => setDatesText(e.target.value)} />
      </section>

      <SubmitBar status={status} />
    </form>
  );
}
