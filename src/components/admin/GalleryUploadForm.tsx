"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, AlertCircle } from "lucide-react";

const categories = ["Établissement", "Classes", "Activités", "Événements"];

export default function GalleryUploadForm() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Sélectionnez une photo.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", category);

    const res = await fetch("/api/admin/gallery", { method: "POST", body: formData });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Échec de l'upload.");
      return;
    }

    setTitle("");
    if (fileRef.current) fileRef.current.value = "";
    router.refresh();
  }

  const inputClass = "w-full rounded border border-navy-200 px-3 py-2 text-sm outline-none focus:border-gold-500";

  return (
    <form onSubmit={onSubmit} className="grid gap-3 border border-navy-100 bg-white p-5 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end">
      <div>
        <label className="mb-1 block text-xs font-medium text-navy-600">Photo</label>
        <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className={inputClass} />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-navy-600">Titre (optionnel)</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} placeholder="Ex : Cour de récréation" />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-navy-600">Catégorie</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={loading} className="btn-primary h-fit text-sm">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
        Ajouter
      </button>
      {error && (
        <p className="sm:col-span-4 flex items-center gap-1.5 text-xs text-red-600">
          <AlertCircle className="h-3.5 w-3.5" /> {error}
        </p>
      )}
    </form>
  );
}
