import { useLocation, useNavigate } from 'react-router-dom';

export default function Summary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questionnaire, domain, hosting, options } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Récapitulatif de votre commande
          </h1>
          <p className="text-gray-600 mb-8">
            Vérifiez les détails avant de finaliser votre commande
          </p>

          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="font-semibold text-gray-900 mb-2">Domaine</h2>
              <p className="text-gray-700">{domain || 'Non sélectionné'}</p>
            </div>

            <div className="border-b pb-4">
              <h2 className="font-semibold text-gray-900 mb-2">Pack d'hébergement</h2>
              <p className="text-gray-700 capitalize">{hosting || 'Non sélectionné'}</p>
            </div>

            {options && Object.values(options).some(Boolean) && (
              <div className="border-b pb-4">
                <h2 className="font-semibold text-gray-900 mb-2">Options</h2>
                <ul className="space-y-1">
                  {options.sqlDatabase && <li className="text-gray-700">Base de données SQL Privée</li>}
                  {options.cdnPremium && <li className="text-gray-700">CDN Premium</li>}
                  {options.extraBackup && <li className="text-gray-700">Sauvegarde Cloud supplémentaire</li>}
                </ul>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary">À calculer</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate('/funnel/hosting')}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Retour
              </button>
              <button
                onClick={() => alert('Fonctionnalité de paiement à implémenter')}
                className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Finaliser la commande
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

