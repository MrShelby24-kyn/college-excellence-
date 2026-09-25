import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { getClassLevels } from "@/lib/data/classLevels";
import Reveal from "@/components/sections/Reveal";

export default async function LevelsPreview() {
  const levels = await getClassLevels();

  return (
    <section className="section-padding">
      <Reveal>
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <span className="section-kicker">Nos niveaux</span>
          <h2 className="section-title">De la 6ème à la 3ème</h2>
          <p className="mt-3 text-navy-600">
            Un parcours structuré et progressif pour préparer chaque élève au Brevet d&apos;Études du
            Premier Cycle et à la suite de sa scolarité.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {levels.map((level) => (
            <Link
              key={level.slug}
              href={`/classes#${level.slug}`}
              className="group rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy transition-colors group-hover:bg-navy group-hover:text-gold">
                <BookOpen className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">{level.name}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-navy-500">{level.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold-600">
                En savoir plus <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  );
}
