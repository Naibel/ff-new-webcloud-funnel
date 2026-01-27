# PRÉCONISATIONS TECHNIQUES - FUNNEL WEB CLOUD

## Vue d'ensemble

Ce document présente les préconisations techniques pour l'implémentation du funnel de commande "Smart Guided" basé sur le cahier des charges.

---

## 1. ARCHITECTURE RECOMMANDÉE

### 1.1 Structure du Projet

```
ff-new-webcloud-funnel/
├── src/
│   ├── components/          # Composants réutilisables
│   │   ├── ui/              # Composants UI de base (boutons, cartes, etc.)
│   │   ├── forms/           # Composants de formulaire
│   │   └── layout/          # Composants de layout
│   ├── pages/               # Pages/écrans du funnel
│   │   ├── LandingPage.tsx  # Écran 0
│   │   ├── DomainSelection.tsx  # Écran 1
│   │   ├── HostingSelection.tsx # Écran 2
│   │   └── Payment.tsx     # Écran 3
│   ├── features/           # Features par domaine métier
│   │   ├── questionnaire/  # Logique du questionnaire
│   │   ├── domain/          # Recherche et suggestions de domaines
│   │   ├── hosting/         # Calcul de recommandations
│   │   └── cart/            # Gestion du panier
│   ├── store/              # State management
│   │   ├── funnelStore.ts  # Store Zustand principal
│   │   └── slices/         # Slices Redux (si Redux Toolkit)
│   ├── services/           # Services API
│   │   ├── api/
│   │   │   ├── domains.ts
│   │   │   ├── recommendations.ts
│   │   │   └── cart.ts
│   │   └── storage.ts      # LocalStorage wrapper
│   ├── utils/              # Utilitaires
│   │   ├── scoring.ts      # Calcul des scores
│   │   ├── formatters.ts   # Formatage prix, etc.
│   │   └── analytics.ts    # Tracking events
│   ├── hooks/              # Custom React hooks
│   ├── types/              # Types TypeScript
│   ├── styles/             # Styles globaux
│   │   └── theme.ts        # Configuration Tailwind
│   └── App.tsx
└── public/
```

### 1.2 Stack Technique Détaillée

#### Frontend Core
- **React 19+** : Framework principal
- **TypeScript 5.9+** : Typage statique
- **Vite 7+** : Build tool et dev server

#### Routing
- **React Router v6** : Navigation entre écrans
  ```typescript
  // Structure des routes
  / → LandingPage (Écran 0)
  /domain → DomainSelection (Écran 1)
  /hosting → HostingSelection (Écran 2)
  /payment → Payment (Écran 3)
  ```

#### State Management
- **Zustand** (recommandé) : Plus simple et léger pour ce cas d'usage
  - Avantages : Moins de boilerplate, API simple, bonnes performances
  - Alternative : Redux Toolkit si besoin de DevTools avancés

#### Styling
- **Tailwind CSS v3+** : Utility-first CSS
  - Configuration personnalisée pour le design system
  - Support du mode sombre natif
  - Plugins recommandés : `@tailwindcss/forms`, `@tailwindcss/typography`

#### Animations
- **Framer Motion** : Animations fluides
  - Pour les transitions entre étapes
  - Pour l'expansion/repli des tuiles d'offres
  - Pour les animations d'entrée

#### Formulaires
- **React Hook Form** : Gestion performante des formulaires
- **Zod** : Validation de schémas TypeScript-first
  ```typescript
  // Exemple de schéma de validation
  const questionnaireSchema = z.object({
    organizationSize: z.enum(['freelance', 'tpe', 'pme', 'large']),
    geographicScope: z.enum(['local', 'european', 'international']),
    // ...
  });
  ```

#### API Client
- **Axios** ou **Fetch API native** : Appels HTTP
  - Wrapper personnalisé pour gestion d'erreurs centralisée
  - Intercepteurs pour logging et retry logic

---

## 2. GESTION DE L'ÉTAT

### 2.1 Structure du Store (Zustand)

