import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PlayCircle } from "lucide-react";
import { schoolConfig } from "@/config/school";
import { getSiteSettings } from "@/lib/data/settings";
import { getPageContent } from "@/lib/data/content";
import { homeContentDefaults } from "@/lib/content-defaults";

export default async function Hero() {
  const [settings, content] = await Promise.all([
    getSiteSettings(),
    getPageContent("home", homeContentDefaults),
  ]);

  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 opacity-20">
        <Image
          src={content.heroImageUrl}
          alt="Élèves du collège"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy/90 to-navy" />

      <div className="container-site relative section-padding grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="animate-fade-up">
          <span className="section-kicker text-gold-300">{schoolConfig.city}, {schoolConfig.country}</span>
          <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">
            {settings.name}
          </h1>
          <p className="mt-4 text-lg font-medium text-gold-200">{settings.slogan}</p>
          <p className="mt-5 max-w-xl text-navy-100">{settings.description}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/preinscription" className="btn-primary">
              Préinscrire mon enfant <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/a-propos" className="btn-secondary">
              <PlayCircle className="h-4 w-4" /> Découvrir notre établissement
            </Link>
          </div>
        </div>

        <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-4 ring-white/10 lg:block animate-fade-in">
          <Image
            src={content.heroImageUrl}
            alt="Bâtiment principal du collège"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
