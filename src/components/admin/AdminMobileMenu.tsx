"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { adminNavItems } from "@/lib/admin-nav";
import { cn } from "@/lib/utils";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminMobileMenu({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <div className="md:hidden">
      <button
        aria-label="Ouvrir le menu"
        onClick={() => setIsOpen((v) => !v)}
        className="rounded p-2 text-navy"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="fixed inset-x-0 top-[57px] z-40 max-h-[calc(100vh-57px)] overflow-y-auto border-b border-navy-100 bg-white shadow-lg">
          <nav className="flex flex-col px-3 py-3">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded px-3 py-3 text-sm text-navy-600 hover:bg-surface",
                  pathname === item.href && "bg-surface font-medium text-navy"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-navy-100 p-3">
            <p className="truncate px-3 py-1 text-xs text-navy-400">{email}</p>
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
}
