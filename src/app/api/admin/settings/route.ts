import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const settingsSchema = z.object({
  name: z.string().min(2),
  slogan: z.string().max(200).optional().or(z.literal("")),
  description: z.string().max(1000).optional().or(z.literal("")),
  phone: z.string().max(30).optional().or(z.literal("")),
  whatsapp: z.string().max(30).optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  address: z.string().max(300).optional().or(z.literal("")),
  logo_url: z.string().max(500).optional().or(z.literal("")),
  gps_lat: z.coerce.number().min(-90).max(90),
  gps_lng: z.coerce.number().min(-180).max(180),
  stats_students: z.coerce.number().int().min(0),
  stats_teachers: z.coerce.number().int().min(0),
  stats_years_experience: z.coerce.number().int().min(0),
  stats_success_rate: z.coerce.number().int().min(0).max(100),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await request.json();
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Données invalides", details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { data: existing } = await supabase.from("school_settings").select("id").limit(1).single();

  const payload = { ...parsed.data, updated_at: new Date().toISOString() };

  const { error } = existing
    ? await supabase.from("school_settings").update(payload).eq("id", existing.id)
    : await supabase.from("school_settings").insert(payload);

  if (error) {
  console.error("Erreur Supabase school_settings:", error);

  return NextResponse.json(
    {
      error: "Échec de l'enregistrement",
      details: error.message,
      code: error.code,
    },
    { status: 500 }
  );
}

  return NextResponse.json({ success: true });
}
