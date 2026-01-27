import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button, Card, Badge, Text } from '@ovhcloud/ods-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGuidedMode = () => {
    navigate('/funnel/questionnaire');
  };

  const handleDirectAccess = () => {
    navigate('/funnel/domain');
  };

  return (
    <div className="ods-page">
      <div className="ods-container ods-container--centered">
        <div className="ods-section ods-section--hero ods-text--center ods-mb-12">
          <Text preset="heading-1" className="ods-mb-4">
            Développez votre présence en ligne
          </Text>
          <Text preset="paragraph">
            Choisissez votre parcours de commande
          </Text>
        </div>

        <div className="ods-grid ods-grid--2-cols ods-gap-6">
          {/* Option A - Mode Guidé */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="ods-position--relative"
          >
            <Card 
              color="primary"
              className="ods-card--interactive ods-p-6"
              onClick={handleGuidedMode}
            >
              <div className="ods-position--absolute ods-top-4 ods-right-4">
                <Badge color="primary" size="sm">Recommandé</Badge>
              </div>
              
              <div className="ods-text--center ods-mb-6">
                <div className="ods-text--5xl ods-mb-4">🧭</div>
                <Text preset="heading-3" className="ods-mb-2">
                  Laissez-vous guider
                </Text>
                <Text preset="paragraph">
                  Recommandation personnalisée en 30 secondes
                </Text>
              </div>

              <div className="ods-space-y-3 ods-mb-6">
                <div className="ods-flex ods-items-center ods-text--sm">
                  <span className="ods-text--primary ods-mr-2">✓</span>
                  <Text preset="small">Questionnaire rapide (4 questions)</Text>
                </div>
                <div className="ods-flex ods-items-center ods-text--sm">
                  <span className="ods-text--primary ods-mr-2">✓</span>
                  <Text preset="small">Pack d'hébergement adapté à vos besoins</Text>
                </div>
                <div className="ods-flex ods-items-center ods-text--sm">
                  <span className="ods-text--primary ods-mr-2">✓</span>
                  <Text preset="small">Suggestions de domaines intelligentes</Text>
                </div>
              </div>

              <Button variant="default" color="primary" className="ods-w-full" onClick={handleGuidedMode}>
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
              color="neutral"
              className="ods-card--interactive ods-p-6"
              onClick={handleDirectAccess}
            >
              <div className="ods-text--center ods-mb-6">
                <div className="ods-text--5xl ods-mb-4">📋</div>
                <Text preset="heading-3" className="ods-mb-2">
                  Accès direct au catalogue
                </Text>
                <Text preset="paragraph">
                  Je connais mes besoins
                </Text>
              </div>

              <div className="ods-space-y-3 ods-mb-6">
                <div className="ods-flex ods-items-center ods-text--sm">
                  <span className="ods-text--muted ods-mr-2">→</span>
                  <Text preset="small">Parcourir tous les packs disponibles</Text>
                </div>
                <div className="ods-flex ods-items-center ods-text--sm">
                  <span className="ods-text--muted ods-mr-2">→</span>
                  <Text preset="small">Configuration manuelle</Text>
                </div>
                <div className="ods-flex ods-items-center ods-text--sm">
                  <span className="ods-text--muted ods-mr-2">→</span>
                  <Text preset="small">Pack Pro présélectionné</Text>
                </div>
              </div>

              <Button variant="outline" color="neutral" className="ods-w-full" onClick={handleDirectAccess}>
                Accéder au catalogue
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
