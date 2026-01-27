import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGuidedMode = () => {
    navigate('/funnel/questionnaire');
  };

  const handleDirectAccess = () => {
    navigate('/funnel/domain');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Développez votre présence en ligne
          </h1>
          <p className="text-xl text-gray-600">
            Choisissez votre parcours de commande
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Option A - Mode Guidé */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-2 border-primary relative"
            onClick={handleGuidedMode}
          >
            <div className="absolute top-4 right-4 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
              Recommandé
            </div>
            
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🧭</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Laissez-vous guider
              </h2>
              <p className="text-gray-600">
                Recommandation personnalisée en 30 secondes
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-700">
                <span className="text-primary mr-2">✓</span>
                Questionnaire rapide (4 questions)
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="text-primary mr-2">✓</span>
                Pack d'hébergement adapté à vos besoins
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="text-primary mr-2">✓</span>
                Suggestions de domaines intelligentes
              </div>
            </div>

            <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
              Commencer
            </button>
          </motion.div>

          {/* Option B - Accès Direct */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow cursor-pointer border-2 border-gray-200"
            onClick={handleDirectAccess}
          >
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">📋</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Accès direct au catalogue
              </h2>
              <p className="text-gray-600">
                Je connais mes besoins
              </p>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-gray-700">
                <span className="text-gray-400 mr-2">→</span>
                Parcourir tous les packs disponibles
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="text-gray-400 mr-2">→</span>
                Configuration manuelle
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <span className="text-gray-400 mr-2">→</span>
                Pack Pro présélectionné
              </div>
            </div>

            <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors border border-gray-300">
              Accéder au catalogue
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

