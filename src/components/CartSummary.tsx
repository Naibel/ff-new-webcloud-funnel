import type { Domain, HostingPack, AdditionalOptions } from '../types';
import { ADDITIONAL_OPTIONS } from '../data/hostingPacks';
import './CartSummary.css';

interface CartSummaryProps {
  domains: Domain[];
  hostingPack: HostingPack | null;
  additionalOptions: AdditionalOptions;
  onNext: () => void;
}

export default function CartSummary({
  domains,
  hostingPack,
  additionalOptions,
  onNext,
}: CartSummaryProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
    }).format(price);
  };

  const calculateMonthlyTotal = () => {
    let total = 0;
    
    if (hostingPack) {
      // Utiliser le prix TTC si disponible, sinon calculer (HT * 1.2)
      total += hostingPack.priceMonthlyTTC || (hostingPack.price * 1.2);
    }

    if (additionalOptions.professionalEmails && additionalOptions.professionalEmails !== 'none') {
      const emailOption = ADDITIONAL_OPTIONS.professionalEmails.options.find(
        opt => opt.id === additionalOptions.professionalEmails
      );
      if (emailOption) {
        total += emailOption.priceMonthlyTTC || (emailOption.price * 1.2);
      }
    }

    if (additionalOptions.dailyBackups) {
      total += ADDITIONAL_OPTIONS.dailyBackups.priceMonthlyTTC || (ADDITIONAL_OPTIONS.dailyBackups.price * 1.2);
    }

    return total;
  };

  const calculateAnnualTotal = () => {
    const monthlyTotal = calculateMonthlyTotal();
    const domainsTotal = domains.reduce((sum, domain) => sum + domain.price, 0);
    
    return monthlyTotal * 12 + domainsTotal;
  };

  const calculateSavings = () => {
    const monthlyTotal = calculateMonthlyTotal();
    const annualTotal = calculateAnnualTotal();
    const domainsTotal = domains.reduce((sum, domain) => sum + domain.price, 0);
    
    // Économie théorique si on payait mensuellement
    const monthlyCost = monthlyTotal * 12;
    const savings = monthlyCost - (annualTotal - domainsTotal);
    
    if (savings > 0) {
      const percentage = Math.round((savings / monthlyCost) * 100);
      return percentage;
    }
    return 0;
  };

  const monthlyTotal = calculateMonthlyTotal();
  const annualTotal = calculateAnnualTotal();
  const savings = calculateSavings();

  return (
    <div className="cart-summary">
      <div className="cart-sticky">
        <h3 className="cart-title">Votre commande</h3>

        <div className="cart-items">
          {domains.length > 0 && (
            <div className="cart-section">
              <h4 className="section-title">Domaines</h4>
              {domains.map((domain, index) => (
                <div key={index} className="cart-item">
                  <span className="item-name">
                    {domain.name}{domain.extension}
                  </span>
                  <span className="item-price">{formatPrice(domain.price)}/an</span>
                </div>
              ))}
            </div>
          )}

          {hostingPack && (
            <div className="cart-section">
              <h4 className="section-title">Hébergement</h4>
              <div className="cart-item">
                <span className="item-name">{hostingPack.name}</span>
                <span className="item-price">
                  {formatPrice(hostingPack.priceMonthlyTTC || (hostingPack.price * 1.2))}/mois
                </span>
              </div>
            </div>
          )}

          {(additionalOptions.professionalEmails !== 'none' || additionalOptions.dailyBackups) && (
            <div className="cart-section">
              <h4 className="section-title">Options supplémentaires</h4>
              {additionalOptions.professionalEmails !== 'none' && (() => {
                const emailOption = ADDITIONAL_OPTIONS.professionalEmails.options.find(
                  opt => opt.id === additionalOptions.professionalEmails
                );
                return emailOption ? (
                  <div className="cart-item">
                    <span className="item-name">
                      {emailOption.label}
                    </span>
                    <span className="item-price">
                      {formatPrice(emailOption.priceMonthlyTTC || (emailOption.price * 1.2))}/mois
                    </span>
                  </div>
                ) : null;
              })()}
              {additionalOptions.dailyBackups && (
                <div className="cart-item">
                  <span className="item-name">
                    {ADDITIONAL_OPTIONS.dailyBackups.name}
                  </span>
                  <span className="item-price">
                    {formatPrice(ADDITIONAL_OPTIONS.dailyBackups.priceMonthlyTTC || (ADDITIONAL_OPTIONS.dailyBackups.price * 1.2))}/mois
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="cart-totals">
          <div className="total-row">
            <span>Sous-total mensuel</span>
            <span className="total-amount">{formatPrice(monthlyTotal)}/mois</span>
          </div>
          <div className="total-row annual">
            <span>Total annuel</span>
            <span className="total-amount">{formatPrice(annualTotal)}</span>
          </div>
          {savings > 0 && (
            <div className="savings-badge">
              Économisez {savings}% en payant annuellement
            </div>
          )}
        </div>

        <button
          className="checkout-button"
          onClick={onNext}
          disabled={!hostingPack || domains.length === 0}
        >
          Finaliser ma commande
        </button>
      </div>
    </div>
  );
}
