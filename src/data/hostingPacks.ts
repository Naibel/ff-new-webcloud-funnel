import type { HostingPack } from '../types';

// Packs d'hébergement basés sur le CSV
export const HOSTING_PACKS: HostingPack[] = [
  {
    id: 'wordpress',
    name: 'Pack WordPress',
    price: 2.63, // Prix mensuel HT approximatif basé sur le CSV
    priceMonthlyTTC: 3.16, // Prix mensuel TTC
    features: [
      'Hébergement WordPress optimisé',
      'Installation WordPress en 1 clic',
      'Mises à jour automatiques',
      'Thèmes et plugins pré-installés',
      'Support WordPress dédié',
      'Sauvegardes automatiques',
    ],
    recommended: false,
  },
  {
    id: 'letsencrypt',
    name: 'Let\'s Encrypt (Gratuit)',
    price: 0, // SSL gratuit
    priceMonthlyTTC: 0,
    features: [
      'Certificat SSL gratuit',
      'Renouvellement automatique',
      'Sécurité HTTPS',
      'Compatible tous navigateurs',
      'Installation automatique',
    ],
    recommended: false,
  },
  {
    id: 'cdn-basic',
    name: 'CDN Basic',
    price: 2.35, // Prix mensuel HT approximatif
    priceMonthlyTTC: 2.82,
    features: [
      'Accélération mondiale',
      'Cache intelligent',
      'Optimisation des images',
      'Réduction de la latence',
      'Support multi-régions',
    ],
    recommended: false,
  },
  {
    id: 'cdn-security',
    name: 'CDN Security',
    price: 3.89, // Prix mensuel HT approximatif
    priceMonthlyTTC: 4.67,
    features: [
      'Toutes les fonctionnalités CDN Basic',
      'Protection DDoS',
      'Firewall WAF',
      'Détection des menaces',
      'Certificat SSL inclus',
      'Monitoring 24/7',
    ],
    recommended: true,
  },
  {
    id: 'cdn-security-rgpd',
    name: 'CDN Security (RGPD)',
    price: 4.58, // Prix mensuel HT approximatif
    priceMonthlyTTC: 5.50,
    features: [
      'Toutes les fonctionnalités CDN Security',
      'Conformité RGPD',
      'Protection des données',
      'Audit de sécurité',
      'Rapports de conformité',
      'Support juridique',
    ],
    recommended: false,
  },
  {
    id: 'database-essential',
    name: 'Database Essential',
    price: 0.73, // Prix mensuel HT approximatif
    priceMonthlyTTC: 0.88,
    features: [
      'Base de données MySQL',
      'Optimisation des performances',
      'Sauvegardes quotidiennes',
      'Support multi-bases',
      'Outils de gestion inclus',
    ],
    recommended: false,
  },
  {
    id: 'visibilite-pro',
    name: 'Visibilité Pro (Google Maps)',
    price: 2.00, // Prix mensuel HT approximatif
    priceMonthlyTTC: 2.40,
    features: [
      'Référencement Google Maps',
      'Gestion de fiche entreprise',
      'Avis clients intégrés',
      'Statistiques de visibilité',
      'Optimisation locale SEO',
      'Support dédié',
    ],
    recommended: false,
  },
];

// Options supplémentaires basées sur le CSV
export const ADDITIONAL_OPTIONS = {
  ssl: {
    name: 'Let\'s Encrypt SSL',
    description: 'Certificat SSL gratuit avec renouvellement automatique',
    price: 0,
    included: true,
  },
  professionalEmails: {
    name: 'Email Pro',
    description: 'Emails professionnels @votredomaine.fr',
    options: [
      {
        id: 'none',
        label: 'Non nécessaire',
        price: 0,
      },
      {
        id: '10',
        label: 'Email Pro: 10 comptes',
        price: 3.88, // Prix mensuel HT approximatif
        priceMonthlyTTC: 4.66,
      },
      {
        id: '20',
        label: 'Email Pro: 20 comptes',
        price: 7.76, // Prix mensuel HT approximatif
        priceMonthlyTTC: 9.31,
      },
    ],
    included: false,
  },
  dailyBackups: {
    name: 'Sauvegardes automatiques',
    description: 'Sauvegardes quotidiennes avec restauration en un clic, rétention 30 jours',
    price: 3.89, // Prix mensuel HT approximatif
    priceMonthlyTTC: 4.67,
    included: false,
  },
};

// Durées disponibles (en années)
export const DURATION_OPTIONS = [
  { value: 1, label: '1 an', discount: 0 },
  { value: 2, label: '2 ans', discount: 5 },
  { value: 3, label: '3 ans', discount: 10 },
  { value: 5, label: '5 ans', discount: 15 },
  { value: 10, label: '10 ans', discount: 20 },
];

// Calcul du prix avec durée et remise
export function calculatePackPrice(pack: HostingPack, duration: number = 1): {
  monthlyHT: number;
  monthlyTTC: number;
  annualHT: number;
  annualTTC: number;
  totalHT: number;
  totalTTC: number;
} {
  const durationOption = DURATION_OPTIONS.find(d => d.value === duration) || DURATION_OPTIONS[0];
  const discount = durationOption.discount / 100;
  
  const monthlyHT = pack.price;
  const monthlyTTC = pack.priceMonthlyTTC || pack.price * 1.2; // TTC = HT * 1.2 (TVA 20%)
  
  const annualHT = monthlyHT * 12 * (1 - discount);
  const annualTTC = monthlyTTC * 12 * (1 - discount);
  
  const totalHT = annualHT * duration;
  const totalTTC = annualTTC * duration;
  
  return {
    monthlyHT,
    monthlyTTC,
    annualHT,
    annualTTC,
    totalHT,
    totalTTC,
  };
}
