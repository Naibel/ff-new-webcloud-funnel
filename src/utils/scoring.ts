import type { QuestionnaireAnswers, PackScores, RecommendedPack } from '../types';

/**
 * Calcule les points pour chaque pack basé sur les réponses du questionnaire
 */
export function calculatePackScores(answers: QuestionnaireAnswers): PackScores {
  const scores: PackScores = {
    wordpress: 0,
    letsencrypt: 0,
    'cdn-basic': 0,
    'cdn-security': 0,
    'cdn-security-rgpd': 0,
    'database-essential': 0,
    'visibilite-pro': 0,
  };

  // Critère "Nombre de salariés"
  switch (answers.employeeCount) {
    case '1-5':
      scores.wordpress += 3;
      scores['cdn-basic'] += 1;
      break;
    case '6-10':
      scores['cdn-basic'] += 3;
      scores['cdn-security'] += 1;
      break;
    case '11-20':
      scores['cdn-security'] += 3;
      scores['cdn-security-rgpd'] += 1;
      break;
    case '21-50':
      scores['cdn-security-rgpd'] += 3;
      scores['cdn-security'] += 1;
      break;
    case '50+':
      scores['cdn-security-rgpd'] += 4;
      break;
  }

  // Critère "Type de site souhaité"
  switch (answers.siteType) {
    case 'vitrine':
      scores.wordpress += 2;
      scores['cdn-basic'] += 1;
      scores['visibilite-pro'] += 2; // Important pour la visibilité locale
      break;
    case 'blog':
      scores.wordpress += 3;
      scores['cdn-basic'] += 1;
      break;
    case 'ecommerce':
      scores['cdn-security'] += 3;
      scores['cdn-security-rgpd'] += 1;
      scores['database-essential'] += 2; // Bases de données importantes pour e-commerce
      break;
    case 'saas':
      scores['cdn-security-rgpd'] += 3;
      scores['cdn-security'] += 1;
      scores['database-essential'] += 2;
      break;
    case 'multilingual':
      scores['cdn-security'] += 2;
      scores['cdn-security-rgpd'] += 2;
      break;
  }

  // Critère "Portée géographique"
  switch (answers.geographicScope) {
    case 'national':
      scores.wordpress += 1;
      scores['cdn-basic'] += 1;
      scores['visibilite-pro'] += 2; // Visibilité locale importante
      break;
    case 'international':
      scores['cdn-security'] += 2;
      scores['cdn-security-rgpd'] += 2;
      break;
  }

  // Critère "Secteur d'activité"
  switch (answers.businessSector) {
    case 'ecommerce':
      scores['cdn-security'] += 1;
      scores['cdn-security-rgpd'] += 1;
      scores['database-essential'] += 1;
      break;
    case 'services':
      scores['cdn-basic'] += 1;
      scores['cdn-security'] += 1;
      scores['visibilite-pro'] += 2; // Important pour les services locaux
      break;
    case 'creative':
      scores.wordpress += 1;
      scores['cdn-basic'] += 1;
      break;
    case 'tech':
      scores['cdn-security-rgpd'] += 2;
      scores['database-essential'] += 1;
      break;
    case 'nonprofit':
      scores.wordpress += 2;
      scores.letsencrypt += 1; // SSL gratuit important
      break;
  }

  // SSL (Let's Encrypt) est toujours recommandé
  scores.letsencrypt += 1;

  return scores;
}

/**
 * Détermine le pack recommandé basé sur les scores
 * En cas d'égalité, privilégie le pack de niveau supérieur
 */
export function getRecommendedPack(scores: PackScores): RecommendedPack {
  const packIds: RecommendedPack[] = [
    'cdn-security-rgpd',
    'cdn-security',
    'cdn-basic',
    'visibilite-pro',
    'database-essential',
    'wordpress',
    'letsencrypt',
  ];

  let maxScore = -1;
  let recommendedPack: RecommendedPack = 'cdn-security'; // Par défaut

  packIds.forEach(packId => {
    const score = scores[packId] || 0;
    if (score > maxScore) {
      maxScore = score;
      recommendedPack = packId;
    }
  });

  return recommendedPack;
}

/**
 * Génère une explication personnalisée pour la recommandation
 */
export function getRecommendationExplanation(
  recommendedPack: RecommendedPack,
  answers: QuestionnaireAnswers,
  scores: PackScores
): string {
  const packNames: Record<RecommendedPack, string> = {
    wordpress: 'Pack WordPress',
    letsencrypt: 'Let\'s Encrypt (SSL Gratuit)',
    'cdn-basic': 'CDN Basic',
    'cdn-security': 'CDN Security',
    'cdn-security-rgpd': 'CDN Security (RGPD)',
    'database-essential': 'Database Essential',
    'visibilite-pro': 'Visibilité Pro (Google Maps)',
  };

  const reasons: string[] = [];

  // Raisons basées sur les critères
  if (answers.employeeCount === '50+') {
    reasons.push('votre entreprise de grande taille');
  } else if (answers.employeeCount === '21-50') {
    reasons.push('votre équipe importante');
  }

  if (answers.siteType === 'ecommerce') {
    reasons.push('votre site e-commerce nécessite sécurité et performance');
  } else if (answers.siteType === 'saas') {
    reasons.push('votre application web/SaaS requiert sécurité et conformité');
  } else if (answers.siteType === 'vitrine') {
    reasons.push('votre site vitrine bénéficiera de la visibilité locale');
  }

  if (answers.geographicScope === 'international') {
    reasons.push('votre portée internationale nécessite un CDN performant');
  } else if (answers.geographicScope === 'national') {
    reasons.push('votre activité nationale bénéficiera de la visibilité locale');
  }

  if (answers.businessSector === 'tech') {
    reasons.push('votre secteur technologique nécessite sécurité et conformité');
  } else if (answers.businessSector === 'services') {
    reasons.push('votre secteur de services bénéficiera de la visibilité locale');
  }

  const baseExplanation = `Nous recommandons le ${packNames[recommendedPack]}`;
  
  if (reasons.length > 0) {
    return `${baseExplanation} car ${reasons.join(', ')} et une infrastructure adaptée à vos besoins.`;
  }

  return `${baseExplanation} car il correspond le mieux à votre profil selon nos critères d'analyse.`;
}