```typescript
// store/funnelStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FunnelState {
  // Étape courante
  currentStep: 0 | 1 | 2 | 3;
  setCurrentStep: (step: 0 | 1 | 2 | 3) => void;
  
  // Questionnaire
  questionnaire: QuestionnaireData | null;
  setQuestionnaire: (data: QuestionnaireData) => void;
  clearQuestionnaire: () => void;
  
  // Scores calculés
  hostingScores: HostingScores;
  recommendedPack: HostingPack | null;
  calculateScores: () => void;
  
  // Sélections
  selections: {
    domain: DomainSelection | null;
    hosting: HostingSelection | null;
    options: AdditionalOptions;
  };
  setDomainSelection: (domain: DomainSelection) => void;
  setHostingSelection: (hosting: HostingSelection) => void;
  toggleOption: (option: keyof AdditionalOptions) => void;
  
  // Métadonnées
  metadata: {
    startedAt: Date;
    lastUpdatedAt: Date;
    guidedMode: boolean;
  };
}

export const useFunnelStore = create<FunnelState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentStep: 0,
      questionnaire: null,
      hostingScores: { starter: 0, perso: 0, pro: 0, performance: 0 },
      recommendedPack: null,
      selections: {
        domain: null,
        hosting: null,
        options: {
          sqlDatabase: false,
          microsoft365: false,
          cdnPremium: false,
          extraBackup: false,
        },
      },
      metadata: {
        startedAt: new Date(),
        lastUpdatedAt: new Date(),
        guidedMode: false,
      },
      
      // Actions
      setCurrentStep: (step) => set({ currentStep: step }),
      
      setQuestionnaire: (data) => {
        set({ questionnaire: data });
        get().calculateScores();
      },
      
      calculateScores: () => {
        const { questionnaire } = get();
        if (!questionnaire) return;
        
        const scores = calculateHostingScores(questionnaire);
        const recommended = getRecommendedPack(scores);
        
        set({ 
          hostingScores: scores,
          recommendedPack: recommended,
        });
      },
      
      // ... autres actions
    }),
    {
      name: 'ovh_funnel_state',
      // Expiration après 7 jours
      partialize: (state) => ({
        questionnaire: state.questionnaire,
        selections: state.selections,
        metadata: state.metadata,
      }),
    }
  )
);
```

### 2.2 Persistance LocalStorage

- **Middleware Zustand persist** : Sauvegarde automatique
- **Expiration** : 7 jours (vérification au chargement)
- **Restauration** : Bandeau "Reprendre ma commande" si session valide trouvée

---

## 3. LOGIQUE MÉTIER

### 3.1 Calcul des Scores de Recommandation

```typescript
// utils/scoring.ts

const SCORING_MATRIX = {
  organizationSize: {
    freelance: { starter: 5, perso: 3, pro: 1, performance: 0 },
    tpe: { starter: 2, perso: 5, pro: 3, performance: 1 },
    pme: { starter: 0, perso: 2, pro: 5, performance: 3 },
    large: { starter: 0, perso: 0, pro: 2, performance: 5 },
  },
  geographicScope: {
    local: { starter: 3, perso: 3, pro: 2, performance: 0 },
    european: { starter: 0, perso: 2, pro: 4, performance: 3 },
    international: { starter: 0, perso: 0, pro: 3, performance: 5 },
  },
  siteType: {
    vitrine: { starter: 4, perso: 5, pro: 2, performance: 0 },
    blog: { starter: 2, perso: 4, pro: 3, performance: 1 },
    ecommerce: { starter: 0, perso: 1, pro: 4, performance: 5 },
    saas: { starter: 0, perso: 0, pro: 2, performance: 5 },
  },
};

export function calculateHostingScores(
  questionnaire: QuestionnaireData
): HostingScores {
  const scores: HostingScores = {
    starter: 0,
    perso: 0,
    pro: 0,
    performance: 0,
  };
  
  // Appliquer la matrice
  if (questionnaire.organizationSize) {
    const points = SCORING_MATRIX.organizationSize[questionnaire.organizationSize];
    Object.keys(scores).forEach((pack) => {
      scores[pack as keyof HostingScores] += points[pack as keyof typeof points];
    });
  }
  
  // Répéter pour geographicScope et siteType...
  
  return scores;
}

export function getRecommendedPack(scores: HostingScores): HostingPack {
  const maxScore = Math.max(...Object.values(scores));
  const packsWithMaxScore = Object.entries(scores)
    .filter(([_, score]) => score === maxScore)
    .map(([pack]) => pack as HostingPack);
  
  // En cas d'égalité, choisir le pack supérieur
  const packHierarchy: HostingPack[] = ['starter', 'perso', 'pro', 'performance'];
  return packsWithMaxScore.reduce((highest, current) => {
    const highestIndex = packHierarchy.indexOf(highest);
    const currentIndex = packHierarchy.indexOf(current as HostingPack);
    return currentIndex > highestIndex ? (current as HostingPack) : highest;
  }, packsWithMaxScore[0] as HostingPack);
}

export function calculateMatchPercentage(
  pack: HostingPack,
  scores: HostingScores
): number {
  // Calculer le score maximum possible
  const maxPossibleScore = Object.values(SCORING_MATRIX).reduce((sum, category) => {
    return sum + Math.max(...Object.values(category).map(p => p[pack]));
  }, 0);
  
  const actualScore = scores[pack];
  return Math.round((actualScore / maxPossibleScore) * 100);
}
```

