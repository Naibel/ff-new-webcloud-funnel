import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import OdsIcon from '../components/OdsIcon';
import { getRecommendation } from '../utils/getRecommendation';

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
  { ext: '.tech', price: 45.99, popular: false },
  { ext: '.store', price: 25.99, popular: false },
  { ext: '.shop', price: 25.99, popular: false },
  { ext: '.ovh', price: 8.99, popular: false },
];

export default function DomainSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const questionnaire = location.state?.questionnaire || {};
  
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<DomainResult[]>([]);
  const [suggestedDomains, setSuggestedDomains] = useState<DomainResult[]>([]);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState<Set<string>>(new Set());
  const [isSearching, setIsSearching] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [clickedAiSuggestion, setClickedAiSuggestion] = useState<string | null>(null);
  const [lastSearchedTerm, setLastSearchedTerm] = useState<string>('');

  const getRecommendedExtensions = () => {
    // Utiliser les recommandations du CSV si disponibles
    const recommendation = getRecommendation(questionnaire);
    
    if (recommendation && recommendation.domains.length > 0) {
      // Mapper les extensions recommandées du CSV vers les extensions disponibles
      const recommended: typeof availableExtensions = [];
      
      recommendation.domains.forEach(domainExt => {
        const ext = availableExtensions.find(e => e.ext === domainExt);
        if (ext && !recommended.find(e => e.ext === ext.ext)) {
          recommended.push(ext);
        }
      });
      
      // Si on a trouvé des extensions recommandées, les retourner
      if (recommended.length > 0) {
        return recommended;
      }
    }
    
    // Fallback vers la logique originale si pas de recommandation
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
      recommended.push(...availableExtensions.filter(e => e.popular));
    }

    if (questionnaire.activitySector === 'association') {
      recommended.push(availableExtensions.find(e => e.ext === '.org')!);
    }

    return recommended.filter(Boolean);
  };

  // Générer des suggestions IA basées sur le terme de recherche
  const generateAiSuggestions = (baseName: string): string[] => {
    const cleanName = baseName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    if (!cleanName || cleanName.length < 2) return [];
    
    const suggestions = [
      `get${cleanName}`,
      `my${cleanName}`,
      `${cleanName}pro`,
      `${cleanName}hub`,
      `${cleanName}app`,
      `${cleanName}plus`,
      `${cleanName}online`,
      `${cleanName}web`,
    ];
    
    return suggestions.slice(0, 8); // Limiter à 8 suggestions
  };

  const generateSuggestions = (baseName: string, existingResults: DomainResult[]): DomainResult[] => {
    const suggestions: DomainResult[] = [];
    
    // Récupérer les extensions déjà présentes dans les résultats
    const existingExtensions = new Set(existingResults.map(r => r.extension));
    
    // Générer uniquement le même nom de domaine avec des extensions différentes
    // Utiliser toutes les extensions disponibles, pas seulement les recommandées
    availableExtensions.forEach(ext => {
      // Ne pas inclure les extensions déjà présentes dans les résultats principaux
      if (!existingExtensions.has(ext.ext)) {
        suggestions.push({
          name: baseName,
          extension: ext.ext,
          available: true,
          price: ext.price,
        });
      }
    });

    // Retourner les suggestions (déjà triées par extension)
    return suggestions;
  };

  const handleSearch = (searchValue?: string) => {
    const termToSearch = searchValue || searchTerm;
    if (!termToSearch.trim()) {
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setShowAllSuggestions(false);
    // Stocker le terme de recherche utilisé pour l'affichage des résultats
    setLastSearchedTerm(termToSearch);
    
    const baseName = termToSearch.toLowerCase().replace(/\s+/g, '-');
    
    // Générer les suggestions IA seulement si elles n'existent pas encore
    if (aiSuggestions.length === 0) {
      const cleanName = termToSearch.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
      const aiSugs = generateAiSuggestions(cleanName);
      setAiSuggestions(aiSugs);
    }
    
    setTimeout(() => {
      const recommendedExts = getRecommendedExtensions();
      const results: DomainResult[] = recommendedExts.map(ext => ({
        name: baseName,
        extension: ext.ext,
        available: Math.random() > 0.3,
        price: ext.price,
      }));

      recommendedExts.forEach(ext => {
        if (Math.random() > 0.7) {
          results.push({
            name: `${baseName}-pro`,
            extension: ext.ext,
            available: true,
            price: ext.price,
          });
        }
      });

      setSearchResults(results);
      
      // Générer des suggestions avec d'autres extensions pour le même nom de domaine
      // Afficher cette section si on a des résultats disponibles
      const availableResults = results.filter(r => r.available);
      if (availableResults.length > 0) {
        const suggestions = generateSuggestions(baseName, results);
        setSuggestedDomains(suggestions);
      } else {
        setSuggestedDomains([]);
      }
      
      setIsSearching(false);
    }, 800);
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
      navigate('/hosting', { 
        state: { questionnaire, domains: Array.from(selectedDomains) } 
      });
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="ovh-page">
      <div className="ovh-container max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span>Étape 1/3</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Recherchez votre nom de domaine
          </h1>
          <p className="text-neutral-600 text-lg">
            Trouvez le domaine parfait pour votre projet
          </p>
        </motion.div>

        {/* Search Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="ovh-card mb-6"
        >
          {/* Search Input */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Entrez votre nom de domaine (ex: mon-entreprise)"
                className="ovh-input pl-12 text-lg"
              />
            </div>
            <button 
              onClick={() => handleSearch()}
              disabled={!searchTerm.trim() || isSearching}
              className="ovh-btn-primary px-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSearching ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Recherche...
                </span>
              ) : 'Rechercher'}
            </button>
          </div>

          {/* AI Suggestions Section */}
          <AnimatePresence>
            {aiSuggestions.length > 0 && searchTerm.trim() && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: 0.15 }}
                className="mb-6 p-5 rounded-2xl border-2 border-primary-200 bg-primary-50/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <OdsIcon name="zap" size="sm" color="var(--ods-color-primary-500)" />
                    <h3 className="font-bold text-neutral-900">Suggestions IA</h3>
                  </div>
                  <span className="text-xs text-neutral-500">Basées sur votre profil</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {aiSuggestions.map((suggestion, idx) => {
                    const isClicked = clickedAiSuggestion === suggestion;
                    
                    return (
                      <motion.button
                        key={idx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => {
                          // Mettre à jour le terme de recherche et marquer la suggestion comme cliquée
                          setSearchTerm(suggestion);
                          setClickedAiSuggestion(suggestion);
                          // Déclencher automatiquement une nouvelle recherche avec la valeur sélectionnée
                          handleSearch(suggestion);
                        }}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                          isClicked
                            ? 'bg-primary-500 text-white border-primary-500 shadow-md'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-primary-300 hover:bg-primary-50'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {suggestion}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results */}
          <AnimatePresence>
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-neutral-900">
                    Résultats pour '{lastSearchedTerm}'
                  </h3>
                  <span className="text-sm text-neutral-500">
                    {searchResults.filter(r => r.available).length} disponible{searchResults.filter(r => r.available).length > 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {searchResults.map((result, idx) => {
                    const domainFull = `${result.name}${result.extension}`;
                    const isSelected = selectedDomains.has(domainFull);
                    
                    return (
                      <motion.div
                        key={`${result.name}-${result.extension}-${idx}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        onClick={() => result.available && handleDomainToggle(domainFull)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-primary-500 shadow-md ovh-selectable-selected'
                            : result.available
                            ? 'border-neutral-200 hover:border-primary-300 ovh-selectable'
                            : 'border-neutral-200 bg-neutral-50 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            {/* Checkbox */}
                            <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                              isSelected
                                ? 'bg-primary-500 border-primary-500'
                                : result.available
                                ? 'border-neutral-300 bg-white'
                                : 'border-neutral-300 bg-neutral-100 opacity-50'
                            }`}>
                              {isSelected && (
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                            
                            {/* Domain name */}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-neutral-900">{result.name}</span>
                                <span className="font-bold text-primary-600">{result.extension}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                {!result.available && (
                                  <span className="ovh-badge-critical flex items-center gap-1">
                                    <OdsIcon name="x-circle" size="xs" />
                                    Indisponible
                                  </span>
                                )}
                                {result.available && availableExtensions.find(e => e.ext === result.extension)?.popular && (
                                  <span className="ovh-badge-warning flex items-center gap-1">
                                    <OdsIcon name="star" size="xs" />
                                    Populaire
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Price */}
                          <div className="text-right">
                            <span 
                              className="text-xl font-bold" 
                              style={{ color: result.available ? 'var(--ods-color-primary-500)' : 'var(--ods-color-neutral-400)' }}
                            >
                              {result.price.toFixed(2)} €
                            </span>
                            <span className={`text-sm block ${result.available ? 'text-neutral-500' : 'text-neutral-400'}`}>/an HT</span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Suggested Domains Section */}
                {suggestedDomains.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 pt-6 border-t border-neutral-200"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <OdsIcon name="lightbulb" size="sm" color="var(--ods-color-warning-500)" />
                      <h3 className="font-semibold text-neutral-900">
                        Autres domaines
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      {(showAllSuggestions ? suggestedDomains : suggestedDomains.slice(0, 3)).map((result, idx) => {
                        const domainFull = `${result.name}${result.extension}`;
                        const isSelected = selectedDomains.has(domainFull);
                        
                        return (
                          <motion.div
                            key={`suggestion-${result.name}-${result.extension}-${idx}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: showAllSuggestions ? 0 : idx * 0.05 }}
                            onClick={() => handleDomainToggle(domainFull)}
                            className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              isSelected
                                ? 'border-primary-500 shadow-md ovh-selectable-selected'
                                : 'border-neutral-200 hover:border-primary-300 ovh-selectable'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                {/* Checkbox */}
                                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                                  isSelected
                                    ? 'bg-primary-500 border-primary-500'
                                    : 'border-neutral-300 bg-white'
                                }`}>
                                  {isSelected && (
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  )}
                                </div>
                                
                                {/* Domain name */}
                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-neutral-900">{result.name}</span>
                                    <span className="font-bold text-primary-600">{result.extension}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Price */}
                              <div className="text-right">
                                <span className="text-xl font-bold" style={{ color: 'var(--ods-color-primary-500)' }}>
                                  {result.price.toFixed(2)} €
                                </span>
                                <span className="text-neutral-500 text-sm block">/an HT</span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Display more button */}
                    {suggestedDomains.length > 3 && !showAllSuggestions && (
                      <button
                        onClick={() => setShowAllSuggestions(true)}
                        className="mt-4 w-full py-3 px-4 rounded-lg border-2 border-neutral-200 hover:border-primary-300 hover:bg-primary-50 text-neutral-700 hover:text-primary-700 font-medium transition-all flex items-center justify-center gap-2"
                      >
                        Afficher plus de suggestions
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                    {showAllSuggestions && (
                      <button
                        onClick={() => setShowAllSuggestions(false)}
                        className="mt-4 w-full py-3 px-4 rounded-lg border-2 border-neutral-200 hover:border-primary-300 hover:bg-primary-50 text-neutral-700 hover:text-primary-700 font-medium transition-all flex items-center justify-center gap-2"
                      >
                        Afficher moins
                        <svg className="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {searchResults.length === 0 && !isSearching && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <OdsIcon name="search" size="lg" color="var(--ods-color-neutral-400)" />
              </div>
              <p className="text-neutral-600">
                Entrez un nom de domaine et cliquez sur "Rechercher"
              </p>
            </div>
          )}
        </motion.div>

        {/* Sticky Footer */}
        <AnimatePresence>
          {selectedDomains.size > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-lg border-t border-neutral-200 shadow-lg"
            >
              <div className="max-w-4xl mx-auto flex items-center justify-between">
                <div>
                  <p className="font-semibold text-neutral-900">
                    {selectedDomains.size} domaine{selectedDomains.size > 1 ? 's' : ''} sélectionné{selectedDomains.size > 1 ? 's' : ''}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {Array.from(selectedDomains).slice(0, 3).map((domain) => (
                      <span key={domain} className="ovh-badge-primary">{domain}</span>
                    ))}
                    {selectedDomains.size > 3 && (
                      <span className="text-sm text-neutral-500">+{selectedDomains.size - 3} autres</span>
                    )}
                  </div>
                </div>
                <button onClick={handleContinue} className="ovh-btn-primary">
                  Continuer
                  <span className="ml-2">→</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
