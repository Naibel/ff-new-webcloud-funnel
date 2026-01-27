import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Text } from '@ovhcloud/ods-react';

export default function Summary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    domains = [], 
    hosting, 
    hostingConfig,
    hostingPrice = 0,
    options = {},
    optionsPrice = 0 
  } = location.state || {};

  // Calcul des totaux
  const domainPrice = Array.isArray(domains) ? domains.length * 10 : 0; // Prix simulé par domaine
  const hostingAnnual = hostingPrice * 12;
  const optionsAnnual = optionsPrice * 12;
  const totalHT = domainPrice + hostingAnnual + optionsAnnual;
  const totalTTC = totalHT * 1.20; // TVA 20%

  const hostingPacks = {
    starter: 'Starter',
    perso: 'Perso',
    pro: 'Pro',
    performance: 'Performance',
  };

  return (
    <div className="ods-page">
      <div className="ods-container ods-max-w-4xl">
        <Card color="neutral" className="ods-p-8">
          <div className="ods-text--center ods-mb-8">
            <Text preset="heading-2" className="ods-mb-2">
              Récapitulatif de votre commande
            </Text>
            <Text preset="paragraph">
              Vérifiez les détails avant de finaliser votre commande
            </Text>
          </div>

          {/* Facture détaillée */}
          <Card color="neutral" className="ods-mb-6 ods-border-2">
            {/* En-tête facture */}
            <div className="ods-bg--neutral-50 ods-p-6 ods-border-b">
              <div className="ods-flex ods-justify-between ods-items-start">
                <div>
                  <Text preset="heading-3" className="ods-mb-2">OVHcloud</Text>
                  <Text preset="small" className="ods-text--muted">Facture de commande</Text>
                </div>
                <div className="ods-text--right">
                  <Text preset="small" className="ods-text--muted">Date</Text>
                  <Text preset="paragraph" className="ods-font--semibold">
                    {new Date().toLocaleDateString('fr-FR')}
                  </Text>
                </div>
              </div>
            </div>

            {/* Détails de la facture */}
            <div className="ods-p-6">
              <table className="ods-table ods-w-full">
                <thead>
                  <tr className="ods-border-b">
                    <th className="ods-text--left ods-py-3 ods-text--sm ods-font--semibold">Description</th>
                    <th className="ods-text--right ods-py-3 ods-text--sm ods-font--semibold">Quantité</th>
                    <th className="ods-text--right ods-py-3 ods-text--sm ods-font--semibold">Prix unitaire HT</th>
                    <th className="ods-text--right ods-py-3 ods-text--sm ods-font--semibold">Total HT</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Domaines */}
                  {Array.isArray(domains) && domains.length > 0 && (
                    <>
                      {domains.map((domain: string, idx: number) => (
                        <tr key={idx} className="ods-border-b">
                          <td className="ods-py-3">
                            <span className="ods-font--medium">{domain}</span>
                            <p className="ods-text--xs ods-text--muted">Enregistrement pour 1 an</p>
                          </td>
                          <td className="ods-py-3 ods-text--right">1</td>
                          <td className="ods-py-3 ods-text--right">10,00 €</td>
                          <td className="ods-py-3 ods-text--right ods-font--semibold">10,00 €</td>
                        </tr>
                      ))}
                    </>
                  )}

                  {/* Hébergement */}
                  <tr className="ods-border-b">
                    <td className="ods-py-3">
                      <span className="ods-font--medium">
                        Pack d'hébergement {hostingPacks[hosting as keyof typeof hostingPacks] || hosting}
                      </span>
                      {hostingConfig && (
                        <p className="ods-text--xs ods-text--muted">
                          {hostingConfig.storage} Go stockage, {hostingConfig.emails} adresses email
                        </p>
                      )}
                      <p className="ods-text--xs ods-text--muted">Abonnement annuel</p>
                    </td>
                    <td className="ods-py-3 ods-text--right">1</td>
                    <td className="ods-py-3 ods-text--right">{hostingPrice.toFixed(2)} €/mois</td>
                    <td className="ods-py-3 ods-text--right ods-font--semibold">{hostingAnnual.toFixed(2)} €</td>
                  </tr>

                  {/* Options */}
                  {options.sqlDatabase && (
                    <tr className="ods-border-b">
                      <td className="ods-py-3">
                        <span className="ods-font--medium">Base de données SQL Privée</span>
                        <p className="ods-text--xs ods-text--muted">Option mensuelle</p>
                      </td>
                      <td className="ods-py-3 ods-text--right">12</td>
                      <td className="ods-py-3 ods-text--right">4,99 €/mois</td>
                      <td className="ods-py-3 ods-text--right ods-font--semibold">59,88 €</td>
                    </tr>
                  )}
                  {options.cdnPremium && (
                    <tr className="ods-border-b">
                      <td className="ods-py-3">
                        <span className="ods-font--medium">CDN Premium</span>
                        <p className="ods-text--xs ods-text--muted">Option mensuelle</p>
                      </td>
                      <td className="ods-py-3 ods-text--right">12</td>
                      <td className="ods-py-3 ods-text--right">9,99 €/mois</td>
                      <td className="ods-py-3 ods-text--right ods-font--semibold">119,88 €</td>
                    </tr>
                  )}
                  {options.extraBackup && (
                    <tr className="ods-border-b">
                      <td className="ods-py-3">
                        <span className="ods-font--medium">Sauvegarde Cloud supplémentaire</span>
                        <p className="ods-text--xs ods-text--muted">Option mensuelle</p>
                      </td>
                      <td className="ods-py-3 ods-text--right">12</td>
                      <td className="ods-py-3 ods-text--right">2,99 €/mois</td>
                      <td className="ods-py-3 ods-text--right ods-font--semibold">35,88 €</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Totaux */}
            <div className="ods-bg--neutral-50 ods-p-6 ods-border-t">
              <div className="ods-space-y-2">
                <div className="ods-flex ods-justify-between ods-text--sm">
                  <span className="ods-text--muted">Sous-total HT</span>
                  <span>{totalHT.toFixed(2)} €</span>
                </div>
                <div className="ods-flex ods-justify-between ods-text--sm">
                  <span className="ods-text--muted">TVA (20%)</span>
                  <span>{(totalTTC - totalHT).toFixed(2)} €</span>
                </div>
                <div className="ods-flex ods-justify-between ods-items-center ods-pt-3 ods-border-t">
                  <Text preset="paragraph" className="ods-font--bold">Total TTC</Text>
                  <Text preset="heading-2" className="ods-text--primary">{totalTTC.toFixed(2)} €</Text>
                </div>
                <div className="ods-text--xs ods-text--muted ods-mt-2">
                  <Text preset="caption">Paiement annuel • Renouvellement automatique</Text>
                </div>
              </div>
            </div>
          </Card>

          {/* Informations complémentaires */}
          <Card color="information" className="ods-mb-6 ods-p-4">
            <Text preset="heading-5" className="ods-mb-2">Informations importantes</Text>
            <ul className="ods-text--sm ods-space-y-1">
              <li>• Les domaines sont enregistrés pour une durée de 1 an</li>
              <li>• L'hébergement est facturé annuellement</li>
              <li>• Les options sont facturées mensuellement, prélevées annuellement</li>
              <li>• Vous pouvez modifier ou annuler votre abonnement à tout moment</li>
            </ul>
          </Card>

          {/* Boutons d'action */}
          <div className="ods-flex ods-gap-4">
            <Button
              variant="outline"
              color="neutral"
              className="ods-flex-1"
              onClick={() => navigate('/funnel/hosting')}
            >
              Retour
            </Button>
            <Button
              variant="default"
              color="primary"
              className="ods-flex-1"
              onClick={() => alert('Fonctionnalité de paiement à implémenter')}
            >
              Finaliser la commande ({totalTTC.toFixed(2)} € TTC)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
