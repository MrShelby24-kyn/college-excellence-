/**
 * ============================================================
 * CONFIGURATION DE L'ÉTABLISSEMENT
 * ============================================================
 * Ce fichier est le SEUL endroit à modifier pour réutiliser
 * ce template pour un autre établissement scolaire.
 *
 * Ne modifiez pas les composants pour changer le nom, les
 * couleurs, les coordonnées, etc. Modifiez uniquement ce fichier.
 * ============================================================
 */

export type ClassLevel = {
  slug: string;
  name: string;
  cycle: "college" | "lycee";
  description: string;
  mainSubjects: string[];
  objectives: string[];
  admissionConditions: string[];
  annualFeeFCFA?: number;
};

export type SchoolConfig = {
  name: string;
  shortName: string;
  slogan: string;
  description: string;
  foundedYear: number;

  // Coordonnées
  address: string;
  city: string;
  country: string;
  phone: string;
  whatsapp: string; // format international sans "+", ex: 2250700000000
  email: string;

  // Localisation (Google Maps)
  gps: { lat: number; lng: number };

  // Identité visuelle
  logoUrl: string;
  faviconUrl: string;
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
  };

  // Réseaux sociaux
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };

  // Statistiques affichées sur l'accueil
  stats: {
    students: number;
    teachers: number;
    yearsOfExperience: number;
    successRatePercent: number;
  };

  // Horaires d'ouverture (affiché sur la page contact)
  openingHours: { day: string; hours: string }[];

  // Classes / niveaux proposés
  classLevels: ClassLevel[];

  // Message WhatsApp pré-rempli
  whatsappDefaultMessage: string;

  // SEO
  seo: {
    titleTemplate: string;
    defaultDescription: string;
    keywords: string[];
  };
};

export const schoolConfig: SchoolConfig = {
  name: "Collège Excellence Divo",
  shortName: "Excellence Divo",
  slogan: "Former aujourd'hui les citoyens de demain",
  description:
    "Le Collège Excellence Divo est un établissement scolaire privé situé à Divo, en Côte d'Ivoire, qui accompagne les élèves de la 6ème à la Terminale avec exigence, bienveillance et modernité.",
  foundedYear: 2011,

  address: "Quartier Résidentiel, Route de Lakota, Divo",
  city: "Divo",
  country: "Côte d'Ivoire",
  phone: "+225 27 34 XX XX XX",
  whatsapp: "2250700000000",
  email: "contact@excellence-divo-demo.ci",

  gps: { lat: 5.8372, lng: -5.3572 },

  logoUrl: "/images/logo.svg",
  faviconUrl: "/favicon.ico",
  colors: {
    primary: "#183B56",
    secondary: "#C99A3E",
    background: "#FFFFFF",
    surface: "#F5F7FA",
  },

  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },

  stats: {
    students: 640,
    teachers: 38,
    yearsOfExperience: 15,
    successRatePercent: 96,
  },

  openingHours: [
    { day: "Lundi - Vendredi", hours: "07h30 - 17h30" },
    { day: "Samedi", hours: "08h00 - 12h00" },
    { day: "Dimanche", hours: "Fermé" },
  ],

  classLevels: [
    {
      slug: "6eme",
      name: "6ème",
      cycle: "college",
      description:
        "Première année du cycle collège, elle marque la transition entre le primaire et le secondaire.",
      mainSubjects: ["Français", "Mathématiques", "Anglais", "SVT", "Histoire-Géographie"],
      objectives: ["Consolider les acquis du primaire", "Développer l'autonomie", "Découvrir de nouvelles matières"],
      admissionConditions: ["Attestation de réussite CEPE", "Livret scolaire du primaire", "Extrait de naissance"],
      annualFeeFCFA: 450000,
    },
    {
      slug: "5eme",
      name: "5ème",
      cycle: "college",
      description: "Approfondissement des matières fondamentales et introduction d'une seconde langue vivante.",
      mainSubjects: ["Français", "Mathématiques", "Anglais", "Espagnol", "Physique-Chimie"],
      objectives: ["Renforcer la méthodologie", "Développer l'esprit critique"],
      admissionConditions: ["Bulletin de 6ème", "Dossier scolaire complet"],
      annualFeeFCFA: 450000,
    },
    {
      slug: "4eme",
      name: "4ème",
      cycle: "college",
      description: "Année charnière préparant progressivement au Brevet d'Études du Premier Cycle (BEPC).",
      mainSubjects: ["Français", "Mathématiques", "Anglais", "Physique-Chimie", "SVT"],
      objectives: ["Préparer les bases du BEPC", "Renforcer le travail personnel"],
      admissionConditions: ["Bulletin de 5ème", "Dossier scolaire complet"],
      annualFeeFCFA: 475000,
    },
    {
      slug: "3eme",
      name: "3ème",
      cycle: "college",
      description: "Dernière année du collège, sanctionnée par l'examen du BEPC.",
      mainSubjects: ["Français", "Mathématiques", "Anglais", "Physique-Chimie", "SVT", "Histoire-Géographie"],
      objectives: ["Réussir le BEPC", "Préparer l'orientation vers le lycée"],
      admissionConditions: ["Bulletin de 4ème", "Dossier scolaire complet"],
      annualFeeFCFA: 475000,
    },
  ],

  whatsappDefaultMessage:
    "Bonjour, je souhaite avoir des informations concernant les inscriptions.",

  seo: {
    titleTemplate: "%s | Collège Excellence Divo",
    defaultDescription:
      "Collège privé à Divo, Côte d'Ivoire. Éducation et excellence de la 6ème à la Terminale. Préinscrivez votre enfant en ligne.",
    keywords: [
      "collège privé Divo",
      "école Divo",
      "inscription collège Divo",
      "établissement scolaire Côte d'Ivoire",
      "collège Divo",
    ],
  },
};
