import { useState, useEffect } from 'react';
import type { AppState, QuestionnaireAnswers, Domain, HostingPack, AdditionalOptions } from './types';
import { saveAppState, loadAppState } from './utils/storage';
import { calculatePackScores, getRecommendedPack } from './utils/scoring';
import { HOSTING_PACKS } from './data/hostingPacks';
import HomePage from './components/HomePage';
import Questionnaire from './components/Questionnaire';
import DomainSelection from './components/DomainSelection';
import HostingSelection from './components/HostingSelection';
import './App.css';

type Step = 'home' | 'questionnaire' | 'domain' | 'hosting' | 'checkout';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('home');
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<QuestionnaireAnswers>({});
  const [recommendedPackId, setRecommendedPackId] = useState<string | null>(null);
  const [packScores, setPackScores] = useState<any>(null);
  const [selectedDomains, setSelectedDomains] = useState<Domain[]>([]);
  const [selectedHostingPack, setSelectedHostingPack] = useState<HostingPack | null>(null);
  const [additionalOptions, setAdditionalOptions] = useState<AdditionalOptions>({
    ssl: true,
    professionalEmails: 'none',
    dailyBackups: false,
    cdn: 'none',
    database: false,
    visibilite: false,
  });

  // Charger l'état sauvegardé au démarrage
  useEffect(() => {
    const savedState = loadAppState();
    if (savedState) {
      if (savedState.questionnaireAnswers) {
        setQuestionnaireAnswers(savedState.questionnaireAnswers);
      }
      if (savedState.recommendedPack) {
        setRecommendedPackId(savedState.recommendedPack);
      }
      if (savedState.packScores) {
        setPackScores(savedState.packScores);
      }
      if (savedState.cart) {
        setSelectedDomains(savedState.cart.domains || []);
        setSelectedHostingPack(savedState.cart.hostingPack);
        if (savedState.cart.additionalOptions) {
          setAdditionalOptions(savedState.cart.additionalOptions);
        }
      }
      if (savedState.currentStep) {
        // Ne pas restaurer automatiquement l'étape, commencer depuis le début
      }
    }
  }, []);

  // Sauvegarder l'état à chaque changement
  useEffect(() => {
    saveAppState({
      currentStep: getStepNumber(currentStep),
      questionnaireAnswers,
      recommendedPack: recommendedPackId,
      packScores,
      cart: {
        domains: selectedDomains,
        hostingPack: selectedHostingPack,
        additionalOptions,
      },
    });
  }, [currentStep, questionnaireAnswers, recommendedPackId, packScores, selectedDomains, selectedHostingPack, additionalOptions]);

  const getStepNumber = (step: Step): number => {
    switch (step) {
      case 'home': return 0;
      case 'questionnaire': return 0;
      case 'domain': return 1;
      case 'hosting': return 2;
      case 'checkout': return 3;
      default: return 0;
    }
  };

  const handleStartQuestionnaire = () => {
    setCurrentStep('questionnaire');
  };

  const handleSkipToDomain = () => {
    setCurrentStep('domain');
    // Par défaut, CDN Security recommandé si pas de questionnaire
    if (!recommendedPackId && !selectedHostingPack) {
      const defaultPack = HOSTING_PACKS.find(p => p.id === 'cdn-security');
      if (defaultPack) {
        setSelectedHostingPack(defaultPack);
        setRecommendedPackId('cdn-security');
      }
    }
  };

  const handleQuestionnaireComplete = (
    answers: QuestionnaireAnswers,
    recommendedPack: string,
    scores: any
  ) => {
    setQuestionnaireAnswers(answers);
    setRecommendedPackId(recommendedPack);
    setPackScores(scores);
    
    // Pré-sélectionner le pack recommandé
    const pack = HOSTING_PACKS.find(p => p.id === recommendedPack);
    if (pack) {
      setSelectedHostingPack(pack);
    }
    
    setCurrentStep('domain');
  };

  const handleQuestionnaireSkip = () => {
    setCurrentStep('domain');
    // Par défaut, CDN Security recommandé
    if (!recommendedPackId && !selectedHostingPack) {
      const defaultPack = HOSTING_PACKS.find(p => p.id === 'cdn-security');
      if (defaultPack) {
        setSelectedHostingPack(defaultPack);
        setRecommendedPackId('cdn-security');
      }
    }
  };

  const handleDomainNext = () => {
    setCurrentStep('hosting');
  };

  const handleHostingNext = () => {
    setCurrentStep('checkout');
    // Ici, vous pouvez rediriger vers une page de paiement ou afficher un récapitulatif final
    alert('Redirection vers la page de paiement...');
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'domain':
        setCurrentStep('home');
        break;
      case 'hosting':
        setCurrentStep('domain');
        break;
      default:
        setCurrentStep('home');
    }
  };

  return (
    <div className="app">
      {currentStep === 'home' && (
        <HomePage
          onStartQuestionnaire={handleStartQuestionnaire}
          onSkipToDomain={handleSkipToDomain}
        />
      )}

      {currentStep === 'questionnaire' && (
        <Questionnaire
          initialAnswers={questionnaireAnswers}
          onComplete={handleQuestionnaireComplete}
          onSkip={handleQuestionnaireSkip}
        />
      )}

      {currentStep === 'domain' && (
        <DomainSelection
          selectedDomains={selectedDomains}
          questionnaireAnswers={questionnaireAnswers}
          onDomainsChange={setSelectedDomains}
          onNext={handleDomainNext}
          onBack={handleBack}
        />
      )}

      {currentStep === 'hosting' && (
        <HostingSelection
          selectedPack={selectedHostingPack}
          recommendedPackId={recommendedPackId || undefined}
          additionalOptions={additionalOptions}
          selectedDomains={selectedDomains}
          onPackChange={setSelectedHostingPack}
          onOptionsChange={setAdditionalOptions}
          onNext={handleHostingNext}
          onBack={handleBack}
        />
      )}

      {currentStep === 'checkout' && (
        <div className="checkout-page">
          <h1>Merci pour votre commande !</h1>
          <p>Vous serez redirigé vers la page de paiement...</p>
        </div>
      )}
    </div>
  );
}

export default App;
