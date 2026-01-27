import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Button, 
  Card, 
  Badge, 
  Checkbox, 
  CheckboxControl,
  Text,
  Range
} from '@ovhcloud/ods-react';

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
    <div className="ods-page">
      <div className="ods-container ods-max-w-6xl">
        <Card color="neutral" className="ods-mb-6 ods-p-6">
          <Text preset="heading-2" className="ods-mb-2">
            Choisissez votre pack d'hébergement
          </Text>
          <Text preset="paragraph">
            Nous avons sélectionné le pack le plus adapté à vos besoins
          </Text>
        </Card>

        <div className="ods-grid ods-grid--3-cols ods-gap-6">
          {/* Zone centrale - Tuiles d'offres */}
          <div className="ods-col-span-2 ods-space-y-4">
            {/* Pack recommandé en premier, déplié */}
            <motion.div
              initial={false}
              animate={{ height: 'auto' }}
            >
              <Card color="primary" className="ods-p-6 ods-border-l-4 ods-border--primary">
                <Badge color="primary" size="sm" className="ods-mb-3">
                  Recommandé pour vous
                </Badge>
                <Text preset="heading-3" className="ods-mb-1">
                  {recommendedPack.name}
                </Text>
                <Text preset="paragraph" className="ods-mb-4">{recommendedPack.tagline}</Text>
                
                <div className="ods-mt-4">
                  <Text preset="heading-1" className="ods-mb-1">
                    {totalPrice.toFixed(2)} €/mois HT
                  </Text>
                  <Text preset="small" className="ods-mb-4 ods-text--muted">
                    soit {(totalPrice * 12).toFixed(2)} €/an HT
                  </Text>
                  
                  <ul className="ods-space-y-2 ods-mb-6">
                    {recommendedPack.features.map((feature, idx) => (
                      <li key={idx} className="ods-flex ods-items-center">
                        <span className="ods-text--primary ods-mr-2">✓</span>
                        <Text preset="paragraph">{feature}</Text>
                      </li>
                    ))}
                  </ul>

                  {/* Options de configuration */}
                  <Card color="neutral" className="ods-mb-4 ods-p-4">
                    <Text preset="paragraph" className="ods-font--semibold ods-mb-3">
                      Personnaliser les ressources
                    </Text>
                    
                    {recommendedPack.configurable && (
                      <div className="ods-space-y-4">
                        <div>
                          <Text preset="small" className="ods-mb-2">
                            Stockage : {selectedConfig.storage} {recommendedPack.configurable.storage.unit}
                          </Text>
                          <Range
                            min={recommendedPack.configurable.storage.min}
                            max={recommendedPack.configurable.storage.max}
                            step={recommendedPack.configurable.storage.step}
                            defaultValue={[selectedConfig.storage]}
                            onValueChange={(detail) => updatePackConfig(recommendedPack.id, 'storage', detail.value[0])}
                          />
                          <div className="ods-flex ods-justify-between ods-text--xs ods-text--muted ods-mt-1">
                            <span>{recommendedPack.configurable.storage.min} {recommendedPack.configurable.storage.unit}</span>
                            <span>{recommendedPack.configurable.storage.max} {recommendedPack.configurable.storage.unit}</span>
                          </div>
                        </div>

                        <div>
                          <Text preset="small" className="ods-mb-2">
                            Adresses email : {selectedConfig.emails}
                          </Text>
                          <Range
                            min={recommendedPack.configurable.emails.min}
                            max={recommendedPack.configurable.emails.max}
                            step={recommendedPack.configurable.emails.step}
                            defaultValue={[selectedConfig.emails]}
                            onValueChange={(detail) => updatePackConfig(recommendedPack.id, 'emails', detail.value[0])}
                          />
                          <div className="ods-flex ods-justify-between ods-text--xs ods-text--muted ods-mt-1">
                            <span>{recommendedPack.configurable.emails.min}</span>
                            <span>{recommendedPack.configurable.emails.max}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </Card>

                  <Button
                    variant="default"
                    color="primary"
                    className="ods-w-full"
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
                  className="ods-cursor-pointer ods-overflow-hidden"
                  onClick={() => {
                    setExpandedPack(isExpanded ? recommendedPack.id : pack.id);
                    setSelectedPack(pack.id);
                  }}
                >
                  <Card color="neutral" className="ods-p-4">
                    <div className="ods-flex ods-justify-between ods-items-start">
                      <div className="ods-flex-1">
                        <Text preset="heading-5" className="ods-mb-1">
                          {pack.name}
                        </Text>
                        <Text preset="small" className="ods-text--muted">{pack.tagline}</Text>
                        {isExpanded && (
                          <div className="ods-mt-4">
                            <Text preset="heading-3" className="ods-mb-1">
                              {calculatePackPrice(pack.id).toFixed(2)} €/mois HT
                            </Text>
                            <Text preset="small" className="ods-mb-4 ods-text--muted">
                              soit {(calculatePackPrice(pack.id) * 12).toFixed(2)} €/an HT
                            </Text>
                            
                            <ul className="ods-space-y-2 ods-mb-4">
                              {pack.features.map((feature, idx) => (
                                <li key={idx} className="ods-flex ods-items-center">
                                  <span className="ods-text--primary ods-mr-2">✓</span>
                                  <Text preset="small">{feature}</Text>
                                </li>
                              ))}
                            </ul>

                            {/* Options de configuration */}
                            {pack.configurable && (
                              <Card color="neutral" className="ods-mb-4 ods-p-4">
                                <Text preset="small" className="ods-font--semibold ods-mb-3">
                                  Personnaliser les ressources
                                </Text>
                                
                                <div className="ods-space-y-3">
                                  <div>
                                    <Text preset="small" className="ods-mb-1">
                                      Stockage : {packConfig.storage} {pack.configurable.storage.unit}
                                    </Text>
                                    <Range
                                      min={pack.configurable.storage.min}
                                      max={pack.configurable.storage.max}
                                      step={pack.configurable.storage.step}
                                      defaultValue={[packConfig.storage]}
                                      onValueChange={(detail) => {
                                        updatePackConfig(pack.id, 'storage', detail.value[0]);
                                      }}
                                    />
                                  </div>

                                  <div>
                                    <Text preset="small" className="ods-mb-1">
                                      Adresses email : {packConfig.emails}
                                    </Text>
                                    <Range
                                      min={pack.configurable.emails.min}
                                      max={pack.configurable.emails.max}
                                      step={pack.configurable.emails.step}
                                      defaultValue={[packConfig.emails]}
                                      onValueChange={(detail) => {
                                        updatePackConfig(pack.id, 'emails', detail.value[0]);
                                      }}
                                    />
                                  </div>
                                </div>
                              </Card>
                            )}

                            <Button
                              variant="default"
                              color="primary"
                              size="sm"
                              className="ods-w-full"
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
                        <div className="ods-flex ods-items-center ods-gap-4">
                          <Text preset="paragraph" className="ods-font--semibold">
                            {calculatePackPrice(pack.id).toFixed(2)} €/mois
                          </Text>
                          <span className="ods-text--muted ods-text--xl">▼</span>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Sidebar - Options et récapitulatif */}
          <div className="ods-space-y-6">
            {/* Options complémentaires */}
            <Card color="neutral" className="ods-p-6">
              <Text preset="paragraph" className="ods-font--semibold ods-mb-4">
                Options recommandées pour vous
              </Text>
              <div className="ods-space-y-4">
                <label className="ods-flex ods-items-center ods-justify-between ods-cursor-pointer">
                  <div>
                    <Text preset="paragraph" className="ods-font--medium">Base de données SQL Privée</Text>
                    <Text preset="small" className="ods-text--muted">+4,99 €/mois</Text>
                  </div>
                  <Checkbox
                    checked={options.sqlDatabase}
                    onCheckedChange={(detail) => setOptions({ ...options, sqlDatabase: detail.checked === true })}
                  >
                    <CheckboxControl />
                  </Checkbox>
                </label>
                <label className="ods-flex ods-items-center ods-justify-between ods-cursor-pointer">
                  <div>
                    <Text preset="paragraph" className="ods-font--medium">CDN Premium</Text>
                    <Text preset="small" className="ods-text--muted">+9,99 €/mois</Text>
                  </div>
                  <Checkbox
                    checked={options.cdnPremium}
                    onCheckedChange={(detail) => setOptions({ ...options, cdnPremium: detail.checked === true })}
                  >
                    <CheckboxControl />
                  </Checkbox>
                </label>
                <label className="ods-flex ods-items-center ods-justify-between ods-cursor-pointer">
                  <div>
                    <Text preset="paragraph" className="ods-font--medium">Sauvegarde Cloud supplémentaire</Text>
                    <Text preset="small" className="ods-text--muted">+2,99 €/mois</Text>
                  </div>
                  <Checkbox
                    checked={options.extraBackup}
                    onCheckedChange={(detail) => setOptions({ ...options, extraBackup: detail.checked === true })}
                  >
                    <CheckboxControl />
                  </Checkbox>
                </label>
              </div>
            </Card>

            {/* Récapitulatif */}
            <Card color="neutral" className="ods-sticky ods-top-4 ods-p-6">
              <Text preset="paragraph" className="ods-font--semibold ods-mb-4">Votre sélection</Text>
              <div className="ods-space-y-3 ods-text--sm">
                <div className="ods-flex ods-justify-between">
                  <span className="ods-text--muted">Domaines</span>
                  <span className="ods-font--semibold">{domains?.length || 0} sélectionné(s)</span>
                </div>
                <div className="ods-flex ods-justify-between">
                  <span className="ods-text--muted">Hébergement</span>
                  <span className="ods-font--semibold">
                    {selectedPackData?.name} - {totalPrice.toFixed(2)} €/mois
                  </span>
                </div>
                {optionsPrice > 0 && (
                  <div className="ods-flex ods-justify-between">
                    <span className="ods-text--muted">Options</span>
                    <span className="ods-font--semibold">{optionsPrice.toFixed(2)} €/mois</span>
                  </div>
                )}
                <div className="ods-border-t ods-pt-3 ods-mt-3">
                  <div className="ods-flex ods-justify-between ods-font--semibold ods-text--lg">
                    <span>Total mensuel HT</span>
                    <span>{(totalPrice + optionsPrice).toFixed(2)} €/mois</span>
                  </div>
                  <div className="ods-flex ods-justify-between ods-text--sm ods-text--muted ods-mt-1">
                    <span>Total annuel HT</span>
                    <span>{((totalPrice + optionsPrice) * 12).toFixed(2)} €/an</span>
                  </div>
                </div>
              </div>
              <Button
                variant="default"
                color="primary"
                className="ods-w-full ods-mt-6"
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
