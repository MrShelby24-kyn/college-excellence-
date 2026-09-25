-- ============================================================
-- SCHÉMA SUPABASE — Site vitrine établissement scolaire
-- À exécuter dans l'éditeur SQL de votre projet Supabase
-- ============================================================

create extension if not exists "pgcrypto";

-- ---------- ENUMS ----------
-- CREATE TYPE ne supporte pas IF NOT EXISTS : on protège chaque création
-- avec un bloc DO pour pouvoir rejouer ce script sans erreur.
do $$ begin
  create type application_status as enum ('nouvelle', 'en_cours', 'acceptee', 'refusee');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type gender as enum ('M', 'F');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type document_type as enum ('extrait_naissance', 'bulletin_scolaire', 'photo_identite', 'certificat_scolarite', 'autre');
exception when duplicate_object then null;
end $$;

-- ---------- school_settings ----------
-- Table à ligne unique reflétant config/school.ts, éditable depuis /admin/parametres
-- sans redéploiement. Les pages publiques lisent cette table en priorité et
-- retombent sur config/school.ts si elle est vide.
create table if not exists school_settings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slogan text,
  description text,
  phone text,
  whatsapp text,
  email text,
  address text,
  logo_url text,
  stats_students integer,
  stats_teachers integer,
  stats_years_experience integer,
  stats_success_rate integer,
  gps_lat double precision,
  gps_lng double precision,
  updated_at timestamptz not null default now()
);

-- Si la table existait déjà (installation précédente), on ajoute les
-- colonnes manquantes sans erreur.
alter table school_settings add column if not exists gps_lat double precision;
alter table school_settings add column if not exists gps_lng double precision;
alter table school_settings add column if not exists logo_url text;

-- ---------- class_levels ----------
-- Niveaux de classes proposés par l'établissement, gérés depuis /admin/classes.
create table if not exists class_levels (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  cycle text not null default 'college' check (cycle in ('college', 'lycee')),
  description text not null default '',
  main_subjects text[] not null default '{}',
  objectives text[] not null default '{}',
  admission_conditions text[] not null default '{}',
  annual_fee_fcfa integer,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ---------- page_content ----------
-- Contenu éditable des pages (textes longs, photos) qui n'ont pas leur
-- propre table dédiée. Une ligne par page, données stockées en JSON.
-- Éditable depuis /admin/contenu.
create table if not exists page_content (
  page_key text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ---------- admin_users ----------
-- Profils liés à auth.users pour les comptes administrateurs.
create table if not exists admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamptz not null default now()
);

-- ---------- students ----------
create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  last_name text not null,
  first_names text not null,
  birth_date date not null,
  birth_place text not null,
  gender gender not null,
  requested_class text not null,
  previous_school text,
  created_at timestamptz not null default now()
);

-- ---------- parents ----------
create table if not exists parents (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  relationship text not null, -- père, mère, tuteur...
  phone text not null,
  whatsapp text,
  email text,
  address text,
  created_at timestamptz not null default now()
);

-- ---------- applications (préinscriptions) ----------
create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  reference_number text not null unique, -- ex: PRE-2026-00452
  student_id uuid not null references students(id) on delete cascade,
  parent_id uuid not null references parents(id) on delete cascade,
  status application_status not null default 'nouvelle',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_applications_status on applications(status);
create index if not exists idx_applications_created_at on applications(created_at desc);

-- ---------- application_documents ----------
create table if not exists application_documents (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications(id) on delete cascade,
  type document_type not null,
  file_path text not null, -- chemin dans le bucket Supabase Storage
  file_name text not null,
  file_size_bytes integer not null,
  uploaded_at timestamptz not null default now()
);

-- ---------- application_status_history ----------
create table if not exists application_status_history (
  id uuid primary key default gen_random_uuid(),
  application_id uuid not null references applications(id) on delete cascade,
  old_status application_status,
  new_status application_status not null,
  changed_by uuid references admin_users(id),
  changed_at timestamptz not null default now()
);

-- ---------- news (actualités) ----------
create table if not exists news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  category text not null default 'Général',
  cover_image_url text,
  published boolean not null default true,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- ---------- gallery ----------
create table if not exists gallery (
  id uuid primary key default gen_random_uuid(),
  title text,
  category text not null default 'Établissement', -- Établissement, Classes, Activités, Événements
  image_path text not null, -- chemin Supabase Storage
  created_at timestamptz not null default now()
);

