"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import type { SiteSettings } from "@/lib/data/settings";
import ImageUploadField from "@/components/admin/ImageUploadField";

export default function SettingsForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: initial.name,
    slogan: initial.slogan,
    description: initial.description,
    phone: initial.phone,
    whatsapp: initial.whatsapp,
    email: initial.email,
    address: initial.address,
    logo_url: initial.logoUrl,
    gps_lat: initial.gps.lat,
    gps_lng: initial.gps.lng,
    stats_students: initial.stats.students,
    stats_teachers: initial.stats.teachers,
    stats_years_experience: initial.stats.yearsOfExperience,
    stats_success_rate: initial.stats.successRatePercent,
  });
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">("idle");

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      setStatus("error");
      return;
    }
    setStatus("success");
    router.refresh();
  }

  const inputClass = "w-full rounded border border-navy-200 px-3 py-2 text-sm outline-none focus:border-gold-500";
  const labelClass = "mb-1 block text-sm font-medium text-navy-700";

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-8">
      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Identité</h2>
        <ImageUploadField
          label="Logo (affiché dans le menu, à côté du nom)"
          value={values.logo_url}
          onChange={(url) => update("logo_url", url)}
        />
        <div>
          <label className={labelClass}>Nom de l&apos;établissement</label>
          <input className={inputClass} value={values.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Slogan</label>
          <input className={inputClass} value={values.slogan} onChange={(e) => update("slogan", e.target.value)} />
        </div>
        <div>
          <label className={labelClass}>Description courte</label>
          <textarea rows={3} className={inputClass} value={values.description} onChange={(e) => update("description", e.target.value)} />
        </div>
      </section>

      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Coordonnées</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Téléphone</label>
            <input className={inputClass} value={values.phone} onChange={(e) => update("phone", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>WhatsApp (format international, sans +)</label>
            <input className={inputClass} value={values.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input className={inputClass} value={values.email} onChange={(e) => update("email", e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Adresse</label>
            <input className={inputClass} value={values.address} onChange={(e) => update("address", e.target.value)} />
          </div>
        </div>
      </section>

      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Localisation (Google Maps)</h2>
        <p className="text-xs text-navy-400">
          Astuce : sur Google Maps, faites un clic droit sur l&apos;emplacement de l&apos;établissement puis
          cliquez sur les coordonnées affichées pour les copier (format : latitude, longitude).
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Latitude</label>
            <input type="number" step="any" className={inputClass} value={values.gps_lat} onChange={(e) => update("gps_lat", Number(e.target.value))} />
          </div>
          <div>
            <label className={labelClass}>Longitude</label>
            <input type="number" step="any" className={inputClass} value={values.gps_lng} onChange={(e) => update("gps_lng", Number(e.target.value))} />
          </div>
        </div>
      </section>

      <section className="space-y-4 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-navy">Statistiques affichées sur l&apos;accueil</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Nombre d&apos;élèves</label>
            <input type="number" className={inputClass} value={values.stats_students} onChange={(e) => update("stats_students", Number(e.target.value))} />
          </div>
          <div>
            <label className={labelClass}>Nombre d&apos;enseignants</label>
            <input type="number" className={inputClass} value={values.stats_teachers} onChange={(e) => update("stats_teachers", Number(e.target.value))} />
          </div>
          <div>
            <label className={labelClass}>Années d&apos;expérience</label>
            <input type="number" className={inputClass} value={values.stats_years_experience} onChange={(e) => update("stats_years_experience", Number(e.target.value))} />
          </div>
          <div>
            <label className={labelClass}>Taux de réussite (%)</label>
            <input type="number" className={inputClass} value={values.stats_success_rate} onChange={(e) => update("stats_success_rate", Number(e.target.value))} />
          </div>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button type="submit" disabled={status === "saving"} className="btn-primary text-sm">
          {status === "saving" && <Loader2 className="h-4 w-4 animate-spin" />}
          Enregistrer les modifications
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
    </form>
  );
}
