import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { CookieOptions } from "@supabase/ssr";

/**
 * Client Supabase pour Server Components / Route Handlers.
 * Utilise la clé anon publique + les cookies de session pour l'auth admin.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Appelé depuis un Server Component : ignoré, géré par le middleware.
          }
        },
      },
    }
  );
}

/**
 * Client "admin" avec la clé service_role.
 * NE JAMAIS importer ce fichier dans un composant client.
 * Contourne complètement la RLS : réservé aux Route Handlers serveur qui
 * doivent écrire des données pour un visiteur non authentifié (ex: la
 * préinscription publique) ou lire une ligne juste après l'avoir insérée
 * (nécessaire pour récupérer le numéro de dossier généré automatiquement).
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}