-- ---------- contact_messages ----------
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table students enable row level security;
alter table parents enable row level security;
alter table applications enable row level security;
alter table application_documents enable row level security;
alter table application_status_history enable row level security;
alter table news enable row level security;
alter table gallery enable row level security;
alter table contact_messages enable row level security;
alter table school_settings enable row level security;
alter table admin_users enable row level security;
alter table page_content enable row level security;
alter table class_levels enable row level security;

-- Lecture publique du contenu vitrine
drop policy if exists "news_public_read" on news;
create policy "news_public_read"
  on news for select using (published = true);
drop policy if exists "gallery_public_read" on gallery;
create policy "gallery_public_read"
  on gallery for select using (true);
drop policy if exists "school_settings_public_read" on school_settings;
create policy "school_settings_public_read"
  on school_settings for select using (true);
drop policy if exists "page_content_public_read" on page_content;
create policy "page_content_public_read"
  on page_content for select using (true);
drop policy if exists "class_levels_public_read" on class_levels;
create policy "class_levels_public_read"
  on class_levels for select using (true);

-- Écriture publique (anonyme) UNIQUEMENT pour créer une préinscription
-- (le formulaire public utilise la clé anon ; aucune lecture n'est autorisée ensuite)
drop policy if exists "students_public_insert" on students;
create policy "students_public_insert"
  on students for insert with check (true);
drop policy if exists "parents_public_insert" on parents;
create policy "parents_public_insert"
  on parents for insert with check (true);
drop policy if exists "applications_public_insert" on applications;
create policy "applications_public_insert"
  on applications for insert with check (true);
drop policy if exists "documents_public_insert" on application_documents;
create policy "documents_public_insert"
  on application_documents for insert with check (true);
drop policy if exists "contact_messages_public_insert" on contact_messages;
create policy "contact_messages_public_insert"
  on contact_messages for insert with check (true);

-- Un admin authentifié a accès complet aux données sensibles
drop policy if exists "admin_full_access_students" on students;
create policy "admin_full_access_students"
  on students for all
  using (exists (select 1 from admin_users where id = auth.uid()))
  with check (exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "admin_full_access_parents" on parents;
create policy "admin_full_access_parents"
  on parents for all
  using (exists (select 1 from admin_users where id = auth.uid()))
  with check (exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "admin_full_access_applications" on applications;
create policy "admin_full_access_applications"
  on applications for all
  using (exists (select 1 from admin_users where id = auth.uid()))
  with check (exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "admin_full_access_documents" on application_documents;
create policy "admin_full_access_documents"
  on application_documents for all
  using (exists (select 1 from admin_users where id = auth.uid()))
  with check (exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "admin_full_access_history" on application_status_history;
create policy "admin_full_access_history"
  on application_status_history for all
  using (exists (select 1 from admin_users where id = auth.uid()))
  with check (exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "admin_full_access_news" on news;
create policy "admin_full_access_news"
  on news for all
  using (exists (select 1 from admin_users where id = auth.uid()))
  with check (exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "admin_full_access_gallery" on gallery;
create policy "admin_full_access_gallery"
  on gallery for all
  using (exists (select 1 from admin_users where id = auth.uid()))
  with check (exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "admin_full_access_contact" on contact_messages;
create policy "admin_full_access_contact"
  on contact_messages for all
  using (exists (select 1 from admin_users where id = auth.uid()))
  with check (exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "admin_full_access_settings" on school_settings;
create policy "admin_full_access_settings"
  on school_settings for all
  using (exists (select 1 from admin_users where id = auth.uid()))
  with check (exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "admin_full_access_page_content" on page_content;
create policy "admin_full_access_page_content"
  on page_content for all
  using (exists (select 1 from admin_users where id = auth.uid()))
  with check (exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "admin_full_access_class_levels" on class_levels;
create policy "admin_full_access_class_levels"
  on class_levels for all
  using (exists (select 1 from admin_users where id = auth.uid()))
  with check (exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "admin_self_read" on admin_users;
create policy "admin_self_read"
  on admin_users for select
  using (id = auth.uid());

-- ============================================================
-- FONCTION : génération automatique du numéro de dossier
-- Format : PRE-{ANNEE}-{00001, 00002, ...}
-- ============================================================
create sequence if not exists application_ref_seq;

create or replace function generate_application_reference()
returns text
language plpgsql
as $$
declare
  next_val integer;
  year_part text;
begin
  next_val := nextval('application_ref_seq');
  year_part := to_char(now(), 'YYYY');
  return 'PRE-' || year_part || '-' || lpad(next_val::text, 5, '0');
end;
$$;

-- Trigger : génère automatiquement le numéro de dossier à la création
create or replace function set_application_reference()
returns trigger
language plpgsql
as $$
begin
  if new.reference_number is null or new.reference_number = '' then
    new.reference_number := generate_application_reference();
  end if;
  return new;
end;
$$;

drop trigger if exists trg_set_reference_number on applications;
create trigger trg_set_reference_number
  before insert on applications
  for each row execute function set_application_reference();

-- Trigger : historiser chaque changement de statut
create or replace function log_application_status_change()
returns trigger
language plpgsql
as $$
begin
  if (tg_op = 'UPDATE' and old.status is distinct from new.status) then
    insert into application_status_history (application_id, old_status, new_status)
    values (new.id, old.status, new.status);
  end if;
  return new;
end;
$$;

drop trigger if exists trg_log_status_change on applications;
create trigger trg_log_status_change
  after update on applications
  for each row execute function log_application_status_change();

-- ============================================================
-- STORAGE BUCKETS (à créer aussi via le dashboard Supabase)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('application-documents', 'application-documents', false)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('news', 'news', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
values ('content', 'content', true)
on conflict (id) do nothing;

-- Policies storage : upload public pour les documents de préinscription
drop policy if exists "public_upload_application_docs" on storage.objects;
create policy "public_upload_application_docs"
  on storage.objects for insert
  with check (bucket_id = 'application-documents');

drop policy if exists "admin_read_application_docs" on storage.objects;
create policy "admin_read_application_docs"
  on storage.objects for select
  using (bucket_id = 'application-documents' and exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "public_read_gallery" on storage.objects;
create policy "public_read_gallery"
  on storage.objects for select
  using (bucket_id = 'gallery');

drop policy if exists "public_read_news" on storage.objects;
create policy "public_read_news"
  on storage.objects for select
  using (bucket_id = 'news');

drop policy if exists "admin_write_gallery" on storage.objects;
create policy "admin_write_gallery"
  on storage.objects for insert
  with check (bucket_id = 'gallery' and exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "admin_write_news" on storage.objects;
create policy "admin_write_news"
  on storage.objects for insert
  with check (bucket_id = 'news' and exists (select 1 from admin_users where id = auth.uid()));

drop policy if exists "public_read_content" on storage.objects;
create policy "public_read_content"
  on storage.objects for select
  using (bucket_id = 'content');

drop policy if exists "admin_write_content" on storage.objects;
create policy "admin_write_content"
  on storage.objects for insert
  with check (bucket_id = 'content' and exists (select 1 from admin_users where id = auth.uid()));

-- ============================================================
-- DONNÉES DE DÉPART : les 4 niveaux existants, pour que l'admin
-- les retrouve déjà en base et puisse les modifier immédiatement.
-- ============================================================
insert into class_levels (slug, name, cycle, description, main_subjects, objectives, admission_conditions, annual_fee_fcfa, sort_order)
values
  ('6eme', '6ème', 'college',
   'Première année du cycle collège, elle marque la transition entre le primaire et le secondaire.',
   array['Français', 'Mathématiques', 'Anglais', 'SVT', 'Histoire-Géographie'],
   array['Consolider les acquis du primaire', 'Développer l''autonomie', 'Découvrir de nouvelles matières'],
   array['Attestation de réussite CEPE', 'Livret scolaire du primaire', 'Extrait de naissance'],
   450000, 1),
  ('5eme', '5ème', 'college',
   'Approfondissement des matières fondamentales et introduction d''une seconde langue vivante.',
   array['Français', 'Mathématiques', 'Anglais', 'Espagnol', 'Physique-Chimie'],
   array['Renforcer la méthodologie', 'Développer l''esprit critique'],
   array['Bulletin de 6ème', 'Dossier scolaire complet'],
   450000, 2),
  ('4eme', '4ème', 'college',
   'Année charnière préparant progressivement au Brevet d''Études du Premier Cycle (BEPC).',
   array['Français', 'Mathématiques', 'Anglais', 'Physique-Chimie', 'SVT'],
   array['Préparer les bases du BEPC', 'Renforcer le travail personnel'],
   array['Bulletin de 5ème', 'Dossier scolaire complet'],
   475000, 3),
  ('3eme', '3ème', 'college',
   'Dernière année du collège, sanctionnée par l''examen du BEPC.',
   array['Français', 'Mathématiques', 'Anglais', 'Physique-Chimie', 'SVT', 'Histoire-Géographie'],
   array['Réussir le BEPC', 'Préparer l''orientation vers le lycée'],
   array['Bulletin de 4ème', 'Dossier scolaire complet'],
   475000, 4)
on conflict (slug) do nothing;

