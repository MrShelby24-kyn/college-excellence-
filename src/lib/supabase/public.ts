import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase pour les LECTURES PUBLIQUES uniquement (réglages, contenu
 * de page, classes, actualités, galerie). Contrairement au client de
 * lib/supabase/server.ts, celui-ci n'utilise pas les cookies de session :
 * cela permet à Next.js de mettre ces pages en cache (ISR) au lieu de tout
 * recalculer à chaque navigation, ce qui accélère nettement le site.
 *
 * Ne jamais utiliser ce client pour des données liées à l'utilisateur
 * connecté (admin) : utiliser lib/supabase/server.ts pour ça.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
