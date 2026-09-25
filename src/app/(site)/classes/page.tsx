import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ListChecks, FileCheck2, ArrowRight, GraduationCap } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { getClassLevels } from "@/lib/data/classLevels";
import { formatFCFA } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nos classes",
  description: "Découvrez les niveaux proposés, les matières principales et les conditions d'admission.",
};

export default async function ClassesPage() {
  const levels = await getClassLevels();

  return (
    <>
      <PageHeader
        kicker="Nos formations"
        title="Nos classes"
        description="De la 6ème à la 3ème, un parcours structuré pour mener chaque élève à la réussite du BEPC."
      />

      <section className="section-padding">
        <div className="container-site space-y-16">
          {levels.map((level) => (
            <div
              key={level.slug}
              id={level.slug}
              className="scroll-mt-24 grid gap-8 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm md:grid-cols-[auto_1fr] md:p-10"
            >
              <div className="flex items-start">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-navy text-gold">
                  <GraduationCap className="h-7 w-7" />
                </span>
              </div>

              <div>
                <h2 className="font-display text-2xl font-bold text-navy">{level.name}</h2>
                <p className="mt-2 text-navy-600">{level.description}</p>

                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-700">
                      <ListChecks className="h-4 w-4 text-gold-500" /> Matières principales
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm text-navy-500">
                      {level.main_subjects.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-700">
                      <CheckCircle2 className="h-4 w-4 text-gold-500" /> Objectifs
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm text-navy-500">
                      {level.objectives.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-navy-700">
                      <FileCheck2 className="h-4 w-4 text-gold-500" /> Admission
                    </h3>
                    <ul className="mt-2 space-y-1 text-sm text-navy-500">
                      {level.admission_conditions.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-navy-100 pt-6">
                  {level.annual_fee_fcfa && (
                    <p className="text-sm text-navy-600">
                      Frais de scolarité annuels :{" "}
                      <span className="font-semibold text-navy">{formatFCFA(level.annual_fee_fcfa)}</span>
                    </p>
                  )}
                  <Link
                    href={`/preinscription?classe=${level.slug}`}
                    className="btn-outline-navy text-sm"
                  >
                    Préinscrire en {level.name} <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
