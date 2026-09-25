import { LayoutDashboard, ClipboardList, BookOpen, Newspaper, Images, FileEdit, Settings } from "lucide-react";

export const adminNavItems = [
  { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/admin/demandes", label: "Préinscriptions", icon: ClipboardList },
  { href: "/admin/classes", label: "Nos classes", icon: BookOpen },
  { href: "/admin/actualites", label: "Actualités", icon: Newspaper },
  { href: "/admin/galerie", label: "Galerie", icon: Images },
  { href: "/admin/contenu", label: "Contenu des pages", icon: FileEdit },
  { href: "/admin/parametres", label: "Réglages", icon: Settings },
];
