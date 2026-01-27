import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    id: 'organizationSize',
    question: 'Quelle est la taille de votre organisation ?',
    icon: '🏢',
    options: [
      { value: 'freelance', label: 'Particulier / Freelance / Indépendant', icon: '👤' },
      { value: 'tpe', label: 'TPE (1-10 salariés)', icon: '👥' },
      { value: 'pme', label: 'PME (11-50 salariés)', icon: '🏛️' },
      { value: 'large', label: 'Grande entreprise (+50 salariés)', icon: '🏗️' },
    ],
  },
  {
    id: 'siteType',
    question: 'Quel type de site souhaitez-vous créer ?',
    icon: '🌐',
    options: [
      { value: 'vitrine', label: 'Site vitrine (blog, média,…)', icon: '📰' },
      { value: 'commerce', label: 'Commerce (boutique en ligne..)', icon: '🛒' },
      { value: 'application', label: 'Application web', icon: '⚙️' },
      { value: 'autre', label: 'Autre', icon: '📦' },
    ],
  },
  {
    id: 'geographicScope',
    question: 'Quelle est la portée géographique de votre activité ?',
    icon: '🗺️',
    options: [
      { value: 'regionale', label: 'Régionale', icon: '📍' },
      { value: 'national', label: 'Nationale', icon: '🇫🇷' },
      { value: 'european', label: 'Européenne', icon: '🇪🇺' },
      { value: 'international', label: 'Internationale', icon: '🌍' },
    ],
  },
  {
    id: 'activitySector',
    question: 'Dans quel secteur d\'activité évoluez-vous ?',
    icon: '💼',
    options: [
      { value: 'services', label: 'Services / Conseil / Commerce', icon: '🤝' },
      { value: 'sante', label: 'Santé & Médical', icon: '⚕️' },
      { value: 'tech', label: 'Tech & Digital / Créatif', icon: '💻' },
      { value: 'restauration', label: 'Restauration & Hôtellerie', icon: '🍽️' },
      { value: 'institutionnel', label: 'Institutionnel (fonction publique)', icon: '🏛️' },
      { value: 'association', label: 'Association', icon: '🤲' },
      { value: 'aucun', label: 'Autre / Non spécifié', icon: '📋' },
    ],
  },
];

export default function Questionnaire() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
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
    <div className="ovh-page">
      <div className="ovh-container max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="ovh-card"
        >
          {/* Progress Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-neutral-600">
                Question {currentQuestion + 1} sur {questions.length}
              </span>
              <span className="text-sm font-bold text-primary-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="ovh-progress">
              <motion.div 
                className="ovh-progress-bar"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              {/* Question Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">{currentQ.icon}</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-neutral-900 flex-1">
                  {currentQ.question}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-8">
                {currentQ.options.map((option) => {
                  const isSelected = answers[currentQ.id] === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      onClick={() => handleAnswer(option.value)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center gap-4 ${
                        isSelected
                          ? 'border-primary-500 bg-primary-50 shadow-md'
                          : 'border-neutral-200 bg-white hover:border-primary-300 hover:bg-primary-50/50'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-primary-500' : 'bg-neutral-100'
                      }`}>
                        <span className={isSelected ? 'grayscale-0' : ''}>{option.icon}</span>
                      </div>
                      <span className={`font-medium ${isSelected ? 'text-primary-700' : 'text-neutral-700'}`}>
                        {option.label}
                      </span>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center"
                        >
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`ovh-btn-ghost ${currentQuestion === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              ← Précédent
            </button>
            <button
              onClick={handleSkip}
              className="text-sm text-neutral-500 hover:text-primary-600 transition-colors"
            >
              Passer le questionnaire
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
