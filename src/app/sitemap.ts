import type { MetadataRoute } from "next";
import { getPublishedNews } from "@/lib/data/news";
import { getClassLevels } from "@/lib/data/classLevels";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.excellence-divo-demo.ci";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [news, classLevels] = await Promise.all([getPublishedNews(), getClassLevels()]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/a-propos`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/classes`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/admissions`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/preinscription`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/actualites`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/galerie`, changeFrequency: "weekly", priority: 0.5 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.5 },
  ];

  const classAnchors: MetadataRoute.Sitemap = classLevels.map((level) => ({
    url: `${siteUrl}/classes#${level.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const newsPages: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${siteUrl}/actualites/${item.slug}`,
    lastModified: item.published_at,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...classAnchors, ...newsPages];
}
