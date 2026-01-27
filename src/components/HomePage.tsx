import './HomePage.css';

interface HomePageProps {
  onStartQuestionnaire: () => void;
  onSkipToDomain: () => void;
}

export default function HomePage({ onStartQuestionnaire, onSkipToDomain }: HomePageProps) {
  return (
    <div className="homepage">
      <div className="homepage-container">
        <div className="homepage-header">
          <h1 className="homepage-title">Trouvez votre solution web idéale</h1>
          <p className="homepage-subtitle">
            Nom de domaine et hébergement web adaptés à vos besoins
          </p>
        </div>

        <div className="homepage-options">
          <div className="option-card option-a" onClick={onStartQuestionnaire}>
            <div className="option-icon">🎯</div>
            <h2 className="option-title">Obtenir une recommandation personnalisée</h2>
            <p className="option-description">
              Répondez à quelques questions pour recevoir des suggestions adaptées à votre projet
            </p>
            <button className="option-button">Commencer le questionnaire</button>
          </div>

          <div className="option-card option-b" onClick={onSkipToDomain}>
            <div className="option-icon">⚡</div>
            <h2 className="option-title">Je sais ce que je veux</h2>
            <p className="option-description">
              Accédez directement à la sélection de votre nom de domaine et hébergement
            </p>
            <button className="option-button">Choisir directement</button>
          </div>
        </div>
      </div>
    </div>
  );
}
