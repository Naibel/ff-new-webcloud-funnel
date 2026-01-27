import { Link } from 'react-router-dom';
import { Button, Card, Text } from '@ovhcloud/ods-react';

export default function HomePage() {
  return (
    <div className="ods-page">
      <div className="ods-container ods-container--centered">
        <div className="ods-section ods-section--hero">
          <Text preset="heading-1" className="ods-mb-4">
            Funnel Web Cloud OVHcloud
          </Text>
          <Text preset="paragraph" className="ods-mb-2">
            Tunnel de commande intelligent "Smart Guided"
          </Text>
          <Text preset="small" className="ods-text--muted">
            Recommandation personnalisée en 30 secondes
          </Text>
        </div>

        <Card color="neutral" className="ods-mb-8 ods-p-8">
          <Text preset="heading-3" className="ods-mb-6 ods-text--center">
            Démarrer la maquette
          </Text>
          <Text preset="paragraph" className="ods-mb-8 ods-text--center">
            Explorez le tunnel de commande intelligent avec système de recommandation par points
          </Text>
          
          <div className="ods-flex ods-justify-center">
            <Link to="/funnel">
              <Button variant="default" color="primary" size="md">
                🚀 Lancer la maquette
              </Button>
            </Link>
          </div>
        </Card>

        <div className="ods-grid ods-grid--3-cols ods-gap-4">
          <Card color="neutral" className="ods-p-6">
            <div className="ods-text--3xl ods-mb-3">🎯</div>
            <Text preset="heading-5" className="ods-mb-2">Recommandation IA</Text>
            <Text preset="small">
              Système de scoring intelligent basé sur vos besoins
            </Text>
          </Card>
          <Card color="neutral" className="ods-p-6">
            <div className="ods-text--3xl ods-mb-3">⚡</div>
            <Text preset="heading-5" className="ods-mb-2">Rapide</Text>
            <Text preset="small">
              Configuration en moins de 2 minutes
            </Text>
          </Card>
          <Card color="neutral" className="ods-p-6">
            <div className="ods-text--3xl ods-mb-3">🎨</div>
            <Text preset="heading-5" className="ods-mb-2">Design System</Text>
            <Text preset="small">
              Interface moderne et intuitive
            </Text>
          </Card>
        </div>
      </div>
    </div>
  );
}