### 3.2 Génération de Suggestions de Domaines

**Préconisation** : Utiliser une API externe (OpenAI, Claude) ou un service dédié

```typescript
// services/api/domains.ts

export async function generateDomainSuggestions(
  companyName: string,
  activitySector: string,
  geographicScope: string
): Promise<DomainSuggestion[]> {
  const response = await fetch('/api/domains/suggestions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      companyName,
      activitySector,
      geographicScope,
    }),
  });
  
  return response.json();
}

// Côté backend (exemple avec OpenAI)
async function generateSuggestionsBackend(data: {
  companyName: string;
  activitySector: string;
  geographicScope: string;
}) {
  const prompt = `Génère 8 suggestions créatives de noms de domaine pour:
- Entreprise: ${data.companyName}
- Secteur: ${data.activitySector}
- Portée: ${data.geographicScope}

Inclus des variantes avec synonymes, mots-clés sectoriels, et extensions pertinentes.`;
  
  // Appel OpenAI/Claude...
}
```

---

## 4. COMPOSANTS UI PRINCIPAUX

### 4.1 Composant de Tuile d'Hébergement

```typescript
// components/hosting/HostingTile.tsx

interface HostingTileProps {
  pack: HostingPack;
  isExpanded: boolean;
  isRecommended: boolean;
  matchScore?: number;
  onExpand: () => void;
  onSelect: () => void;
}

export function HostingTile({
  pack,
  isExpanded,
  isRecommended,
  matchScore,
  onExpand,
  onSelect,
}: HostingTileProps) {
  const packData = HOSTING_PACKS[pack];
  
  return (
    <motion.div
      initial={false}
      animate={{ height: isExpanded ? 'auto' : 80 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="rounded-xl border border-gray-200 p-6 shadow-sm"
    >
      {isRecommended && (
        <Badge className="mb-2">Recommandé pour vous</Badge>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">{packData.name}</h3>
          {matchScore && (
            <p className="text-sm text-gray-600">
              Match à {matchScore}% avec votre projet
            </p>
          )}
        </div>
        
        {!isExpanded && (
          <button onClick={onExpand}>
            <ChevronDownIcon />
          </button>
        )}
      </div>
      
      {isExpanded && (
        <div className="mt-4">
          <p className="text-3xl font-bold">{packData.price.monthly} €/mois HT</p>
          <p className="text-sm text-gray-600">
            soit {packData.price.yearly} €/an HT
          </p>
          
          <ul className="mt-4 space-y-2">
            {packData.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          
          <Button onClick={onSelect} className="mt-6">
            Choisir cette offre
          </Button>
        </div>
      )}
    </motion.div>
  );
}
```

### 4.2 Composant de Questionnaire

```typescript
// components/questionnaire/Questionnaire.tsx

export function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});
  const { setQuestionnaire } = useFunnelStore();
  
  const questions = QUESTIONNAIRE_QUESTIONS;
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  
  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Terminé
      setQuestionnaire(answers);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <ProgressBar value={progress} />
      
      <QuestionCard
        question={questions[currentQuestion]}
        answer={answers[questions[currentQuestion].id]}
        onAnswer={(value) => {
          setAnswers({ ...answers, [questions[currentQuestion].id]: value });
        }}
      />
      
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
          Précédent
        </Button>
        
        <Button onClick={handleNext}>
          {currentQuestion === questions.length - 1 ? 'Terminer' : 'Suivant'}
        </Button>
      </div>
    </div>
  );
}
```

---

## 5. PERFORMANCE ET OPTIMISATION

### 5.1 Code Splitting

```typescript
// App.tsx
import { lazy, Suspense } from 'react';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const DomainSelection = lazy(() => import('./pages/DomainSelection'));
const HostingSelection = lazy(() => import('./pages/HostingSelection'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/domain" element={<DomainSelection />} />
        <Route path="/hosting" element={<HostingSelection />} />
      </Routes>
    </Suspense>
  );
}
```

### 5.2 Debouncing pour la Recherche de Domaine

```typescript
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
}

// Usage
function DomainSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      searchDomain(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
}
```

### 5.3 Cache des Résultats

