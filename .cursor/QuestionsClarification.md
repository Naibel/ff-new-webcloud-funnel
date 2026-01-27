# QUESTIONS DE CLARIFICATION - FUNNEL WEB CLOUD

## Questions pour valider la compréhension du besoin

### 1. ARCHITECTURE ET PARCOURS

**Q1.1 - Navigation arrière :**
- Quand l'utilisateur clique sur "Précédent" depuis l'Écran 2, doit-il revenir à l'Écran 1 ou peut-il aussi revenir directement à l'Écran 0 ?
- Les données saisies doivent-elles être conservées lors de la navigation arrière ?

**Q1.2 - Écran 3 (Paiement) :**
- L'Écran 3 n'est pas détaillé dans le cahier des charges. Doit-on simplement créer une page placeholder ou avez-vous des spécifications à fournir ultérieurement ?
- Y a-t-il une intégration avec un système de paiement spécifique (Stripe, PayPal, etc.) ?

**Q1.3 - Gestion des erreurs :**
- Que se passe-t-il si l'API de recherche de domaine est indisponible ?
- Comment gérer les cas où l'utilisateur n'a pas de connexion internet ?

### 2. QUESTIONNAIRE ET RECOMMANDATIONS

**Q2.1 - Nom d'entreprise :**
- Dans Q3 (Secteur d'activité), si l'utilisateur choisit "Autre" et remplit le champ libre, comment extraire le nom d'entreprise ? Le champ libre contient-il toujours un nom d'entreprise ou peut-il contenir autre chose ?
- Si aucun nom d'entreprise n'est fourni, l'IA génère-t-elle quand même des suggestions basées uniquement sur le secteur ?

**Q2.2 - Calcul des scores :**
- Dans la matrice de scoring, certains critères peuvent se cumuler. Par exemple, un utilisateur peut être "TPE" (Q1) + "E-commerce" (Q4) + "International" (Q2). Les points s'additionnent-ils simplement ou y a-t-il des règles de pondération spéciales ?
- Le "score maximum possible" pour le calcul du pourcentage de match correspond-il à la somme de tous les points possibles de toutes les questions, ou à un maximum théorique par pack ?

**Q2.3 - Pack par défaut sans questionnaire :**
- Si l'utilisateur choisit "Accès direct au catalogue" (Option B), le Pack Pro est présélectionné. Doit-il être déplié par défaut ou replié comme les autres ?

### 3. FONCTIONNALITÉS IA

**Q3.1 - Suggestions de domaines :**
- L'API IA pour les suggestions de domaines existe-t-elle déjà ou doit-on la développer ?
- Si elle doit être développée, avez-vous des préférences pour le modèle/outil (OpenAI, Claude, modèle local, etc.) ?
- Y a-t-il un budget ou des contraintes techniques pour les appels API IA ?

**Q3.2 - Alternatives en cas d'indisponibilité :**
- Les 3 alternatives proposées par l'IA doivent-elles être générées en temps réel ou peuvent-elles être pré-calculées ?
- Doit-on limiter le nombre de tentatives de recherche de domaine pour éviter les abus ?

### 4. INTERFACE UTILISATEUR

**Q4.1 - Responsive Design :**
- Sur mobile, la sidebar d'options devient un accordéon en bas. Doit-il être toujours visible ou masqué par défaut avec un bouton pour l'ouvrir ?
- Les tuiles d'offres sur mobile : doivent-elles toutes être repliées par défaut ou la recommandée reste-t-elle dépliée ?

**Q4.2 - Thème sombre :**
- La détection automatique des préférences système est mentionnée. L'utilisateur peut-il aussi basculer manuellement entre thème clair/sombre ?
- Toutes les couleurs du design system doivent-elles avoir des variantes pour le mode sombre ?

**Q4.3 - Animations :**
- Framer Motion est recommandé. Y a-t-il des contraintes de performance ou des préférences pour d'autres bibliothèques d'animation ?
- Les animations doivent-elles être désactivables pour les utilisateurs préférant "réduire les animations" (accessibilité) ?

### 5. BACKEND ET API

**Q5.1 - API de recherche de domaines :**
- Quelle API utilisez-vous pour vérifier la disponibilité des domaines ? (OVH API, WHOIS, autre)
- Y a-t-il des limites de taux (rate limiting) à respecter ?
- Les prix des domaines sont-ils fixes ou dynamiques selon l'extension ?

**Q5.2 - Sauvegarde du panier :**
- L'endpoint `POST /api/cart/save` doit-il persister les données en base de données ou uniquement en LocalStorage côté client ?
- Faut-il un système d'authentification utilisateur ou le panier est-il anonyme jusqu'au paiement ?

**Q5.3 - Calcul des recommandations :**
- L'endpoint `POST /api/recommendations/hosting` doit-il être appelé côté serveur ou peut-on calculer les scores côté client (JavaScript) ?
- Y a-t-il des données supplémentaires nécessaires pour le calcul qui ne sont pas dans le questionnaire ?

### 6. OPTIONS COMPLÉMENTAIRES

**Q6.1 - Microsoft 365 :**
- Pour l'option Microsoft 365, comment gérer le nombre d'utilisateurs ? Y a-t-il un champ pour saisir le nombre ou est-ce fixe ?
- Le prix est de "5,00 €/mois/utilisateur". Doit-on afficher un total dynamique selon le nombre d'utilisateurs sélectionnés ?

**Q6.2 - Affichage conditionnel :**
- Les options complémentaires sont affichées selon le profil. Si un utilisateur correspond à plusieurs conditions (ex: E-commerce + International), toutes les options correspondantes sont-elles affichées ?
- Y a-t-il un ordre de priorité pour l'affichage des options ?

### 7. ANALYTICS ET TRACKING

**Q7.1 - Outil d'analytics :**
- Quel outil d'analytics utilisez-vous ? (Google Analytics, Matomo, Mixpanel, autre)
- Les événements doivent-ils être envoyés en temps réel ou en batch ?

**Q7.2 - Données utilisateur :**
- Le `user_id` anonyme : comment est-il généré ? (UUID, hash, autre)
- Faut-il respecter le RGPD avec un consentement explicite avant le tracking ?

### 8. VALIDATION ET ERREURS

**Q8.1 - Validation des formulaires :**
- Y a-t-il des règles de validation spécifiques pour le nom de domaine recherché (longueur min/max, caractères autorisés) ?
- Le questionnaire : peut-on revenir en arrière pour modifier une réponse déjà donnée ?

**Q8.2 - Gestion des erreurs utilisateur :**
- Que se passe-t-il si l'utilisateur essaie de sélectionner un domaine qui devient indisponible entre la recherche et la sélection ?
- Comment gérer les cas où le prix d'un pack change pendant que l'utilisateur est sur la page ?

### 9. PERFORMANCE ET OPTIMISATION

**Q9.1 - Cache :**
- Le cache des résultats de recherche de domaine (5 minutes) : doit-il être partagé entre utilisateurs ou individuel ?
- Les suggestions IA doivent-elles être mises en cache ou générées à chaque fois ?

**Q9.2 - Lazy loading :**
- Le lazy loading des étapes : doit-on précharger l'étape suivante en arrière-plan ou attendre la navigation ?
- Y a-t-il des données critiques qui doivent être chargées immédiatement au démarrage ?

### 10. INTÉGRATION ET DÉPLOIEMENT

**Q10.1 - Environnements :**
- Y a-t-il des environnements de développement/staging/production à configurer ?
- Les URLs des API sont-elles différentes selon l'environnement ?

**Q10.2 - Déploiement :**
- Où sera hébergée l'application ? (OVH, autre)
- Y a-t-il des contraintes de déploiement spécifiques (CI/CD, Docker, etc.) ?

---

## Questions prioritaires à traiter en premier

1. **Q3.1** - Existence et spécifications de l'API IA
2. **Q5.1** - API de recherche de domaines et source des prix
3. **Q7.1** - Outil d'analytics à utiliser
4. **Q1.2** - Spécifications de l'Écran 3 (paiement)
5. **Q2.1** - Extraction du nom d'entreprise depuis le questionnaire

---

**Date de création** : 2026  
**Statut** : En attente de réponses

