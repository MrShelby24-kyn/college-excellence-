import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import { getPublishedNews } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";
import Reveal from "@/components/sections/Reveal";

export default async function NewsPreview() {
  const news = (await getPublishedNews()).slice(0, 3);
  if (news.length === 0) return null;

  return (
    <section className="section-padding bg-surface">
      <Reveal>
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="section-kicker">Actualités</span>
            <h2 className="section-title">Les dernières nouvelles</h2>
          </div>
          <Link href="/actualites" className="inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
            Toutes les actualités <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <Link
              key={item.id}
              href={`/actualites/${item.slug}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-navy-50">
                {item.cover_image_url && (
                  <Image
                    src={item.cover_image_url}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-5">
                <p className="flex items-center gap-1.5 text-xs text-navy-400">
                  <CalendarDays className="h-3.5 w-3.5" /> {formatDate(item.published_at)}
                </p>
                <h3 className="mt-2 font-display font-bold text-navy line-clamp-2">{item.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  );
}
