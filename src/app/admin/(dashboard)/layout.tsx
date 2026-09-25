import Link from "next/link";
import { redirect } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { adminNavItems } from "@/lib/admin-nav";
import LogoutButton from "@/components/admin/LogoutButton";
import AdminMobileMenu from "@/components/admin/AdminMobileMenu";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Filet de sécurité en plus du middleware.
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Barre latérale — desktop uniquement */}
      <aside className="hidden w-60 shrink-0 border-r border-navy-100 bg-white md:flex md:flex-col">
        <div className="flex items-center gap-2 border-b border-navy-100 px-5 py-5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-gold">
            <GraduationCap className="h-4 w-4" />
          </span>
          <span className="font-display text-sm font-semibold text-navy">Administration</span>
        </div>
        <nav className="flex-1 space-y-0.5 px-3 py-4">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded px-3 py-2 text-sm text-navy-600 transition-colors hover:bg-surface hover:text-navy"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-navy-100 p-3">
          <p className="truncate px-3 py-1 text-xs text-navy-400">{user.email}</p>
          <LogoutButton />
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* En-tête + menu — mobile uniquement */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-navy-100 bg-white px-4 py-3 md:hidden">
          <span className="flex items-center gap-2 font-display text-sm font-semibold text-navy">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-navy text-gold">
              <GraduationCap className="h-3.5 w-3.5" />
            </span>
            Administration
          </span>
          <AdminMobileMenu email={user.email ?? ""} />
        </header>
        <main className="p-4 sm:p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
