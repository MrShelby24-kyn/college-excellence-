import { createPublicClient } from "@/lib/supabase/public";

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Lit le contenu éditable d'une page (`page_content`, une ligne par page_key).
 * Si absent, en erreur, ou Supabase non configuré : repli sur `fallback`,
 * pour que chaque page reste toujours fonctionnelle et pré-remplie.
 *
 * Note : pas de React `cache()` ici car cette fonction est générique
 * (TypeScript perd le typage précis à travers cache()) ; le gain de cache
 * n'est de toute façon plus critique depuis le passage en ISR (revalidate)
 * sur les pages publiques : une page entière n'est recalculée qu'une fois
 * par minute, pas à chaque visite.
 */
export async function getPageContent<T extends object>(
  pageKey: string,
  fallback: T
): Promise<T> {
  if (!supabaseConfigured) return fallback;

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("data")
      .eq("page_key", pageKey)
      .single();

    if (error || !data?.data || Object.keys(data.data).length === 0) return fallback;
    return { ...fallback, ...(data.data as T) };
  } catch {
    return fallback;
  }
}
