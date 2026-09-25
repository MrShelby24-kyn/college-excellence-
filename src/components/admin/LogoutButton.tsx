"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export default function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className={cn(
        "flex items-center gap-2 rounded px-3 py-2 text-sm text-navy-500 transition-colors hover:bg-surface hover:text-red-600",
        compact && "px-2 py-1"
      )}
    >
      <LogOut className="h-4 w-4" />
      {!compact && "Se déconnecter"}
    </button>
  );
}
