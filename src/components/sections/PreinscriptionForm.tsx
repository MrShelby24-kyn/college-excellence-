"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, AlertCircle, ArrowRight, ArrowLeft, CheckCircle2, Copy, Upload } from "lucide-react";
import { studentSchema, parentSchema } from "@/lib/validations";
import { schoolConfig } from "@/config/school";
import StepProgress from "@/components/sections/StepProgress";
import type { ClassLevel } from "@/types/database";

// Schéma combiné explicite (élève + parent, sur les mêmes noms de champs
// que ceux envoyés à l'API de soumission).
const formSchema = z.object({
  last_name: studentSchema.shape.last_name,
  first_names: studentSchema.shape.first_names,
  birth_date: studentSchema.shape.birth_date,
  birth_place: studentSchema.shape.birth_place,
  gender: studentSchema.shape.gender,
  requested_class: studentSchema.shape.requested_class,
  previous_school: studentSchema.shape.previous_school,
  parent_full_name: parentSchema.shape.full_name,
  relationship: parentSchema.shape.relationship,
  phone: parentSchema.shape.phone,
  whatsapp: parentSchema.shape.whatsapp,
  email: parentSchema.shape.email,
  address: parentSchema.shape.address,
});

type FormValues = z.infer<typeof formSchema>;

const studentFields: (keyof FormValues)[] = [
  "last_name", "first_names", "birth_date", "birth_place", "gender", "requested_class", "previous_school",
];
const parentFields: (keyof FormValues)[] = [
  "parent_full_name", "relationship", "phone", "whatsapp", "email", "address",
];

const documentTypes = [
  { key: "extrait_naissance", label: "Extrait de naissance" },
  { key: "bulletin_scolaire", label: "Bulletin scolaire" },
  { key: "photo_identite", label: "Photo d'identité" },
  { key: "certificat_scolarite", label: "Certificat de scolarité" },
  { key: "autre", label: "Autre document" },
] as const;

const inputClass =
  "w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-100";
const labelClass = "mb-1 block text-sm font-medium text-navy-700";

