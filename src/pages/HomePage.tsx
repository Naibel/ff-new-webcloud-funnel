import { Link } from 'react-router-dom';
import { Button } from '@ovhcloud/ods-react';
import { Card } from '@ovhcloud/ods-react';
import { Text } from '@ovhcloud/ods-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <div className="mb-8">
          <Text preset="heading-1" className="mb-4">
            Funnel Web Cloud OVHcloud
          </Text>
          <Text preset="paragraph" className="mb-2">
            Tunnel de commande intelligent "Smart Guided"
          </Text>
          <Text preset="small" className="text-gray-500">
            Recommandation personnalisée en 30 secondes
          </Text>
        </div>

        <Card className="mb-8">
          <Text preset="heading-3" className="mb-6">
            Démarrer la maquette
          </Text>
          <Text preset="paragraph" className="mb-8">
            Explorez le tunnel de commande intelligent avec système de recommandation par points
          </Text>
          
          <Link to="/funnel">
            <Button variant="default" color="primary">
              🚀 Lancer la maquette
            </Button>
          </Link>
        </Card>

        <div className="grid md:grid-cols-3 gap-4 text-left">
          <Card>
            <div className="text-3xl mb-3">🎯</div>
            <Text preset="heading-5" className="mb-2">Recommandation IA</Text>
            <Text preset="small">
              Système de scoring intelligent basé sur vos besoins
            </Text>
          </Card>
          <Card>
            <div className="text-3xl mb-3">⚡</div>
            <Text preset="heading-5" className="mb-2">Rapide</Text>
            <Text preset="small">
              Configuration en moins de 2 minutes
            </Text>
          </Card>
          <Card>
            <div className="text-3xl mb-3">🎨</div>
            <Text preset="heading-5" className="mb-2">Design System</Text>
            <Text preset="small">
              Interface moderne et intuitive
            </Text>
          </Card>
        </div>
      </div>
    </div>
  );
}

