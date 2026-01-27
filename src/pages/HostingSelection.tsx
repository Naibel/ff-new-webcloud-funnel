import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const hostingPacks = [
  {
    id: 'starter',
    name: 'Starter',
    price: 1.19,
    tagline: 'Parfait pour démarrer',
    features: ['10 Go d\'espace', '2 adresses email', 'Trafic illimité', 'SSL inclus'],
  },
  {
    id: 'perso',
    name: 'Perso',
    price: 2.99,
    tagline: 'Pour les équipes en croissance',
    features: ['100 Go d\'espace', '10 adresses email', 'Trafic illimité', 'SSL inclus'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 5.99,
    tagline: 'Pour les professionnels exigeants',
    features: ['250 Go d\'espace', '100 adresses email', 'Trafic illimité', 'SSL inclus'],
    recommended: true,
  },
  {
    id: 'performance',
    name: 'Performance',
    price: 11.99,
    tagline: 'Haute performance garantie',
    features: ['500 Go d\'espace', 'Emails illimités', '99,99% disponibilité', 'SSL inclus'],
  },
];

export default function HostingSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionnaire, domain } = location.state || {};
  
  const [expandedPack, setExpandedPack] = useState('pro');
  const [selectedPack, setSelectedPack] = useState('pro');
  const [options, setOptions] = useState({
    sqlDatabase: false,
    cdnPremium: false,
    extraBackup: false,
  });

  const selectedPackData = hostingPacks.find(p => p.id === selectedPack);

  const handleContinue = () => {
    navigate('/funnel/summary', {
      state: {
        questionnaire,
        domain,
        hosting: selectedPack,
        options,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choisissez votre pack d'hébergement
          </h1>
          <p className="text-gray-600">
            Nous avons sélectionné le pack le plus adapté à vos besoins
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Zone centrale - Tuiles d'offres */}
          <div className="lg:col-span-2 space-y-4">
            {hostingPacks.map((pack) => {
              const isExpanded = expandedPack === pack.id;
              return (
                <motion.div
                  key={pack.id}
                  initial={false}
                  animate={{ height: isExpanded ? 'auto' : 80 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-gray-200"
                >
                  <div
                    className={`p-6 cursor-pointer ${
                      pack.recommended ? 'bg-blue-50 border-l-4 border-primary' : ''
                    }`}
                    onClick={() => {
                      setExpandedPack(pack.id);
                      setSelectedPack(pack.id);
                    }}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        {pack.recommended && (
                          <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
                            Recommandé pour vous
                          </span>
                        )}
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {pack.name}
                        </h3>
                        <p className="text-gray-600 mb-2">{pack.tagline}</p>
                        {isExpanded && (
                          <div className="mt-4">
                            <p className="text-3xl font-bold text-gray-900 mb-1">
                              {pack.price.toFixed(2)} €/mois HT
                            </p>
                            <p className="text-sm text-gray-600 mb-4">
                              soit {(pack.price * 12).toFixed(2)} €/an HT
                            </p>
                            <ul className="space-y-2 mb-4">
                              {pack.features.map((feature, idx) => (
                                <li key={idx} className="flex items-center text-gray-700">
                                  <span className="text-primary mr-2">✓</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleContinue();
                              }}
                              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                            >
                              Choisir cette offre
                            </button>
                          </div>
                        )}
                      </div>
                      {!isExpanded && (
                        <span className="text-gray-400 text-2xl">▼</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Sidebar - Options et récapitulatif */}
          <div className="space-y-6">
            {/* Options complémentaires */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-4">
                Options recommandées pour vous
              </h3>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-900">Base de données SQL Privée</p>
                    <p className="text-sm text-gray-600">+4,99 €/mois</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={options.sqlDatabase}
                    onChange={(e) => setOptions({ ...options, sqlDatabase: e.target.checked })}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-900">CDN Premium</p>
                    <p className="text-sm text-gray-600">+9,99 €/mois</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={options.cdnPremium}
                    onChange={(e) => setOptions({ ...options, cdnPremium: e.target.checked })}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <div>
                    <p className="font-medium text-gray-900">Sauvegarde Cloud supplémentaire</p>
                    <p className="text-sm text-gray-600">+2,99 €/mois</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={options.extraBackup}
                    onChange={(e) => setOptions({ ...options, extraBackup: e.target.checked })}
                    className="w-5 h-5 text-primary rounded"
                  />
                </label>
              </div>
            </div>

            {/* Récapitulatif */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Votre sélection</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Domaine</span>
                  <span className="font-semibold">{domain || 'Non sélectionné'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Hébergement</span>
                  <span className="font-semibold">
                    {selectedPackData?.name} - {selectedPackData?.price.toFixed(2)} €/mois
                  </span>
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total mensuel HT</span>
                    <span>{selectedPackData?.price.toFixed(2)} €/mois</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleContinue}
                className="w-full mt-6 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Continuer vers le paiement
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

