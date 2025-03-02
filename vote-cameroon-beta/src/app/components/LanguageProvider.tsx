"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "fr"

type Translations = {
  [key: string]: {
    en: string
    fr: string
  }
}

const translations: Translations = {
  // Navbar
  home: { en: "Home", fr: "Accueil" },
  verify: { en: "Verify Registration", fr: "Vérifier l'inscription" },
  stations: { en: "Polling Stations", fr: "Bureaux de vote" },
  results: { en: "Results", fr: "Résultats" },
  education: { en: "Voter Education", fr: "Éducation électorale" },
  // support: { en: "Support", fr: "Assistance" },
  

  // Home page
  heroTitle: { en: "Your Vote, Your Voice, Your Cameroon", fr: "Votre Vote, Votre Voix, Votre Cameroun" },
  heroSubtitle: {
    en: "Empowering young Cameroonians to participate in the democratic process",
    fr: "Encourager les jeunes Camerounais à participer au processus démocratique",
  },
  checkStatus: { en: "Check Your Status", fr: "Vérifier votre statut" },
  learnMore: { en: "Learn More", fr: "En savoir plus" },
  latestUpdates: { en: "Latest Updates", fr: "Dernières mises à jour" },
  updateContent: {
    en: "Voter registration deadline extended to August 15, 2025. Make sure to register before the deadline!",
    fr: "La date limite d'inscription des électeurs est prolongée jusqu'au 15 août 2025. Assurez-vous de vous inscrire avant la date limite!",
  },
  explore: { en: "Explore", fr: "Explorer" },

  // Feature cards
  checkRegistration: { en: "Check Registration", fr: "Vérifier l'inscription" },
  checkRegistrationDesc: {
    en: "Verify your voter registration status and polling station",
    fr: "Vérifiez votre statut d'inscription et votre bureau de vote",
  },
  findPollingStation: { en: "Find Polling Station", fr: "Trouver un bureau de vote" },
  findPollingStationDesc: {
    en: "Locate your nearest polling station with directions",
    fr: "Localisez votre bureau de vote le plus proche avec des directions",
  },
  electionResults: { en: "Election Results", fr: "Résultats des élections" },
  electionResultsDesc: {
    en: "View real-time election results and analysis",
    fr: "Consultez les résultats des élections en temps réel et les analyses",
  },
  voterEducation: { en: "Voter Education", fr: "Éducation électorale" },
  voterEducationDesc: {
    en: "Learn about the voting process and requirements",
    fr: "Renseignez-vous sur le processus de vote et les exigences",
  },
  support: { 
    en: "Support & FAQs",
     fr: "Assistance et FAQ"
     },
  supportDesc: {
    en: "Get help with common questions and issues",
    fr: "Obtenez de l'aide pour les questions et problèmes courants",
  },

  findRegistrationCenter: { en: "Find Registration Center", fr: "Trouver un centre d'inscription" },
  findRegistrationCenterDesc: {
    en: "Locate your nearest voter registration center",
    fr: "Localisez votre centre d'inscription le plus proche",
  },

  // Countdown
  days: { en: "Days", fr: "Jours" },
  hours: { en: "Hours", fr: "Heures" },
  minutes: { en: "Minutes", fr: "Minutes" },
  seconds: { en: "Seconds", fr: "Secondes" },
  untilElection: { en: "Until Election Day", fr: "Jusqu'au jour de l'élection" },

  // Verify page
  verifyRegistration: { en: "Verify Your Registration", fr: "Vérifiez votre inscription" },
  enterDetails: {
    en: "Enter your ID details to check your registration status",
    fr: "Entrez les détails de votre pièce d'identité pour vérifier votre statut d'inscription",
  },
  idType: { en: "ID Type", fr: "Type de pièce d'identité" },
  nationalId: { en: "National ID", fr: "Carte nationale d'identité" },
  voterId: { en: "Voter ID", fr: "Carte d'électeur" },
  passport: { en: "Passport", fr: "Passeport" },
  idNumber: { en: "ID Number", fr: "Numéro d'identification" },
  enterIdNumber: { en: "Enter your ID number", fr: "Numéro d'identification" },
  checkNow: { en: "Check Now", fr: "Vérifier maintenant" },
  checking: { en: "Checking...", fr: "Vérification..." },
  registered: { en: "You are Registered!", fr: "Vous êtes inscrit!" },
  registeredDesc: {
    en: "Congratulations! You are registered to vote in the upcoming election.",
    fr: "Félicitations! Vous êtes inscrit pour voter aux prochaines élections.",
  },
  yourDetails: { en: "Your Details", fr: "Vos détails" },
  name: { en: "Name", fr: "Nom" },
  pollingStation: { en: "Polling Station", fr: "Bureau de vote" },
  ward: { en: "Ward", fr: "Quartier" },
  constituency: { en: "Constituency", fr: "Circonscription" },
  downloadDetails: { en: "Download Details", fr: "Télécharger les détails" },
  notRegistered: { en: "Not Registered", fr: "Non inscrit" },
  notRegisteredDesc: {
    en: "You are not currently registered to vote in the upcoming election.",
    fr: "Vous n'êtes pas actuellement inscrit pour voter aux prochaines élections.",
  },
  nextSteps: { en: "Next Steps", fr: "Prochaines étapes" },
  visitOffice: {
    en: "Visit your local ELECAM office with valid identification",
    fr: "Visitez votre bureau ELECAM local avec une pièce d'identité valide",
  },
  bringDocuments: {
    en: "Bring proof of residence and citizenship documents",
    fr: "Apportez une preuve de résidence et des documents de citoyenneté",
  },
  checkDeadlines: {
    en: "Check registration deadlines for your region",
    fr: "Vérifiez les dates limites d'inscription pour votre région",
  },
  registerNow: { en: "Register Now", fr: "S'inscrire maintenant" },
  enterDetailsPrompt: {
    en: "Enter your ID details",
    fr: "Entrez les détails de votre pièce d'identité",
  },
  resultsWillAppear: {
    en: "Your registration status will appear here",
    fr: "Votre statut d'inscription apparaîtra ici",
  },
  errorTitle: { en: "Error", fr: "Erreur" },
  cameraTitle: { en: "ID Scanner", fr: "Scanner d'ID" },
  cameraDesc: {
    en: "Camera access would be requested to scan your ID",
    fr: "L'accès à la caméra serait demandé pour scanner votre pièce d'identité",
  },

  // Polling stations page
  searchByRegion: { en: "Search by region, city or address", fr: "Rechercher par région, ville ou adresse" },
  pollingStations: { en: "Polling Stations", fr: "Bureaux de vote" },
  selectStation: { en: "Select a station to view details", fr: "Sélectionnez une station pour voir les détails" },
  map: { en: "Map", fr: "Carte" },
  details: { en: "Details", fr: "Détails" },
  openingHours: { en: "Opening Hours", fr: "Heures d'ouverture" },
  waitTime: { en: "Wait Time", fr: "Temps d'attente" },
  estimated: { en: "Estimated", fr: "Estimé" },
  contact: { en: "Contact", fr: "Contact" },
  getDirections: { en: "Get Directions", fr: "Obtenir l'itinéraire" },
  saveOffline: { en: "Save Offline", fr: "Enregistrer hors ligne" },
  noStationsFound: { en: "No stations found", fr: "Aucune station trouvée" },
  selectStationPrompt: { en: "Select a station", fr: "Sélectionnez une station" },
  stationDetailsWillAppear: {
    en: "Station details will appear here",
    fr: "Les détails de la station apparaîtront ici",
  },

  // Results page (updated and new translations)
  electionResults: { en: "Election Results", fr: "Résultats des élections" },
  latestResults: { en: "Latest Results", fr: "Derniers résultats" },
  resultsDescription: {
    en: "View the most up-to-date election results. Data is updated in real-time.",
    fr: "Consultez les résultats des élections les plus récents. Les données sont mises à jour en temps réel.",
  },
  selectRegion: { en: "Select Region", fr: "Sélectionner une région" },
  allRegions: { en: "All Regions", fr: "Toutes les régions" },
  adamawa: { en: "Adamawa", fr: "Adamaoua" },
  centre: { en: "Centre", fr: "Centre" },
  east: { en: "East", fr: "Est" },
  farNorth: { en: "Far North", fr: "Extrême-Nord" },
  littoral: { en: "Littoral", fr: "Littoral" },
  north: { en: "North", fr: "Nord" },
  northwest: { en: "Northwest", fr: "Nord-Ouest" },
  west: { en: "West", fr: "Ouest" },
  south: { en: "South", fr: "Sud" },
  southwest: { en: "Southwest", fr: "Sud-Ouest" },
  reportIssue: { en: "Report Issue", fr: "Signaler un problème" },
  partyResults: { en: "Party Results", fr: "Résultats par parti" },
  candidateResults: { en: "Candidate Results", fr: "Résultats par candidat" },
  turnoutStatistics: { en: "Turnout Statistics", fr: "Statistiques de participation" },
  registeredVoters: { en: "Registered Voters", fr: "Électeurs inscrits" },
  totalVotesCast: { en: "Total Votes Cast", fr: "Total des votes exprimés" },
  voterTurnout: { en: "Voter Turnout", fr: "Taux de participation" },
  invalidVotes: { en: "Invalid Votes", fr: "Votes invalides" },
  keyUpdates: { en: "Key Updates", fr: "Mises à jour importantes" },
  update1: {
    en: "Results from 80% of polling stations have been processed.",
    fr: "Les résultats de 80% des bureaux de vote ont été traités.",
  },
  update2: {
    en: "Voter turnout is estimated at 75% nationwide.",
    fr: "Le taux de participation est estimé à 75% à l'échelle nationale.",
  },
  update3: {
    en: "Final results expected within 24 hours.",
    fr: "Résultats finaux attendus dans les 24 heures.",
  },

  // Voter Education page
  voterEducation: { en: "Voter Education", fr: "Éducation électorale" },
  educationalResources: { en: "Educational Resources", fr: "Ressources éducatives" },
  searchResources: { en: "Search resources...", fr: "Rechercher des ressources..." },
  voterRegistration: { en: "Voter Registration Guide", fr: "Guide d'inscription des électeurs" },
  votingProcess: { en: "Voting Process Explained", fr: "Processus de vote expliqué" },
  electoralSystem: { en: "Understanding the Electoral System", fr: "Comprendre le système électoral" },
  voterRights: { en: "Know Your Voter Rights", fr: "Connaître vos droits d'électeur" },
  electionDayPrep: { en: "Election Day Preparation", fr: "Préparation du jour du scrutin" },
  readingTime: { en: "5 min read", fr: "5 min de lecture" },
  watchTime: { en: "10 min watch", fr: "10 min de visionnage" },
  resourceDescription: {
    en: "Learn about this important aspect of the electoral process.",
    fr: "Apprenez cet aspect important du processus électoral.",
  },
  readGuide: { en: "Read Guide", fr: "Lire le guide" },
  watchVideo: { en: "Watch Video", fr: "Regarder la vidéo" },
  frequentlyAskedQuestions: { en: "Frequently Asked Questions", fr: "Questions fréquemment posées" },
  faq1Question: {
    en: "Who is eligible to vote?",
    fr: "Qui est éligible pour voter ?",
  },
  faq1Answer: {
    en: "All Cameroonian citizens aged 18 and above are eligible to vote, provided they have registered.",
    fr: "Tous les citoyens camerounais âgés de 18 ans et plus sont éligibles pour voter, à condition d'être inscrits.",
  },
  faq2Question: {
    en: "How do I check my voter registration status?",
    fr: "Comment puis-je vérifier mon statut d'inscription électorale ?",
  },
  faq2Answer: {
    en: "You can check your registration status on our 'Verify Registration' page or by visiting your local ELECAM office.",
    fr: "Vous pouvez vérifier votre statut d'inscription sur notre page 'Vérifier l'inscription' ou en visitant votre bureau ELECAM local.",
  },
  faq3Question: {
    en: "What documents do I need to bring on election day?",
    fr: "Quels documents dois-je apporter le jour du scrutin ?",
  },
  faq3Answer: {
    en: "You need to bring your voter ID card and a valid form of identification (national ID, passport, or driver's license).",
    fr: "Vous devez apporter votre carte d'électeur et une pièce d'identité valide (carte nationale d'identité, passeport ou permis de conduire).",
  },
  faq4Question: {
    en: "How are votes counted and results announced?",
    fr: "Comment les votes sont-ils comptés et les résultats annoncés ?",
  },
  faq4Answer: {
    en: "Votes are counted at each polling station immediately after voting ends. Results are then transmitted to regional and national centers for compilation and official announcement.",
    fr: "Les votes sont comptés dans chaque bureau de vote immédiatement après la fin du scrutin. Les résultats sont ensuite transmis aux centres régionaux et nationaux pour compilation et annonce officielle.",
  },
  faq5Question: {
    en: "What should I do if I witness electoral malpractice?",
    fr: "Que dois-je faire si je suis témoin d'une irrégularité électorale ?",
  },
  faq5Answer: {
    en: "If you witness any form of electoral malpractice, report it immediately to the polling station officials, election observers, or use our 'Report Issue' feature on this app.",
    fr: "Si vous êtes témoin d'une forme quelconque d'irrégularité électorale, signalez-la immédiatement aux responsables du bureau de vote, aux observateurs électoraux, ou utilisez notre fonction 'Signaler un problème' sur cette application.",
  },
  needMoreHelp: { en: "Need More Help?", fr: "Besoin d'aide supplémentaire ?" },
  contactDescription: {
    en: "Our support team is available to assist you with any questions or concerns.",
    fr: "Notre équipe de support est disponible pour vous aider avec toutes vos questions ou préoccupations.",
  },
  helplineNumber: { en: "Helpline Number", fr: "Numéro d'assistance" },
  contactSupport: { en: "Contact Support", fr: "Contacter le support" },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`)
      return key
    }
    return translations[key][language]
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}

