import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import OdsIcon from '../components/OdsIcon';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGuidedMode = () => {
    navigate('/questionnaire');
  };

  const handleDirectAccess = () => {
    navigate('/domain');
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
        <div className="grid mt-16 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
                <span className="ovh-badge-primary flex items-center gap-1">
                  <OdsIcon name="star" size="xs" />
                  Recommandé
                </span>
              </div>

              {/* Decorative gradient */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary-200/50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="relative">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <OdsIcon name="compass" size="lg" color="white" />
                </div>

                {/* Content */}
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Laissez-vous guider
                </h2>
                <p className="text-neutral-600 mb-6">
                  Recommandation personnalisée en quelques clics
                </p>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {[
                    'Questionnaire rapide (4 questions)',
                    'Suggestions de domaines intelligentes',
                    'Hébergement adapté à vos besoins',
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
                <OdsIcon name="list" size="lg" />
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
                  'Parcourir toutes les offres disponibles',
                  'Configuration manuelle',
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

        {/* Why OVHcloud */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <OdsIcon name="globe" size="md" color="var(--ods-color-primary-500)" />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Leader européen</h3>
              <p className="text-neutral-600 text-sm">
                Plus de 1,6 million de clients nous font confiance dans le monde entier
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <OdsIcon name="lock" size="md" color="var(--ods-color-primary-500)" />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Sécurité garantie</h3>
              <p className="text-neutral-600 text-sm">
                Données hébergées en Europe avec conformité RGPD et disponibilité 99,9%
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <OdsIcon name="euro" size="md" color="var(--ods-color-primary-500)" />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Prix compétitifs</h3>
              <p className="text-neutral-600 text-sm">
                Le meilleur rapport qualité-prix du marché, sans frais cachés
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
