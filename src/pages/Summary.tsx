import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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

  const domainPrice = Array.isArray(domains) ? domains.length * 10 : 0;
  const hostingAnnual = hostingPrice * 12;
  const optionsAnnual = optionsPrice * 12;
  const totalHT = domainPrice + hostingAnnual + optionsAnnual;
  const totalTTC = totalHT * 1.20;

  const hostingPacks: Record<string, { name: string; icon: string }> = {
    starter: { name: 'Starter', icon: '🌱' },
    perso: { name: 'Perso', icon: '🚀' },
    pro: { name: 'Pro', icon: '⭐' },
    performance: { name: 'Performance', icon: '💎' },
  };

  const selectedPack = hostingPacks[hosting as string] || { name: hosting, icon: '📦' };

  return (
    <div className="ovh-page">
      <div className="ovh-container max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-success-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <span>✓ Étape 3/3 - Récapitulatif</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-3">
            Récapitulatif de votre commande
          </h1>
          <p className="text-neutral-600 text-lg">
            Vérifiez les détails avant de finaliser
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="ovh-card overflow-hidden"
        >
          {/* Invoice Header */}
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 -mx-6 -mt-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-xl">☁️</span>
                  </div>
                  <span className="text-2xl font-bold">OVHcloud</span>
                </div>
                <p className="text-primary-100">Facture de commande</p>
              </div>
              <div className="text-right">
                <p className="text-primary-100 text-sm">Date</p>
                <p className="font-semibold">{new Date().toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-neutral-200">
                  <th className="text-left py-3 px-2 text-sm font-semibold text-neutral-600">Description</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-neutral-600">Qté</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-neutral-600">Prix unitaire</th>
                  <th className="text-right py-3 px-2 text-sm font-semibold text-neutral-600">Total HT</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {/* Domains */}
                {Array.isArray(domains) && domains.map((domain: string, idx: number) => (
                  <tr key={idx} className="hover:bg-neutral-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                          <span>🌐</span>
                        </div>
                        <div>
                          <span className="font-semibold text-neutral-900">{domain}</span>
                          <p className="text-xs text-neutral-500">Enregistrement 1 an</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-neutral-700">1</td>
                    <td className="py-4 px-2 text-right text-neutral-700">10,00 €</td>
                    <td className="py-4 px-2 text-right font-semibold text-neutral-900">10,00 €</td>
                  </tr>
                ))}

                {/* Hosting */}
                <tr className="hover:bg-neutral-50">
                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                        <span>{selectedPack.icon}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-neutral-900">
                          Pack {selectedPack.name}
                        </span>
                        {hostingConfig && (
                          <p className="text-xs text-neutral-500">
                            {hostingConfig.storage} Go • {hostingConfig.emails} emails
                          </p>
                        )}
                        <p className="text-xs text-neutral-500">Abonnement annuel</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right text-neutral-700">1</td>
                  <td className="py-4 px-2 text-right text-neutral-700">{hostingPrice.toFixed(2)} €/mois</td>
                  <td className="py-4 px-2 text-right font-semibold text-neutral-900">{hostingAnnual.toFixed(2)} €</td>
                </tr>

                {/* Options */}
                {options.sqlDatabase && (
                  <tr className="hover:bg-neutral-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                          <span>🗄️</span>
                        </div>
                        <div>
                          <span className="font-semibold text-neutral-900">Base de données SQL Privée</span>
                          <p className="text-xs text-neutral-500">Option mensuelle × 12</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-neutral-700">12</td>
                    <td className="py-4 px-2 text-right text-neutral-700">4,99 €</td>
                    <td className="py-4 px-2 text-right font-semibold text-neutral-900">59,88 €</td>
                  </tr>
                )}
                {options.cdnPremium && (
                  <tr className="hover:bg-neutral-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <span>⚡</span>
                        </div>
                        <div>
                          <span className="font-semibold text-neutral-900">CDN Premium</span>
                          <p className="text-xs text-neutral-500">Option mensuelle × 12</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-neutral-700">12</td>
                    <td className="py-4 px-2 text-right text-neutral-700">9,99 €</td>
                    <td className="py-4 px-2 text-right font-semibold text-neutral-900">119,88 €</td>
                  </tr>
                )}
                {options.extraBackup && (
                  <tr className="hover:bg-neutral-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <span>💾</span>
                        </div>
                        <div>
                          <span className="font-semibold text-neutral-900">Sauvegarde Cloud</span>
                          <p className="text-xs text-neutral-500">Option mensuelle × 12</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-neutral-700">12</td>
                    <td className="py-4 px-2 text-right text-neutral-700">2,99 €</td>
                    <td className="py-4 px-2 text-right font-semibold text-neutral-900">35,88 €</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="bg-neutral-50 -mx-6 -mb-6 mt-6 p-6">
            <div className="max-w-xs ml-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Sous-total HT</span>
                <span className="font-medium">{totalHT.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">TVA (20%)</span>
                <span className="font-medium">{(totalTTC - totalHT).toFixed(2)} €</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-neutral-200">
                <span className="font-bold text-lg text-neutral-900">Total TTC</span>
                <span className="text-3xl font-bold text-primary-600">{totalTTC.toFixed(2)} €</span>
              </div>
              <p className="text-xs text-neutral-500 text-right">
                Paiement annuel • Renouvellement automatique
              </p>
            </div>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 p-4 bg-primary-50 rounded-2xl border border-primary-200"
        >
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <span>ℹ️</span>
            </div>
            <div>
              <h3 className="font-semibold text-primary-900 mb-1">Informations importantes</h3>
              <ul className="text-sm text-primary-700 space-y-1">
                <li>• Les domaines sont enregistrés pour 1 an</li>
                <li>• L'hébergement est facturé annuellement</li>
                <li>• Vous pouvez modifier ou annuler à tout moment</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-4 mt-8"
        >
          <button
            onClick={() => navigate('/funnel/hosting')}
            className="ovh-btn-secondary flex-1"
          >
            ← Retour
          </button>
          <button
            onClick={() => alert('Fonctionnalité de paiement à implémenter')}
            className="ovh-btn-primary flex-1 text-lg py-4"
          >
            Finaliser la commande
            <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-lg text-sm">
              {totalTTC.toFixed(2)} € TTC
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
