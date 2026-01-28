import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import OdsIcon from '../components/OdsIcon';
import { getRecommendation } from '../utils/getRecommendation';

// Prix des extensions de domaine (doit correspondre à DomainSelection.tsx)
const domainExtensionPrices: Record<string, number> = {
  '.fr': 7.79,
  '.com': 13.49,
  '.eu': 8.49,
  '.net': 14.99,
  '.org': 12.99,
  '.io': 51.99,
  '.tech': 45.99,
  '.store': 25.99,
  '.shop': 25.99,
  '.ovh': 8.99,
};

// Fonction pour obtenir le prix d'un domaine à partir de son nom complet
const getDomainPrice = (domainFull: string): number => {
  for (const [ext, price] of Object.entries(domainExtensionPrices)) {
    if (domainFull.endsWith(ext)) {
      return price;
    }
  }
  return 0; // Prix par défaut si extension non trouvée
};

const hostingPacks = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1.59,
    tagline: 'Parfait pour démarrer',
    icon: 'play',
    color: 'from-primary-400 to-primary-500',
    features: ['10 Go d\'espace SSD', '2 adresses email', 'Trafic illimité', 'SSL Let\'s Encrypt inclus par défaut'],
  },
  {
    id: 'perso',
    name: 'Perso',
    price: 3.29,
    tagline: 'Pour les équipes en croissance',
    icon: 'users',
    color: 'from-primary-500 to-primary-600',
    features: ['100 Go d\'espace SSD', '10 adresses email', 'Trafic illimité', 'SSL Let\'s Encrypt inclus par défaut'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 6.59,
    tagline: 'Pour les professionnels exigeants',
    icon: 'award',
    color: 'from-primary-500 to-primary-600',
    features: ['250 Go d\'espace SSD', '100 adresses email', 'Trafic illimité', 'SSL Let\'s Encrypt inclus par défaut', 'Support prioritaire'],
    recommended: true,
  },
  {
    id: 'performance',
    name: 'Performance',
    price: 10.99,
    tagline: 'Haute performance garantie',
    icon: 'zap',
    color: 'from-primary-600 to-primary-700',
    features: ['500 Go d\'espace SSD', 'Emails illimités', '99,99% disponibilité', 'SSL Let\'s Encrypt inclus par défaut', 'Support 24/7'],
    performanceLevels: [
      { id: 1, name: 'Performance 1', cores: 2, ram: 4, price: 10.99, pricePerYear: 131.88 },
      { id: 2, name: 'Performance 2', cores: 4, ram: 8, price: 20.89, pricePerYear: 250.68 },
      { id: 3, name: 'Performance 3', cores: 6, ram: 12, price: 29.69, pricePerYear: 356.28 },
      { id: 4, name: 'Performance 4', cores: 8, ram: 16, price: 37.39, pricePerYear: 448.68 },
    ],
  },
];