```typescript
// utils/cache.ts

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<any>>();

export function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (!entry) return null;
  
  if (Date.now() - entry.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }
  
  return entry.data;
}

export function setCached<T>(key: string, data: T): void {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
}
```

---

## 6. ACCESSIBILITÉ

### 6.1 Navigation Clavier

- Tous les composants interactifs doivent être focusables avec `tabIndex`
- Gestion des `aria-label` et `aria-describedby`
- Support des touches fléchées pour les listes

### 6.2 Contraste et Couleurs

- Utiliser Tailwind avec configuration de contraste WCAG AA
- Tests avec outils comme `axe-core` ou `lighthouse`

### 6.3 Annonces Vocales

```typescript
// components/AriaLiveRegion.tsx

export function AriaLiveRegion({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}
```

---

## 7. ANALYTICS ET TRACKING

### 7.1 Wrapper Analytics

```typescript
// utils/analytics.ts

type AnalyticsEvent = 
  | 'funnel_step_viewed'
  | 'guided_mode_selected'
  | 'questionnaire_completed'
  | 'domain_searched'
  | 'domain_selected'
  | 'hosting_pack_selected'
  | 'option_toggled'
  | 'cart_abandoned'
  | 'payment_initiated';

interface EventProperties {
  [key: string]: any;
}

export function trackEvent(
  event: AnalyticsEvent,
  properties?: EventProperties
) {
  // Envoyer à l'outil d'analytics (Google Analytics, Matomo, etc.)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, properties);
  }
  
  // Log en développement
  if (import.meta.env.DEV) {
    console.log('Analytics Event:', event, properties);
  }
}
```

---

## 8. TESTS

### 8.1 Tests Unitaires

- **Vitest** : Framework de test (compatible Vite)
- Tests des fonctions de calcul de scores
- Tests des utilitaires de formatage

### 8.2 Tests d'Intégration

- **React Testing Library** : Tests des composants
- Tests des flux utilisateur complets

### 8.3 Tests E2E

- **Playwright** ou **Cypress** : Tests end-to-end
- Scénarios critiques : Parcours complet guidé et non-guidé

---

## 9. DÉPLOIEMENT

### 9.1 Build de Production

```bash
# Build optimisé
npm run build

# Preview locale
npm run preview
```

### 9.2 Variables d'Environnement

```env
# .env.production
VITE_API_BASE_URL=https://api.example.com
VITE_ANALYTICS_ID=GA-XXXXX
VITE_AI_API_KEY=sk-xxxxx
```

---

## 10. CHECKLIST DE DÉVELOPPEMENT

### Phase 1 : Setup et Infrastructure
- [ ] Initialiser le projet avec Vite + React + TypeScript
- [ ] Configurer Tailwind CSS avec le design system
- [ ] Configurer React Router
- [ ] Mettre en place Zustand avec persistance
- [ ] Configurer ESLint et Prettier

### Phase 2 : Composants de Base
- [ ] Créer les composants UI de base (Button, Card, Input, etc.)
- [ ] Implémenter le système de thème (clair/sombre)
- [ ] Créer les composants de layout

### Phase 3 : Écran 0 - Landing
- [ ] Créer la page d'aiguillage avec 2 options
- [ ] Implémenter les animations d'entrée
- [ ] Ajouter le tracking analytics

### Phase 4 : Questionnaire
- [ ] Créer le composant de questionnaire avec progression
- [ ] Implémenter la sauvegarde LocalStorage
- [ ] Intégrer le calcul des scores

### Phase 5 : Écran 1 - Sélection Domaine
- [ ] Créer le champ de recherche avec debouncing
- [ ] Intégrer l'API de recherche de domaines
- [ ] Implémenter les suggestions IA
- [ ] Créer l'affichage des résultats avec badges

### Phase 6 : Écran 2 - Sélection Hébergement
- [ ] Créer les tuiles d'offres avec animation expand/collapse
- [ ] Implémenter le système de scoring et recommandation
- [ ] Créer la sidebar d'options complémentaires
- [ ] Implémenter le récapitulatif en temps réel

### Phase 7 : Optimisations
- [ ] Implémenter le code splitting
- [ ] Ajouter le cache des résultats
- [ ] Optimiser les performances (Lighthouse > 90)
- [ ] Tests d'accessibilité (WCAG 2.1 AA)

### Phase 8 : Tests et Déploiement
- [ ] Tests unitaires des fonctions métier
- [ ] Tests d'intégration des composants
- [ ] Tests E2E des parcours utilisateur
- [ ] Déploiement en production

---

**Document créé le** : 2026  
**Version** : 1.0  
**Statut** : Préconisations techniques

