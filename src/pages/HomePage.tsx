import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Funnel Web Cloud OVHcloud
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Tunnel de commande intelligent "Smart Guided"
          </p>
          <p className="text-lg text-gray-500">
            Recommandation personnalisée en 30 secondes
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Démarrer la maquette
          </h2>
          <p className="text-gray-600 mb-8">
            Explorez le tunnel de commande intelligent avec système de recommandation par points
          </p>
          
          <Link
            to="/funnel"
            className="inline-block bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            🚀 Lancer la maquette
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4 text-left">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-800 mb-2">Recommandation IA</h3>
            <p className="text-sm text-gray-600">
              Système de scoring intelligent basé sur vos besoins
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-gray-800 mb-2">Rapide</h3>
            <p className="text-sm text-gray-600">
              Configuration en moins de 2 minutes
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <div className="text-3xl mb-3">🎨</div>
            <h3 className="font-semibold text-gray-800 mb-2">Design System</h3>
            <p className="text-sm text-gray-600">
              Interface moderne et intuitive
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

