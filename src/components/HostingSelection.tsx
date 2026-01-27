import { useState } from 'react';
import type { HostingPack, AdditionalOptions } from '../types';
import { HOSTING_PACKS, ADDITIONAL_OPTIONS } from '../data/hostingPacks';
import CartSummary from './CartSummary';
import './HostingSelection.css';

interface HostingSelectionProps {
  selectedPack: HostingPack | null;
  recommendedPackId?: string;
  additionalOptions: AdditionalOptions;
  selectedDomains: any[];
  onPackChange: (pack: HostingPack) => void;
  onOptionsChange: (options: AdditionalOptions) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function HostingSelection({
  selectedPack,
  recommendedPackId,
  additionalOptions,
  selectedDomains,
  onPackChange,
  onOptionsChange,
  onBack,
  onNext,
}: HostingSelectionProps) {
  const [showAdditionalOptions, setShowAdditionalOptions] = useState(false);

  const packs = HOSTING_PACKS.map((pack) => ({
    ...pack,
    recommended: pack.id === recommendedPackId || (pack.id === 'cdn-security' && !recommendedPackId),
  }));

  const handleOptionToggle = (option: keyof AdditionalOptions) => {
    if (option === 'ssl') return; // SSL toujours inclus
    
    if (option === 'professionalEmails') {
      // Cycle: none -> 10 -> 20 -> none
      const current = additionalOptions.professionalEmails;
      const next = current === 'none' ? '10' : current === '10' ? '20' : 'none';
      onOptionsChange({
        ...additionalOptions,
        professionalEmails: next,
      });
    } else {
      onOptionsChange({
        ...additionalOptions,
        [option]: !(additionalOptions[option] as boolean),
      });
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
    <div className="hosting-selection">
      <div className="hosting-container">
        <div className="step-header">
          <button className="back-button" onClick={onBack}>
            ← Retour
          </button>
          <div className="step-indicator">Étape 2 / 3</div>
        </div>

        <div className="hosting-content">
          <div className="hosting-main">
            <h1 className="hosting-title">Choisissez votre pack d'hébergement</h1>
            <p className="hosting-subtitle">
              Sélectionnez l'offre qui correspond le mieux à vos besoins
            </p>

            <div className="packs-grid">
              {packs.map((pack) => (
                <div
                  key={pack.id}
                  className={`pack-card ${pack.recommended ? 'recommended' : ''} ${
                    selectedPack?.id === pack.id ? 'selected' : ''
                  }`}
                  onClick={() => onPackChange(pack)}
                >
                  {pack.recommended && (
                    <div className="recommended-badge">Recommandé</div>
                  )}
                  {recommendedPackId === pack.id && (
                    <div className="personalized-badge">
                      Recommandé pour vous
                    </div>
                  )}

                  <h3 className="pack-name">{pack.name}</h3>
                  <div className="pack-price">
                    <span className="price-amount">
                      {formatPrice(pack.priceMonthlyTTC || (pack.price * 1.2))}
                    </span>
                    <span className="price-period">/mois TTC</span>
                  </div>

                  <ul className="pack-features">
                    {pack.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <span className="feature-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`pack-select-button ${
                      selectedPack?.id === pack.id ? 'selected' : ''
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onPackChange(pack);
                    }}
                  >
                    {selectedPack?.id === pack.id ? 'Sélectionné' : 'Sélectionner'}
                  </button>
                </div>
              ))}
            </div>

            <div className="additional-options-section">
              <button
                className="additional-options-toggle"
                onClick={() => setShowAdditionalOptions(!showAdditionalOptions)}
              >
                <span>Options supplémentaires</span>
                <span className={`chevron ${showAdditionalOptions ? 'open' : ''}`}>▼</span>
              </button>

              {showAdditionalOptions && (
                <div className="additional-options-content">
                  <div className="option-item included">
                    <div className="option-info">
                      <h4>{ADDITIONAL_OPTIONS.ssl.name}</h4>
                      <p>{ADDITIONAL_OPTIONS.ssl.description}</p>
                    </div>
                    <div className="option-badge free">GRATUIT - Inclus</div>
                  </div>

                  <div className="option-item">
                    <div className="option-info">
                      <h4>{ADDITIONAL_OPTIONS.professionalEmails.name}</h4>
                      <p>Sélectionnez le nombre de comptes email professionnels</p>
                    </div>
                    <div className="option-controls">
                      <select
                        value={additionalOptions.professionalEmails}
                        onChange={(e) => {
                          onOptionsChange({
                            ...additionalOptions,
                            professionalEmails: e.target.value as 'none' | '10' | '20',
                          });
                        }}
                        className="email-select"
                      >
                        {ADDITIONAL_OPTIONS.professionalEmails.options.map((opt) => (
                          <option key={opt.id} value={opt.id}>
                            {opt.label} {opt.price > 0 && `- ${formatPrice(opt.priceMonthlyTTC || opt.price * 1.2)}/mois`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="option-item">
                    <div className="option-info">
                      <h4>{ADDITIONAL_OPTIONS.dailyBackups.name}</h4>
                      <p>{ADDITIONAL_OPTIONS.dailyBackups.description}</p>
                    </div>
                    <div className="option-controls">
                      <span className="option-price">
                        {formatPrice(ADDITIONAL_OPTIONS.dailyBackups.price)}/mois
                      </span>
                      <label className="checkbox-wrapper">
                        <input
                          type="checkbox"
                          checked={additionalOptions.dailyBackups}
                          onChange={() => handleOptionToggle('dailyBackups')}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <CartSummary
            domains={selectedDomains}
            hostingPack={selectedPack}
            additionalOptions={additionalOptions}
            onNext={onNext}
          />
        </div>
      </div>
    </div>
  );
}
