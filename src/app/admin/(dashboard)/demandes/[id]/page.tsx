import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileDown } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/utils";
import ApplicationStatusSelect from "@/components/admin/ApplicationStatusSelect";
import type { ApplicationStatus, DocumentType } from "@/types/database";

export const dynamic = "force-dynamic";

const documentLabels: Record<DocumentType, string> = {
  extrait_naissance: "Extrait de naissance",
  bulletin_scolaire: "Bulletin scolaire",
  photo_identite: "Photo d'identité",
  certificat_scolarite: "Certificat de scolarité",
  autre: "Autre document",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminApplicationDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: application } = await supabase
    .from("applications")
    .select("*, students(*), parents(*), application_documents(*)")
    .eq("id", id)
    .single();

  if (!application) notFound();

  const documents = application.application_documents ?? [];
  const documentsWithUrls = await Promise.all(
    documents.map(async (doc: any) => {
      const { data } = await supabase.storage
        .from("application-documents")
        .createSignedUrl(doc.file_path, 60 * 10);
      return { ...doc, url: data?.signedUrl };
    })
  );

  return (
    <div className="max-w-3xl">
      <Link href="/admin/demandes" className="inline-flex items-center gap-1.5 text-sm text-navy-500 hover:text-navy">
        <ArrowLeft className="h-4 w-4" /> Retour aux demandes
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold text-navy">{application.reference_number}</h1>
        <ApplicationStatusSelect applicationId={application.id} current={application.status as ApplicationStatus} />
      </div>
      <p className="mt-1 text-sm text-navy-500">Reçue le {formatDate(application.created_at)}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <section className="border border-navy-100 bg-white p-5">
          <h2 className="font-display text-base font-semibold text-navy">Élève</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Nom" value={application.students.last_name} />
            <Row label="Prénoms" value={application.students.first_names} />
            <Row label="Date de naissance" value={formatDate(application.students.birth_date)} />
            <Row label="Lieu de naissance" value={application.students.birth_place} />
            <Row label="Sexe" value={application.students.gender === "M" ? "Masculin" : "Féminin"} />
            <Row label="Classe demandée" value={application.students.requested_class} />
            <Row label="Établissement précédent" value={application.students.previous_school || "—"} />
          </dl>
        </section>

        <section className="border border-navy-100 bg-white p-5">
          <h2 className="font-display text-base font-semibold text-navy">Parent / Responsable</h2>
          <dl className="mt-3 space-y-2 text-sm">
            <Row label="Nom" value={application.parents.full_name} />
            <Row label="Lien avec l'élève" value={application.parents.relationship} />
            <Row label="Téléphone" value={application.parents.phone} />
            <Row label="WhatsApp" value={application.parents.whatsapp || "—"} />
            <Row label="Email" value={application.parents.email || "—"} />
            <Row label="Adresse" value={application.parents.address || "—"} />
          </dl>
        </section>
      </div>

      <section className="mt-6 border border-navy-100 bg-white p-5">
        <h2 className="font-display text-base font-semibold text-navy">Documents joints</h2>
        {documentsWithUrls.length === 0 ? (
          <p className="mt-3 text-sm text-navy-400">Aucun document joint.</p>
        ) : (
          <ul className="mt-3 divide-y divide-navy-50">
            {documentsWithUrls.map((doc) => (
              <li key={doc.id} className="flex items-center justify-between py-2.5 text-sm">
                <span>
                  <span className="font-medium text-navy">{documentLabels[doc.type as DocumentType]}</span>
                  <span className="ml-2 text-navy-400">{doc.file_name}</span>
                </span>
                {doc.url && (
                  <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-gold-700 hover:text-gold-800">
                    <FileDown className="h-4 w-4" /> Télécharger
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-navy-50 pb-2">
      <dt className="text-navy-500">{label}</dt>
      <dd className="text-right font-medium text-navy">{value}</dd>
    </div>
  );
}
