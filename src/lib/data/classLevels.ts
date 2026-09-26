import { cache } from "react";
import { createPublicClient } from "@/lib/supabase/public";
import { schoolConfig } from "@/config/school";
import type { ClassLevel } from "@/types/database";

const supabaseConfigured =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function fallbackLevels(): ClassLevel[] {
  return schoolConfig.classLevels.map((lvl, i) => ({
    id: lvl.slug,
    slug: lvl.slug,
    name: lvl.name,
    cycle: lvl.cycle,
    description: lvl.description,
    main_subjects: lvl.mainSubjects,
    objectives: lvl.objectives,
    admission_conditions: lvl.admissionConditions,
    annual_fee_fcfa: lvl.annualFeeFCFA ?? null,
    sort_order: i,
    created_at: new Date().toISOString(),
  }));
}

export const getClassLevels = cache(async (): Promise<ClassLevel[]> => {
  if (!supabaseConfigured) return fallbackLevels();

  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase
      .from("class_levels")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return fallbackLevels();
    return data as ClassLevel[];
  } catch {
    return fallbackLevels();
  }
});
