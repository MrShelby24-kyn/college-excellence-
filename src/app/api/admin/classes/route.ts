import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/slugify";

const schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  cycle: z.enum(["college", "lycee"]),
  description: z.string().optional().default(""),
  main_subjects: z.array(z.string()).default([]),
  objectives: z.array(z.string()).default([]),
  admission_conditions: z.array(z.string()).default([]),
  annual_fee_fcfa: z.number().int().nullable().optional(),
  sort_order: z.number().int().default(0),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Données invalides" }, { status: 400 });

  const { id, ...rest } = parsed.data;

  if (id) {
    const { error } = await supabase.from("class_levels").update(rest).eq("id", id);
    if (error) return NextResponse.json({ error: "Échec de la mise à jour" }, { status: 500 });
  } else {
    let slug = slugify(rest.name);
    const { data: existing } = await supabase.from("class_levels").select("slug").ilike("slug", `${slug}%`);
    if (existing && existing.length > 0) slug = `${slug}-${existing.length + 1}`;

    const { error } = await supabase.from("class_levels").insert({ ...rest, slug });
    if (error) return NextResponse.json({ error: "Échec de la création" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
