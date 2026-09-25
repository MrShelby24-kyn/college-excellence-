import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ArrowLeft } from "lucide-react";
import { getNewsBySlug } from "@/lib/data/news";
import { formatDate } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);
  if (!article) return { title: "Actualité introuvable" };
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await getNewsBySlug(slug);

  if (!article) notFound();

  return (
    <article className="section-padding">
      <div className="container-site max-w-3xl">
        <Link href="/actualites" className="inline-flex items-center gap-1.5 text-sm font-medium text-navy-500 hover:text-gold-600">
          <ArrowLeft className="h-4 w-4" /> Retour aux actualités
        </Link>

        <span className="mt-6 inline-block rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-700">
          {article.category}
        </span>
        <h1 className="mt-3 font-display text-3xl font-extrabold text-navy md:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-navy-400">
          <CalendarDays className="h-4 w-4" /> {formatDate(article.published_at)}
        </p>

        {article.cover_image_url && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl">
            <Image src={article.cover_image_url} alt={article.title} fill className="object-cover" />
          </div>
        )}

        <div className="prose prose-navy mt-8 max-w-none whitespace-pre-line text-navy-700">
          {article.content}
        </div>
      </div>
    </article>
  );
}
