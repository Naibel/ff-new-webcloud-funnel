import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@ovhcloud/ods-react';
import { Card } from '@ovhcloud/ods-react';
import { Badge } from '@ovhcloud/ods-react';
import { Text } from '@ovhcloud/ods-react';

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
          <Text size="heading-xl" className="mb-4">
            Développez votre présence en ligne
          </Text>
          <Text size="body-l">
            Choisissez votre parcours de commande
          </Text>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Option A - Mode Guidé */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative"
          >
            <Card 
              className="cursor-pointer border-2 border-primary hover:shadow-xl transition-shadow"
              onClick={handleGuidedMode}
            >
              <div className="absolute top-4 right-4">
                <Badge variant="primary">Recommandé</Badge>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">🧭</div>
                <Text size="heading-m" className="mb-2">
                  Laissez-vous guider
                </Text>
                <Text size="body-m">
                  Recommandation personnalisée en 30 secondes
                </Text>
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

              <Button variant="primary" className="w-full" onClick={handleGuidedMode}>
                Commencer
              </Button>
            </Card>
          </motion.div>

          {/* Option B - Accès Direct */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card 
              className="cursor-pointer border-2 border-gray-200 hover:shadow-xl transition-shadow"
              onClick={handleDirectAccess}
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">📋</div>
                <Text size="heading-m" className="mb-2">
                  Accès direct au catalogue
                </Text>
                <Text size="body-m">
                  Je connais mes besoins
                </Text>
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

              <Button variant="secondary" className="w-full" onClick={handleDirectAccess}>
                Accéder au catalogue
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

