import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id } = await request.json();
  if (!id) return NextResponse.json({ error: "Identifiant manquant" }, { status: 400 });

  const { error } = await supabase.from("news").delete().eq("id", id);
  if (error) return NextResponse.json({ error: "Échec de la suppression" }, { status: 500 });

  return NextResponse.json({ success: true });
}
