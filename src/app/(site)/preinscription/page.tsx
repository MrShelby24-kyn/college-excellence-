import type { Metadata } from "next";
import { Suspense } from "react";
import PageHeader from "@/components/layout/PageHeader";
import PreinscriptionForm from "@/components/sections/PreinscriptionForm";
import { getClassLevels } from "@/lib/data/classLevels";

export const metadata: Metadata = {
  title: "Préinscription en ligne",
  description: "Faites la préinscription de votre enfant en quelques minutes, directement en ligne.",
};

export default async function PreinscriptionPage() {
  const classLevels = await getClassLevels();

  return (
    <>
      <PageHeader
        kicker="Préinscription"
        title="Préinscrire mon enfant"
        description="Remplissez ce formulaire en quelques minutes. Vous recevrez un numéro de dossier à la fin."
      />
      <section className="section-padding">
        <div className="container-site max-w-3xl">
          <Suspense fallback={null}>
            <PreinscriptionForm classLevels={classLevels} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
