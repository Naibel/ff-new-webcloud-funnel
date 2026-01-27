import { useState, useEffect } from 'react';
import type { Domain, DomainExtension } from '../types';
import { generateFullDomainSuggestions, createDomain } from '../utils/domainSuggestions';
import type { QuestionnaireAnswers } from '../types';
import './DomainSelection.css';

interface DomainSelectionProps {
  selectedDomains: Domain[];
  questionnaireAnswers?: QuestionnaireAnswers;
  onDomainsChange: (domains: Domain[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DomainSelection({
  selectedDomains,
  questionnaireAnswers,
  onDomainsChange,
  onNext,
  onBack,
}: DomainSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<Domain[]>([]);
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchTerm.trim().length >= 2) {
      setIsSearching(true);
      // Simuler un délai de recherche
      setTimeout(() => {
        const newSuggestions = generateFullDomainSuggestions(searchTerm, questionnaireAnswers);
        setSuggestions(newSuggestions);
        setIsSearching(false);
      }, 500);
    } else {
      setSuggestions([]);
    }
  }, [searchTerm, questionnaireAnswers]);

  const handleSearch = () => {
    if (searchTerm.trim().length >= 2) {
      const newSuggestions = generateFullDomainSuggestions(searchTerm, questionnaireAnswers);
      setSuggestions(newSuggestions);
      setShowAISuggestions(true);
    }
  };

  const handleAISuggestions = () => {
    if (searchTerm.trim().length >= 2) {
      const aiSuggestions = generateFullDomainSuggestions(searchTerm, questionnaireAnswers);
      setSuggestions(aiSuggestions);
      setShowAISuggestions(true);
    }
  };

  const toggleDomainSelection = (domain: Domain) => {
    if (domain.status === 'unavailable') return;

    const isSelected = selectedDomains.some(
      (d) => d.name === domain.name && d.extension === domain.extension
    );

    if (isSelected) {
      onDomainsChange(selectedDomains.filter((d) => !(d.name === domain.name && d.extension === domain.extension)));
    } else {
      onDomainsChange([...selectedDomains, domain]);
    }
  };

  const getStatusBadge = (status: Domain['status']) => {
    switch (status) {
      case 'available':
        return <span className="status-badge available">Disponible</span>;
      case 'unavailable':
        return <span className="status-badge unavailable">Indisponible</span>;
      case 'premium':
        return <span className="status-badge premium">Premium</span>;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="domain-selection">
      <div className="domain-container">
        <div className="step-header">
          <button className="back-button" onClick={onBack}>
            ← Retour
          </button>
          <div className="step-indicator">Étape 1 / 3</div>
        </div>

        <div className="domain-search-section">
          <h1 className="domain-title">Trouvez votre nom de domaine</h1>
          <p className="domain-subtitle">
            Recherchez et sélectionnez le nom de domaine parfait pour votre projet
          </p>

          <div className="search-wrapper">
            <div className="search-input-container">
              <input
                type="text"
                className="search-input"
                placeholder="Recherchez un nom de domaine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <button className="search-button" onClick={handleSearch} disabled={isSearching}>
                {isSearching ? '...' : '🔍'}
              </button>
            </div>
            <button className="ai-suggestions-button" onClick={handleAISuggestions}>
              ✨ Suggestions IA
            </button>
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="domain-results">
            <h3 className="results-title">
              {showAISuggestions ? 'Suggestions IA' : 'Résultats de recherche'}
            </h3>

            <div className="domains-list">
              {suggestions.map((domain, index) => {
                const isSelected = selectedDomains.some(
                  (d) => d.name === domain.name && d.extension === domain.extension
                );

                return (
                  <div
                    key={`${domain.name}${domain.extension}-${index}`}
                    className={`domain-item ${domain.status} ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleDomainSelection(domain)}
                  >
                    <div className="domain-info">
                      <div className="domain-name">
                        <span className="domain-base">{domain.name}</span>
                        <span className="domain-ext">{domain.extension}</span>
                        {domain.popular && <span className="popular-badge">Populaire</span>}
                      </div>
                      <div className="domain-status">{getStatusBadge(domain.status)}</div>
                    </div>
                    <div className="domain-price">
                      {domain.status === 'available' || domain.status === 'premium' ? (
                        <span className="price">{formatPrice(domain.price)}/an</span>
                      ) : (
                        <span className="unavailable-text">Indisponible</span>
                      )}
                    </div>
                    {domain.status !== 'unavailable' && (
                      <div className="domain-checkbox">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleDomainSelection(domain)}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {selectedDomains.length > 0 && (
          <div className="selected-domains-summary">
            <h4>Domaines sélectionnés ({selectedDomains.length})</h4>
            <div className="selected-list">
              {selectedDomains.map((domain, index) => (
                <span key={index} className="selected-domain-tag">
                  {domain.name}{domain.extension}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="domain-actions">
          <button className="btn-secondary" onClick={onBack}>
            Retour
          </button>
          <button
            className="btn-primary"
            onClick={onNext}
            disabled={selectedDomains.length === 0}
          >
            Continuer ({selectedDomains.length} domaine{selectedDomains.length > 1 ? 's' : ''} sélectionné{selectedDomains.length > 1 ? 's' : ''})
          </button>
        </div>
      </div>
    </div>
  );
}
