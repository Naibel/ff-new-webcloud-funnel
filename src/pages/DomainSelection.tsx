import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

interface DomainResult {
  name: string;
  extension: string;
  available: boolean;
  price: number;
}

const availableExtensions = [
  { ext: '.fr', price: 7.79, popular: true },
  { ext: '.com', price: 13.49, popular: true },
  { ext: '.eu', price: 8.49, popular: false },
  { ext: '.net', price: 14.99, popular: false },
  { ext: '.org', price: 12.99, popular: false },
  { ext: '.io', price: 51.99, popular: false },
];

export default function DomainSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const questionnaire = location.state?.questionnaire || {};
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<DomainResult[]>([]);
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());
  const [isSearching, setIsSearching] = useState(false);

  // Logique pour proposer des extensions selon le profil
  const getRecommendedExtensions = () => {
    const recommended: typeof availableExtensions = [];
    
    if (questionnaire.geographicScope === 'regionale' || questionnaire.geographicScope === 'national') {
      recommended.push(availableExtensions.find(e => e.ext === '.fr')!);
      recommended.push(availableExtensions.find(e => e.ext === '.com')!);
    } else if (questionnaire.geographicScope === 'european') {
      recommended.push(availableExtensions.find(e => e.ext === '.eu')!);
      recommended.push(availableExtensions.find(e => e.ext === '.com')!);
      recommended.push(availableExtensions.find(e => e.ext === '.fr')!);
    } else if (questionnaire.geographicScope === 'international') {
      recommended.push(availableExtensions.find(e => e.ext === '.com')!);
      recommended.push(availableExtensions.find(e => e.ext === '.net')!);
      recommended.push(availableExtensions.find(e => e.ext === '.io')!);
    } else {
      // Par défaut
      recommended.push(...availableExtensions.filter(e => e.popular));
    }

    // Si association ou institutionnel
    if (questionnaire.activitySector === 'association') {
      recommended.push(availableExtensions.find(e => e.ext === '.org')!);
    }

    return recommended.filter(Boolean);
  };

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    
    // Simulation de recherche avec délai
    setTimeout(() => {
      const recommendedExts = getRecommendedExtensions();
      const results: DomainResult[] = recommendedExts.map(ext => ({
        name: searchTerm.toLowerCase().replace(/\s+/g, '-'),
        extension: ext.ext,
        available: Math.random() > 0.3, // 70% de disponibilité simulée
        price: ext.price,
      }));

      // Ajouter quelques alternatives si indisponible
      recommendedExts.forEach(ext => {
        if (Math.random() > 0.7) {
          results.push({
            name: `${searchTerm.toLowerCase().replace(/\s+/g, '-')}-alt`,
            extension: ext.ext,
            available: true,
            price: ext.price,
          });
        }
      });

      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const handleDomainToggle = (domainFull: string) => {
    const newSelected = new Set(selectedDomains);
    if (newSelected.has(domainFull)) {
      newSelected.delete(domainFull);
    } else {
      newSelected.add(domainFull);
    }
    setSelectedDomains(newSelected);
  };

  const handleContinue = () => {
    if (selectedDomains.size > 0) {
      navigate('/funnel/hosting', { 
        state: { 
          questionnaire,
          domains: Array.from(selectedDomains)
        } 
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recherchez votre nom de domaine
          </h1>
          <p className="text-gray-600">
            Recherchez et sélectionnez un ou plusieurs domaines pour votre projet
          </p>
        </div>

        {/* Champ de recherche */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-6">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Recherchez votre domaine (ex: votre-entreprise)"
              className="flex-1 h-16 px-4 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-lg"
            />
            <button 
              onClick={handleSearch}
              disabled={!searchTerm.trim() || isSearching}
              className="px-8 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? 'Recherche...' : 'Rechercher'}
            </button>
          </div>

          {/* Résultats de recherche */}
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <p className="text-sm font-semibold text-gray-700 mb-4">
                Résultats de recherche ({searchResults.length} domaines trouvés)
              </p>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {searchResults.map((result, idx) => {
                  const domainFull = `${result.name}${result.extension}`;
                  const isSelected = selectedDomains.has(domainFull);
                  
                  return (
                    <div
                      key={`${result.name}-${result.extension}-${idx}`}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        isSelected
                          ? 'border-primary bg-blue-50'
                          : result.available
                          ? 'border-gray-200 hover:border-primary'
                          : 'border-red-200 bg-red-50 opacity-60'
                      }`}
                      onClick={() => result.available && handleDomainToggle(domainFull)}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => result.available && handleDomainToggle(domainFull)}
                            disabled={!result.available}
                            className="w-5 h-5 text-primary rounded cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div>
                            <span className="font-semibold text-gray-900">
                              {result.name}
                              <span className="text-primary">{result.extension}</span>
                            </span>
                            {result.available ? (
                              <span className="ml-3 px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                                Disponible
                              </span>
                            ) : (
                              <span className="ml-3 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                                Indisponible
                              </span>
                            )}
                            {availableExtensions.find(e => e.ext === result.extension)?.popular && (
                              <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded">
                                Populaire
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-gray-700 font-semibold">
                          {result.price.toFixed(2)} €/an HT
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Message si pas de recherche */}
          {searchResults.length === 0 && !isSearching && (
            <div className="text-center py-8 text-gray-500">
              <p>Entrez un nom de domaine dans le champ ci-dessus et cliquez sur "Rechercher"</p>
            </div>
          )}
        </div>

        {/* Récapitulatif sticky */}
        {selectedDomains.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-xl p-6 sticky bottom-4"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 mb-1">Domaines sélectionnés ({selectedDomains.size})</p>
                <div className="flex flex-wrap gap-2">
                  {Array.from(selectedDomains).slice(0, 3).map((domain) => (
                    <span key={domain} className="text-sm font-semibold text-gray-900 bg-blue-50 px-2 py-1 rounded">
                      {domain}
                    </span>
                  ))}
                  {selectedDomains.size > 3 && (
                    <span className="text-sm text-gray-600">+{selectedDomains.size - 3} autres</span>
                  )}
                </div>
              </div>
              <button
                onClick={handleContinue}
                className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Suivant
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