export default function PreinscriptionForm({ classLevels }: { classLevels: ClassLevel[] }) {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<Record<string, File | null>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);

  const {
    register,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { requested_class: searchParams.get("classe") ?? "" },
  });

  async function goNext() {
    const fieldsToValidate = step === 1 ? studentFields : step === 2 ? parentFields : [];
    const valid = fieldsToValidate.length === 0 || (await trigger(fieldsToValidate));
    if (valid) setStep((s) => Math.min(s + 1, 4));
  }
  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function onSubmit() {
    setSubmitting(true);
    setError(null);

    const values = getValues();
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => formData.append(key, value ?? ""));
    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append(`document_${key}`, file);
    });

    try {
      const res = await fetch("/api/preinscription", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Une erreur est survenue. Veuillez réessayer.");
        setSubmitting(false);
        return;
      }
      setReferenceNumber(data.referenceNumber);
    } catch {
      setError("Une erreur est survenue. Vérifiez votre connexion et réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  if (referenceNumber) {
    return (
      <div className="rounded-2xl border border-navy-100 bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
        <h2 className="mt-4 font-display text-xl font-bold text-navy">Demande enregistrée avec succès</h2>
        <p className="mt-2 text-navy-600">
          Votre demande de préinscription a bien été enregistrée. Numéro de dossier :
        </p>
        <div className="mx-auto mt-4 flex w-fit items-center gap-2 rounded-xl bg-navy-50 px-5 py-3">
          <span className="font-display text-lg font-bold text-navy">{referenceNumber}</span>
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(referenceNumber)}
            className="text-navy-400 hover:text-navy"
            aria-label="Copier le numéro de dossier"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-6 text-sm text-navy-500">
          Conservez ce numéro : il vous sera utile pour tout échange avec l&apos;administration. Notre équipe
          étudiera votre dossier et vous contactera sous 3 à 5 jours ouvrés au {schoolConfig.phone}.
        </p>
      </div>
    );
  }

  const values = getValues();

  return (
    <div>
      <StepProgress current={step} />

      {step === 1 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-navy">Informations sur l&apos;élève</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Nom *</label>
              <input {...register("last_name")} className={inputClass} />
              {errors.last_name && <ErrorText msg={errors.last_name.message} />}
            </div>
            <div>
              <label className={labelClass}>Prénoms *</label>
              <input {...register("first_names")} className={inputClass} />
              {errors.first_names && <ErrorText msg={errors.first_names.message} />}
            </div>
            <div>
              <label className={labelClass}>Date de naissance *</label>
              <input type="date" {...register("birth_date")} className={inputClass} />
              {errors.birth_date && <ErrorText msg={errors.birth_date.message} />}
            </div>
            <div>
              <label className={labelClass}>Lieu de naissance *</label>
              <input {...register("birth_place")} className={inputClass} />
              {errors.birth_place && <ErrorText msg={errors.birth_place.message} />}
            </div>
            <div>
              <label className={labelClass}>Sexe *</label>
              <select {...register("gender")} className={inputClass}>
                <option value="">Sélectionner</option>
                <option value="M">Masculin</option>
                <option value="F">Féminin</option>
              </select>
              {errors.gender && <ErrorText msg={errors.gender.message} />}
            </div>
            <div>
              <label className={labelClass}>Classe demandée *</label>
              <select {...register("requested_class")} className={inputClass}>
                <option value="">Sélectionner</option>
                {classLevels.map((lvl) => (
                  <option key={lvl.slug} value={lvl.name}>{lvl.name}</option>
                ))}
              </select>
              {errors.requested_class && <ErrorText msg={errors.requested_class.message} />}
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Établissement précédent</label>
              <input {...register("previous_school")} className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-navy">Parent / Responsable</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Nom et prénom *</label>
              <input {...register("parent_full_name")} className={inputClass} />
              {errors.parent_full_name && <ErrorText msg={errors.parent_full_name.message} />}
            </div>
            <div>
              <label className={labelClass}>Lien avec l&apos;élève *</label>
              <input {...register("relationship")} className={inputClass} placeholder="Père, mère, tuteur..." />
              {errors.relationship && <ErrorText msg={errors.relationship.message} />}
            </div>
            <div>
              <label className={labelClass}>Téléphone *</label>
              <input {...register("phone")} className={inputClass} />
              {errors.phone && <ErrorText msg={errors.phone.message} />}
            </div>
            <div>
              <label className={labelClass}>WhatsApp</label>
              <input {...register("whatsapp")} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input {...register("email")} className={inputClass} />
              {errors.email && <ErrorText msg={errors.email.message} />}
            </div>
            <div>
              <label className={labelClass}>Adresse</label>
              <input {...register("address")} className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold text-navy">Documents (facultatif)</h2>
          <p className="text-sm text-navy-500">
            Vous pouvez joindre ces documents maintenant ou les apporter lors de l&apos;entretien. Formats acceptés : JPEG, PNG, PDF — 6 Mo maximum.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {documentTypes.map((doc) => (
              <div key={doc.key}>
                <label className={labelClass}>{doc.label}</label>
                <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-navy-200 px-4 py-3 text-sm text-navy-500 hover:border-gold-400">
                  <Upload className="h-4 w-4 shrink-0" />
                  <span className="truncate">{files[doc.key]?.name || "Choisir un fichier"}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,application/pdf"
                    className="hidden"
                    onChange={(e) => setFiles((f) => ({ ...f, [doc.key]: e.target.files?.[0] ?? null }))}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-6">
          <h2 className="font-display text-xl font-bold text-navy">Récapitulatif</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-navy-100 p-4">
              <h3 className="mb-2 text-sm font-semibold text-navy-700">Élève</h3>
              <SummaryRow label="Nom" value={`${values.last_name} ${values.first_names}`} />
              <SummaryRow label="Naissance" value={`${values.birth_date} à ${values.birth_place}`} />
              <SummaryRow label="Classe demandée" value={values.requested_class} />
            </div>
            <div className="rounded-xl border border-navy-100 p-4">
              <h3 className="mb-2 text-sm font-semibold text-navy-700">Parent</h3>
              <SummaryRow label="Nom" value={values.parent_full_name} />
              <SummaryRow label="Téléphone" value={values.phone} />
              <SummaryRow label="Email" value={values.email || "—"} />
            </div>
          </div>
          <div className="rounded-xl border border-navy-100 p-4">
            <h3 className="mb-2 text-sm font-semibold text-navy-700">Documents joints</h3>
            <p className="text-sm text-navy-500">
              {Object.values(files).filter(Boolean).length} document(s) sélectionné(s)
            </p>
          </div>
          {error && (
            <p className="flex items-center gap-2 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" /> {error}
            </p>
          )}
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        {step > 1 ? (
          <button type="button" onClick={goBack} className="btn-outline-navy text-sm">
            <ArrowLeft className="h-4 w-4" /> Précédent
          </button>
        ) : <span />}

        {step < 4 ? (
          <button type="button" onClick={goNext} className="btn-primary text-sm">
            Suivant <ArrowRight className="h-4 w-4" />
          </button>
        ) : (
          <button type="button" onClick={onSubmit} disabled={submitting} className="btn-primary text-sm">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Envoyer la demande
          </button>
        )}
      </div>
    </div>
  );
}

function ErrorText({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-600">{msg}</p>;
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex justify-between border-b border-navy-50 py-1.5 text-sm last:border-0">
      <span className="text-navy-500">{label}</span>
      <span className="font-medium text-navy">{value || "—"}</span>
    </div>
  );
}
