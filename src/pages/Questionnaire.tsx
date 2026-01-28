import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import OdsIcon from '../components/OdsIcon';

const questions = [
  {
    id: 'organizationSize',
    question: 'Combien de personnes composent votre équipe ?',
    icon: 'building',
    options: [
      { value: 'freelance', label: 'Une seule', icon: 'user' },
      { value: 'tpe', label: 'Entre 2 et 10', icon: 'users' },
      { value: 'pme', label: 'Entre 11 et 50', icon: 'users' },
      { value: 'large', label: 'Plus de 50', icon: 'building' },
      // Decide du pack d'hébergement pour le projet
    ],
  },
  {
    id: 'siteType',
    question: 'Quel type de site souhaitez-vous créer ?',
    icon: 'globe',
    options: [
      { value: 'vitrine', label: 'Site vitrine (blog, média,…)', icon: 'file-text' },
      { value: 'commerce', label: 'Boutique E-Commerce', icon: 'shopping-cart' },
      { value: 'application', label: 'Application web (outil interactif)', icon: 'settings' },
      { value: 'autre', label: 'Autre', icon: 'grid' },
    ],
  },
  {
    id: 'geographicScope',
    question: 'A quelle échelle souhaitez-vous communiquer ?',
    icon: 'map',
    options: [
      { value: 'regionale', label: 'Régionale', icon: 'map-pin' },
      { value: 'national', label: 'Nationale', icon: 'flag' },
      { value: 'european', label: 'Européenne', icon: 'flag' },
      { value: 'international', label: 'Internationale', icon: 'globe' },
      // Dédicde de la TLD en plus
    ],
  },
  {
    id: 'activitySector',
    question: 'Dans quel secteur d\'activité évoluez-vous ?',
    icon: 'briefcase',
    options: [
      { value: 'startups', label: 'Pour les startups', icon: 'zap' },
      { value: 'entrepreneurs', label: 'Pour les créateurs d\'entreprise', icon: 'briefcase' },
      { value: 'creatives', label: 'Pour les projets créatifs', icon: 'image' },
      { value: 'health', label: 'Pour les pros de la santé et du bien-être', icon: 'heart' },
      // health => .doc, startups => .dev, creatives => .io
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
      navigate('/domain', { state: { questionnaire: newAnswers } });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate('/');
    }
  };

  const handleSkip = () => {
    navigate('/domain');
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
            
            {/* Stepper */}
            <div className="flex items-center justify-between mb-4 relative">
              {/* Connection line */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-neutral-200 -z-10">
                <motion.div
                  className="h-full bg-primary-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentQuestion / (questions.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
              
              {questions.map((q, idx) => {
                const isCompleted = idx < currentQuestion;
                const isCurrent = idx === currentQuestion;
                const isAnswered = answers[q.id] !== undefined;
                const isClickable = isAnswered || idx <= currentQuestion;
                
                return (
                  <button
                    key={q.id}
                    onClick={() => isClickable && setCurrentQuestion(idx)}
                    disabled={!isClickable}
                    className={`relative flex flex-col items-center group ${
                      isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                    }`}
                    title={`Question ${idx + 1}: ${q.question}`}
                  >
                    {/* Step circle */}
                    <motion.div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-primary-500 text-white shadow-lg scale-110'
                          : isCompleted
                          ? 'bg-primary-500 text-white'
                          : isClickable
                          ? 'bg-neutral-200 text-neutral-600 hover:bg-primary-100'
                          : 'bg-neutral-100 text-neutral-400'
                      }`}
                      whileHover={isClickable ? { scale: 1.1 } : {}}
                      whileTap={isClickable ? { scale: 0.95 } : {}}
                    >
                      {isCompleted ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        idx + 1
                      )}
                    </motion.div>
                    
                    {/* Step label - visible on hover */}
                    <span className={`absolute -bottom-6 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
                      isCurrent ? 'text-primary-600 font-semibold' : 'text-neutral-500'
                    }`}>
                      Q{idx + 1}
                    </span>
                  </button>
                );
              })}
            </div>
            
            <div className="ovh-progress mt-6">
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
                  <OdsIcon name={currentQ.icon} size="lg" color="var(--ods-color-primary-500)" />
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
                          ? 'border-primary-500 shadow-md ovh-selectable-selected'
                          : 'border-neutral-200 hover:border-primary-300 ovh-selectable'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-primary-500' : 'bg-neutral-100'
                      }`}>
                        <OdsIcon name={option.icon} size="sm" color={isSelected ? 'white' : 'var(--ods-color-neutral-500)'} />
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
              className="ovh-btn-ghost"
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
