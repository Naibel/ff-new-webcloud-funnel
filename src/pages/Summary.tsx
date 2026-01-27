import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@ovhcloud/ods-react';
import { Card } from '@ovhcloud/ods-react';
import { Text } from '@ovhcloud/ods-react';
import { Table } from '@ovhcloud/ods-react';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <div className="text-center mb-8">
            <Text size="heading-l" className="mb-2">
              Récapitulatif de votre commande
            </Text>
            <Text size="body-m">
              Vérifiez les détails avant de finaliser votre commande
            </Text>
          </div>

          {/* Facture détaillée */}
          <Card className="mb-6 border-2 border-gray-200">
            {/* En-tête facture */}
            <div className="bg-gray-50 p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <Text size="heading-m" className="mb-2">OVHcloud</Text>
                  <Text size="body-s">Facture de commande</Text>
                </div>
                <div className="text-right">
                  <Text size="body-s">Date</Text>
                  <Text size="body-m" className="font-semibold">{new Date().toLocaleDateString('fr-FR')}</Text>
                </div>
              </div>
            </div>

            {/* Détails de la facture */}
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-semibold text-gray-700">Description</th>
                    <th className="text-right py-3 text-sm font-semibold text-gray-700">Quantité</th>
                    <th className="text-right py-3 text-sm font-semibold text-gray-700">Prix unitaire HT</th>
                    <th className="text-right py-3 text-sm font-semibold text-gray-700">Total HT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {/* Domaines */}
                  {Array.isArray(domains) && domains.length > 0 && (
                    <>
                      {domains.map((domain: string, idx: number) => (
                        <tr key={idx}>
                          <td className="py-3 text-gray-900">
                            <span className="font-medium">{domain}</span>
                            <p className="text-xs text-gray-500">Enregistrement pour 1 an</p>
                          </td>
                          <td className="py-3 text-right text-gray-700">1</td>
                          <td className="py-3 text-right text-gray-700">10,00 €</td>
                          <td className="py-3 text-right font-semibold text-gray-900">10,00 €</td>
                        </tr>
                      ))}
                    </>
                  )}

                  {/* Hébergement */}
                  <tr>
                    <td className="py-3 text-gray-900">
                      <span className="font-medium">Pack d'hébergement {hostingPacks[hosting as keyof typeof hostingPacks] || hosting}</span>
                      {hostingConfig && (
                        <p className="text-xs text-gray-500">
                          {hostingConfig.storage} Go stockage, {hostingConfig.emails} adresses email
                        </p>
                      )}
                      <p className="text-xs text-gray-500">Abonnement annuel</p>
                    </td>
                    <td className="py-3 text-right text-gray-700">1</td>
                    <td className="py-3 text-right text-gray-700">{hostingPrice.toFixed(2)} €/mois</td>
                    <td className="py-3 text-right font-semibold text-gray-900">{hostingAnnual.toFixed(2)} €</td>
                  </tr>

                  {/* Options */}
                  {options.sqlDatabase && (
                    <tr>
                      <td className="py-3 text-gray-900">
                        <span className="font-medium">Base de données SQL Privée</span>
                        <p className="text-xs text-gray-500">Option mensuelle</p>
                      </td>
                      <td className="py-3 text-right text-gray-700">12</td>
                      <td className="py-3 text-right text-gray-700">4,99 €/mois</td>
                      <td className="py-3 text-right font-semibold text-gray-900">59,88 €</td>
                    </tr>
                  )}
                  {options.cdnPremium && (
                    <tr>
                      <td className="py-3 text-gray-900">
                        <span className="font-medium">CDN Premium</span>
                        <p className="text-xs text-gray-500">Option mensuelle</p>
                      </td>
                      <td className="py-3 text-right text-gray-700">12</td>
                      <td className="py-3 text-right text-gray-700">9,99 €/mois</td>
                      <td className="py-3 text-right font-semibold text-gray-900">119,88 €</td>
                    </tr>
                  )}
                  {options.extraBackup && (
                    <tr>
                      <td className="py-3 text-gray-900">
                        <span className="font-medium">Sauvegarde Cloud supplémentaire</span>
                        <p className="text-xs text-gray-500">Option mensuelle</p>
                      </td>
                      <td className="py-3 text-right text-gray-700">12</td>
                      <td className="py-3 text-right text-gray-700">2,99 €/mois</td>
                      <td className="py-3 text-right font-semibold text-gray-900">35,88 €</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Totaux */}
            <div className="bg-gray-50 p-6 border-t border-gray-200">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Sous-total HT</span>
                  <span>{totalHT.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>TVA (20%)</span>
                  <span>{(totalTTC - totalHT).toFixed(2)} €</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-300">
                  <span className="text-lg font-bold text-gray-900">Total TTC</span>
                  <span className="text-2xl font-bold text-primary">{totalTTC.toFixed(2)} €</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  <p>Paiement annuel • Renouvellement automatique</p>
                </div>
              </div>
            </div>
          </div>

          {/* Informations complémentaires */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Informations importantes</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Les domaines sont enregistrés pour une durée de 1 an</li>
              <li>• L'hébergement est facturé annuellement</li>
              <li>• Les options sont facturées mensuellement, prélevées annuellement</li>
              <li>• Vous pouvez modifier ou annuler votre abonnement à tout moment</li>
            </ul>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4">
            <Button
              variant="secondary"
              className="flex-1"
              onClick={() => navigate('/funnel/hosting')}
            >
              Retour
            </Button>
            <Button
              variant="primary"
              className="flex-1"
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
