"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { GalleryItem } from "@/types/database";
import { cn } from "@/lib/utils";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(
    () => ["Tout", ...Array.from(new Set(items.map((i) => i.category)))],
    [items]
  );
  const [active, setActive] = useState("Tout");

  const filtered = active === "Tout" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === cat
                ? "border-navy bg-navy text-white"
                : "border-navy-100 text-navy-600 hover:border-navy-300"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-center text-navy-500">Aucune photo dans cette catégorie.</p>
      ) : (
        <div className="mt-8 columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-xl break-inside-avoid shadow-sm"
            >
              <Image
                src={item.image_path}
                alt={item.title ?? "Photo de l'établissement"}
                width={500}
                height={500}
                className="h-auto w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {item.title && (
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-900/80 to-transparent p-3 text-xs font-medium text-white">
                  {item.title}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
