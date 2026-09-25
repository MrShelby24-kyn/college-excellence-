import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, ArrowRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { getPublishedNews } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Actualités",
  description: "Suivez la vie de l'établissement : événements, résultats et annonces.",
};

export default async function NewsPage() {
  const news = await getPublishedNews();

  return (
    <>
      <PageHeader
        kicker="Actualités"
        title="La vie de l'établissement"
        description="Événements, résultats scolaires et annonces importantes."
      />

      <section className="section-padding">
        <div className="container-site">
          {news.length === 0 ? (
            <p className="text-center text-navy-500">Aucune actualité publiée pour le moment.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => (
                <Link
                  key={item.id}
                  href={`/actualites/${item.slug}`}
                  className="group overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
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
                    <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-navy-900">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="flex items-center gap-1.5 text-xs text-navy-400">
                      <CalendarDays className="h-3.5 w-3.5" /> {formatDate(item.published_at)}
                    </p>
                    <h2 className="mt-2 font-display text-lg font-bold text-navy line-clamp-2">
                      {item.title}
                    </h2>
                    {item.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm text-navy-500">{item.excerpt}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                      Lire la suite <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
