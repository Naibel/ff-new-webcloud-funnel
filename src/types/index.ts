// Types pour le questionnaire
export type EmployeeCount = '1-5' | '6-10' | '11-20' | '21-50' | '50+';
export type BusinessSector = 'ecommerce' | 'services' | 'creative' | 'tech' | 'nonprofit' | null;
export type SiteType = 'vitrine' | 'blog' | 'ecommerce' | 'saas' | 'multilingual' | null;
export type GeographicScope = 'national' | 'international' | null;

export interface QuestionnaireAnswers {
  employeeCount?: EmployeeCount;
  businessSector?: BusinessSector;
  siteType?: SiteType;
  companyName?: string;
  geographicScope?: GeographicScope;
}

export interface PackScores {
  wordpress: number;
  letsencrypt: number;
  'cdn-basic': number;
  'cdn-security': number;
  'cdn-security-rgpd': number;
  'database-essential': number;
  'visibilite-pro': number;
}

export type RecommendedPack = 'wordpress' | 'letsencrypt' | 'cdn-basic' | 'cdn-security' | 'cdn-security-rgpd' | 'database-essential' | 'visibilite-pro';

// Types pour les packs d'hébergement
export interface HostingPack {
  id: RecommendedPack | string;
  name: string;
  price: number; // Prix mensuel HT
  priceMonthlyTTC?: number; // Prix mensuel TTC
  features: string[];
  recommended?: boolean;
  score?: number;
  duration?: number; // Durée en années (1, 2, 3, 5, 10)
}

// Types pour les domaines
export type DomainExtension = '.fr' | '.com' | '.net' | '.org' | '.eu' | '.io';
export type DomainStatus = 'available' | 'unavailable' | 'premium';

export interface Domain {
  name: string;
  extension: DomainExtension;
  status: DomainStatus;
  price: number;
  popular?: boolean;
}

// Types pour les options supplémentaires
export interface AdditionalOptions {
  ssl: boolean; // Let's Encrypt (Gratuit) - toujours inclus
  professionalEmails: 'none' | '10' | '20'; // Email Pro: 10 ou 20 comptes
  dailyBackups: boolean; // Sauvegardes automatiques
  cdn?: 'none' | 'basic' | 'security' | 'security-rgpd';
  database?: boolean; // Database Essential
  visibilite?: boolean; // Visibilité Pro (Google Maps)
}

// Type pour le panier
export interface Cart {
  domains: Domain[];
  hostingPack: HostingPack | null;
  additionalOptions: AdditionalOptions;
}

// Type pour l'état global de l'application
export interface AppState {
  currentStep: number;
  questionnaireAnswers: QuestionnaireAnswers;
  packScores: PackScores;
  recommendedPack: RecommendedPack | null;
  cart: Cart;
}
