import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getGalleryItems } from "@/lib/data/gallery";
import Reveal from "@/components/sections/Reveal";

export default async function GalleryPreview() {
  const items = (await getGalleryItems()).slice(0, 6);
  if (items.length === 0) return null;

  return (
    <section className="section-padding">
      <Reveal>
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-kicker">Galerie</span>
            <h2 className="section-title">La vie de l&apos;établissement</h2>
          </div>
          <Link href="/galerie" className="inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
            Voir toute la galerie <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((item) => (
            <div key={item.id} className="relative aspect-square overflow-hidden rounded-xl">
              <Image
                src={item.image_path}
                alt={item.title ?? "Photo de l'établissement"}
                fill
                className="object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  );
}
