import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  page: z.string().min(1),
  data: z.record(z.any()),
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

  const { error } = await supabase
    .from("page_content")
    .upsert({ page_key: parsed.data.page, data: parsed.data.data, updated_at: new Date().toISOString() });

  if (error) return NextResponse.json({ error: "Échec de l'enregistrement" }, { status: 500 });

  return NextResponse.json({ success: true });
}
