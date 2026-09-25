import { z } from "zod";

export const contactSchema = z.object({
  full_name: z.string().min(2, "Le nom doit contenir au moins 2 caractères").max(120),
  email: z.string().email("Adresse email invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide").max(20).optional().or(z.literal("")),
  subject: z.string().max(150).optional().or(z.literal("")),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères").max(2000),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const studentSchema = z.object({
  last_name: z.string().min(2, "Le nom est requis").max(80),
  first_names: z.string().min(2, "Les prénoms sont requis").max(120),
  birth_date: z.string().min(1, "La date de naissance est requise"),
  birth_place: z.string().min(2, "Le lieu de naissance est requis").max(120),
  gender: z.enum(["M", "F"], { errorMap: () => ({ message: "Sélectionnez le sexe de l'élève" }) }),
  requested_class: z.string().min(1, "Sélectionnez une classe"),
  previous_school: z.string().max(150).optional().or(z.literal("")),
});

export const parentSchema = z.object({
  full_name: z.string().min(2, "Le nom du parent est requis").max(120),
  relationship: z.string().min(2, "Précisez le lien avec l'élève").max(60),
  phone: z.string().min(8, "Numéro de téléphone invalide").max(20),
  whatsapp: z.string().max(20).optional().or(z.literal("")),
  email: z.string().email("Adresse email invalide").optional().or(z.literal("")),
  address: z.string().max(200).optional().or(z.literal("")),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
export type ParentFormValues = z.infer<typeof parentSchema>;

