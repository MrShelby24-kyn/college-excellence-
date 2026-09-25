import { createClient } from "@/lib/supabase/server";
import { schoolConfig } from "@/config/school";

export interface SiteSettings {
  name: string;
  slogan: string;
  description: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  logoUrl: string;
  gps: { lat: number; lng: number };
  stats: {
    students: number;
    teachers: number;
    yearsOfExperience: number;
    successRatePercent: number;
  };
}

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function fallback(): SiteSettings {
  return {
    name: schoolConfig.name,
    slogan: schoolConfig.slogan,
    description: schoolConfig.description,
    phone: schoolConfig.phone,
    whatsapp: schoolConfig.whatsapp,
    email: schoolConfig.email,
    address: schoolConfig.address,
    logoUrl: schoolConfig.logoUrl,
    gps: schoolConfig.gps,
    stats: schoolConfig.stats,
  };
}

/**
 * Lit les réglages depuis Supabase (`school_settings`, ligne unique).
 * Si la table est vide, en erreur, ou Supabase non configuré : repli sur
 * les valeurs de config/school.ts, pour que le site reste toujours fonctionnel.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  if (!supabaseConfigured) return fallback();

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from("school_settings").select("*").limit(1).single();

    if (error || !data) return fallback();

    const base = fallback();
    return {
      name: data.name || base.name,
      slogan: data.slogan || base.slogan,
      description: data.description || base.description,
      phone: data.phone || base.phone,
      whatsapp: data.whatsapp || base.whatsapp,
      email: data.email || base.email,
      address: data.address || base.address,
      logoUrl: data.logo_url || base.logoUrl,
      gps: {
        lat: data.gps_lat ?? base.gps.lat,
        lng: data.gps_lng ?? base.gps.lng,
      },
      stats: {
        students: data.stats_students ?? base.stats.students,
        teachers: data.stats_teachers ?? base.stats.teachers,
        yearsOfExperience: data.stats_years_experience ?? base.stats.yearsOfExperience,
        successRatePercent: data.stats_success_rate ?? base.stats.successRatePercent,
      },
    };
  } catch {
    return fallback();
  }
}
