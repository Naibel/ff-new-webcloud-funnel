import recommendationsData from '../data/recommendations.json';

export interface QuestionnaireAnswers {
  organizationSize?: string;
  siteType?: string;
  geographicScope?: string;
  activitySector?: string;
}

export interface Recommendation {
  pack: string;
  packName: string;
  diskSpace: string;
  domains: string[];
  emailsNeeded: number;
  emailsIncluded: number;
  options: string[];
}

// Mapping des valeurs du questionnaire vers les valeurs du CSV
const siteTypeMap: Record<string, string> = {
  vitrine: 'Site Vitrine (blog, media...)',
  commerce: 'Site de e-commerce (boutique en ligne)',
  application: 'Application Web (outil Tech)',
  autre: 'Autre',
};

const scopeMap: Record<string, string> = {
  regionale: 'Locale',
  national: 'Nationale',
  european: 'Européenne',
  international: 'Mondiale',
};

const teamSizeMap: Record<string, string> = {
  freelance: '1 personne',
  tpe: '2-10 personnes',
  pme: '10-50 personnes',
  large: 'Plus de 50 personnes',
};

const sectorMap: Record<string, string> = {
  startups: 'Startups',
  entrepreneurs: 'Créateurs d\'entreprises',
  creatives: 'Projets créatifs',
  health: 'Professionnels de la santé et du bien-être',
};

/**
 * Trouve la recommandation correspondante aux réponses du questionnaire
 */
export function getRecommendation(answers: QuestionnaireAnswers): Recommendation | null {
  // Mapper les valeurs du questionnaire vers les valeurs du CSV
  const siteType = answers.siteType ? siteTypeMap[answers.siteType] : null;
  const scope = answers.geographicScope ? scopeMap[answers.geographicScope] : null;
  const teamSize = answers.organizationSize ? teamSizeMap[answers.organizationSize] : null;
  const sector = answers.activitySector ? sectorMap[answers.activitySector] : null;

  // Si toutes les valeurs ne sont pas présentes, retourner null
  if (!siteType || !scope || !teamSize || !sector) {
    return null;
  }

  // Rechercher la recommandation correspondante
  const recommendation = recommendationsData.find(
    (rec) =>
      rec.siteType === siteType &&
      rec.scope === scope &&
      rec.teamSize === teamSize &&
      rec.sector === sector
  );

  if (!recommendation) {
    return null;
  }

  return {
    pack: recommendation.pack,
    packName: recommendation.packName,
    diskSpace: recommendation.diskSpace,
    domains: recommendation.domains,
    emailsNeeded: recommendation.emailsNeeded,
    emailsIncluded: recommendation.emailsIncluded,
    options: recommendation.options,
  };
}
