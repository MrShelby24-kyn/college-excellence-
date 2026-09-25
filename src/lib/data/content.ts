import { createClient } from "@/lib/supabase/server";

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Lit le contenu éditable d'une page (`page_content`, une ligne par page_key).
 * Si absent, en erreur, ou Supabase non configuré : repli sur `fallback`,
 * pour que chaque page reste toujours fonctionnelle et pré-remplie.
 */
export async function getPageContent<T>(
  pageKey: string,
  fallback: T
): Promise<T> {
  if (!supabaseConfigured) return fallback;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("data")
      .eq("page_key", pageKey)
      .single();

    if (error || !data?.data || Object.keys(data.data).length === 0) {
      return fallback;
    }

    return { ...fallback, ...(data.data as T) };
  } catch {
    return fallback;
  }
}