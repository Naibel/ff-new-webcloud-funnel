import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function DomainSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const questionnaire = location.state?.questionnaire || {};
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);
  const [suggestions] = useState([
    { domain: 'mon-entreprise.fr', available: true, price: 7.79 },
    { domain: 'mon-entreprise.com', available: true, price: 13.49 },
    { domain: 'mon-entreprise.eu', available: true, price: 8.49 },
  ]);

  const handleContinue = () => {
    if (selectedDomain) {
      navigate('/funnel/hosting', { 
        state: { 
          questionnaire,
          domain: selectedDomain 
        } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Choisissez votre nom de domaine
          </h1>
          <p className="text-gray-600">
            Recherchez et réservez le nom de domaine parfait pour votre projet
          </p>
        </div>

        {/* Champ de recherche */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Recherchez votre domaine (ex: votre-entreprise.fr)"
              className="flex-1 h-16 px-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
            />
            <button className="px-8 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Rechercher
            </button>
          </div>

          {/* Suggestions IA (si questionnaire complété) */}
          {Object.keys(questionnaire).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <p className="text-sm font-semibold text-gray-700 mb-3">
                💡 Suggestions basées sur votre profil :
              </p>
              <div className="grid gap-3">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.domain}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedDomain === suggestion.domain
                        ? 'border-primary bg-blue-50'
                        : 'border-gray-200 hover:border-primary'
                    }`}
                    onClick={() => setSelectedDomain(suggestion.domain)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-semibold text-gray-900">
                          {suggestion.domain}
                        </span>
                        {suggestion.available && (
                          <span className="ml-3 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                            Disponible
                          </span>
                        )}
                      </div>
                      <span className="text-gray-700 font-semibold">
                        {suggestion.price.toFixed(2)} €/an HT
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Récapitulatif sticky */}
        {selectedDomain && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl p-6 sticky bottom-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Domaine sélectionné</p>
                <p className="text-lg font-semibold text-gray-900">{selectedDomain}</p>
              </div>
              <button
                onClick={handleContinue}
                className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Continuer avec {selectedDomain}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

