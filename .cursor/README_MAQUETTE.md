# Maquette Funnel Web Cloud OVHcloud

## 🚀 Démarrage rapide

### Installation des dépendances

```bash
npm install
```

### Lancer le serveur de développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 📱 Parcours utilisateur

### Page d'accueil (`/`)
- Page d'accueil avec lien vers la maquette
- Présentation des fonctionnalités

### Écran 0 - Aiguillage (`/funnel`)
- Deux options : Mode guidé ou Accès direct
- Mode guidé : Lance le questionnaire
- Accès direct : Va directement à la sélection de domaine

### Écran 1 - Questionnaire (`/funnel/questionnaire`)
- 4 questions pour qualifier le besoin
- Barre de progression
- Possibilité de passer le questionnaire

### Écran 2 - Sélection de domaine (`/funnel/domain`)
- Recherche de domaine
- Suggestions IA (si questionnaire complété)
- Affichage des domaines disponibles avec prix

### Écran 3 - Sélection hébergement (`/funnel/hosting`)
- Affichage des 4 packs (Starter, Perso, Pro, Performance)
- Pack recommandé déplié par défaut
- Options complémentaires dans la sidebar
- Récapitulatif en temps réel

### Écran 4 - Récapitulatif (`/funnel/summary`)
- Récapitulatif de la commande
- Validation finale

## 🎨 Design

- **Framework** : React 19 + TypeScript
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion
- **Routing** : React Router v6

## 📝 Notes

- Les données sont actuellement en dur (mock)
- L'intégration avec le CSV de packages sera faite dans une prochaine étape
- Le design system OVHcloud sera intégré ultérieurement

