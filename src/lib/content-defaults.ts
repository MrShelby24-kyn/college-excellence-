export interface HomeContent {
  presentationText: string;
  whyUsItems: string[];
  heroImageUrl: string;
  presentationImageUrl: string;
}

export const homeContentDefaults: HomeContent = {
  presentationText:
    "Depuis 2011, nous accompagnons chaque élève avec exigence et bienveillance, dans un cadre propice à l'épanouissement et à la réussite scolaire.",
  whyUsItems: [
    "Corps enseignant qualifié et expérimenté",
    "Effectifs réduits pour un meilleur suivi",
    "Infrastructures modernes et sécurisées",
    "Encadrement pédagogique et psychologique",
    "Activités parascolaires variées",
    "Communication régulière avec les parents",
  ],
  heroImageUrl: "https://picsum.photos/seed/college-batiment/1200/900",
  presentationImageUrl: "https://picsum.photos/seed/college-batiment/1200/900",
};

export interface AboutContent {
  historyText: string;
  historyImageUrl: string;
  visionText: string;
  missionText: string;
  values: { title: string; text: string }[];
  directorQuote: string;
  directorName: string;
  directorRole: string;
  directorPhotoUrl: string;
  administration: { name: string; role: string }[];
  pedagogicalTeam: { name: string; role: string }[];
}

export const aboutContentDefaults: AboutContent = {
  historyText:
    "Fondé en 2011 à Divo, Collège Excellence Divo est né de la volonté d'offrir aux familles de la région un enseignement de qualité, alliant rigueur académique et accompagnement humain. Au fil des années, l'établissement s'est agrandi et modernisé, tout en conservant son exigence pédagogique et son attention portée à chaque élève.",
  historyImageUrl: "https://picsum.photos/seed/college-histoire/1200/900",
  visionText:
    "Devenir une référence de l'enseignement privé à Divo, reconnue pour la réussite de ses élèves et la qualité de son encadrement.",
  missionText:
    "Former des élèves épanouis, disciplinés et compétitifs, prêts à réussir leurs examens et à s'épanouir dans la société de demain.",
  values: [
    { title: "Excellence", text: "Un accompagnement exigeant pour révéler le plein potentiel de chaque élève." },
    { title: "Rigueur", text: "Un cadre structuré et discipliné, propice à l'apprentissage." },
    { title: "Bienveillance", text: "Une écoute attentive et un suivi humain de chaque enfant." },
    { title: "Ouverture", text: "Un esprit citoyen tourné vers le monde et les autres." },
  ],
  directorQuote:
    "Chaque enfant qui franchit nos portes mérite un accompagnement à la hauteur de son potentiel. Notre équipe se mobilise chaque jour pour conjuguer exigence académique et attention humaine, afin de préparer nos élèves à réussir, aujourd'hui comme demain.",
  directorName: "M. Kouassi Jean-Baptiste",
  directorRole: "Directeur général",
  directorPhotoUrl: "https://picsum.photos/seed/college-directeur/600/600",
  administration: [
    { name: "M. Kouassi Jean-Baptiste", role: "Directeur général" },
    { name: "Mme Diallo Fatou", role: "Directrice des études" },
    { name: "M. Traoré Ibrahim", role: "Censeur" },
  ],
  pedagogicalTeam: [
    { name: "Mme Koffi Marie", role: "Professeure de Mathématiques" },
    { name: "M. N'Guessan Paul", role: "Professeur de Français" },
    { name: "Mme Ouattara Awa", role: "Professeure d'Anglais" },
    { name: "M. Bakayoko Seydou", role: "Professeur de SVT" },
  ],
};

export interface AdmissionsContent {
  requiredDocuments: string[];
  feesText: string;
  steps: { title: string; text: string }[];
  importantDates: { label: string; date: string }[];
}

export const admissionsContentDefaults: AdmissionsContent = {
  requiredDocuments: [
    "Extrait de naissance (copie)",
    "Bulletins scolaires des deux dernières années",
    "Certificat de scolarité de l'établissement précédent",
    "2 photos d'identité récentes",
    "Certificat médical",
  ],
  feesText:
    "Les frais de scolarité varient selon le niveau (voir la page Nos classes). Des frais d'inscription complémentaires s'appliquent lors de la première admission. Facilités de paiement disponibles sur demande auprès de l'administration.",
  steps: [
    { title: "Préinscription en ligne", text: "Remplissez le formulaire de préinscription et joignez les documents demandés." },
    { title: "Étude du dossier", text: "Notre équipe examine votre dossier sous 3 à 5 jours ouvrés." },
    { title: "Entretien / test de niveau", text: "Un entretien avec la famille et, selon le niveau, un test de positionnement." },
    { title: "Confirmation & paiement", text: "Confirmation de l'admission et règlement des frais de scolarité." },
  ],
  importantDates: [
    { label: "Ouverture des préinscriptions", date: "1er avril" },
    { label: "Clôture des préinscriptions", date: "15 août" },
    { label: "Résultats d'admission", date: "25 août" },
    { label: "Rentrée scolaire", date: "Mi-septembre" },
  ],
};
