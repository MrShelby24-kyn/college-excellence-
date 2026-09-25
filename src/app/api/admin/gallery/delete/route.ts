import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const { id, imagePath } = await request.json();
  if (!id || !imagePath) {
    return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
  }

  await supabase.storage.from("gallery").remove([imagePath]);
  const { error } = await supabase.from("gallery").delete().eq("id", id);

  if (error) return NextResponse.json({ error: "Échec de la suppression" }, { status: 500 });

  return NextResponse.json({ success: true });
}
