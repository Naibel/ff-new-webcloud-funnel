import { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Button, 
  Card, 
  Input, 
  Badge, 
  Checkbox, 
  CheckboxControl,
  Text
} from '@ovhcloud/ods-react';

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

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="ods-page">
      <div className="ods-container ods-max-w-4xl">
        <Card color="neutral" className="ods-mb-6 ods-p-6">
          <Text preset="heading-2" className="ods-mb-2">
            Recherchez votre nom de domaine
          </Text>
          <Text preset="paragraph">
            Recherchez et sélectionnez un ou plusieurs domaines pour votre projet
          </Text>
        </Card>

        {/* Champ de recherche */}
        <Card color="neutral" className="ods-mb-6 ods-p-6">
          <div className="ods-flex ods-gap-4 ods-mb-4">
            <div className="ods-flex-1">
              <Input
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Recherchez votre domaine (ex: votre-entreprise)"
              />
            </div>
            <Button 
              variant="default"
              color="primary"
              onClick={handleSearch}
              disabled={!searchTerm.trim() || isSearching}
              loading={isSearching}
            >
              Rechercher
            </Button>
          </div>

          {/* Résultats de recherche */}
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="ods-mt-6"
            >
              <Text preset="small" className="ods-mb-4">
                Résultats de recherche ({searchResults.length} domaines trouvés)
              </Text>
              <div className="ods-space-y-3 ods-max-h-96 ods-overflow-y-auto">
                {searchResults.map((result, idx) => {
                  const domainFull = `${result.name}${result.extension}`;
                  const isSelected = selectedDomains.has(domainFull);
                  
                  return (
                    <Card
                      key={`${result.name}-${result.extension}-${idx}`}
                      color={isSelected ? 'primary' : result.available ? 'neutral' : 'critical'}
                      className={`ods-card--interactive ods-p-4 ${!result.available ? 'ods-opacity-60' : ''}`}
                      onClick={() => result.available && handleDomainToggle(domainFull)}
                    >
                      <div className="ods-flex ods-justify-between ods-items-center">
                        <div className="ods-flex ods-items-center ods-gap-3">
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => result.available && handleDomainToggle(domainFull)}
                            disabled={!result.available}
                          >
                            <CheckboxControl />
                          </Checkbox>
                          <div>
                            <Text preset="paragraph" className="ods-font--semibold">
                              {result.name}
                              <span className="ods-text--primary">{result.extension}</span>
                            </Text>
                            <div className="ods-flex ods-gap-2 ods-mt-1">
                              {result.available ? (
                                <Badge color="success" size="sm">Disponible</Badge>
                              ) : (
                                <Badge color="critical" size="sm">Indisponible</Badge>
                              )}
                              {availableExtensions.find(e => e.ext === result.extension)?.popular && (
                                <Badge color="warning" size="sm">Populaire</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Text preset="paragraph" className="ods-font--semibold">
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
            <div className="ods-text--center ods-py-8">
              <Text preset="paragraph" className="ods-text--muted">
                Entrez un nom de domaine dans le champ ci-dessus et cliquez sur "Rechercher"
              </Text>
            </div>
          )}
        </Card>

        {/* Récapitulatif sticky */}
        {selectedDomains.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="ods-sticky ods-bottom-4"
          >
            <Card color="neutral" className="ods-p-4">
              <div className="ods-flex ods-justify-between ods-items-center">
                <div>
                  <Text preset="small" className="ods-mb-1">
                    Domaines sélectionnés ({selectedDomains.size})
                  </Text>
                  <div className="ods-flex ods-flex-wrap ods-gap-2">
                    {Array.from(selectedDomains).slice(0, 3).map((domain) => (
                      <Badge key={domain} color="primary" size="sm">{domain}</Badge>
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
