import { useState } from 'react';
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
    optionsPrice = 0,
    databaseConfig = null,
    cdnConfig = null,
    sslConfig = null,
    visibilityProConfig = null
  } = location.state || {};

  const [selectedYears, setSelectedYears] = useState(1);

  // Calcul des remises par année
  const getDiscount = (years: number) => {
    if (years >= 5) return 0.20; // 20% de réduction pour 5 ans ou plus
    if (years >= 3) return 0.15; // 15% de réduction pour 3-4 ans
    if (years >= 2) return 0.10; // 10% de réduction pour 2 ans
    return 0; // Pas de réduction pour 1 an
  };

  const discount = getDiscount(selectedYears);
  const domainPrice = Array.isArray(domains) ? domains.length * 10 : 0;
  const hostingAnnual = hostingPrice * 12;
  const optionsAnnual = optionsPrice * 12;
  
  // Calcul avec remise et durée
  const subtotalPerYear = domainPrice + hostingAnnual + optionsAnnual;
  const totalBeforeDiscount = subtotalPerYear * selectedYears;
  const discountAmount = totalBeforeDiscount * discount;
  const totalHT = totalBeforeDiscount - discountAmount;
  const totalTTC = totalHT * 1.20;

  const hostingPacks: Record<string, { name: string; icon: string }> = {
    starter: { name: 'Starter', icon: '🌱' },
    perso: { name: 'Perso', icon: '🚀' },
    pro: { name: 'Pro', icon: '⭐' },
    performance: { name: 'Performance', icon: '💎' },
  };

  const databaseSystemNames: Record<string, string> = {
    mysql: 'MySQL',
    postgresql: 'PostgreSQL',
    mariadb: 'MariaDB',
    mongodb: 'MongoDB',
  };

  const databaseConfigNames: Record<string, string> = {
    '512mb-8gb': '512MB RAM / 8GB stockage',
    '1gb-16gb': '1GB RAM / 16GB stockage',
    '2gb-32gb': '2GB RAM / 32GB stockage',
    '4gb-64gb': '4GB RAM / 64GB stockage',
  };

  const cdnLevelNames: Record<string, string> = {
    basique: 'Basique',
    securite: 'Sécurité',
    avance: 'Avancé',
  };

  const sslTypeNames: Record<string, string> = {
    letsencrypt: 'SSL Let\'s Encrypt',
    'sectigo-dv': 'SSL Sectigo DV',
    'sectigo-ev': 'SSL Sectigo EV',
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

          {/* Duration Selector */}
          <div className="mb-6 p-5 bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl border border-primary-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">⏱️</span>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900">Durée d'engagement</h3>
                  <p className="text-sm text-neutral-600">Économisez jusqu'à 20% avec un engagement longue durée</p>
                </div>
              </div>
              {discount > 0 && (
                <div className="px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold shadow-lg">
                  -{(discount * 100).toFixed(0)}% 🎉
                </div>
              )}
            </div>

            {/* Years Selector */}
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((years) => {
                const isSelected = selectedYears === years;
                const hasDiscount = getDiscount(years) > 0;
                
                return (
                  <motion.button
                    key={years}
                    onClick={() => setSelectedYears(years)}
                    className={`relative p-3 rounded-xl font-bold text-sm transition-all ${
                      isSelected
                        ? 'bg-primary-500 text-white shadow-lg scale-105'
                        : hasDiscount
                        ? 'bg-white text-primary-600 border-2 border-primary-300 hover:border-primary-500'
                        : 'bg-white text-neutral-700 border-2 border-neutral-200 hover:border-neutral-300'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {years} {years === 1 ? 'an' : 'ans'}
                    {hasDiscount && !isSelected && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-[10px] text-white font-bold">%</span>
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Discount Info */}
            <div className="mt-4 text-sm text-neutral-600 text-center">
              {selectedYears === 1 && (
                <p>💡 Engagez-vous sur 2 ans ou plus pour bénéficier d'une réduction</p>
              )}
              {selectedYears === 2 && (
                <p>✨ Vous économisez <strong className="text-green-600">{discountAmount.toFixed(2)} €</strong> avec un engagement 2 ans</p>
              )}
              {selectedYears >= 3 && selectedYears < 5 && (
                <p>🎊 Excellente économie de <strong className="text-green-600">{discountAmount.toFixed(2)} €</strong> sur {selectedYears} ans !</p>
              )}
              {selectedYears >= 5 && (
                <p>🌟 Meilleure offre ! Vous économisez <strong className="text-green-600">{discountAmount.toFixed(2)} €</strong> sur {selectedYears} ans</p>
              )}
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
                          <p className="text-xs text-neutral-500">Enregistrement {selectedYears} {selectedYears === 1 ? 'an' : 'ans'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-neutral-700">{selectedYears}</td>
                    <td className="py-4 px-2 text-right text-neutral-700">10,00 €/an</td>
                    <td className="py-4 px-2 text-right font-semibold text-neutral-900">{(10 * selectedYears).toFixed(2)} €</td>
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
                            {hostingConfig.performanceLevel && `${hostingConfig.performanceLevel} • `}
                            {hostingConfig.cores && hostingConfig.ram ? 
                              `${hostingConfig.cores} vCore • ${hostingConfig.ram} Go RAM` :
                              `${hostingConfig.storage} Go • ${hostingConfig.emails} emails`
                            }
                          </p>
                        )}
                        <p className="text-xs text-neutral-500">Abonnement {selectedYears} {selectedYears === 1 ? 'an' : 'ans'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right text-neutral-700">{selectedYears}</td>
                  <td className="py-4 px-2 text-right text-neutral-700">{hostingAnnual.toFixed(2)} €/an</td>
                  <td className="py-4 px-2 text-right font-semibold text-neutral-900">{(hostingAnnual * selectedYears).toFixed(2)} €</td>
                </tr>

                {/* Options */}
                {options.sqlDatabase && databaseConfig && (
                  <tr className="hover:bg-neutral-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                          <span>🗄️</span>
                        </div>
                        <div>
                          <span className="font-semibold text-neutral-900">Base de données</span>
                          <p className="text-xs text-neutral-500">
                            {databaseSystemNames[databaseConfig.system] || databaseConfig.system}
                            {' • '}
                            {databaseConfigNames[databaseConfig.config] || databaseConfig.config}
                          </p>
                          <p className="text-xs text-neutral-500">Option sur {selectedYears} {selectedYears === 1 ? 'an' : 'ans'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-neutral-700">{12 * selectedYears}</td>
                    <td className="py-4 px-2 text-right text-neutral-700">{databaseConfig.price.toFixed(2)} €/mois</td>
                    <td className="py-4 px-2 text-right font-semibold text-neutral-900">
                      {(databaseConfig.price * 12 * selectedYears).toFixed(2)} €
                    </td>
                  </tr>
                )}
                {options.cdnPremium && cdnConfig && (
                  <tr className="hover:bg-neutral-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                          <span>⚡</span>
                        </div>
                        <div>
                          <span className="font-semibold text-neutral-900">Optimisation du trafic</span>
                          <p className="text-xs text-neutral-500">
                            {cdnLevelNames[cdnConfig.level] || cdnConfig.level}
                          </p>
                          <p className="text-xs text-neutral-500">Option sur {selectedYears} {selectedYears === 1 ? 'an' : 'ans'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-neutral-700">{12 * selectedYears}</td>
                    <td className="py-4 px-2 text-right text-neutral-700">{cdnConfig.price.toFixed(2)} €/mois</td>
                    <td className="py-4 px-2 text-right font-semibold text-neutral-900">
                      {(cdnConfig.price * 12 * selectedYears).toFixed(2)} €
                    </td>
                  </tr>
                )}
                {options.sslOption && sslConfig && (
                  <tr className="hover:bg-neutral-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <span>🔒</span>
                        </div>
                        <div>
                          <span className="font-semibold text-neutral-900">Option SSL</span>
                          <p className="text-xs text-neutral-500">
                            {sslTypeNames[sslConfig.type] || sslConfig.type}
                          </p>
                          <p className="text-xs text-neutral-500">Option sur {selectedYears} {selectedYears === 1 ? 'an' : 'ans'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-neutral-700">{12 * selectedYears}</td>
                    <td className="py-4 px-2 text-right text-neutral-700">
                      {sslConfig.price === 0 ? 'Inclus' : `${sslConfig.price.toFixed(2)} €/mois`}
                    </td>
                    <td className="py-4 px-2 text-right font-semibold text-neutral-900">
                      {sslConfig.price === 0 ? 'Inclus' : (sslConfig.price * 12 * selectedYears).toFixed(2) + ' €'}
                    </td>
                  </tr>
                )}
                {options.visibilityPro && visibilityProConfig && (
                  <tr className="hover:bg-neutral-50">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                          <span>📈</span>
                        </div>
                        <div>
                          <span className="font-semibold text-neutral-900">Visibilité pro</span>
                          <p className="text-xs text-neutral-500">
                            {selectedYears === 1 ? '16,49 €/mois (1ère année)' : '21,99 €/mois (années suivantes)'}
                          </p>
                          <p className="text-xs text-neutral-500">Option sur {selectedYears} {selectedYears === 1 ? 'an' : 'ans'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-2 text-right text-neutral-700">{12 * selectedYears}</td>
                    <td className="py-4 px-2 text-right text-neutral-700">
                      {selectedYears === 1 
                        ? `${visibilityProConfig.firstYearPrice.toFixed(2)} €/mois`
                        : `${visibilityProConfig.followingYearsPrice.toFixed(2)} €/mois`
                      }
                    </td>
                    <td className="py-4 px-2 text-right font-semibold text-neutral-900">
                      {selectedYears === 1
                        ? (visibilityProConfig.firstYearPrice * 12).toFixed(2) + ' €'
                        : (visibilityProConfig.followingYearsPrice * 12 * selectedYears).toFixed(2) + ' €'
                      }
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="bg-neutral-50 -mx-6 -mb-6 mt-6 p-6">
            <div className="max-w-md ml-auto space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Sous-total ({selectedYears} {selectedYears === 1 ? 'an' : 'ans'})</span>
                <span className="font-medium">{totalBeforeDiscount.toFixed(2)} €</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-semibold">
                    🎉 Réduction engagement {selectedYears} ans (-{(discount * 100).toFixed(0)}%)
                  </span>
                  <span className="font-semibold text-green-600">-{discountAmount.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between text-sm pt-2 border-t border-neutral-200">
                <span className="text-neutral-600">Total HT</span>
                <span className="font-medium">{totalHT.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">TVA (20%)</span>
                <span className="font-medium">{(totalTTC - totalHT).toFixed(2)} €</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t-2 border-neutral-300">
                <span className="font-bold text-lg text-neutral-900">Total TTC</span>
                <div className="text-right">
                  {discount > 0 && (
                    <div className="text-sm text-neutral-500 line-through mb-1">
                      {(totalBeforeDiscount * 1.20).toFixed(2)} €
                    </div>
                  )}
                  <span className="text-3xl font-bold text-primary-600">{totalTTC.toFixed(2)} €</span>
                </div>
              </div>
              <p className="text-xs text-neutral-500 text-right">
                Engagement {selectedYears} {selectedYears === 1 ? 'an' : 'ans'} • Renouvellement automatique
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
                <li>• Engagement sur {selectedYears} {selectedYears === 1 ? 'an' : 'ans'} avec renouvellement automatique</li>
                <li>• {discount > 0 ? `Réduction de ${(discount * 100).toFixed(0)}% appliquée` : 'Engagez-vous sur 2 ans minimum pour bénéficier d\'une réduction'}</li>
                <li>• Paiement sécurisé via Stripe ou PayPal</li>
                <li>• Garantie satisfait ou remboursé 30 jours</li>
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
