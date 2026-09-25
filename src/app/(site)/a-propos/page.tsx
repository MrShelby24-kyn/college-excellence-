import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, HeartHandshake, Users2 } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { schoolConfig } from "@/config/school";
import { getPageContent } from "@/lib/data/content";
import { aboutContentDefaults } from "@/lib/content-defaults";

export const metadata: Metadata = {
  title: "À propos",
  description: `Historique, vision, mission et équipes du ${schoolConfig.name}.`,
};

const valueIcons = [Target, Eye, HeartHandshake, Users2];

export default async function AboutPage() {
  const content = await getPageContent("about", aboutContentDefaults);

  return (
    <>
      <PageHeader
        kicker="À propos"
        title={`Découvrir ${schoolConfig.shortName}`}
        description="Notre histoire, nos valeurs et les équipes qui accompagnent vos enfants au quotidien."
      />

      {/* Historique */}
      <section className="section-padding">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-kicker">Notre histoire</span>
            <h2 className="section-title">Depuis {schoolConfig.foundedYear}</h2>
            <p className="mt-4 whitespace-pre-line text-navy-600">{content.historyText}</p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
            <Image src={content.historyImageUrl} alt={schoolConfig.name} fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="section-padding bg-surface">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <Eye className="h-8 w-8 text-gold-500" />
            <h3 className="mt-4 font-display text-xl font-bold text-navy">Notre vision</h3>
            <p className="mt-2 text-navy-600">{content.visionText}</p>
          </div>
          <div className="rounded-2xl bg-white p-8 shadow-sm">
            <Target className="h-8 w-8 text-gold-500" />
            <h3 className="mt-4 font-display text-xl font-bold text-navy">Notre mission</h3>
            <p className="mt-2 text-navy-600">{content.missionText}</p>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="section-padding">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-kicker">Nos valeurs</span>
            <h2 className="section-title">Ce qui nous anime</h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {content.values.map((v, i) => {
              const Icon = valueIcons[i % valueIcons.length];
              return (
                <div key={v.title} className="rounded-2xl border border-navy-100 p-6 text-center">
                  <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50 text-navy">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-display font-bold text-navy">{v.title}</h3>
                  <p className="mt-2 text-sm text-navy-500">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mot du directeur */}
      <section className="section-padding bg-navy text-white">
        <div className="container-site grid gap-10 lg:grid-cols-[280px_1fr] lg:items-center">
          <div className="relative mx-auto aspect-square w-48 overflow-hidden rounded-full ring-4 ring-gold/40 lg:w-full">
            <Image src={content.directorPhotoUrl} alt="Directeur de l'établissement" fill className="object-cover" />
          </div>
          <div>
            <span className="section-kicker text-gold-300">Mot du directeur</span>
            <p className="mt-2 text-lg italic leading-relaxed text-navy-100">
              &laquo; {content.directorQuote} &raquo;
            </p>
            <p className="mt-4 font-semibold text-gold-300">{content.directorName}</p>
            <p className="text-sm text-navy-300">{content.directorRole}</p>
          </div>
        </div>
      </section>

      {/* Équipes */}
      <section className="section-padding">
        <div className="container-site grid gap-12 md:grid-cols-2">
          <div>
            <span className="section-kicker">Équipe administrative</span>
            <h2 className="mb-6 font-display text-2xl font-bold text-navy">Direction</h2>
            <ul className="space-y-4">
              {content.administration.map((m) => (
                <li key={m.name} className="flex items-center gap-3 rounded-xl border border-navy-100 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-50 font-display font-bold text-navy">
                    {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </span>
                  <div>
                    <p className="font-semibold text-navy">{m.name}</p>
                    <p className="text-sm text-navy-500">{m.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="section-kicker">Équipe pédagogique</span>
            <h2 className="mb-6 font-display text-2xl font-bold text-navy">Nos enseignants</h2>
            <ul className="space-y-4">
              {content.pedagogicalTeam.map((m) => (
                <li key={m.name} className="flex items-center gap-3 rounded-xl border border-navy-100 p-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-50 font-display font-bold text-gold-700">
                    {m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </span>
                  <div>
                    <p className="font-semibold text-navy">{m.name}</p>
                    <p className="text-sm text-navy-500">{m.role}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
