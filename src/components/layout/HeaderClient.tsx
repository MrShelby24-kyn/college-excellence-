"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/classes", label: "Nos classes" },
  { href: "/admissions", label: "Admissions" },
  { href: "/actualites", label: "Actualités" },
  { href: "/galerie", label: "Galerie" },
  { href: "/contact", label: "Contact" },
];

export default function HeaderClient({ name, logoUrl }: { name: string; logoUrl?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        scrolled ? "border-navy-100 bg-white/95 shadow-sm backdrop-blur" : "border-transparent bg-white"
      )}
    >
      <div className="container-site flex h-16 items-center justify-between md:h-20">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold text-navy">
          {logoUrl ? (
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
              <Image src={logoUrl} alt={name} fill className="object-contain" />
            </span>
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy text-gold">
              <GraduationCap className="h-6 w-6" />
            </span>
          )}
          <span className="hidden sm:inline">{name}</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-navy-700 transition-colors hover:text-gold-600",
                pathname === link.href && "text-gold-600"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/preinscription" className="btn-primary text-sm">
            Préinscription
          </Link>
        </div>

        <button
          aria-label="Ouvrir le menu"
          className="rounded-lg p-2 text-navy lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-navy-100 bg-white lg:hidden animate-fade-in">
          <nav className="container-site flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-3 text-base font-medium text-navy-700 transition-colors hover:bg-surface",
                  pathname === link.href && "bg-surface text-gold-600"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/preinscription" className="btn-primary mt-2 w-full">
              Préinscription
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
