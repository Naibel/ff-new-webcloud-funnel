import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-xl p-8">
        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} sur {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {questions[currentQuestion].question}
            </h2>

            <div className="space-y-3 mb-8">
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    answers[questions[currentQuestion].id] === option.value
                      ? 'border-primary bg-blue-50'
                      : 'border-gray-200 hover:border-primary hover:bg-gray-50'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          <button
            onClick={handleSkip}
            className="px-6 py-2 text-gray-500 text-sm hover:text-gray-700"
          >
            Passer le questionnaire
          </button>
        </div>
      </div>
    </div>
  );
}