export default function HostingSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionnaire, domains } = location.state || {};
  
  // Obtenir la recommandation basée sur le questionnaire
  const recommendation = useMemo(() => {
    if (!questionnaire) return null;
    // Créer une copie stable des réponses pour éviter les problèmes de mutation
    const answers = {
      organizationSize: questionnaire.organizationSize,
      siteType: questionnaire.siteType,
      geographicScope: questionnaire.geographicScope,
      activitySector: questionnaire.activitySector,
    };
    return getRecommendation(answers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    questionnaire?.organizationSize,
    questionnaire?.siteType,
    questionnaire?.geographicScope,
    questionnaire?.activitySector,
  ]);
  
  // Déterminer le pack recommandé basé sur la recommandation CSV
  const recommendedPackId = useMemo(() => {
    if (recommendation && recommendation.pack) {
      return recommendation.pack;
    }
    // Fallback vers le pack Pro par défaut
    return hostingPacks.find(p => p.recommended)?.id || 'pro';
  }, [recommendation]);
  
  // Créer une copie des packs avec le pack recommandé marqué dynamiquement
  const packsWithRecommendation = useMemo(() => {
    return hostingPacks.map(pack => ({
      ...pack,
      recommended: pack.id === recommendedPackId,
    }));
  }, [recommendedPackId]);
  
  // Trier les packs pour mettre le recommandé en premier
  const sortedPacks = useMemo(() => {
    return [...packsWithRecommendation].sort((a, b) => {
      if (a.recommended && !b.recommended) return -1;
      if (!a.recommended && b.recommended) return 1;
      return 0;
    });
  }, [packsWithRecommendation]);
  
  // Initialiser les options recommandées basées sur le CSV
  const initialOptions = useMemo(() => {
    const defaultOptions: Record<string, {
      sqlDatabase: boolean;
      cdnPremium: boolean;
      sslOption: boolean;
      visibilityPro: boolean;
    }> = {
      starter: { sqlDatabase: false, cdnPremium: false, sslOption: false, visibilityPro: false },
      perso: { sqlDatabase: false, cdnPremium: false, sslOption: false, visibilityPro: false },
      pro: { sqlDatabase: false, cdnPremium: false, sslOption: false, visibilityPro: false },
      performance: { sqlDatabase: false, cdnPremium: false, sslOption: false, visibilityPro: false },
    };
    
    if (recommendation && recommendation.options.length > 0) {
      const packId = recommendation.pack;
      const packOptions = { ...defaultOptions[packId] };
      
      recommendation.options.forEach(option => {
        if (option.includes('Web Cloud Databases')) {
          packOptions.sqlDatabase = true;
        }
        if (option.includes('CDN')) {
          packOptions.cdnPremium = true;
        }
        if (option.includes('SSL Sectigo EV')) {
          packOptions.sslOption = true;
        }
      });
      
      defaultOptions[packId] = packOptions;
    }
    
    return defaultOptions;
  }, [recommendation]);
  
  // Initialiser le pack sélectionné avec le pack recommandé
  // Utiliser une fonction d'initialisation lazy pour éviter les problèmes de dépendances
  const [selectedPack, setSelectedPack] = useState(() => {
    // Calculer la valeur initiale directement
    if (questionnaire) {
      const rec = getRecommendation({
        organizationSize: questionnaire.organizationSize,
        siteType: questionnaire.siteType,
        geographicScope: questionnaire.geographicScope,
        activitySector: questionnaire.activitySector,
      });
      if (rec && rec.pack) {
        return rec.pack;
      }
    }
    return hostingPacks.find(p => p.recommended)?.id || 'pro';
  });
  
  // Mettre à jour le pack sélectionné quand la recommandation change (seulement au montage initial)
  useEffect(() => {
    if (recommendedPackId) {
      setSelectedPack(recommendedPackId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Exécuter seulement au montage
  
  const packConfigs: Record<string, { storage: number; emails: number }> = {
    starter: { storage: 10, emails: 2 },
    perso: { storage: 100, emails: 10 },
    pro: { storage: 250, emails: 100 },
    performance: { storage: 500, emails: 1000 },
  };
  const [selectedPerformanceLevel, setSelectedPerformanceLevel] = useState(1);
  const [options, setOptions] = useState<Record<string, {
    sqlDatabase: boolean;
    cdnPremium: boolean;
    sslOption: boolean;
    visibilityPro: boolean;
  }>>(initialOptions);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);
  const [databaseSystem, setDatabaseSystem] = useState<Record<string, string>>({
    starter: 'mysql',
    perso: 'mysql',
    pro: 'mysql',
    performance: 'mysql',
  });
  const [databaseConfig, setDatabaseConfig] = useState<Record<string, string>>({
    starter: '512mb-8gb',
    perso: '512mb-8gb',
    pro: '512mb-8gb',
    performance: '512mb-8gb',
  });
  const [cdnConfig, setCdnConfig] = useState<Record<string, string>>({
    starter: 'basique',
    perso: 'basique',
    pro: 'basique',
    performance: 'basique',
  });
  // Initialiser la configuration SSL avec Sectigo EV si recommandé
  const initialSslConfig = useMemo(() => {
    const defaultConfig: Record<string, string> = {
      starter: 'letsencrypt',
      perso: 'letsencrypt',
      pro: 'letsencrypt',
      performance: 'letsencrypt',
    };
    
    if (recommendation && recommendation.options.some(opt => opt.includes('SSL Sectigo EV'))) {
      const packId = recommendation.pack;
      defaultConfig[packId] = 'sectigo-ev';
    }
    
    return defaultConfig;
  }, [recommendation]);
  
  // sslConfig utilisé dans handleContinue pour passer la configuration SSL
  // setSslConfig peut être utilisé plus tard si on veut permettre à l'utilisateur de modifier la config SSL
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sslConfig, setSslConfig] = useState<Record<string, string>>(initialSslConfig);
  const [selectedCms, setSelectedCms] = useState<Record<string, string>>({
    starter: 'none',
    perso: 'none',
    pro: 'none',
    performance: 'none',
  });

  const cmsOptions = [
    { id: 'none', name: 'Sans module pré-installé', icon: 'minus-circle' },
    { id: 'wordpress', name: 'WordPress', icon: 'edit' },
    { id: 'drupal', name: 'Drupal', icon: 'globe' },
    { id: 'joomla', name: 'Joomla!', icon: 'layout' },
    { id: 'prestashop', name: 'PrestaShop', icon: 'shopping-cart' },
  ];

  // Note: CMS validation is handled in the UI by filtering available options

  const databaseSystems = [
    { id: 'mysql', name: 'MySQL' },
    { id: 'postgresql', name: 'PostgreSQL' },
    { id: 'mariadb', name: 'MariaDB' },
    { id: 'mongodb', name: 'MongoDB' },
  ];

  const databaseConfigs = [
    { id: '512mb-8gb', name: '512MB RAM / 8GB stockage', price: 0 },
    { id: '1gb-16gb', name: '1GB RAM / 16GB stockage', price: 10.99 },
    { id: '2gb-32gb', name: '2GB RAM / 32GB stockage', price: 21.99 },
    { id: '4gb-64gb', name: '4GB RAM / 64GB stockage', price: 43.99 },
  ];

  const cdnConfigs = [
    { id: 'basique', name: 'Basique', price: 2.19 },
    { id: 'securite', name: 'Sécurité', price: 5.49 },
    { id: 'avance', name: 'Avancé', price: 10.99 },
  ];

  const sslConfigs = [
    { id: 'letsencrypt', name: 'SSL Let\'s Encrypt', price: 0 },
    { id: 'sectigo-dv', name: 'SSL Sectigo DV', price: 4.58 },
    { id: 'sectigo-ev', name: 'SSL Sectigo EV', price: 9.17 },
  ];

  const optionDescriptions = {
    sqlDatabase: 'Serveur de base de données dédié pour vos données produits, clients et applications web. Choisissez votre système de gestion et la configuration mémoire adaptée à vos besoins.',
    cdnPremium: 'CDN : Optimisez le trafic de votre site web pour une expérience utilisateur optimale.',
    sslOption: 'Les certificats SSL sécurisent les échanges de données entre le serveur de votre site web et le navigateur de vos visiteurs (informations de connexion, de transactions bancaires, etc).',
    visibilityPro: 'Service de référencement professionnel pour améliorer votre visibilité sur les moteurs de recherche. Optimisation SEO, soumission dans les annuaires et suivi des performances. Tarif année supplémentaire : 21,99€/mois.',
  };

  const selectedPackData = packsWithRecommendation.find(p => p.id === selectedPack)!;
  const selectedConfig = packConfigs[selectedPack];

  const calculatePackPrice = (packId: string) => {
    const pack = hostingPacks.find(p => p.id === packId);
    if (!pack) return 0;
    
    // Si c'est le pack Performance, retourner le prix du niveau sélectionné
    if (packId === 'performance' && pack.performanceLevels) {
      const level = pack.performanceLevels.find(l => l.id === selectedPerformanceLevel);
      return level ? level.price : pack.price;
    }
    
    return pack.price;
  };

  const totalPrice = calculatePackPrice(selectedPack);
  
  // Calcul du prix de la base de données selon la configuration pour un pack donné
  const getDatabasePrice = (packId: string) => {
    const packOptions = options[packId] || { sqlDatabase: false };
    if (!packOptions.sqlDatabase) return 0;
    const config = databaseConfigs.find(c => c.id === databaseConfig[packId]);
    return config ? config.price : 0;
  };

  // Calcul du prix CDN selon la configuration pour un pack donné
  const getCdnPrice = (packId: string) => {
    const packOptions = options[packId] || { cdnPremium: false };
    if (!packOptions.cdnPremium) return 0;
    const config = cdnConfigs.find(c => c.id === cdnConfig[packId]);
    return config ? config.price : 0;
  };

  // Calcul du prix SSL selon la configuration pour un pack donné
  const getSslPrice = (packId: string) => {
    const packOptions = options[packId] || { sslOption: false };
    if (!packOptions.sslOption) return 0;
    const config = sslConfigs.find(c => c.id === sslConfig[packId]);
    return config ? config.price : 0;
  };

  // Calcul du prix Visibilité Pro (16,49€ par mois première année, 21,99€ par mois années suivantes) pour un pack donné
  const getVisibilityProPrice = (packId: string) => {
    const packOptions = options[packId] || { visibilityPro: false };
    if (!packOptions.visibilityPro) return 0;
    return 16.49; // Prix mensuel première année
  };

  const optionsPrice = getDatabasePrice(selectedPack) + 
                      getCdnPrice(selectedPack) + 
                      getSslPrice(selectedPack) +
                      getVisibilityProPrice(selectedPack);

  const handleContinue = () => {
    const packData = hostingPacks.find(p => p.id === selectedPack);
    let hostingConfig = selectedConfig;
    
    // Si c'est le pack Performance, utiliser les infos du niveau sélectionné
    if (selectedPack === 'performance' && packData?.performanceLevels) {
      const level = packData.performanceLevels.find(l => l.id === selectedPerformanceLevel);
      if (level) {
        hostingConfig = {
          storage: 500,
          emails: 1000,
          ...(level.cores && { cores: level.cores }),
          ...(level.ram && { ram: level.ram }),
          ...(level.name && { performanceLevel: level.name }),
        };
      }
    }
    
    const packOptions = options[selectedPack] || { sqlDatabase: false, cdnPremium: false, sslOption: false, visibilityPro: false };
    
    navigate('/summary', {
      state: {
        questionnaire,
        domains,
        hosting: selectedPack,
        hostingConfig,
        hostingPrice: totalPrice,
        options: packOptions,
        optionsPrice,
        databaseConfig: packOptions.sqlDatabase ? {
          system: databaseSystem[selectedPack],
          config: databaseConfig[selectedPack],
          price: getDatabasePrice(selectedPack),
        } : null,
        cdnConfig: packOptions.cdnPremium ? {
          level: cdnConfig[selectedPack],
          price: getCdnPrice(selectedPack),
        } : null,
        sslConfig: packOptions.sslOption ? {
          type: sslConfig[selectedPack],
          price: getSslPrice(selectedPack),
        } : null,
        visibilityProConfig: packOptions.visibilityPro ? {
          firstYearPrice: 16.49,
          followingYearsPrice: 21.99,
          monthlyPrice: getVisibilityProPrice(selectedPack),
        } : null,
        cmsConfig: {
          pack: selectedPack,
          cms: selectedCms[selectedPack],
        },
      },
    });
  };

  return (
    <div className="ovh-page pb-32">
      <div className="ovh-container">
        {/* Bouton Retour */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/domain', { state: { questionnaire, domains } })}
          className="mb-6 flex items-center gap-2 text-neutral-600 hover:text-primary-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Retour</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span>Étape 2/3</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Choisissez votre hébergement
          </h1>
          <p className="text-neutral-600 text-lg">
            Nous avons présélectionné le pack le plus adapté à vos besoins
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Packs Column */}
          <div className="lg:col-span-2">
            {sortedPacks.map((pack, idx) => {
              const isSelected = selectedPack === pack.id;
              const packPrice = calculatePackPrice(pack.id);
              const isRecommended = pack.recommended;
              
              return (
                <div key={pack.id} className={isRecommended ? 'mb-8' : 'mb-4'}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => setSelectedPack(pack.id)}
                    className={`ovh-card cursor-pointer transition-all overflow-hidden ${
                      isSelected
                        ? 'ring-2 ring-primary-500 shadow-lg'
                        : 'hover:shadow-md'
                    } ${
                      isRecommended 
                        ? 'border-l-4 border-l-primary-500 bg-gradient-to-r from-primary-50/50 to-white' 
                        : ''
                    }`}
                  >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Icon & Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-14 h-14 bg-gradient-to-br ${pack.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <OdsIcon name={pack.icon} size="lg" color="white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-neutral-900">{pack.name}</h3>
                          {pack.recommended && (
                            <span className="ovh-badge-primary flex items-center gap-1">
                              <OdsIcon name="star" size="xs" />
                              Recommandé
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-600 text-sm mb-3">{pack.tagline}</p>
                        
                        {/* Features */}
                        <div className="flex flex-wrap gap-2">
                          {pack.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-md">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price & Selection */}
                    <div className="flex items-center gap-4 md:flex-col md:items-end">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-neutral-900">
                          {packPrice.toFixed(2)} €
                          <span className="text-sm font-normal text-neutral-500">/mois</span>
                        </div>
                        <div className="text-xs text-neutral-500">
                          soit {(packPrice * 12).toFixed(2)} €/an HT
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'bg-primary-500 border-primary-500' : 'border-neutral-300'
                      }`}>
                        {isSelected && (
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Configuration - Performance Levels */}
                  {isSelected && pack.performanceLevels && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 pt-6 border-t border-neutral-200"
                    >
                      <h4 className="font-semibold text-neutral-900 mb-4">Choisissez le niveau de performance</h4>
                      <p className="text-sm text-neutral-600 mb-4">
                        Vous pouvez basculer d'un niveau à l'autre à tout moment pour accompagner la croissance de votre projet
                      </p>
                      <div className="grid grid-cols-4 gap-3">
                        {pack.performanceLevels.map((level) => {
                          const isLevelSelected = selectedPerformanceLevel === level.id;
                          return (
                            <motion.button
                              key={level.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPerformanceLevel(level.id);
                              }}
                              className={`text-center p-3 rounded-lg border-2 transition-all ${
                                isLevelSelected
                                  ? 'border-primary-500 shadow-md ovh-selectable-selected'
                                  : 'border-neutral-200 hover:border-primary-300 ovh-selectable'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center justify-center mb-2">
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                  isLevelSelected ? 'bg-primary-500 border-primary-500' : 'border-neutral-300'
                                }`}>
                                  {isLevelSelected && (
                                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                              <h5 className={`text-sm font-bold mb-1 ${isLevelSelected ? 'text-primary-700' : 'text-neutral-900'}`}>
                                {level.name}
                              </h5>
                              <div className="text-xs text-neutral-600 mb-2">
                                {level.cores} vCore • {level.ram} Go RAM
                              </div>
                              <div className={`text-lg font-bold ${isLevelSelected ? 'text-primary-600' : 'text-neutral-900'}`}>
                                {level.price.toFixed(2)} €
                              </div>
                              <div className="text-xs text-neutral-500">/mois</div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* CMS Selection */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 pt-6 border-t border-neutral-200"
                    >
                      <h4 className="font-semibold text-neutral-900 mb-4">Choisissez votre système de gestion de contenu (CMS) pré-installé</h4>
                      <div className={`grid gap-3 ${
                        pack.id === 'starter' ? 'grid-cols-2' : 
                        pack.id === 'pro' || pack.id === 'performance' ? 'grid-cols-5' : 
                        'grid-cols-4'
                      }`}>
                        {cmsOptions
                          .filter((cms) => {
                            // Pour Starter, ne proposer que 'none' et 'wordpress'
                            if (pack.id === 'starter') {
                              return cms.id === 'none' || cms.id === 'wordpress';
                            }
                            // Pour Perso, exclure PrestaShop
                            if (pack.id === 'perso') {
                              return cms.id !== 'prestashop';
                            }
                            // Pour Pro et Performance, toutes les options sont disponibles
                            return true;
                          })
                          .map((cms) => {
                            const isCmsSelected = selectedCms[pack.id] === cms.id;
                            return (
                              <motion.button
                                key={cms.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCms({ ...selectedCms, [pack.id]: cms.id });
                                }}
                                className={`text-center p-3 rounded-lg border-2 transition-all ${
                                  isCmsSelected
                                    ? 'border-primary-500 bg-primary-50 shadow-md'
                                    : 'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50/50'
                                }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <div className="mb-2 flex items-center justify-center">
                                  <OdsIcon name={cms.icon} size="md" color={isCmsSelected ? 'var(--ods-color-primary-600)' : 'var(--ods-color-neutral-500)'} />
                                </div>
                                <div className={`text-xs font-medium ${isCmsSelected ? 'text-primary-700' : 'text-neutral-700'}`}>
                                  {cms.name}
                                </div>
                                <div className="mt-2">
                                  <div className={`w-4 h-4 rounded-full border-2 mx-auto ${
                                    isCmsSelected ? 'bg-primary-500 border-primary-500' : 'border-neutral-300'
                                  }`}>
                                    {isCmsSelected && (
                                      <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                </div>
                              </motion.button>
                            );
                          })}
                      </div>
                    </motion.div>
                  )}

                  {/* Options recommandées */}
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 pt-6 border-t border-neutral-200"
                    >
                      <h4 className="font-semibold text-neutral-900 mb-4">Options recommandées</h4>
                      <div className="space-y-4">
                        {([
                          { id: 'sqlDatabase', name: 'Base de données', price: null as number | null },
                          { id: 'cdnPremium', name: 'Optimisation du trafic', price: null as number | null },
                        ] as const)
                        .filter((option) => {
                          // Ne pas afficher l'option Base de données si Starter est sélectionné
                          if (option.id === 'sqlDatabase' && pack.id === 'starter') {
                            return false;
                          }
                          return true;
                        })
                        .map((option) => (
                          <div key={option.id} className="relative">
                            <label className="flex items-center justify-between cursor-pointer group" onClick={(e) => e.stopPropagation()}>
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-neutral-800 group-hover:text-primary-600 transition-colors">
                                    {option.name}
                                  </span>
                                  <div
                                    className="relative"
                                    onMouseEnter={() => setHoveredInfo(option.id)}
                                    onMouseLeave={() => setHoveredInfo(null)}
                                  >
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setHoveredInfo(hoveredInfo === option.id ? null : option.id);
                                      }}
                                      className="w-5 h-5 rounded-full bg-neutral-200 hover:bg-primary-100 text-neutral-600 hover:text-primary-600 flex items-center justify-center transition-colors group/info"
                                      aria-label="Plus d'informations"
                                    >
                                      <svg
                                        className="w-3 h-3"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </button>
                                    {hoveredInfo === option.id && (
                                      <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 5 }}
                                        className="absolute left-0 bottom-full mb-2 w-72 p-4 bg-neutral-900 text-white text-xs rounded-lg shadow-2xl z-50"
                                      >
                                        <p className="leading-relaxed">
                                          {optionDescriptions[option.id as keyof typeof optionDescriptions]}
                                        </p>
                                        <div className="absolute left-6 top-full w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-neutral-900"></div>
                                      </motion.div>
                                    )}
                                  </div>
                                </div>
                                {option.price !== null && option.price !== undefined && (
                                  <span className="block text-sm text-neutral-500">+{option.price.toFixed(2)} €/mois</span>
                                )}
                                {option.id === 'sqlDatabase' && options[pack.id]?.sqlDatabase && (
                                  <span className="block text-sm text-primary-600 font-medium mt-1">
                                    +{getDatabasePrice(pack.id).toFixed(2)} €/mois
                                  </span>
                                )}
                                {option.id === 'cdnPremium' && options[pack.id]?.cdnPremium && (
                                  <span className="block text-sm text-primary-600 font-medium mt-1">
                                    +{getCdnPrice(pack.id).toFixed(2)} €/mois
                                  </span>
                                )}
                              </div>
                              <input
                                type="checkbox"
                                checked={options[pack.id]?.[option.id as keyof typeof options[string]] || false}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  setOptions({
                                    ...options,
                                    [pack.id]: {
                                      ...options[pack.id],
                                      [option.id]: e.target.checked,
                                    },
                                  });
                                }}
                                className="ovh-checkbox"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </label>
                            
                            {/* Configuration de la base de données */}
                            {option.id === 'sqlDatabase' && options[pack.id]?.sqlDatabase && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-neutral-200 space-y-4"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {/* Sélecteur système de gestion */}
                                <div>
                                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Système de gestion de base de données
                                  </label>
                                  <select
                                    value={databaseSystem[pack.id] || 'mysql'}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      setDatabaseSystem({
                                        ...databaseSystem,
                                        [pack.id]: e.target.value,
                                      });
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-neutral-900"
                                  >
                                    {databaseSystems.map((system) => (
                                      <option key={system.id} value={system.id}>
                                        {system.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>

                                {/* Sélecteur configuration mémoire */}
                                <div>
                                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Configuration mémoire et stockage
                                  </label>
                                  <select
                                    value={databaseConfig[pack.id] || '512mb-8gb'}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      setDatabaseConfig({
                                        ...databaseConfig,
                                        [pack.id]: e.target.value,
                                      });
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-neutral-900"
                                  >
                                    {databaseConfigs.map((config) => (
                                      <option key={config.id} value={config.id}>
                                        {config.name} - {config.price.toFixed(2)} €/mois
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </motion.div>
                            )}

                            {/* Configuration CDN */}
                            {option.id === 'cdnPremium' && options[pack.id]?.cdnPremium && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-4 pt-4 border-t border-neutral-200"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div>
                                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                                    Niveau d'optimisation
                                  </label>
                                  <select
                                    value={cdnConfig[pack.id] ?? 'basique'}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      setCdnConfig({
                                        ...cdnConfig,
                                        [pack.id]: e.target.value,
                                      });
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white text-neutral-900"
                                  >
                                    {cdnConfigs.map((config) => (
                                      <option key={config.id} value={config.id}>
                                        {config.name} - {config.price.toFixed(2)} €/mois
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
                {isRecommended && (
                  <div className="mt-6 mb-2 flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-primary-200 to-transparent"></div>
                    <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider">Autres offres</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-primary-200 to-transparent"></div>
                  </div>
                )}
              </div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="ovh-card-primary sticky top-4"
            >
              <h3 className="font-bold text-neutral-900 mb-4">Votre sélection</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-600">Domaines</span>
                    <span className="font-semibold">{domains?.length || 0} sélectionné(s)</span>
                  </div>
                  {domains && Array.isArray(domains) && domains.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {(domains as string[]).map((domain, index) => {
                        const domainPrice = getDomainPrice(domain);
                        const isFirstDomain = index === 0;
                        return (
                          <div key={index} className="text-xs text-neutral-500 pl-2 border-l-2 border-primary-200 flex justify-between items-center">
                            <div className="flex flex-col">
                              <span>{domain}</span>
                              {isFirstDomain && (
                                <span className="text-primary-600 font-medium text-[10px] mt-0.5">
                                  Gratuit la première année
                                </span>
                              )}
                            </div>
                            {domainPrice > 0 && (
                              <span className={`font-medium ml-2 ${isFirstDomain ? 'text-primary-600 line-through' : 'text-neutral-600'}`}>
                                {domainPrice.toFixed(2)} €/an
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-neutral-600">Hébergement</span>
                    <span className="font-semibold">{totalPrice.toFixed(2)} €/mois</span>
                  </div>
                  <div className="text-xs text-neutral-500 pl-2 border-l-2 border-primary-200">
                    {selectedPackData.name}
                  </div>
                </div>
                {optionsPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Options</span>
                    <span className="font-semibold">+{optionsPrice.toFixed(2)} €/mois</span>
                  </div>
                )}
                
                <div className="border-t border-primary-200 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-neutral-900">Total mensuel HT</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {(totalPrice + optionsPrice).toFixed(2)} €
                    </span>
                  </div>
                  <div className="text-right text-xs text-neutral-500 mt-1">
                    soit {((totalPrice + optionsPrice) * 12).toFixed(2)} €/an HT
                  </div>
                </div>
              </div>
              
              <button
                onClick={handleContinue}
                className="ovh-btn-primary w-full mt-6"
              >
                Continuer
                <span className="ml-2">→</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
