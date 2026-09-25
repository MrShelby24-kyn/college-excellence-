import Link from "next/link";
import { GraduationCap, MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import { schoolConfig } from "@/config/school";
import { getSiteSettings } from "@/lib/data/settings";

export default async function Footer() {
  const settings = await getSiteSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-900 text-navy-100">
      <div className="container-site grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-2 font-display text-lg font-bold text-white sm:items-start">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold text-navy-900">
            <GraduationCap className="h-5 w-5" />
          </span>
          {schoolConfig.shortName}
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-gold-300">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-navy-200">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              {settings.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold-400" />
              {settings.phone}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold-400" />
              {settings.email}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-gold-300">
            Suivez-nous
          </h3>
          <div className="flex gap-3">
            {schoolConfig.social.facebook && (
              <a
                href={schoolConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 transition-colors hover:bg-gold hover:text-navy-900"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
            )}
            {schoolConfig.social.instagram && (
              <a
                href={schoolConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-800 transition-colors hover:bg-gold hover:text-navy-900"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-navy-800 py-5">
        <p className="container-site flex flex-col items-center justify-center gap-1 text-center text-xs text-navy-400 sm:flex-row sm:gap-3">
          <span>© {year} {settings.name}. Tous droits réservés.</span>
          <span className="hidden sm:inline">·</span>
          <Link href="/admin/login" className="text-navy-500 hover:text-navy-300">
            Espace administration
          </Link>
        </p>
      </div>
    </footer>
  );
}
