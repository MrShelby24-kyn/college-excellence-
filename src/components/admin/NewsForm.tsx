"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, AlertCircle } from "lucide-react";
import type { NewsItem } from "@/types/database";

const categories = ["Vie scolaire", "Résultats", "Événement", "Général"];

export default function NewsForm({ initial }: { initial?: NewsItem }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState(initial?.category ?? categories[0]);
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [published, setPublished] = useState(initial?.published ?? true);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const inputClass = "w-full rounded border border-navy-200 px-3 py-2 text-sm outline-none focus:border-gold-500";
  const labelClass = "mb-1 block text-sm font-medium text-navy-700";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    if (initial) formData.append("id", initial.id);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("excerpt", excerpt);
    formData.append("content", content);
    formData.append("published", String(published));
    if (initial?.cover_image_url) formData.append("existing_cover_url", initial.cover_image_url);
    if (file) formData.append("file", file);

    const res = await fetch("/api/admin/news", { method: "POST", body: formData });
    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Une erreur est survenue.");
      return;
    }

    router.push("/admin/actualites");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
      <div>
        <label className={labelClass}>Titre *</label>
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Catégorie</label>
          <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex items-end gap-2 pb-2">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 rounded border-navy-300"
          />
          <label htmlFor="published" className="text-sm text-navy-700">Publié sur le site</label>
        </div>
      </div>

      <div>
        <label className={labelClass}>Résumé court</label>
        <textarea rows={2} className={inputClass} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
      </div>

      <div>
        <label className={labelClass}>Contenu *</label>
        <textarea rows={8} className={inputClass} value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>

      <div>
        <label className={labelClass}>Image de couverture</label>
        {initial?.cover_image_url && !file && (
          <div className="relative mb-2 aspect-[16/9] w-48 overflow-hidden rounded border border-navy-100">
            <Image src={initial.cover_image_url} alt="" fill className="object-cover" />
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className={inputClass}
        />
      </div>

      {error && (
        <p className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" /> {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary text-sm">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {initial ? "Enregistrer les modifications" : "Publier l'article"}
      </button>
    </form>
  );
}
