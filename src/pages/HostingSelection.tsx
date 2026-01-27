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
    configurable: {
      storage: { min: 10, max: 50, step: 10, unit: 'Go', pricePerUnit: 0.5 },
      emails: { min: 2, max: 10, step: 1, pricePerUnit: 0.5 },
    },
  },
  {
    id: 'perso',
    name: 'Perso',
    price: 2.99,
    tagline: 'Pour les équipes en croissance',
    icon: '🚀',
    color: 'from-blue-400 to-indigo-500',
    features: ['100 Go d\'espace SSD', '10 adresses email', 'Trafic illimité', 'SSL gratuit inclus'],
    configurable: {
      storage: { min: 100, max: 200, step: 25, unit: 'Go', pricePerUnit: 0.3 },
      emails: { min: 10, max: 50, step: 5, pricePerUnit: 0.4 },
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 5.99,
    tagline: 'Pour les professionnels exigeants',
    icon: '⭐',
    color: 'from-primary-500 to-primary-600',
    features: ['250 Go d\'espace SSD', '100 adresses email', 'Trafic illimité', 'SSL gratuit inclus', 'Support prioritaire'],
    configurable: {
      storage: { min: 250, max: 500, step: 50, unit: 'Go', pricePerUnit: 0.2 },
      emails: { min: 100, max: 200, step: 10, pricePerUnit: 0.3 },
    },
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
    configurable: {
      storage: { min: 500, max: 1000, step: 100, unit: 'Go', pricePerUnit: 0.15 },
      emails: { min: 1000, max: 5000, step: 500, pricePerUnit: 0.2 },
    },
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
    
    const config = packConfigs[packId];
    let price = pack.price;
    
    if (pack.configurable) {
      const storageExtra = Math.max(0, config.storage - pack.configurable.storage.min);
      price += (storageExtra / pack.configurable.storage.step) * pack.configurable.storage.pricePerUnit;
      
      const emailsExtra = Math.max(0, config.emails - pack.configurable.emails.min);
      price += (emailsExtra / pack.configurable.emails.step) * pack.configurable.emails.pricePerUnit;
    }
    
    return price;
  };

  const totalPrice = calculatePackPrice(selectedPack);
  const optionsPrice = (options.sqlDatabase ? 4.99 : 0) + 
                      (options.cdnPremium ? 9.99 : 0) + 
                      (options.extraBackup ? 2.99 : 0);

  const handleContinue = () => {
    navigate('/funnel/summary', {
      state: {
        questionnaire,
        domains,
        hosting: selectedPack,
        hostingConfig: selectedConfig,
        hostingPrice: totalPrice,
        options,
        optionsPrice,
      },
    });
  };

  const updatePackConfig = (packId: string, field: 'storage' | 'emails', value: number) => {
    setPackConfigs(prev => ({
      ...prev,
      [packId]: { ...prev[packId], [field]: value },
    }));
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
              const packConfig = packConfigs[pack.id];
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

                  {/* Expanded Configuration */}
                  {isSelected && pack.configurable && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 pt-6 border-t border-neutral-200"
                    >
                      <h4 className="font-semibold text-neutral-900 mb-4">Personnaliser les ressources</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Storage */}
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-neutral-600">Stockage</span>
                            <span className="text-sm font-semibold text-primary-600">
                              {packConfig.storage} {pack.configurable.storage.unit}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={pack.configurable.storage.min}
                            max={pack.configurable.storage.max}
                            step={pack.configurable.storage.step}
                            value={packConfig.storage}
                            onChange={(e) => updatePackConfig(pack.id, 'storage', parseInt(e.target.value))}
                            className="ovh-range"
                          />
                          <div className="flex justify-between text-xs text-neutral-400 mt-1">
                            <span>{pack.configurable.storage.min} {pack.configurable.storage.unit}</span>
                            <span>{pack.configurable.storage.max} {pack.configurable.storage.unit}</span>
                          </div>
                        </div>

                        {/* Emails */}
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-neutral-600">Adresses email</span>
                            <span className="text-sm font-semibold text-primary-600">
                              {packConfig.emails}
                            </span>
                          </div>
                          <input
                            type="range"
                            min={pack.configurable.emails.min}
                            max={pack.configurable.emails.max}
                            step={pack.configurable.emails.step}
                            value={packConfig.emails}
                            onChange={(e) => updatePackConfig(pack.id, 'emails', parseInt(e.target.value))}
                            className="ovh-range"
                          />
                          <div className="flex justify-between text-xs text-neutral-400 mt-1">
                            <span>{pack.configurable.emails.min}</span>
                            <span>{pack.configurable.emails.max}</span>
                          </div>
                        </div>
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
