import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <div className="ovh-page">
      <div className="ovh-container">
        {/* Hero Section */}
        <motion.div 
          className="ovh-hero"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            Nouveau Funnel Web Cloud
          </div>
          <h1 className="ovh-hero-title">
            Funnel Web Cloud
            <span className="block text-primary-500">OVHcloud</span>
          </h1>
          <p className="ovh-hero-subtitle">
            Tunnel de commande intelligent "Smart Guided" avec recommandation personnalisée en 30 secondes
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="ovh-card-primary text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-ovh-cyan rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">
              Démarrer la maquette
            </h2>
            <p className="text-neutral-600 mb-8 max-w-md mx-auto">
              Explorez le tunnel de commande intelligent avec système de recommandation par points
            </p>
            
            <Link to="/funnel">
              <button className="ovh-btn-primary text-lg px-10 py-4 shadow-button">
                Lancer la maquette
                <span className="ml-2">→</span>
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎯',
                title: 'Recommandation IA',
                description: 'Système de scoring intelligent basé sur vos besoins',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: '⚡',
                title: 'Ultra Rapide',
                description: 'Configuration complète en moins de 2 minutes',
                color: 'from-amber-500 to-orange-500',
              },
              {
                icon: '🎨',
                title: 'Design System ODS',
                description: 'Interface moderne et intuitive OVHcloud',
                color: 'from-purple-500 to-pink-500',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                className="ovh-card group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16 text-neutral-500 text-sm"
        >
          <p>Propulsé par OVHcloud Design System</p>
        </motion.div>
      </div>
    </div>
  );
}
