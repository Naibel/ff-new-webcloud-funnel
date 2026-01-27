import type { Domain, DomainExtension } from '../types';
import type { QuestionnaireAnswers } from '../types';

const DOMAIN_EXTENSIONS: DomainExtension[] = ['.fr', '.com', '.net', '.org', '.eu', '.io'];
const POPULAR_EXTENSIONS: DomainExtension[] = ['.fr', '.com'];

/**
 * Génère des suggestions de noms de domaine basées sur les mots-clés saisis
 * et les informations du questionnaire si disponibles
 */
export function generateDomainSuggestions(
  searchTerm: string,
  answers?: QuestionnaireAnswers
): string[] {
  if (!searchTerm.trim()) return [];

  const suggestions: string[] = [];
  const cleanTerm = searchTerm.toLowerCase().trim();
  
  // Suggestions basées sur le terme de recherche
  const variations = [
    cleanTerm,
    `mon${cleanTerm}`,
    `${cleanTerm}pro`,
    `${cleanTerm}plus`,
    `le${cleanTerm}`,
    `${cleanTerm}fr`,
    `${cleanTerm}online`,
    `my${cleanTerm}`,
  ];

  // Si le questionnaire a été complété, personnaliser les suggestions
  if (answers?.companyName) {
    const companyName = answers.companyName.toLowerCase().trim();
    suggestions.push(
      companyName,
      `${companyName}fr`,
      `${companyName}online`,
      `mon${companyName}`
    );
  }

  if (answers?.businessSector) {
    const sectorKeywords: Record<string, string[]> = {
      ecommerce: ['shop', 'store', 'boutique', 'achat'],
      services: ['service', 'pro', 'expert', 'consulting'],
      creative: ['studio', 'creative', 'design', 'art'],
      tech: ['tech', 'digital', 'cloud', 'app'],
      nonprofit: ['asso', 'fondation', 'solidarite'],
    };

    const keywords = sectorKeywords[answers.businessSector] || [];
    keywords.forEach(keyword => {
      suggestions.push(`${cleanTerm}${keyword}`, `${keyword}${cleanTerm}`);
    });
  }

  // Ajouter les variations de base
  suggestions.push(...variations);

  // Retourner 5-8 suggestions uniques
  return [...new Set(suggestions)].slice(0, 8);
}

/**
 * Simule la vérification de disponibilité d'un domaine
 */
export function checkDomainAvailability(domainName: string, extension: DomainExtension): Domain['status'] {
  // Simulation : certains domaines sont indisponibles, d'autres premium
  const unavailableDomains = ['google', 'facebook', 'amazon', 'microsoft', 'apple'];
  const premiumDomains = ['tech', 'cloud', 'digital', 'online', 'web'];
  
  const baseName = domainName.toLowerCase();
  
  if (unavailableDomains.some(d => baseName.includes(d))) {
    return 'unavailable';
  }
  
  if (premiumDomains.some(d => baseName.includes(d))) {
    return 'premium';
  }
  
  return 'available';
}

/**
 * Génère un prix pour un domaine selon son extension et son statut
 */
export function getDomainPrice(extension: DomainExtension, status: Domain['status']): number {
  const basePrices: Record<DomainExtension, number> = {
    '.fr': 9.99,
    '.com': 12.99,
    '.net': 14.99,
    '.org': 15.99,
    '.eu': 11.99,
    '.io': 39.99,
  };

  const basePrice = basePrices[extension] || 12.99;

  if (status === 'premium') {
    return basePrice * 3; // Prix premium multiplié par 3
  }

  return basePrice;
}

/**
 * Crée un objet Domain complet
 */
export function createDomain(
  name: string,
  extension: DomainExtension,
  answers?: QuestionnaireAnswers
): Domain {
  const status = checkDomainAvailability(name, extension);
  const price = getDomainPrice(extension, status);
  const popular = POPULAR_EXTENSIONS.includes(extension);

  return {
    name,
    extension,
    status,
    price,
    popular,
  };
}

/**
 * Génère des suggestions complètes de domaines avec toutes les extensions
 */
export function generateFullDomainSuggestions(
  searchTerm: string,
  answers?: QuestionnaireAnswers
): Domain[] {
  const suggestions = generateDomainSuggestions(searchTerm, answers);
  const domains: Domain[] = [];

  suggestions.forEach(suggestion => {
    DOMAIN_EXTENSIONS.forEach(extension => {
      domains.push(createDomain(suggestion, extension, answers));
    });
  });

  return domains;
}
