"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/validations";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "w-full rounded-xl border border-navy-200 px-4 py-3 text-sm text-navy-900 outline-none transition-colors focus:border-gold-500 focus:ring-2 focus:ring-gold-100";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-700">Nom complet *</label>
          <input {...register("full_name")} className={inputClass} placeholder="Votre nom" />
          {errors.full_name && <p className="mt-1 text-xs text-red-600">{errors.full_name.message}</p>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-700">Email *</label>
          <input {...register("email")} type="email" className={inputClass} placeholder="vous@exemple.com" />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-700">Téléphone</label>
          <input {...register("phone")} className={inputClass} placeholder="+225 ..." />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-navy-700">Sujet</label>
          <input {...register("subject")} className={inputClass} placeholder="Objet de votre message" />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-navy-700">Message *</label>
        <textarea {...register("message")} rows={5} className={inputClass} placeholder="Votre message..." />
        {errors.message && <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto">
        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        Envoyer le message
      </button>

      {status === "success" && (
        <p className="flex items-center gap-2 text-sm font-medium text-green-700">
          <CheckCircle2 className="h-4 w-4" /> Votre message a bien été envoyé. Nous vous répondrons rapidement.
        </p>
      )}
      {status === "error" && (
        <p className="flex items-center gap-2 text-sm font-medium text-red-600">
          <AlertCircle className="h-4 w-4" /> Une erreur est survenue. Veuillez réessayer ou nous contacter par WhatsApp.
        </p>
      )}
    </form>
  );
}
