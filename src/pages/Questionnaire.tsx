import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card, ProgressBar, Text } from '@ovhcloud/ods-react';

const questions = [
  {
    id: 'organizationSize',
    question: 'Quelle est la taille de votre organisation ?',
    options: [
      { value: 'freelance', label: 'Particulier / Freelance / Indépendant' },
      { value: 'tpe', label: 'TPE (1-10 salariés)' },
      { value: 'pme', label: 'PME (11-50 salariés)' },
      { value: 'large', label: 'Grande entreprise (+50 salariés)' },
    ],
  },
  {
    id: 'siteType',
    question: 'Quel type de site souhaitez-vous créer ?',
    options: [
      { value: 'vitrine', label: 'Site vitrine (blog, média,…)' },
      { value: 'commerce', label: 'Commerce (boutique en ligne..)' },
      { value: 'application', label: 'Application web' },
      { value: 'autre', label: 'Autre' },
    ],
  },
  {
    id: 'geographicScope',
    question: 'Quelle est la portée géographique de votre activité ?',
    options: [
      { value: 'regionale', label: 'Régionale' },
      { value: 'national', label: 'National' },
      { value: 'european', label: 'Européenne' },
      { value: 'international', label: 'Internationale' },
    ],
  },
  {
    id: 'activitySector',
    question: 'Dans quel secteur d\'activité évoluez-vous ?',
    options: [
      { value: 'aucun', label: 'Aucun' },
      { value: 'services', label: 'Services / Conseil / Commerce' },
      { value: 'sante', label: 'Santé & Médical' },
      { value: 'tech', label: 'Tech & Digital / Créatif' },
      { value: 'restauration', label: 'Restauration & Hôtellerie' },
      { value: 'institutionnel', label: 'Institutionnel (fonction publique)' },
      { value: 'association', label: 'Association' },
    ],
  },
];

export default function Questionnaire() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 200);
    } else {
      // Questionnaire terminé, rediriger vers la sélection de domaine
      navigate('/funnel/domain', { state: { questionnaire: newAnswers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSkip = () => {
    navigate('/funnel/domain');
  };

  return (
    <div className="ods-page">
      <div className="ods-container ods-container--centered">
        <Card color="neutral" className="ods-p-8 ods-max-w-2xl">
          {/* Barre de progression */}
          <div className="ods-mb-8">
            <div className="ods-flex ods-justify-between ods-text--sm ods-text--muted ods-mb-2">
              <span>Question {currentQuestion + 1} sur {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <ProgressBar value={progress} max={100} />
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Text preset="heading-3" className="ods-mb-8">
                {questions[currentQuestion].question}
              </Text>

              <div className="ods-space-y-3 ods-mb-8">
                {questions[currentQuestion].options.map((option) => (
                  <Button
                    key={option.value}
                    variant={answers[questions[currentQuestion].id] === option.value ? 'default' : 'outline'}
                    color={answers[questions[currentQuestion].id] === option.value ? 'primary' : 'neutral'}
                    className="ods-w-full ods-text--left ods-justify-start"
                    onClick={() => handleAnswer(option.value)}
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="ods-flex ods-justify-between">
            <Button
              variant="outline"
              color="neutral"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              Précédent
            </Button>
            <Button
              variant="ghost"
              color="neutral"
              size="sm"
              onClick={handleSkip}
            >
              Passer le questionnaire
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
