import type { NewsItem, GalleryItem } from "@/types/database";

export const demoNews: NewsItem[] = [
  {
    id: "demo-1",
    title: "Rentrée scolaire 2026-2027 : ce qu'il faut savoir",
    slug: "rentree-scolaire-2026-2027",
    excerpt: "Dates, fournitures et modalités pratiques pour bien préparer la rentrée.",
    content:
      "La rentrée scolaire 2026-2027 se tiendra mi-septembre. Les familles recevront une convocation précisant l'horaire d'accueil par niveau. Merci de vous assurer que le dossier d'inscription est complet avant cette date, documents et règlement des frais inclus.",
    category: "Vie scolaire",
    cover_image_url:
      "https://picsum.photos/seed/college-rentree/1200/750",
    published: true,
    published_at: "2026-08-20T08:00:00Z",
    created_at: "2026-08-20T08:00:00Z",
  },
  {
    id: "demo-2",
    title: "Excellents résultats au BEPC pour la promotion 2026",
    slug: "resultats-bepc-2026",
    excerpt: "Nos élèves de 3ème affichent un taux de réussite remarquable cette année.",
    content:
      "Nous sommes fiers d'annoncer un taux de réussite de 96% au BEPC pour cette promotion. Toute l'équipe pédagogique félicite les élèves pour leur sérieux et leur travail tout au long de l'année scolaire.",
    category: "Résultats",
    cover_image_url:
      "https://picsum.photos/seed/college-ceremonie/1200/750",
    published: true,
    published_at: "2026-07-10T08:00:00Z",
    created_at: "2026-07-10T08:00:00Z",
  },
  {
    id: "demo-3",
    title: "Journée culturelle et sportive : retour en images",
    slug: "journee-culturelle-sportive",
    excerpt: "Une journée conviviale rythmée par des activités sportives et culturelles.",
    content:
      "Élèves, enseignants et parents se sont retrouvés pour une journée placée sous le signe du partage : tournois sportifs, exposition artistique et spectacle de fin de journée.",
    category: "Événement",
    cover_image_url:
      "https://picsum.photos/seed/college-activite/1200/750",
    published: true,
    published_at: "2026-05-15T08:00:00Z",
    created_at: "2026-05-15T08:00:00Z",
  },
];

export const demoGallery: GalleryItem[] = [
  { id: "g1", title: "Bâtiment principal", category: "Établissement", image_path: "https://picsum.photos/seed/college-batiment/800/800", created_at: "2026-01-01" },
  { id: "g2", title: "Salle de classe", category: "Classes", image_path: "https://picsum.photos/seed/college-classe/800/800", created_at: "2026-01-01" },
  { id: "g3", title: "Activité sportive", category: "Activités", image_path: "https://picsum.photos/seed/college-activite/800/800", created_at: "2026-01-01" },
  { id: "g4", title: "Cérémonie de remise des diplômes", category: "Événements", image_path: "https://picsum.photos/seed/college-ceremonie/800/800", created_at: "2026-01-01" },
  { id: "g5", title: "Bibliothèque", category: "Établissement", image_path: "https://picsum.photos/seed/college-bibliotheque/800/800", created_at: "2026-01-01" },
  { id: "g6", title: "Travaux pratiques", category: "Classes", image_path: "https://picsum.photos/seed/college-tp/800/800", created_at: "2026-01-01" },
  { id: "g7", title: "Cour de récréation", category: "Établissement", image_path: "https://picsum.photos/seed/college-cour/800/800", created_at: "2026-01-01" },
  { id: "g8", title: "Club de lecture", category: "Activités", image_path: "https://picsum.photos/seed/college-lecture/800/800", created_at: "2026-01-01" },
  { id: "g9", title: "Laboratoire de sciences", category: "Classes", image_path: "https://picsum.photos/seed/college-labo/800/800", created_at: "2026-01-01" },
  { id: "g10", title: "Journée sportive", category: "Activités", image_path: "https://picsum.photos/seed/college-sport/800/800", created_at: "2026-01-01" },
  { id: "g11", title: "Rentrée scolaire", category: "Événements", image_path: "https://picsum.photos/seed/college-rentree-photo/800/800", created_at: "2026-01-01" },
  { id: "g12", title: "Salle informatique", category: "Classes", image_path: "https://picsum.photos/seed/college-info/800/800", created_at: "2026-01-01" },
];
