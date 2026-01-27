import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@ovhcloud/ods-react';
import { Card } from '@ovhcloud/ods-react';
import { Input } from '@ovhcloud/ods-react';
import { Badge } from '@ovhcloud/ods-react';
import { Checkbox } from '@ovhcloud/ods-react';
import { Text } from '@ovhcloud/ods-react';
import { Spinner } from '@ovhcloud/ods-react';

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
        <Card className="mb-6">
          <Text preset="heading-2" className="mb-2">
            Recherchez votre nom de domaine
          </Text>
          <Text preset="paragraph">
            Recherchez et sélectionnez un ou plusieurs domaines pour votre projet
          </Text>
        </Card>

        {/* Champ de recherche */}
        <Card className="mb-6">
          <div className="flex gap-4 mb-4">
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Recherchez votre domaine (ex: votre-entreprise)"
              className="flex-1"
            />
            <Button 
              variant="default"
              color="primary"
              onClick={handleSearch}
              disabled={!searchTerm.trim() || isSearching}
            >
              {isSearching ? <Spinner size="sm" /> : 'Rechercher'}
            </Button>
          </div>

          {/* Résultats de recherche */}
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <Text preset="small" className="mb-4">
                Résultats de recherche ({searchResults.length} domaines trouvés)
              </Text>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {searchResults.map((result, idx) => {
                  const domainFull = `${result.name}${result.extension}`;
                  const isSelected = selectedDomains.has(domainFull);
                  
                  return (
                    <Card
                      key={`${result.name}-${result.extension}-${idx}`}
                      className={`cursor-pointer transition-all ${
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
                          <Checkbox
                            checked={isSelected}
                            onChange={() => result.available && handleDomainToggle(domainFull)}
                            disabled={!result.available}
                            onClick={(e) => e.stopPropagation()}
                          />
                          <div>
                            <Text preset="paragraph" className="font-semibold">
                              {result.name}
                              <span className="text-primary">{result.extension}</span>
                            </Text>
                            <div className="flex gap-2 mt-1">
                              {result.available ? (
                                <Badge color="success">Disponible</Badge>
                              ) : (
                                <Badge color="critical">Indisponible</Badge>
                              )}
                              {availableExtensions.find(e => e.ext === result.extension)?.popular && (
                                <Badge color="warning">Populaire</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Text preset="paragraph" className="font-semibold">
                          {result.price.toFixed(2)} €/an HT
                        </Text>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Message si pas de recherche */}
          {searchResults.length === 0 && !isSearching && (
            <div className="text-center py-8 text-gray-500">
              <Text preset="paragraph">Entrez un nom de domaine dans le champ ci-dessus et cliquez sur "Rechercher"</Text>
            </div>
          )}
        </Card>

        {/* Récapitulatif sticky */}
        {selectedDomains.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky bottom-4"
          >
            <Card>
              <div className="flex justify-between items-center">
                <div>
                  <Text preset="small" className="mb-1">Domaines sélectionnés ({selectedDomains.size})</Text>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(selectedDomains).slice(0, 3).map((domain) => (
                      <Badge key={domain} color="primary">{domain}</Badge>
                    ))}
                    {selectedDomains.size > 3 && (
                      <Text preset="small">+{selectedDomains.size - 3} autres</Text>
                    )}
                  </div>
                </div>
                <Button
                  variant="default"
                  color="primary"
                  onClick={handleContinue}
                >
                  Suivant
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
