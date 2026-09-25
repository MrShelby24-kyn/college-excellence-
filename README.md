# Collège Excellence Divo — Site vitrine (template réutilisable)

## État actuel

✅ Toutes les pages publiques + identité visuelle + SEO de base
✅ Formulaire de préinscription en ligne multi-étapes (élève, parent, documents, numéro de dossier auto-généré)
✅ Espace admin complet : demandes, actualités, galerie, contenu des pages, réglages

## À venir

- Sitemap.xml + guide de déploiement Vercel + nom de domaine

## Démarrage rapide

```bash
npm install
cp .env.local.example .env.local
# renseignez vos clés Supabase dans .env.local
npm run dev
```

## Créer un compte administrateur

1. Dans le dashboard Supabase → Authentication → Users, créez un utilisateur (email + mot de passe).
2. Copiez son UUID, puis dans l'éditeur SQL :
   ```sql
   insert into admin_users (id, full_name, role)
   values ('UUID_COPIÉ', 'Nom Prénom', 'admin');
   ```
3. Connectez-vous sur `/admin/login` avec cet email/mot de passe.

## Ce que l'admin peut modifier sans toucher au code

- **Nos classes** (`/admin/classes`) : ajouter, modifier, supprimer des niveaux (nom, cycle, description, matières,
  objectifs, conditions d'admission, frais) — reflété immédiatement sur la page publique et dans le formulaire
  de préinscription
- **Contenu des pages** (`/admin/contenu`) : Accueil (texte, points forts, **photos du bandeau et de la section
  présentation**), À propos (historique, vision, mission, valeurs, mot du directeur + photos, équipes), Admissions
  (pièces à fournir, frais, étapes, dates)
- **Galerie** (`/admin/galerie`) : ajouter/supprimer des photos par catégorie
- **Actualités** (`/admin/actualites`) : créer, modifier, supprimer des articles avec image de couverture
- **Réglages** (`/admin/parametres`) : nom, slogan, description, coordonnées, **logo (affiché dans le menu à côté
  du nom)**, **localisation Google Maps (latitude/longitude)**, statistiques de l'accueil
- **Préinscriptions** (`/admin/demandes`) : cliquez sur le numéro de dossier (souligné en doré) pour ouvrir le
  détail complet — infos élève/parent, documents téléchargeables, changement de statut

La **disposition** des pages (ordre des sections, mise en page) n'est pas éditable depuis l'admin — seuls le
texte, les photos et les niveaux de classes le sont.

## Réutiliser ce template pour un autre établissement

Modifiez uniquement `src/config/school.ts` (nom, slogan, couleurs, classes,
coordonnées, statistiques, réseaux sociaux). Aucun autre fichier n'a besoin
d'être touché pour une personnalisation de base.

## Base de données

Exécutez `supabase/schema.sql` dans l'éditeur SQL de votre projet Supabase.
Il crée les tables, les policies RLS et les buckets de stockage nécessaires.

