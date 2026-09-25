"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { AboutContent } from "@/lib/content-defaults";
import ImageUploadField from "@/components/admin/ImageUploadField";
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

export default function ContentAboutForm({ initial }: { initial: AboutContent }) {
  const router = useRouter();
  const [historyText, setHistoryText] = useState(initial.historyText);
  const [historyImageUrl, setHistoryImageUrl] = useState(initial.historyImageUrl);
  const [visionText, setVisionText] = useState(initial.visionText);
  const [missionText, setMissionText] = useState(initial.missionText);
  const [valuesText, setValuesText] = useState(pairsToText(initial.values, ["title", "text"]));
  const [directorQuote, setDirectorQuote] = useState(initial.directorQuote);
  const [directorName, setDirectorName] = useState(initial.directorName);
  const [directorRole, setDirectorRole] = useState(initial.directorRole);
  const [directorPhotoUrl, setDirectorPhotoUrl] = useState(initial.directorPhotoUrl);
  const [administrationText, setAdministrationText] = useState(pairsToText(initial.administration, ["name", "role"]));
  const [pedagogicalText, setPedagogicalText] = useState(pairsToText(initial.pedagogicalTeam, ["name", "role"]));
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const inputClass = "w-full rounded border border-navy-200 px-3 py-2 text-sm outline-none focus:border-gold-500";
  const labelClass = "mb-1 block text-sm font-medium text-navy-700";
  const helpClass = "mb-1 text-xs text-navy-400";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    const data: AboutContent = {
      historyText,
      historyImageUrl,
      visionText,
      missionText,
      values: textToPairs(valuesText, ["title", "text"]) as AboutContent["values"],
      directorQuote,
      directorName,
      directorRole,
      directorPhotoUrl,
      administration: textToPairs(administrationText, ["name", "role"]) as AboutContent["administration"],
      pedagogicalTeam: textToPairs(pedagogicalText, ["name", "role"]) as AboutContent["pedagogicalTeam"],
    };

    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "about", data }),
    });

    setStatus(res.ok ? "success" : "error");
    if (res.ok) router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-8">
      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Historique</h2>
        <div>
          <label className={labelClass}>Texte</label>
          <textarea rows={5} className={inputClass} value={historyText} onChange={(e) => setHistoryText(e.target.value)} />
        </div>
        <ImageUploadField label="Photo d'illustration" value={historyImageUrl} onChange={setHistoryImageUrl} />
      </section>

      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Vision & mission</h2>
        <div>
          <label className={labelClass}>Vision</label>
          <textarea rows={2} className={inputClass} value={visionText} onChange={(e) => setVisionText(e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Mission</label>
          <textarea rows={2} className={inputClass} value={missionText} onChange={(e) => setMissionText(e.target.value)} />
        </div>
      </section>

      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Nos valeurs</h2>
        <p className={helpClass}>Une valeur par ligne, au format : Titre | Description</p>
        <textarea rows={4} className={inputClass} value={valuesText} onChange={(e) => setValuesText(e.target.value)} />
      </section>

      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Mot du directeur</h2>
        <div>
          <label className={labelClass}>Citation</label>
          <textarea rows={4} className={inputClass} value={directorQuote} onChange={(e) => setDirectorQuote(e.target.value)} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Nom</label>
            <input className={inputClass} value={directorName} onChange={(e) => setDirectorName(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Fonction</label>
            <input className={inputClass} value={directorRole} onChange={(e) => setDirectorRole(e.target.value)} />
          </div>
        </div>
        <ImageUploadField label="Photo" value={directorPhotoUrl} onChange={setDirectorPhotoUrl} />
      </section>

      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Équipe administrative</h2>
        <p className={helpClass}>Une personne par ligne, au format : Nom | Fonction</p>
        <textarea rows={4} className={inputClass} value={administrationText} onChange={(e) => setAdministrationText(e.target.value)} />
      </section>

      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Équipe pédagogique</h2>
        <p className={helpClass}>Une personne par ligne, au format : Nom | Matière enseignée</p>
        <textarea rows={4} className={inputClass} value={pedagogicalText} onChange={(e) => setPedagogicalText(e.target.value)} />
      </section>

      <SubmitBar status={status} />
    </form>
  );
}
