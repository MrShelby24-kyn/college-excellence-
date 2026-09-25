import Link from "next/link";
import { Home, Info, ClipboardList, ArrowRight } from "lucide-react";

const pages = [
  { href: "/admin/contenu/accueil", label: "Accueil", desc: "Texte de présentation et points forts", icon: Home },
  { href: "/admin/contenu/a-propos", label: "À propos", desc: "Historique, valeurs, mot du directeur, équipes", icon: Info },
  { href: "/admin/contenu/admissions", label: "Admissions", desc: "Pièces à fournir, frais, étapes, dates", icon: ClipboardList },
];

export default function AdminContentHubPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy">Contenu des pages</h1>
      <p className="mt-1 text-sm text-navy-500">
        Modifiez les textes et photos des pages publiques, sans toucher au code.
      </p>

      <div className="mt-6 divide-y divide-navy-100 border border-navy-100 bg-white">
        {pages.map((p) => (
          <Link key={p.href} href={p.href} className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-surface">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-50 text-navy">
                <p.icon className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold text-navy">{p.label}</p>
                <p className="text-sm text-navy-500">{p.desc}</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-navy-300" />
          </Link>
        ))}
      </div>

      <p className="mt-6 text-xs text-navy-400">
        Les niveaux de classes se gèrent désormais depuis <Link href="/admin/classes" className="underline">Nos classes</Link> dans le menu.
      </p>
    </div>
  );
}
