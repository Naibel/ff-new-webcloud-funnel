import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const hostingPacks = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1.19,
    tagline: 'Parfait pour démarrer',
    icon: '🌱',
    color: 'from-green-400 to-emerald-500',
    features: ['10 Go d\'espace SSD', '2 adresses email', 'Trafic illimité', 'SSL gratuit inclus'],
  },
  {
    id: 'perso',
    name: 'Perso',
    price: 2.99,
    tagline: 'Pour les équipes en croissance',
    icon: '🚀',
    color: 'from-blue-400 to-indigo-500',
    features: ['100 Go d\'espace SSD', '10 adresses email', 'Trafic illimité', 'SSL gratuit inclus'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 5.99,
    tagline: 'Pour les professionnels exigeants',
    icon: '⭐',
    color: 'from-primary-500 to-primary-600',
    features: ['250 Go d\'espace SSD', '100 adresses email', 'Trafic illimité', 'SSL gratuit inclus', 'Support prioritaire'],
    recommended: true,
  },
  {
    id: 'performance',
    name: 'Performance',
    price: 11.99,
    tagline: 'Haute performance garantie',
    icon: '💎',
    color: 'from-purple-500 to-pink-500',
    features: ['500 Go d\'espace SSD', 'Emails illimités', '99,99% disponibilité', 'SSL gratuit inclus', 'Support 24/7'],
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
  
  const recommendedPack = hostingPacks.find(p => p.recommended) || hostingPacks[2];
  
  const [selectedPack, setSelectedPack] = useState(recommendedPack.id);
  const [packConfigs, setPackConfigs] = useState<Record<string, { storage: number; emails: number }>>({
    starter: { storage: 10, emails: 2 },
    perso: { storage: 100, emails: 10 },
    pro: { storage: 250, emails: 100 },
    performance: { storage: 500, emails: 1000 },
  });
  const [selectedPerformanceLevel, setSelectedPerformanceLevel] = useState(1);
  const [options, setOptions] = useState({
    sqlDatabase: false,
    cdnPremium: false,
    extraBackup: false,
  });

  const selectedPackData = hostingPacks.find(p => p.id === selectedPack)!;
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
  const optionsPrice = (options.sqlDatabase ? 4.99 : 0) + 
                      (options.cdnPremium ? 9.99 : 0) + 
                      (options.extraBackup ? 2.99 : 0);

  const handleContinue = () => {
    const packData = hostingPacks.find(p => p.id === selectedPack);
    let hostingConfig = selectedConfig;
    
    // Si c'est le pack Performance, utiliser les infos du niveau sélectionné
    if (selectedPack === 'performance' && packData?.performanceLevels) {
      const level = packData.performanceLevels.find(l => l.id === selectedPerformanceLevel);
      if (level) {
        hostingConfig = {
          storage: 500, // Stockage de base pour Performance
          emails: 1000, // Emails de base pour Performance
          cores: level.cores,
          ram: level.ram,
          performanceLevel: level.name,
        };
      }
    }
    
    navigate('/funnel/summary', {
      state: {
        questionnaire,
        domains,
        hosting: selectedPack,
        hostingConfig,
        hostingPrice: totalPrice,
        options,
        optionsPrice,
      },
    });
  };

  return (
    <div className="ovh-page pb-32">
      <div className="ovh-container">
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
          <div className="lg:col-span-2 space-y-4">
            {hostingPacks.map((pack, idx) => {
              const isSelected = selectedPack === pack.id;
              const packPrice = calculatePackPrice(pack.id);
              
              return (
                <motion.div
                  key={pack.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => setSelectedPack(pack.id)}
                  className={`ovh-card cursor-pointer transition-all ${
                    isSelected
                      ? 'ring-2 ring-primary-500 shadow-lg'
                      : 'hover:shadow-md'
                  } ${pack.recommended ? 'border-l-4 border-l-primary-500' : ''}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    {/* Icon & Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-14 h-14 bg-gradient-to-br ${pack.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <span className="text-2xl">{pack.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-neutral-900">{pack.name}</h3>
                          {pack.recommended && (
                            <span className="ovh-badge-primary">⭐ Recommandé</span>
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
                      <div className="grid md:grid-cols-2 gap-4">
                        {pack.performanceLevels.map((level) => {
                          const isLevelSelected = selectedPerformanceLevel === level.id;
                          return (
                            <motion.button
                              key={level.id}
                              onClick={() => setSelectedPerformanceLevel(level.id)}
                              className={`text-left p-4 rounded-xl border-2 transition-all ${
                                isLevelSelected
                                  ? 'border-primary-500 bg-primary-50 shadow-md'
                                  : 'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50/50'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <h5 className={`font-bold ${isLevelSelected ? 'text-primary-700' : 'text-neutral-900'}`}>
                                  {level.name}
                                </h5>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                  isLevelSelected ? 'bg-primary-500 border-primary-500' : 'border-neutral-300'
                                }`}>
                                  {isLevelSelected && (
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                              </div>
                              <div className="space-y-1 mb-3">
                                <div className="flex items-center gap-2 text-sm text-neutral-700">
                                  <span>✓</span>
                                  <span>{level.cores} vCore</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-neutral-700">
                                  <span>✓</span>
                                  <span>{level.ram} Go RAM</span>
                                </div>
                              </div>
                              <div className="flex items-baseline gap-1">
                                <span className={`text-2xl font-bold ${isLevelSelected ? 'text-primary-600' : 'text-neutral-900'}`}>
                                  {level.price.toFixed(2)} €
                                </span>
                                <span className="text-sm text-neutral-500">hors. TVA/mois</span>
                              </div>
                              <div className="text-xs text-neutral-500 mt-1">
                                soit {level.pricePerYear.toFixed(2)} €/an
                              </div>
                            </motion.button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="ovh-card"
            >
              <h3 className="font-bold text-neutral-900 mb-4">Options recommandées</h3>
              <div className="space-y-4">
                {[
                  { id: 'sqlDatabase', name: 'Base de données SQL Privée', price: 4.99 },
                  { id: 'cdnPremium', name: 'CDN Premium', price: 9.99 },
                  { id: 'extraBackup', name: 'Sauvegarde Cloud supplémentaire', price: 2.99 },
                ].map((option) => (
                  <label key={option.id} className="flex items-center justify-between cursor-pointer group">
                    <div className="flex-1">
                      <span className="font-medium text-neutral-800 group-hover:text-primary-600 transition-colors">
                        {option.name}
                      </span>
                      <span className="block text-sm text-neutral-500">+{option.price.toFixed(2)} €/mois</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={options[option.id as keyof typeof options]}
                      onChange={(e) => setOptions({ ...options, [option.id]: e.target.checked })}
                      className="ovh-checkbox"
                    />
                  </label>
                ))}
              </div>
            </motion.div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="ovh-card-primary sticky top-4"
            >
              <h3 className="font-bold text-neutral-900 mb-4">Votre sélection</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Domaines</span>
                  <span className="font-semibold">{domains?.length || 0} sélectionné(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Hébergement</span>
                  <span className="font-semibold">{selectedPackData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Prix hébergement</span>
                  <span className="font-semibold">{totalPrice.toFixed(2)} €/mois</span>
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
