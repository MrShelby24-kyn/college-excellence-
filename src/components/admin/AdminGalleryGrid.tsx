"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, Loader2 } from "lucide-react";

interface AdminGalleryItem {
  id: string;
  title: string | null;
  category: string;
  publicUrl: string;
  imagePath: string;
}

export default function AdminGalleryGrid({ items }: { items: AdminGalleryItem[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(item: AdminGalleryItem) {
    if (!confirm("Supprimer définitivement cette photo ?")) return;
    setDeletingId(item.id);
    await fetch("/api/admin/gallery/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, imagePath: item.imagePath }),
    });
    setDeletingId(null);
    router.refresh();
  }

  if (items.length === 0) {
    return <p className="mt-8 text-sm text-navy-500">Aucune photo pour le moment. Ajoutez-en une ci-dessus.</p>;
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <div key={item.id} className="group relative aspect-square overflow-hidden border border-navy-100">
          <Image src={item.publicUrl} alt={item.title ?? ""} fill className="object-cover" />
          <div className="absolute inset-0 flex flex-col justify-between bg-navy-900/0 p-2 opacity-0 transition-opacity group-hover:bg-navy-900/40 group-hover:opacity-100">
            <span className="self-end rounded bg-white/90 px-2 py-0.5 text-[10px] font-medium text-navy">
              {item.category}
            </span>
            <button
              onClick={() => handleDelete(item)}
              disabled={deletingId === item.id}
              className="flex w-fit items-center gap-1.5 self-end rounded bg-white px-2 py-1 text-xs font-medium text-red-600"
            >
              {deletingId === item.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
              Supprimer
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
