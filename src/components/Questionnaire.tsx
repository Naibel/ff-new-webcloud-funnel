import { useState, useEffect } from 'react';
import type { QuestionnaireAnswers, EmployeeCount, BusinessSector, SiteType, GeographicScope } from '../types';
import { calculatePackScores, getRecommendedPack, getRecommendationExplanation } from '../utils/scoring';
import './Questionnaire.css';

interface QuestionnaireProps {
  initialAnswers?: QuestionnaireAnswers;
  onComplete: (answers: QuestionnaireAnswers, recommendedPack: string, scores: any) => void;
  onSkip: () => void;
}

const QUESTIONS = [
  {
    id: 'employeeCount',
    question: 'Combien de salariés compte votre entreprise ?',
    options: [
      { value: '1-5', label: '1 à 5 salariés' },
      { value: '6-10', label: '6 à 10 salariés' },
      { value: '11-20', label: '11 à 20 salariés' },
      { value: '21-50', label: '21 à 50 salariés' },
      { value: '50+', label: 'Plus de 50 salariés' },
    ],
  },
  {
    id: 'businessSector',
    question: 'Quel est votre secteur d\'activité ?',
    options: [
      { value: 'ecommerce', label: 'E-commerce / Retail' },
      { value: 'services', label: 'Services professionnels' },
      { value: 'creative', label: 'Créatif / Artistique' },
      { value: 'tech', label: 'Tech / Startup' },
      { value: 'nonprofit', label: 'Associatif / Personnel' },
    ],
  },
  {
    id: 'siteType',
    question: 'Quel type de site souhaitez-vous créer ?',
    options: [
      { value: 'vitrine', label: 'Site vitrine simple' },
      { value: 'blog', label: 'Blog / Portfolio' },
      { value: 'ecommerce', label: 'Site e-commerce' },
      { value: 'saas', label: 'Application web / SaaS' },
      { value: 'multilingual', label: 'Site multilingue complexe' },
    ],
  },
  {
    id: 'companyName',
    question: 'Quel est le nom de votre entreprise ?',
    type: 'text',
  },
  {
    id: 'geographicScope',
    question: 'Quelle est la portée géographique de votre activité ?',
    options: [
      { value: 'national', label: 'Nationale uniquement' },
      { value: 'international', label: 'Internationale' },
    ],
  },
];

export default function Questionnaire({ initialAnswers = {}, onComplete, onSkip }: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>(initialAnswers);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const currentQuestion = QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers };
    
    if (currentQuestion.id === 'employeeCount') {
      newAnswers.employeeCount = value as EmployeeCount;
    } else if (currentQuestion.id === 'businessSector') {
      newAnswers.businessSector = value as BusinessSector;
    } else if (currentQuestion.id === 'siteType') {
      newAnswers.siteType = value as SiteType;
    } else if (currentQuestion.id === 'companyName') {
      newAnswers.companyName = value;
    } else if (currentQuestion.id === 'geographicScope') {
      newAnswers.geographicScope = value as GeographicScope;
    }

    setAnswers(newAnswers);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuestionnaire(newAnswers);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishQuestionnaire(answers);
    }
  };

  const finishQuestionnaire = (finalAnswers: QuestionnaireAnswers) => {
    const scores = calculatePackScores(finalAnswers);
    const recommendedPack = getRecommendedPack(scores);
    setShowRecommendation(true);
  };

  const handleContinue = () => {
    const scores = calculatePackScores(answers);
    const recommendedPack = getRecommendedPack(scores);
    onComplete(answers, recommendedPack, scores);
  };

  if (showRecommendation) {
    const scores = calculatePackScores(answers);
    const recommendedPack = getRecommendedPack(scores);
    const explanation = getRecommendationExplanation(recommendedPack, answers, scores);

    return (
      <div className="questionnaire">
        <div className="questionnaire-container">
          <div className="recommendation-screen">
            <h2 className="recommendation-title">Notre recommandation</h2>
            <div className="recommendation-card">
              <div className="recommendation-badge">Pack Recommandé</div>
              <h3 className="recommended-pack-name">
                {(() => {
                  const packNames: Record<string, string> = {
                    wordpress: 'Pack WordPress',
                    letsencrypt: 'Let\'s Encrypt (SSL Gratuit)',
                    'cdn-basic': 'CDN Basic',
                    'cdn-security': 'CDN Security',
                    'cdn-security-rgpd': 'CDN Security (RGPD)',
                    'database-essential': 'Database Essential',
                    'visibilite-pro': 'Visibilité Pro (Google Maps)',
                  };
                  return packNames[recommendedPack] || recommendedPack;
                })()}
              </h3>
              <p className="recommendation-explanation">{explanation}</p>
              
              <div className="scores-breakdown">
                <h4>Détail des scores :</h4>
                <div className="scores-list">
                  <div className="score-item">
                    <span>Pack WordPress</span>
                    <span className="score-value">{scores.wordpress || 0} points</span>
                  </div>
                  <div className="score-item">
                    <span>CDN Basic</span>
                    <span className="score-value">{scores['cdn-basic'] || 0} points</span>
                  </div>
                  <div className="score-item">
                    <span>CDN Security</span>
                    <span className="score-value">{scores['cdn-security'] || 0} points</span>
                  </div>
                  <div className="score-item">
                    <span>CDN Security (RGPD)</span>
                    <span className="score-value">{scores['cdn-security-rgpd'] || 0} points</span>
                  </div>
                  <div className="score-item">
                    <span>Database Essential</span>
                    <span className="score-value">{scores['database-essential'] || 0} points</span>
                  </div>
                  <div className="score-item">
                    <span>Visibilité Pro</span>
                    <span className="score-value">{scores['visibilite-pro'] || 0} points</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="recommendation-actions">
              <button className="btn-secondary" onClick={() => onSkip()}>
                Choisir un autre pack
              </button>
              <button className="btn-primary" onClick={handleContinue}>
                Continuer avec cette recommandation
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="questionnaire">
      <div className="questionnaire-container">
        <div className="questionnaire-header">
          <button className="skip-all-btn" onClick={onSkip}>
            Passer le questionnaire
          </button>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">
            Question {currentQuestionIndex + 1} / {QUESTIONS.length}
          </div>
        </div>

        <div className="question-content">
          <h2 className="question-text">{currentQuestion.question}</h2>

          {currentQuestion.type === 'text' ? (
            <div className="text-input-wrapper">
              <input
                type="text"
                className="text-input"
                placeholder="Entrez le nom de votre entreprise"
                value={answers.companyName || ''}
                onChange={(e) => handleAnswer(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                    handleAnswer(e.currentTarget.value);
                  }
                }}
              />
            </div>
          ) : (
            <div className="options-grid">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option.value}
                  className="option-button"
                  onClick={() => handleAnswer(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          <button className="skip-question-btn" onClick={handleSkip}>
            Passer cette question
          </button>
        </div>
      </div>
    </div>
  );
}
