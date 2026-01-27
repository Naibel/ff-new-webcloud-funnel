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
    <div className="ovh-page">
      <div className="ovh-container max-w-5xl">
        {/* Hero */}
        <motion.div 
          className="ovh-hero"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="ovh-hero-title">
            Développez votre
            <span className="block bg-gradient-to-r from-primary-500 to-ovh-cyan bg-clip-text text-transparent">
              présence en ligne
            </span>
          </h1>
          <p className="ovh-hero-subtitle">
            Choisissez votre parcours de commande pour obtenir l'offre la plus adaptée à vos besoins
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Option A - Mode Guidé */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div 
              className="ovh-card-primary h-full cursor-pointer relative overflow-hidden group"
              onClick={handleGuidedMode}
            >
              {/* Badge Recommandé */}
              <div className="absolute top-4 right-4">
                <span className="ovh-badge-primary">
                  ⭐ Recommandé
                </span>
              </div>

              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-200/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <span className="text-3xl">🧭</span>
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Laissez-vous guider
                </h2>
                <p className="text-neutral-600 mb-6">
                  Recommandation personnalisée en 30 secondes
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {[
                    'Questionnaire rapide (4 questions)',
                    'Pack d\'hébergement adapté à vos besoins',
                    'Suggestions de domaines intelligentes',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-neutral-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button 
                  className="ovh-btn-primary w-full"
                  onClick={handleGuidedMode}
                >
                  Commencer
                  <span className="ml-2">→</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Option B - Accès Direct */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div 
              className="ovh-card h-full cursor-pointer group border-2 border-neutral-200 hover:border-primary-300"
              onClick={handleDirectAccess}
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center mb-6 group-hover:from-primary-100 group-hover:to-primary-200 transition-all">
                <span className="text-3xl">📋</span>
              </div>

              {/* Content */}
              <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                Accès direct au catalogue
              </h2>
              <p className="text-neutral-600 mb-6">
                Je connais mes besoins
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {[
                  'Parcourir tous les packs disponibles',
                  'Configuration manuelle',
                  'Pack Pro présélectionné',
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-neutral-400 text-xs">→</span>
                    </div>
                    <span className="text-neutral-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Button */}
              <button 
                className="ovh-btn-secondary w-full"
                onClick={handleDirectAccess}
              >
                Accéder au catalogue
              </button>
            </div>
          </motion.div>
        </div>

        {/* Help text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-neutral-500 text-sm mt-12"
        >
          Besoin d'aide ? Notre équipe est disponible 24/7 pour vous accompagner.
        </motion.p>
      </div>
    </div>
  );
}
