import { createClient } from "@/lib/supabase/server";
import { demoNews } from "@/lib/demo-data";
import type { NewsItem } from "@/types/database";

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export async function getPublishedNews(): Promise<NewsItem[]> {
  if (!supabaseConfigured) return demoNews;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) return demoNews;
    return data as NewsItem[];
  } catch {
    return demoNews;
  }
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  if (!supabaseConfigured) {
    return demoNews.find((n) => n.slug === slug) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single();

    if (error || !data) return demoNews.find((n) => n.slug === slug) ?? null;
    return data as NewsItem;
  } catch {
    return demoNews.find((n) => n.slug === slug) ?? null;
  }
}
