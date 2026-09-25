import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ClipboardCheck, CalendarDays, ArrowRight, Wallet } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { getPageContent } from "@/lib/data/content";
import { admissionsContentDefaults } from "@/lib/content-defaults";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Conditions d'admission, pièces à fournir et étapes d'inscription.",
};

export default async function AdmissionsPage() {
  const content = await getPageContent("admissions", admissionsContentDefaults);

  return (
    <>
      <PageHeader
        kicker="Admissions"
        title="Rejoindre notre établissement"
        description="Toutes les informations pour préparer sereinement le dossier d'admission de votre enfant."
      />

      <section className="section-padding">
        <div className="container-site grid gap-10 lg:grid-cols-3">
          <div className="rounded-2xl border border-navy-100 p-6">
            <FileText className="h-7 w-7 text-gold-500" />
            <h3 className="mt-4 font-display text-lg font-bold text-navy">Pièces à fournir</h3>
            <ul className="mt-3 space-y-2 text-sm text-navy-600">
              {content.requiredDocuments.map((d) => (
                <li key={d} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-navy-100 p-6">
            <Wallet className="h-7 w-7 text-gold-500" />
            <h3 className="mt-4 font-display text-lg font-bold text-navy">Frais</h3>
            <p className="mt-3 text-sm text-navy-600">
              {content.feesText}{" "}
              <Link href="/classes" className="font-semibold text-gold-600 underline underline-offset-2">
                Voir les frais par niveau
              </Link>
            </p>
          </div>

          <div className="rounded-2xl border border-navy-100 p-6">
            <CalendarDays className="h-7 w-7 text-gold-500" />
            <h3 className="mt-4 font-display text-lg font-bold text-navy">Dates importantes</h3>
            <ul className="mt-3 space-y-2 text-sm text-navy-600">
              {content.importantDates.map((d) => (
                <li key={d.label} className="flex items-center justify-between border-b border-navy-50 pb-2">
                  <span>{d.label}</span>
                  <span className="font-semibold text-navy">{d.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="container-site">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-kicker">Comment ça marche</span>
            <h2 className="section-title">Les étapes de l&apos;inscription</h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {content.steps.map((s, i) => (
              <div key={s.title} className="relative rounded-2xl bg-white p-6 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy font-display font-bold text-gold">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-navy-500">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link href="/preinscription" className="btn-primary">
              <ClipboardCheck className="h-4 w-4" /> Faire une préinscription <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
