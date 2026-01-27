import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@ovhcloud/ods-react';
import { Card } from '@ovhcloud/ods-react';
import { Badge } from '@ovhcloud/ods-react';
import { Checkbox } from '@ovhcloud/ods-react';
import { Text } from '@ovhcloud/ods-react';
import { Range } from '@ovhcloud/ods-react';
import { Accordion } from '@ovhcloud/ods-react';

const hostingPacks = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1.19,
    tagline: 'Parfait pour démarrer',
    features: ['10 Go d\'espace', '2 adresses email', 'Trafic illimité', 'SSL inclus'],
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
    features: ['100 Go d\'espace', '10 adresses email', 'Trafic illimité', 'SSL inclus'],
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
    features: ['250 Go d\'espace', '100 adresses email', 'Trafic illimité', 'SSL inclus'],
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
    features: ['500 Go d\'espace', 'Emails illimités', '99,99% disponibilité', 'SSL inclus'],
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
  
  // Trouver le pack recommandé
  const recommendedPack = hostingPacks.find(p => p.recommended) || hostingPacks[2]; // Pro par défaut
  const otherPacks = hostingPacks.filter(p => p.id !== recommendedPack.id).slice(0, 2); // Max 2 autres
  
  const [expandedPack, setExpandedPack] = useState(recommendedPack.id);
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

  const selectedPackData = hostingPacks.find(p => p.id === selectedPack);
  const selectedConfig = packConfigs[selectedPack] || { storage: 0, emails: 0 };

  const calculatePackPrice = (packId: string) => {
    const pack = hostingPacks.find(p => p.id === packId);
    if (!pack) return 0;
    
    const config = packConfigs[packId] || { storage: 0, emails: 0 };
    let price = pack.price;
    
    if (pack.configurable) {
      // Calcul supplément pour stockage
      const storageExtra = Math.max(0, config.storage - pack.configurable.storage.min);
      price += (storageExtra / pack.configurable.storage.step) * pack.configurable.storage.pricePerUnit;
      
      // Calcul supplément pour emails
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
      [packId]: {
        ...prev[packId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-6">
          <Text size="heading-l" className="mb-2">
            Choisissez votre pack d'hébergement
          </Text>
          <Text size="body-m">
            Nous avons sélectionné le pack le plus adapté à vos besoins
          </Text>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Zone centrale - Tuiles d'offres */}
          <div className="lg:col-span-2 space-y-4">
            {/* Pack recommandé en premier, déplié */}
            <motion.div
              initial={false}
              animate={{ height: 'auto' }}
            >
              <Card className="border-2 border-primary border-l-4 bg-blue-50">
                <Badge variant="primary" className="mb-3">
                  Recommandé pour vous
                </Badge>
                <Text size="heading-m" className="mb-1">
                  {recommendedPack.name}
                </Text>
                <Text size="body-m" className="mb-4">{recommendedPack.tagline}</Text>
                
                <div className="mt-4">
                  <Text size="heading-xl" className="mb-1">
                    {totalPrice.toFixed(2)} €/mois HT
                  </Text>
                  <Text size="body-s" className="mb-4">
                    soit {(totalPrice * 12).toFixed(2)} €/an HT
                  </Text>
                  
                  <ul className="space-y-2 mb-6">
                    {recommendedPack.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-700">
                        <span className="text-primary mr-2">✓</span>
                        <Text size="body-m">{feature}</Text>
                      </li>
                    ))}
                  </ul>

                  {/* Options de configuration */}
                  <Card className="mb-4">
                    <Text size="body-m" className="font-semibold mb-3">Personnaliser les ressources</Text>
                    
                    {recommendedPack.configurable && (
                      <div className="space-y-4">
                        <div>
                          <Text size="body-s" className="mb-2">
                            Stockage : {selectedConfig.storage} {recommendedPack.configurable.storage.unit}
                          </Text>
                          <Range
                            min={recommendedPack.configurable.storage.min}
                            max={recommendedPack.configurable.storage.max}
                            step={recommendedPack.configurable.storage.step}
                            value={selectedConfig.storage}
                            onChange={(e) => updatePackConfig(recommendedPack.id, 'storage', parseInt(e.target.value))}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{recommendedPack.configurable.storage.min} {recommendedPack.configurable.storage.unit}</span>
                            <span>{recommendedPack.configurable.storage.max} {recommendedPack.configurable.storage.unit}</span>
                          </div>
                        </div>

                        <div>
                          <Text size="body-s" className="mb-2">
                            Adresses email : {selectedConfig.emails}
                          </Text>
                          <Range
                            min={recommendedPack.configurable.emails.min}
                            max={recommendedPack.configurable.emails.max}
                            step={recommendedPack.configurable.emails.step}
                            value={selectedConfig.emails}
                            onChange={(e) => updatePackConfig(recommendedPack.id, 'emails', parseInt(e.target.value))}
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-gray-500 mt-1">
                            <span>{recommendedPack.configurable.emails.min}</span>
                            <span>{recommendedPack.configurable.emails.max}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>

                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={handleContinue}
                  >
                    Choisir cette offre
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Autres packs repliés */}
            {otherPacks.map((pack) => {
              const isExpanded = expandedPack === pack.id;
              const packConfig = packConfigs[pack.id] || { storage: 0, emails: 0 };
              
              return (
                <motion.div
                  key={pack.id}
                  initial={false}
                  animate={{ height: isExpanded ? 'auto' : 80 }}
                  className="cursor-pointer"
                  onClick={() => {
                    setExpandedPack(isExpanded ? recommendedPack.id : pack.id);
                    setSelectedPack(pack.id);
                  }}
                >
                  <Card className="border-2 border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <Text size="heading-s" className="mb-1">
                          {pack.name}
                        </Text>
                        <Text size="body-s">{pack.tagline}</Text>
                        {isExpanded && (
                          <div className="mt-4">
                            <Text size="heading-m" className="mb-1">
                              {calculatePackPrice(pack.id).toFixed(2)} €/mois HT
                            </Text>
                            <Text size="body-s" className="mb-4">
                              soit {(calculatePackPrice(pack.id) * 12).toFixed(2)} €/an HT
                            </Text>
                            
                            <ul className="space-y-2 mb-4">
                              {pack.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-gray-700">
                                  <span className="text-primary mr-2">✓</span>
                                  <Text size="body-s">{feature}</Text>
                                </li>
                              ))}
                            </ul>

                            {/* Options de configuration */}
                            {pack.configurable && (
                              <Card className="mb-4 bg-gray-50">
                                <Text size="body-s" className="font-semibold mb-3">Personnaliser les ressources</Text>
                                
                                <div className="space-y-3">
                                  <div>
                                    <Text size="body-xs" className="mb-1">
                                      Stockage : {packConfig.storage} {pack.configurable.storage.unit}
                                    </Text>
                                    <Range
                                      min={pack.configurable.storage.min}
                                      max={pack.configurable.storage.max}
                                      step={pack.configurable.storage.step}
                                      value={packConfig.storage}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        updatePackConfig(pack.id, 'storage', parseInt(e.target.value));
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-full"
                                    />
                                  </div>

                                  <div>
                                    <Text size="body-xs" className="mb-1">
                                      Adresses email : {packConfig.emails}
                                    </Text>
                                    <Range
                                      min={pack.configurable.emails.min}
                                      max={pack.configurable.emails.max}
                                      step={pack.configurable.emails.step}
                                      value={packConfig.emails}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        updatePackConfig(pack.id, 'emails', parseInt(e.target.value));
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-full"
                                    />
                                  </div>
                                </div>
                              </Card>
                            )}

                            <Button
                              variant="primary"
                              size="s"
                              className="w-full"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleContinue();
                              }}
                            >
                              Choisir cette offre
                            </Button>
                          </div>
                        )}
                      </div>
                      {!isExpanded && (
                        <div className="flex items-center gap-4">
                          <Text size="body-m" className="font-semibold">
                            {calculatePackPrice(pack.id).toFixed(2)} €/mois
                          </Text>
                          <span className="text-gray-400 text-xl">▼</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Sidebar - Options et récapitulatif */}
          <div className="space-y-6">
            {/* Options complémentaires */}
            <Card>
              <Text size="body-m" className="font-semibold mb-4">
                Options recommandées pour vous
              </Text>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <Text size="body-m" className="font-medium">Base de données SQL Privée</Text>
                    <Text size="body-s">+4,99 €/mois</Text>
                  </div>
                  <Checkbox
                    checked={options.sqlDatabase}
                    onChange={(e) => setOptions({ ...options, sqlDatabase: e.target.checked })}
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <Text size="body-m" className="font-medium">CDN Premium</Text>
                    <Text size="body-s">+9,99 €/mois</Text>
                  </div>
                  <Checkbox
                    checked={options.cdnPremium}
                    onChange={(e) => setOptions({ ...options, cdnPremium: e.target.checked })}
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <Text size="body-m" className="font-medium">Sauvegarde Cloud supplémentaire</Text>
                    <Text size="body-s">+2,99 €/mois</Text>
                  </div>
                  <Checkbox
                    checked={options.extraBackup}
                    onChange={(e) => setOptions({ ...options, extraBackup: e.target.checked })}
                  />
                </label>
              </div>
            </Card>

            {/* Récapitulatif */}
            <Card className="sticky top-4">
              <Text size="body-m" className="font-semibold mb-4">Votre sélection</Text>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Domaines</span>
                  <span className="font-semibold">{domains?.length || 0} sélectionné(s)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hébergement</span>
                  <span className="font-semibold">
                    {selectedPackData?.name} - {totalPrice.toFixed(2)} €/mois
                  </span>
                </div>
                {optionsPrice > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Options</span>
                    <span className="font-semibold">{optionsPrice.toFixed(2)} €/mois</span>
                  </div>
                )}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total mensuel HT</span>
                    <span>{(totalPrice + optionsPrice).toFixed(2)} €/mois</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Total annuel HT</span>
                    <span>{((totalPrice + optionsPrice) * 12).toFixed(2)} €/an</span>
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                className="w-full mt-6"
                onClick={handleContinue}
              >
                Continuer vers le paiement
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
