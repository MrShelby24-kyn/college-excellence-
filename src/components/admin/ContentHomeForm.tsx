"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { HomeContent } from "@/lib/content-defaults";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function ContentHomeForm({ initial }: { initial: HomeContent }) {
  const router = useRouter();
  const [presentationText, setPresentationText] = useState(initial.presentationText);
  const [whyUsText, setWhyUsText] = useState(initial.whyUsItems.join("\n"));
  const [heroImageUrl, setHeroImageUrl] = useState(initial.heroImageUrl);
  const [presentationImageUrl, setPresentationImageUrl] = useState(initial.presentationImageUrl);
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  const inputClass = "w-full rounded border border-navy-200 px-3 py-2 text-sm outline-none focus:border-gold-500";
  const labelClass = "mb-1 block text-sm font-medium text-navy-700";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    const data: HomeContent = {
      presentationText,
      whyUsItems: whyUsText.split("\n").map((s) => s.trim()).filter(Boolean),
      heroImageUrl,
      presentationImageUrl,
    };

    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page: "home", data }),
    });

    if (!res.ok) {
      setStatus("error");
      return;
    }
    setStatus("success");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClass}>Texte de présentation</label>
        <textarea rows={4} className={inputClass} value={presentationText} onChange={(e) => setPresentationText(e.target.value)} />
      </div>
      <div>
        <label className={labelClass}>Points forts (un par ligne)</label>
        <textarea rows={6} className={inputClass} value={whyUsText} onChange={(e) => setWhyUsText(e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ImageUploadField label="Photo du héros (bandeau d'accueil)" value={heroImageUrl} onChange={setHeroImageUrl} />
        <ImageUploadField label="Photo de la section présentation" value={presentationImageUrl} onChange={setPresentationImageUrl} />
      </div>

      <SubmitBar status={status} />
    </form>
  );
}

export function SubmitBar({ status }: { status: "idle" | "saving" | "success" | "error" }) {
  return (
    <div className="flex items-center gap-4">
      <button type="submit" disabled={status === "saving"} className="btn-primary text-sm">
        {status === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
        Enregistrer
      </button>
      {status === "success" && (
        <span className="flex items-center gap-1.5 text-sm text-green-700">
          <CheckCircle2 className="h-4 w-4" /> Enregistré
        </span>
      )}
      {status === "error" && (
        <span className="flex items-center gap-1.5 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" /> Échec de l&apos;enregistrement
        </span>
      )}
    </div>
  );
}
