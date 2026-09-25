export type ApplicationStatus = "nouvelle" | "en_cours" | "acceptee" | "refusee";
export type Gender = "M" | "F";
export type DocumentType =
  | "extrait_naissance"
  | "bulletin_scolaire"
  | "photo_identite"
  | "certificat_scolarite"
  | "autre";

export interface Student {
  id: string;
  last_name: string;
  first_names: string;
  birth_date: string;
  birth_place: string;
  gender: Gender;
  requested_class: string;
  previous_school: string | null;
  created_at: string;
}

export interface Parent {
  id: string;
  full_name: string;
  relationship: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  created_at: string;
}

export interface ApplicationDocument {
  id: string;
  application_id: string;
  type: DocumentType;
  file_path: string;
  file_name: string;
  file_size_bytes: number;
  uploaded_at: string;
}

export interface Application {
  id: string;
  reference_number: string;
  student_id: string;
  parent_id: string;
  status: ApplicationStatus;
  notes: string | null;
  created_at: string;
  updated_at: string;
  student?: Student;
  parent?: Parent;
  documents?: ApplicationDocument[];
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  cover_image_url: string | null;
  published: boolean;
  published_at: string;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string | null;
  category: string;
  image_path: string;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

export interface ClassLevel {
  id: string;
  slug: string;
  name: string;
  cycle: "college" | "lycee";
  description: string;
  main_subjects: string[];
  objectives: string[];
  admission_conditions: string[];
  annual_fee_fcfa: number | null;
  sort_order: number;
  created_at: string;
}
