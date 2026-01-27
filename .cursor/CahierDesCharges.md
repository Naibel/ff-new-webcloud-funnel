# CAHIER DES CHARGES : FUNNEL DE COMMANDE "SMART GUIDED" WEB CLOUD

## TABLE DES MATIÈRES

1. [Synthèse Exécutive](#1-synthèse-exécutive)
   - 1.1 [Vision Produit](#11-vision-produit)
   - 1.2 [Positionnement OVHcloud](#12-positionnement-ovhcloud)
   - 1.3 [Principes Directeurs](#13-principes-directeurs)
   - 1.4 [Piliers de Valeur](#14-piliers-de-valeur)

2. [Personas Utilisateurs](#2-personas-utilisateurs)
   - 2.1 [Persona #1 : Bérénice, la Freelance](#21-persona-1--bérénice-la-freelance)
   - 2.2 [Persona #2 : Sébastien, le Dirigeant d'Entreprise Industrielle](#22-persona-2--sébastien-le-dirigeant-dentreprise-industrielle)
   - 2.3 [Persona #3 : Elliott, le Développeur/Sysadmin](#23-persona-3--elliott-le-développeursysadmin)
   - 2.4 [Persona #4 : Nicolas, le Responsable IT](#24-persona-4--nicolas-le-responsable-it)
   - 2.5 [Persona #5 : Yassine, le Propriétaire d'Agence Web](#25-persona-5--yassine-le-propriétaire-dagence-web)
   - 2.6 [Mapping Personas / Packs d'Hébergement](#26-mapping-personas--packs-dhébergement)

3. [Architecture du Parcours Utilisateur](#3-architecture-du-parcours-utilisateur)
   - 2.1 [Vue d'Ensemble du Tunnel](#21-vue-densemble-du-tunnel)
   - 2.2 [Écran 0 : Page d'Aiguillage](#22-écran-0--page-daiguillage)
   - 2.3 [Questionnaire de Qualification](#23-questionnaire-de-qualification)
   - 2.4 [Écran 1 : Sélection du Nom de Domaine](#24-écran-1--sélection-du-nom-de-domaine)
   - 2.5 [Écran 2 : Sélection de l'Hébergement et Services Email](#25-écran-2--sélection-de-lhébergement-et-services-email)

4. [Architecture du Parcours Utilisateur](#4-architecture-du-parcours-utilisateur)
   - 4.1 [Vue d'Ensemble du Tunnel](#41-vue-densemble-du-tunnel)
   - 4.2 [Écran 0 : Page d'Aiguillage](#42-écran-0--page-daiguillage)
   - 4.3 [Questionnaire de Qualification](#43-questionnaire-de-qualification)
   - 4.4 [Écran 1 : Sélection du Nom de Domaine](#44-écran-1--sélection-du-nom-de-domaine)
   - 4.5 [Écran 2 : Sélection de l'Hébergement et Services Email](#45-écran-2--sélection-de-lhébergement-et-services-email)

5. [Spécifications Techniques de Développement](#5-spécifications-techniques-de-développement)
   - 5.1 [Stack Technique Recommandée](#51-stack-technique-recommandée)
   - 5.2 [Gestion de l'État (State Management)](#52-gestion-de-létat-state-management)
   - 5.3 [Logique de Calcul des Recommandations](#53-logique-de-calcul-des-recommandations)
   - 5.4 [Intégration de l'Assistant IA (Suggestions de Domaines)](#54-intégration-de-lassistant-ia-suggestions-de-domaines)
   - 5.5 [Principes d'Accessibilité et Performance](#55-principes-daccessibilité-et-performance)
   - 5.6 [Terminologie "Zero-Jargon"](#56-terminologie-zero-jargon)

6. [Catalogue des Offres d'Hébergement (2026)](#6-catalogue-des-offres-dhébergement-2026)
   - 6.1 [Matrice Tarifaire Complète](#61-matrice-tarifaire-complète)
   - 6.2 [Caractéristiques Techniques Détaillées](#62-caractéristiques-techniques-détaillées)
   - 6.3 [Options Complémentaires](#63-options-complémentaires)

7. [Design System et Charte Graphique](#7-design-system-et-charte-graphique)
   - 7.1 [⚠️ Obligation : Utilisation du Design System OVHcloud Officiel](#71-⚠️-obligation--utilisation-du-design-system-ovhcloud-officiel)
   - 7.2 [Palette de Couleurs](#72-palette-de-couleurs)
   - 7.3 [Typographie](#73-typographie)
   - 7.4 [Composants UI](#74-composants-ui)
   - 7.5 [Intégration du Design System OVHcloud](#75-intégration-du-design-system-ovhcloud)

8. [Métriques de Succès et KPIs](#8-métriques-de-succès-et-kpis)
   - 8.1 [Objectifs Quantitatifs](#81-objectifs-quantitatifs)
   - 8.2 [Tracking Analytics](#82-tracking-analytics)

---

## 1. SYNTHÈSE EXÉCUTIVE

### 1.1 Vision Produit

Développer un tunnel de commande intelligent pour les services Web Cloud combinant l'expertise technique OVHcloud, l'ergonomie moderne Hostinger et un système de recommandation prédictif par points. L'objectif est de réduire le temps de décision utilisateur de 60% tout en augmentant le taux de conversion de 25%.

Le funnel doit incarner la promesse OVHcloud : **"The one-stop shop giving all entrepreneurs and SMBs the freedom to leverage digital in their business journey"**, en offrant une expérience adaptée à tous les profils, qu'ils soient tech-savvy ou non.

### 1.2 Positionnement OVHcloud

**Positionnement Statement :**

OVHcloud est le guichet unique qui donne à tous les entrepreneurs et PME la liberté d'exploiter le numérique dans leur parcours d'entreprise.

En un seul endroit, nos clients, qu'ils soient tech-savvy ou non, peuvent obtenir :

* **Connectivité** : Téléphonie et accès Internet haut débit
* **Identité en ligne** : Noms de domaine et visibilité avec hébergement géré ou non géré (VPS)
* **Solutions d'emailing et collaboratives**
* **Solutions SaaS** soigneusement sélectionnées et hébergées par OVHcloud, accessibles via son marketplace, allant de la cybersécurité, comptabilité, CRM, ERP, facturation, gestion du capital humain, gestion de projet, Business Intelligence, et bien plus encore.

**Différenciation vs GAFAM :**

* **Meilleur ratio Performance / Prix** : Facturation transparente et prévisible
* **Liberté de mouvement** : Nos clients sont libres d'aller et venir sur nos solutions. Nous ne verrouillons pas nos clients dans nos infrastructures et leur permettons toujours de migrer vers d'autres fournisseurs sans frais de sortie
* **Protection des données** : Nous protégeons les données de nos clients contre tout tiers souhaitant les collecter et en faire commerce. Nos clients choisissent où stocker leurs données parmi notre réseau multi-local mondial de datacenters, et donc la juridiction qui les protège

**Portfolio unique :**

* En tant que leader mondial, nous fournissons une sécurité, une fiabilité et une résilience de pointe
* Nous satisfaisons un large éventail de besoins métier comme aucun autre acteur en Europe, des stades très précoces aux stades avancés de l'entreprise
* Nous rassemblons un écosystème de professionnels IT (VAR, ISV, Revendeurs) capables d'accompagner les entrepreneurs dans les bons choix

### 1.3 Principes Directeurs

* **Simplicité guidée** : Accompagner sans imposer
* **Transparence tarifaire** : Aucun coût caché, facturation prévisible
* **Performance technique** : Temps de chargement < 2 secondes par étape
* **Accessibilité** : WCAG 2.1 niveau AA minimum
* **Liberté de choix** : Pas de verrouillage, possibilité d'évoluer ou de migrer facilement
* **Protection des données** : Transparence sur le stockage et la juridiction

### 1.4 Piliers de Valeur

Le funnel doit mettre en avant les trois piliers de valeur OVHcloud :

#### Pilier 1 : Save Time (Gagner du Temps)

* **Tout votre IT en un seul endroit** : Centralisation des services (domaine, hébergement, email, SaaS)
* **Solutions pré-installées et prêtes à l'emploi** : Mise en service rapide, configuration minimale requise
* **Support réactif** : Réponses rapides et précises aux questions (priorité pour Bérénice, Sébastien)

#### Pilier 2 : Gain Flexibility (Gagner en Flexibilité)

* **Upgrade en un clic au fur et à mesure de la croissance** : Évolutivité simple et transparente
* **Solutions packagées ou options détaillées** : Choix entre simplicité (pack) ou personnalisation (options)
* **Do It Yourself ou Make It Done** : Grand écosystème de partenaires pour l'accompagnement
* **Pas de verrouillage** : Migration possible sans frais de sortie

#### Pilier 3 : Value for Money (Rapport Qualité/Prix)

* **Granularité fine des tarifs** : Débloquer la performance qui correspond à vos besoins (ni plus, ni moins)
* **Haute disponibilité des services** : 99,99% de disponibilité observée sur l'hébergement web
* **Compétitivité des prix** : Pas seulement la première année, mais sur la durée
* **Facturation transparente** : Aucun coût caché, prévisibilité des coûts

---

## 2. PERSONAS UTILISATEURS

Les personas suivants représentent les profils cibles du funnel. Chaque persona a des besoins, priorités et craintes spécifiques qui doivent être pris en compte dans la conception et les recommandations.

### 2.1 Persona #1 : Bérénice, la Freelance

**Profil :**
* **Nom** : Bérénice
* **Âge** : 38 ans
* **Rôle** : Freelancer, digital native mais pas développeuse
* **Contexte** : A quitté son emploi à temps plein pour devenir freelance. Aujourd'hui, elle a la liberté de choisir ses clients et missions.

**Citation clé :**
> "I decided to quit my full-time job to become freelancer. Today, i have the freedom to choose my clients and missions. I need online visibility and digital tools that are easy to use with fair price. I have high expectations in terms of support : I need rapid and sharp answers to my questions."

**Ses Priorités :**
1. **Gérer sa réputation** car elle est son propre produit/marque
2. **Être facilement joignable** par ses prospects et clients
3. **Livrer dans les temps** pour ses clients et ne pas perdre de temps sur l'IT

**Ses Craintes / Blocages :**
1. **Gérer son IT est trop chronophage**
2. **Les pannes de toute application** sont une perte de productivité
3. **Difficile de gérer ses factures IT** et de garder les coûts sous contrôle

**Implications pour le Funnel :**
* **Pack recommandé** : Starter ou Perso (selon volume)
* **Mode guidé** : Très important pour elle (Option A)
* **Support** : Mettre en avant le support email + chat
* **Prix** : Transparence totale, pas de coûts cachés
* **Simplicité** : Solutions pré-installées, prêtes à l'emploi
* **Messaging** : "Gagnez du temps", "Support réactif", "Prix transparents"

### 2.2 Persona #2 : Sébastien, le Dirigeant d'Entreprise Industrielle

**Profil :**
* **Nom** : Sébastien
* **Âge** : 52 ans
* **Rôle** : Propriétaire d'entreprise industrielle
* **Contexte** : A acheté son entreprise il y a 10 ans. L'entreprise a grandi et compte aujourd'hui 100 personnes. Ne maîtrise pas la tech et l'IT.

**Citation clé :**
> "I decided to buy the company 10 years ago. We grew and are 100 people today. I know my clients and my business very well. I need tailor-made IT solutions and so, I prefer to outsource it to specialists."

**Ses Priorités :**
1. **Aider son équipe à atteindre les objectifs métier** avec des processus bien organisés, simples et efficaces
2. **Garder les coûts sous contrôle**
3. **Embaucher les bonnes personnes** pour gérer l'IT

**Ses Craintes / Blocages :**
1. **Pannes inattendues** qui mèneraient à une perte de productivité
2. **Sécurité de l'infrastructure IT** : Ransomwares qui pourraient causer la faillite
3. **Travailler avec les mauvais partenaires IT**

**Implications pour le Funnel :**
* **Pack recommandé** : Pro ou Performance (selon besoins)
* **Mode guidé** : Important (Option A) car ne maîtrise pas la tech
* **Sécurité** : Mettre en avant la protection anti-DDoS, sauvegardes
* **Support** : Support prioritaire 24/7, écosystème de partenaires
* **Messaging** : "Sécurité de pointe", "Haute disponibilité 99,99%", "Écosystème de partenaires experts"
* **Options** : Protection Anti-DDoS Avancée, Sauvegardes Cloud supplémentaires

### 2.3 Persona #3 : Elliott, le Développeur/Sysadmin

**Profil :**
* **Nom** : Elliott
* **Âge** : 29 ans
* **Rôle** : Développeur/Sysadmin
* **Contexte** : Travaille dans une entreprise tech et aime travailler sur des projets personnels également.

**Citation clé :**
> "I have worked for big companies as software engineer. I know work for an early-stage SaaS startup, and I love to develop web apps. Maybe one of them will be my future killer app!"

**Ses Priorités :**
1. **Utiliser des solutions de pointe** pour développer ses apps/sites web
2. **Livrer de la productivité** pour ses clients internes
3. **Trouver le produit qui correspond exactement à ses besoins** (ni plus, ni moins)

**Ses Craintes / Blocages :**
1. **Ne pas respecter les délais** des attentes métier pour les nouvelles fonctionnalités de ses apps ou mises à jour du site
2. **Utiliser une technologie obsolète** et ne pas pouvoir migrer librement vers de nouvelles technologies
3. **Coût de l'infrastructure** pour son entreprise
4. **Ne pas trouver le support ou la documentation** pour utiliser la technologie de la meilleure façon

**Implications pour le Funnel :**
* **Pack recommandé** : Pro ou Performance (selon projet)
* **Mode guidé** : Optionnel, peut préférer l'accès direct (Option B)
* **Options détaillées** : Besoin de granularité, configurateur avancé
* **Documentation** : Mettre en avant la documentation technique
* **Flexibilité** : Mise en avant de la possibilité de migration, pas de verrouillage
* **Messaging** : "Technologies de pointe", "Pas de verrouillage", "Documentation complète", "Granularité fine des tarifs"
* **Options** : Base de données SQL Privée, CDN Premium

### 2.4 Persona #4 : Nicolas, le Responsable IT

**Profil :**
* **Nom** : Nicolas
* **Âge** : 45 ans
* **Rôle** : Responsable IT
* **Contexte** : Travaille dans une entreprise établie de 200 personnes. Gère un département IT de 10 personnes.

**Citation clé :**
> "In our IT department, everyone has its own set of competencies, but we are all able to support colleagues for daily tasks."

**Ses Priorités :**
1. **Soutenir le business avec les bons outils digitaux** pour gérer leur activité
2. **Pouvoir évoluer** au fur et à mesure que l'entreprise grandit
3. **Recruter les bonnes personnes** dans le département IT

**Ses Craintes / Blocages :**
1. **Failles de sécurité, fuites de données, ransomwares**
2. **Être verrouillé avec une technologie obsolète**
3. **Ne pas pouvoir attirer les talents**, qui veulent soit aller dans les start-ups, soit dans de plus grandes entreprises qui paient mieux

**Implications pour le Funnel :**
* **Pack recommandé** : Performance (entreprise établie)
* **Mode guidé** : Optionnel, peut préférer l'accès direct
* **Sécurité** : Mise en avant de la sécurité de pointe, protection des données
* **Évolutivité** : Upgrade en un clic, scalabilité
* **Technologies modernes** : Mise en avant des technologies de pointe pour attirer les talents
* **Messaging** : "Sécurité de pointe", "Évolutivité", "Technologies modernes", "Multi-localisation des données"
* **Options** : Protection Anti-DDoS Avancée, CDN Premium, Microsoft 365 Business Basic

### 2.5 Persona #5 : Yassine, le Propriétaire d'Agence Web

**Profil :**
* **Nom** : Yassine
* **Âge** : 39 ans
* **Rôle** : Propriétaire d'Agence Web
* **Contexte** : A commencé en freelance, possède maintenant une agence web de 20 personnes. Offre des services de développement web et design. L'agence sert principalement des PME.

**Citation clé :**
> "Managing IT for my web agency is a challenge. I need the the right tools and knowledge to be able to provide top-notch services and stay ahead of the competition."

**Ses Priorités :**
1. **Rester à jour avec les dernières technologies** pour rendre son entreprise compétitive
2. **Vendre plus de valeur ajoutée** car la technologie est devenue une commodité
3. **Gérer les coûts** tout en fournissant de la performance pour ses clients

**Ses Craintes / Blocages :**
1. **Faille de sécurité, perte des données clients** ; perte de réputation de marque
2. **Subir des pannes de son fournisseur cloud** qui le rendraient peu fiable
3. **La concurrence est féroce**

**Implications pour le Funnel :**
* **Pack recommandé** : Pro ou Performance (selon nombre de clients)
* **Mode guidé** : Optionnel
* **Performance** : Mise en avant de la haute disponibilité 99,99%
* **Sécurité** : Protection des données clients, réputation
* **Compétitivité** : Meilleur rapport performance/prix
* **Messaging** : "Haute disponibilité 99,99%", "Sécurité renforcée", "Meilleur rapport performance/prix", "Pas seulement la première année"
* **Options** : Protection Anti-DDoS Avancée, CDN Premium, Sauvegardes Cloud supplémentaires

### 2.6 Mapping Personas / Packs d'Hébergement

| Persona | Taille Organisation | Pack Recommandé | Priorités Clés | Options Importantes |
|---------|-------------------|-----------------|----------------|---------------------|
| Bérénice (Freelance) | Freelance / Indépendant | Starter ou Perso | Simplicité, Support, Prix | Support email+chat, Solutions prêtes à l'emploi |
| Sébastien (Dirigeant 100 pers.) | Grande entreprise (+50) | Pro ou Performance | Sécurité, Disponibilité, Partenaires | Anti-DDoS, Sauvegardes, Support prioritaire |
| Elliott (Dev/Sysadmin) | Variable (startup/perso) | Pro ou Performance | Technologies, Flexibilité, Doc | SQL Privée, CDN, Configurateur avancé |
| Nicolas (IT Manager 200 pers.) | Grande entreprise (+50) | Performance | Sécurité, Évolutivité, Modernité | Anti-DDoS, CDN, Microsoft 365, Multi-localisation |
| Yassine (Agence Web 20 pers.) | PME (11-50) | Pro ou Performance | Performance, Sécurité, Coûts | Anti-DDoS, CDN, Sauvegardes, Haute disponibilité |

**Notes importantes :**
* Les personas peuvent chevaucher plusieurs catégories du questionnaire
* Le système de scoring doit prendre en compte les nuances (ex: agence web = PME mais besoins proches de Performance)
* Les messages et options doivent être adaptés selon le persona détecté

---

## 3. ARCHITECTURE DU PARCOURS UTILISATEUR

### 3.1 Vue d'Ensemble du Tunnel

Le parcours comprend 4 écrans séquentiels avec possibilité de navigation arrière à tout moment :

* **Écran 0** : Aiguillage (Landing)
* **Écran 1** : Sélection du domaine
* **Écran 2** : Configuration hébergement et emails
* **Écran 3** : Récapitulatif et paiement (non détaillé dans ce document)

### 3.2 ÉCRAN 0 : Page d'Aiguillage

**Objectif** : Orienter l'utilisateur selon son niveau d'autonomie

#### Spécifications visuelles :

* Layout centré avec deux cartes de choix équilibrées (ratio 1:1)
* Support thème clair/sombre avec détection automatique des préférences système
* Espacement vertical entre les cartes : 24px
* Largeur maximale du conteneur : 800px

#### Option A - "Laissez-vous guider" (Recommandé) :

* Bouton primaire avec couleur d'accent (#0050FF ou équivalent charte graphique)
* Icône : Boussole ou étoile magique
* Texte d'accompagnement : "Recommandation personnalisée en 30 secondes"
* Badge "Recommandé" en haut à droite de la carte
* Action : Lance le questionnaire de qualification (4 questions)

#### Option B - "Accès direct au catalogue" :

* Bouton secondaire (outline ou ghost)
* Icône : Grille ou liste
* Texte d'accompagnement : "Je connais mes besoins"
* Action : Redirige vers l'Écran 1 avec configuration par défaut (Pack Pro présélectionné)

#### Comportements techniques :

* Tracking analytics : Enregistrer le choix pour mesurer le taux d'adoption du mode guidé
* Animation d'entrée : Fade-in avec décalage de 100ms entre les deux options
* État hover : Élévation de la carte (+4px shadow)

### 3.3 QUESTIONNAIRE DE QUALIFICATION (Si Option A choisie)

**Format** : Modal ou page intermédiaire avec barre de progression

#### 4 Questions obligatoires :

**Q1 - Taille de l'organisation :**
* Freelance / Indépendant
  * *Message d'aide* : "Vous travaillez seul(e) ou en indépendant(e)"
  * *Persona typique* : Bérénice
* TPE (1-10 salariés)
  * *Message d'aide* : "Petite équipe de 1 à 10 personnes"
* PME (11-50 salariés)
  * *Message d'aide* : "Entreprise de 11 à 50 personnes"
  * *Persona typique* : Yassine (Agence Web)
* Grande entreprise (+50 salariés)
  * *Message d'aide* : "Entreprise de plus de 50 personnes"
  * *Persona typique* : Sébastien, Nicolas

**Q2 - Portée géographique :**
* Locale (France uniquement)
  * *Message d'aide* : "Votre activité cible principalement la France"
  * *Extension recommandée* : .fr en priorité
* Européenne
  * *Message d'aide* : "Votre activité s'étend à l'Europe"
  * *Extension recommandée* : .eu, .com
* Internationale
  * *Message d'aide* : "Votre activité est présente dans le monde entier"
  * *Extension recommandée* : .com en priorité
  * *Option suggérée* : CDN Premium

**Q3 - Secteur d'activité :**
* Services / Conseil
  * *Persona typique* : Bérénice (freelance conseil)
* E-commerce / Vente en ligne
  * *Message d'aide* : "Vous vendez des produits ou services en ligne"
  * *Option suggérée* : Base de données SQL Privée
  * *Pack recommandé* : Pro ou Performance
* Artisanat / Production
  * *Message d'aide* : "Vous êtes artisan ou producteur"
* Association / ONG
  * *Extension recommandée* : .org, .asso.fr
* Autre (champ libre)
  * *Message d'aide* : "Précisez votre secteur d'activité"
  * *Utilisation* : Extraction possible du nom d'entreprise pour suggestions de domaines

**Q4 - Type de site souhaité :**
* Site vitrine / Portfolio
  * *Message d'aide* : "Pour présenter votre activité ou vos réalisations"
  * *Pack recommandé* : Starter ou Perso
  * *Persona typique* : Bérénice
* Blog / Média
  * *Message d'aide* : "Pour publier du contenu régulièrement"
  * *Pack recommandé* : Perso ou Pro
* Boutique en ligne
  * *Message d'aide* : "Pour vendre vos produits en ligne"
  * *Pack recommandé* : Pro ou Performance
  * *Options suggérées* : Base de données SQL, Protection Anti-DDoS
* Application web / SaaS
  * *Message d'aide* : "Pour développer une application web ou SaaS"
  * *Pack recommandé* : Performance
  * *Persona typique* : Elliott
  * *Options suggérées* : Base de données SQL Privée, CDN Premium
* Site institutionnel
  * *Message d'aide* : "Pour une entreprise ou organisation établie"
  * *Pack recommandé* : Pro ou Performance

#### Contraintes UX :

* Une question visible à la fois (progression linéaire)
* Boutons "Précédent" et "Suivant" toujours accessibles
* Possibilité de passer le questionnaire à tout moment (lien "Accès direct" en bas)
* Sauvegarde automatique des réponses dans le LocalStorage

### 3.4 ÉCRAN 1 : Sélection du Nom de Domaine

**Objectif** : Permettre la recherche et la réservation d'un nom de domaine avec assistance IA

#### Layout principal :

* Champ de recherche centré, hauteur 64px, largeur 100% (max 600px)
* Placeholder dynamique selon le profil : "Recherchez votre domaine (ex: votre-entreprise.fr)"
* Bouton de recherche intégré à droite du champ

#### Fonctionnalité IA (si questionnaire complété) :

Lorsque l'utilisateur a fourni :
* Nom d'entreprise (extrait de Q3 si champ libre rempli)
* Secteur d'activité (Q3)

L'assistant IA génère automatiquement 5 à 8 suggestions créatives affichées sous le champ de recherche :
* Synonymes du nom d'entreprise
* Variantes avec mots-clés sectoriels
* Extensions thématiques pertinentes (.shop, .tech, .studio, etc.)

**Exemple de suggestions** : Pour "Boulangerie Martin" → martin-pain.fr, boulangeriemartin.com, painmartin.fr, martin-artisan.fr

#### Logique de recommandation d'extensions :

Le système applique un score basé sur les réponses du questionnaire :

| Profil Utilisateur | Extensions Prioritaires | Ordre d'Affichage |
|-------------------|------------------------|-------------------|
| Portée Locale (Q2) | .fr, .paris, .bzh | .fr en 1er |
| Portée Internationale (Q2) | .com, .net, .eu | .com en 1er |
| E-commerce (Q4) | .com, .shop, .store | .com puis .shop |
| Association (Q3) | .org, .asso.fr, .fr | .org en 1er |

#### Affichage des résultats de recherche :

Chaque résultat de domaine affiche :
* Nom du domaine avec extension
* Badge de statut :
  * Vert "Disponible" : Domaine libre à la réservation
  * Rouge "Indisponible" : Domaine déjà enregistré
* Prix annuel HT (ex: 8,99 €/an HT)
* Badge "Populaire" pour .fr et .com
* Bouton d'action : "Sélectionner" (si disponible) ou "Voir alternatives" (si indisponible)

#### Comportement en cas d'indisponibilité :

* L'IA propose instantanément 3 alternatives proches (variations orthographiques, ajout de tirets, extensions différentes)
* Affichage en accordéon dépliable sous le domaine indisponible

#### Options avancées (accordéon replié par défaut) :

* Transfert de domaine existant
* Protection WHOIS (+ 2,99 €/an)
* Renouvellement automatique (activé par défaut)

#### Validation et passage à l'étape suivante :

* Bouton "Continuer avec [nom-domaine.ext]" fixé en bas de page
* Récapitulatif sticky affichant le domaine sélectionné et son prix

### 3.5 ÉCRAN 2 : Sélection de l'Hébergement et Services Email

**Objectif** : Recommander l'offre d'hébergement optimale via un système de scoring et permettre la personnalisation

#### A. SYSTÈME DE RECOMMANDATION BASÉ SUR LES DONNÉES DE PACKAGES

**⚠️ IMPORTANT : Utilisation des données réelles de packages OVH**

Le système de recommandation doit utiliser les données réelles de packages disponibles dans le fichier `data/packages-ovh-funnel.csv`. Ce fichier contient 193 combinaisons validées de :
- Taille d'organisation (Freelance, 2-10, 11-50, +50)
- Zone géographique (Local, National, International)
- Secteur d'activité (8 secteurs)
- Type de site (Vitrine, Vente)

**Pour chaque combinaison, les données incluent :**
- Pack d'hébergement recommandé (Starter, Perso, Pro, Performance)
- Domaines recommandés (.fr, .com, .eu, .io, etc.)
- CMS recommandé (WordPress, PrestaShop)
- SSL recommandé (Let's Encrypt gratuit, Sectigo DV, Sectigo EV)
- CDN recommandé (Non nécessaire, CDN Basic, CDN Security, CDN Security RGPD)
- Options recommandées (Sauvegardes, Email Pro, Database Essential, Visibilité Pro, etc.)
- Prix détaillés (Domaines, Hébergement, SSL, CDN, Options, Total HT/TTC, Prix/mois)

**Logique de recommandation :**

1. **Matching exact** : Rechercher dans le CSV la ligne correspondant exactement aux réponses du questionnaire
   - Salariés (Q1) → Colonne "Salariés"
   - Zone (Q2) → Colonne "Zone"
   - Secteur (Q3) → Colonne "Secteur"
   - Type Site (Q4) → Colonne "Type Site"

2. **Si match exact trouvé** : Utiliser directement les recommandations de cette ligne
   - Pack d'hébergement
   - Domaines recommandés
   - CMS suggéré
   - SSL recommandé
   - CDN recommandé
   - Options pré-sélectionnées

3. **Si pas de match exact** : Utiliser le système de scoring par points (fallback)

**Exemples de recommandations basées sur les données :**

| Profil | Pack Recommandé | Domaines | CMS | SSL | CDN | Options |
|--------|----------------|----------|-----|-----|-----|---------|
| Freelance, Local, Commerce, Vitrine | Starter | .fr | WordPress | Let's Encrypt (Gratuit) | Non nécessaire | Aucune |
| Freelance, Local, Commerce, Vente | Perso | .fr | PrestaShop | Sectigo DV | CDN Basic | Sauvegardes automatiques |
| Freelance, Local, Santé, Vitrine | Starter | .fr | WordPress | Sectigo DV | CDN Security (RGPD) | Aucune |
| 2-10, Local, Commerce, Vitrine | Perso | .fr | WordPress | Let's Encrypt (Gratuit) | Non nécessaire | Aucune |
| 2-10, Local, Commerce, Vente | Pro | .fr | PrestaShop | Sectigo DV | CDN Basic | Sauvegardes automatiques |
| 11-50, Local, Commerce, Vitrine | Pro | .fr | WordPress | Let's Encrypt (Gratuit) | Non nécessaire | Email Pro: 10 comptes |
| 11-50, Local, Commerce, Vente | Pro | .fr | PrestaShop | Sectigo EV | CDN Basic | Email Pro: 10 comptes + Sauvegardes |
| +50, Local, Commerce, Vitrine | Performance | .fr | WordPress | Let's Encrypt (Gratuit) | CDN Basic | Email Pro: 20 comptes + Database Essential |
| +50, Local, Commerce, Vente | Performance | .fr | PrestaShop | Sectigo EV | CDN Security | Email Pro: 20 comptes + Database Essential + Sauvegardes |

**Mapping des secteurs du questionnaire vers le CSV :**

| Réponse Q3 (Questionnaire) | Secteur CSV |
|---------------------------|-------------|
| Services / Conseil | Services & Conseil |
| E-commerce / Vente en ligne | Commerce & Retail |
| Artisanat / Production | Industrie & BTP |
| Association / ONG | (Utiliser Services & Conseil comme fallback) |
| Autre (champ libre) | Analyser le texte pour détecter le secteur le plus proche |

**Mapping des types de site :**

| Réponse Q4 (Questionnaire) | Type Site CSV |
|---------------------------|---------------|
| Site vitrine / Portfolio | Vitrine |
| Blog / Média | Vitrine |
| Boutique en ligne | Vente |
| Application web / SaaS | Vitrine (ou Vente selon contexte) |
| Site institutionnel | Vitrine |

#### B. SYSTÈME DE RECOMMANDATION PAR POINTS (FALLBACK)

**Matrice de calcul des scores (utilisée si pas de match exact dans le CSV) :**

Chaque réponse au questionnaire attribue des points aux 4 packs disponibles. Le pack avec le score le plus élevé est recommandé.

| Critère (Réponse Questionnaire) | Starter | Perso | Pro | Performance |
|--------------------------------|---------|-------|-----|-------------|
| Freelance / Indépendant (Q1) | +5 | +3 | +1 | 0 |
| TPE 1-10 salariés (Q1) | +2 | +5 | +3 | +1 |
| PME 11-50 salariés (Q1) | 0 | +2 | +5 | +3 |
| +50 salariés (Q1) | 0 | 0 | +2 | +5 |
| Portée Locale (Q2) | +3 | +3 | +2 | 0 |
| Portée Européenne (Q2) | 0 | +2 | +4 | +3 |
| Portée Internationale (Q2) | 0 | 0 | +3 | +5 |
| Site vitrine/Portfolio (Q4) | +4 | +5 | +2 | 0 |
| Blog/Média (Q4) | +2 | +4 | +3 | +1 |
| E-commerce (Q4) | 0 | +1 | +4 | +5 |
| Application web/SaaS (Q4) | 0 | 0 | +2 | +5 |

**Règles de départage :**

* En cas d'égalité parfaite : Sélectionner le pack supérieur (stratégie d'up-sell)
* Si aucun questionnaire : Pack Pro par défaut (positionnement "best-seller")
* Si score Starter > 10 points d'avance : Proposer Starter mais afficher un bandeau "Évolutif vers Perso à tout moment"

**Calcul du score de match :**

* Score affiché à l'utilisateur = (Points obtenus / Points maximum possible) × 100
* Exemple : Si Pro obtient 15 points sur un maximum de 20 → "Match à 75% avec votre projet"

**Adaptation des messages selon les personas détectés :**

Le système doit adapter les taglines, messages et arguments de vente selon le profil utilisateur détecté via le questionnaire. Voici les mappings recommandés :

| Profil Détecté | Tagline Pack | Messages Clés à Mettre en Avant | Badges à Afficher |
|----------------|--------------|----------------------------------|-------------------|
| **Freelance / Indépendant** (Bérénice) | "Idéal pour démarrer votre activité en ligne" | "Solutions prêtes à l'emploi", "Support réactif", "Prix transparents", "Gagnez du temps" | "Prêt à l'emploi", "Support inclus" |
| **TPE / Petite Entreprise** | "Parfait pour les petites équipes" | "Tout en un seul endroit", "Facile à gérer", "Évolutif" | "Évolutif" |
| **PME / Agence Web** (Yassine) | "Pour les professionnels exigeants" | "Haute disponibilité 99,99%", "Meilleur rapport performance/prix", "Sécurité renforcée" | "99,99% disponibilité", "Meilleur rapport qualité/prix" |
| **Grande Entreprise** (Sébastien, Nicolas) | "Pour les entreprises établies" | "Sécurité de pointe", "Support prioritaire 24/7", "Multi-localisation des données", "Écosystème de partenaires" | "Sécurité renforcée", "Support 24/7" |
| **Développeur / Tech-savvy** (Elliott) | "Technologies de pointe et flexibilité" | "Pas de verrouillage", "Migration libre", "Documentation complète", "Granularité fine" | "Open source friendly", "Pas de lock-in" |
| **E-commerce** | "Optimisé pour les boutiques en ligne" | "Performance garantie", "Sécurité des transactions", "CDN inclus" | "E-commerce ready" |
| **International** | "Réseau mondial de datacenters" | "Multi-localisation", "CDN Premium", "Juridiction au choix" | "Multi-localisation" |

**Exemples de taglines personnalisées par pack :**

* **Starter** :
  * Freelance : "Parfait pour démarrer votre activité en ligne"
  * TPE : "Idéal pour les petites équipes"
  
* **Perso** :
  * Freelance : "Pour développer votre présence en ligne"
  * TPE : "Pour les équipes en croissance"
  
* **Pro** :
  * PME : "Pour les professionnels exigeants"
  * Agence : "Performance et sécurité pour vos clients"
  * E-commerce : "Optimisé pour les boutiques en ligne"
  
* **Performance** :
  * Grande entreprise : "Pour les entreprises établies"
  * Tech-savvy : "Technologies de pointe et flexibilité maximale"
  * International : "Réseau mondial, performance garantie"

**Mise en avant des piliers OVHcloud selon le profil :**

* **Save Time** : Prioritaire pour Freelance, TPE
  * Badge "Prêt à l'emploi"
  * Message : "Tout votre IT en un seul endroit"
  * Icône : Horloge / Éclair
  
* **Gain Flexibility** : Prioritaire pour Dev/Tech-savvy, PME en croissance
  * Badge "Upgrade en un clic"
  * Message : "Évoluez sans contrainte, pas de verrouillage"
  * Icône : Flèche vers le haut / Cadenas ouvert
  
* **Value for Money** : Prioritaire pour Toutes les catégories
  * Badge "Meilleur rapport qualité/prix"
  * Message : "Prix transparents, pas seulement la première année"
  * Icône : Euro / Graphique

#### B. INTERFACE DES OFFRES D'HÉBERGEMENT

**Layout en 3 zones :**

##### Zone Centrale - Tuiles d'Offres :

* 3 tuiles disposées verticalement
* La tuile recommandée est dépliée par défaut et positionnée en 1ère position
* Les 2 autres tuiles sont repliées en dessous

**Anatomie de la tuile dépliée (Recommandée) :**

Éléments visibles :
* Badge "Recommandé pour vous" en haut à gauche
* Nom du pack (ex: "Pro") en titre H2
* Score de match (ex: "Match à 85% avec votre projet")
* Tagline d'usage personnalisée selon le profil (ex: "Idéal pour les PME et sites professionnels" ou "Parfait pour démarrer votre activité en ligne" pour un freelance)
* Badge(s) contextuel(s) selon les piliers OVHcloud pertinents (ex: "Prêt à l'emploi", "Évolutif", "Meilleur rapport qualité/prix")
* Prix mensuel HT en grande taille (ex: 5,99 €/mois HT)
* Mention du prix annuel en petit (ex: "soit 71,88 €/an HT")
* Liste des caractéristiques principales :
  * Stockage SSD (reformulé : "250 Go d'espace pour vos fichiers")
  * Nombre d'adresses email (reformulé : "100 adresses email professionnelles")
  * Bande passante (reformulé : "Trafic illimité")
  * Certificat SSL (reformulé : "Sécurité HTTPS incluse")
  * Sauvegardes automatiques
* Bouton "Modifier les ressources" (ouvre un configurateur en modal)
* Bouton primaire "Choisir cette offre"

**Anatomie de la tuile repliée :**

Éléments visibles :
* Nom du pack
* Tagline courte (ex: "Économique" pour Starter, "Haute performance" pour Performance)
* Prix mensuel HT
* Icône "Voir les détails" (chevron vers le bas)

**Comportement au clic sur une tuile repliée :**

1. La tuile cliquée se déplie avec animation (expansion verticale, durée 300ms, easing ease-out)
2. L'ancienne tuile dépliée se replie simultanément
3. Scroll automatique pour centrer la nouvelle tuile dépliée dans la viewport
4. La tuile dépliée devient la nouvelle "sélection active"

##### Zone Droite - Sidebar d'Options Complémentaires :

* Largeur fixe : 320px
* Position : Sticky (suit le scroll)

**Contenu de la sidebar :**

Titre : "Options recommandées pour vous"

Liste d'options contextuelles (affichées selon le profil) :

**⚠️ PRIORITÉ : Utiliser les options du CSV si un match exact est trouvé**

Si une correspondance exacte est trouvée dans `data/packages-ovh-funnel.csv`, utiliser les options recommandées de cette ligne. Sinon, utiliser les règles ci-dessous :

| Condition (Profil) | Option Affichée | Prix | Message Personnalisé |
|-------------------|----------------|------|----------------------|
| E-commerce (Q4) | Base de données SQL Privée | +4,99 €/mois | "Pour gérer vos produits et clients" |
| +10 salariés (Q1) | Microsoft 365 Business Basic | +5,00 €/mois/utilisateur | "Collaboration et productivité pour votre équipe" |
| Portée Internationale (Q2) | CDN Premium | +9,99 €/mois | "Accélération mondiale pour vos visiteurs" |
| Grande entreprise (+50) | Protection Anti-DDoS Avancée | +14,99 €/mois | "Protection contre les attaques" |
| E-commerce ou Grande entreprise | Sauvegarde Cloud supplémentaire | +2,99 €/mois | "Sécurité renforcée de vos données" |
| Tous profils | Sauvegarde Cloud supplémentaire | +2,99 €/mois | "Protégez vos données" |

**Options spécifiques du CSV à prendre en compte :**

D'après les données CSV, les options suivantes sont recommandées selon les profils :

| Profil | Options Recommandées (CSV) |
|--------|---------------------------|
| **Freelance, Local, Vitrine** | Aucune (sauf Restauration : Visibilité Pro Google Maps) |
| **Freelance, Local, Vente** | Sauvegardes automatiques |
| **Freelance, Local, Santé** | CDN Security (RGPD) |
| **2-10, Local, Vitrine** | Aucune (sauf Restauration : Visibilité Pro) |
| **2-10, Local, Vente** | Sauvegardes automatiques |
| **11-50, Local, Vitrine** | Email Pro: 10 comptes |
| **11-50, Local, Vente** | Email Pro: 10 comptes + Sauvegardes automatiques |
| **11-50, Local, Santé** | Email Pro: 10 comptes + CDN Security (RGPD) |
| **+50, Local, Vitrine** | Email Pro: 20 comptes + Database Essential |
| **+50, Local, Vente** | Email Pro: 20 comptes + Database Essential + Sauvegardes automatiques |
| **International** | CDN Basic ou CDN Security (selon secteur) |
| **Restauration & Hôtellerie, Vitrine** | Visibilité Pro (Google Maps) - 588€/an |

**Parsing des options depuis le CSV :**

Les options dans le CSV sont séparées par " + ". Le système doit parser ces options et les pré-sélectionner automatiquement :

- "Sauvegardes automatiques" → Activer l'option "Sauvegarde Cloud supplémentaire"
- "Email Pro: X comptes" → Activer l'option "Email Pro" avec le nombre de comptes
- "Database Essential" → Activer l'option "Base de données SQL Privée"
- "Visibilité Pro (Google Maps)" → Option spécifique Restauration/Hôtellerie
- "CDN Security (RGPD)" → Activer "CDN Premium" avec mention RGPD

Chaque option affiche :
* Nom de l'option
* Description courte (1 ligne)
* Prix mensuel HT
* Toggle switch pour activer/désactiver
* Icône d'information (tooltip avec détails au survol)

**Récapitulatif en temps réel :**

Affiché en bas de la sidebar :
* "Votre sélection"
* Domaine : [nom-domaine.ext] - X,XX €/an
* Hébergement : [Pack choisi] - X,XX €/mois
* Options : [Liste si activées] - X,XX €/mois
* Total mensuel HT : XX,XX €/mois
* Total annuel HT : XXX,XX €/an
* Mention : "Prix TTC calculés à l'étape suivante"

**⚠️ PRIORITÉ : Utiliser les prix du CSV si un match exact est trouvé**

Si une correspondance exacte est trouvée dans `data/packages-ovh-funnel.csv`, utiliser les prix de cette ligne :
- Prix Domaines (€ HT)
- Prix Hébergement (€ HT)
- Prix SSL (€ HT)
- Prix CDN (€ HT)
- Prix Options (€ HT)
- TOTAL (€ HT)
- TOTAL (€ TTC)
- Prix/mois (€ TTC)

Ces prix sont déjà calculés et validés, garantissant la cohérence tarifaire.

Bouton d'action principal : "Continuer vers le paiement"

---

## 4. SPÉCIFICATIONS TECHNIQUES DE DÉVELOPPEMENT

### 4.1 Stack Technique Recommandée

#### Frontend :

* Framework : React 18+ (avec TypeScript pour la robustesse)
* Routing : React Router v6
* State Management : Redux Toolkit ou Zustand (préférence pour Zustand si l'état reste simple)
* Animations : Framer Motion
* **Design System** : **OBLIGATOIRE** - [Design System OVHcloud officiel](https://ovh.github.io/design-system/latest/)
  * Utiliser les composants, tokens et guidelines du design system OVHcloud
  * Package npm : Installer selon la documentation du design system
  * Référence complète : https://ovh.github.io/design-system/latest/?path=/docs/ovhcloud-design-system-welcome--docs
* Styling : Tailwind CSS v3+ (optionnel, si utilisé, doit être configuré avec les tokens du design system OVHcloud)
* Formulaires : React Hook Form + Zod (validation)

#### Backend / API :

Endpoints requis :
* `POST /api/domains/search` : Recherche de disponibilité domaine
* `POST /api/domains/suggestions` : Génération de suggestions IA
* `POST /api/recommendations/hosting` : Calcul de recommandation hébergement
* `POST /api/cart/save` : Sauvegarde panier utilisateur

### 4.2 Gestion de l'État (State Management)

**Structure du store global :**

```typescript
interface FunnelState {
  // Étape courante
  currentStep: 0 | 1 | 2 | 3;
  
  // Données du questionnaire
  questionnaire: {
    completed: boolean;
    organizationSize: string | null;
    geographicScope: string | null;
    activitySector: string | null;
    siteType: string | null;
  };
  
  // Scores calculés
  hostingScores: {
    starter: number;
    perso: number;
    pro: number;
    performance: number;
  };
  
  // Sélections utilisateur
  selections: {
    domain: {
      name: string | null;
      extension: string | null;
      price: number | null;
    };
    hosting: {
      pack: 'starter' | 'perso' | 'pro' | 'performance';
      customResources?: object;
    };
    options: {
      sqlDatabase: boolean;
      microsoft365: boolean;
      cdnPremium: boolean;
      extraBackup: boolean;
    };
  };
  
  // Métadonnées
  metadata: {
    startedAt: Date;
    lastUpdatedAt: Date;
    guidedMode: boolean;
  };
}
```

**Persistance LocalStorage :**

* Clé de stockage : `ovh_funnel_state`
* Sauvegarde automatique à chaque modification du store
* Durée de vie : 7 jours
* Restauration automatique au chargement si données valides détectées
* Afficher un bandeau "Reprendre ma commande" si session précédente trouvée

### 4.3 Logique de Calcul des Recommandations

**⚠️ PRIORITÉ : Utilisation des données CSV de packages**

Le système doit **en priorité** utiliser les données du fichier `data/packages-ovh-funnel.csv` pour les recommandations. Le système de scoring par points n'est utilisé qu'en fallback si aucune correspondance exacte n'est trouvée dans le CSV.

**Fonction de recommandation basée sur le CSV :**

```typescript
// services/recommendations/packages.ts

interface PackageData {
  salariés: string;
  zone: string;
  secteur: string;
  typeSite: string;
  packHébergement: string;
  domaines: string;
  cms: string;
  ssl: string;
  cdn: string;
  options: string;
  prixDomaines: number;
  prixHébergement: number;
  prixSSL: number;
  prixCDN: number;
  prixOptions: number;
  totalHT: number;
  totalTTC: number;
  prixMois: number;
}

// Charger les données CSV au démarrage
let packagesData: PackageData[] = [];

async function loadPackagesData() {
  const response = await fetch('/data/packages-ovh-funnel.csv');
  const csvText = await response.text();
  packagesData = parseCSV(csvText);
}

// Fonction de matching
function findMatchingPackage(questionnaire: QuestionnaireData): PackageData | null {
  // Mapping des réponses du questionnaire vers les colonnes CSV
  const salariés = mapOrganizationSize(questionnaire.organizationSize);
  const zone = mapGeographicScope(questionnaire.geographicScope);
  const secteur = mapActivitySector(questionnaire.activitySector);
  const typeSite = mapSiteType(questionnaire.siteType);
  
  // Recherche exacte
  const match = packagesData.find(pkg => 
    pkg.salariés === salariés &&
    pkg.zone === zone &&
    pkg.secteur === secteur &&
    pkg.typeSite === typeSite
  );
  
  return match || null;
}

// Fonctions de mapping
function mapOrganizationSize(size: string): string {
  const mapping = {
    'freelance': 'Freelance',
    'tpe': '2-10',
    'pme': '11-50',
    'large': '+50'
  };
  return mapping[size] || 'Freelance';
}

function mapGeographicScope(scope: string): string {
  const mapping = {
    'local': 'Local',
    'european': 'National',
    'international': 'International'
  };
  return mapping[scope] || 'Local';
}

function mapActivitySector(sector: string): string {
  const mapping = {
    'services': 'Services & Conseil',
    'ecommerce': 'Commerce & Retail',
    'artisanat': 'Industrie & BTP',
    'sante': 'Santé & Médical',
    'tech': 'Tech & Digital',
    'creatif': 'Créatif & Arts',
    'finance': 'Finance & Assurance',
    'restauration': 'Restauration & Hôtellerie'
  };
  return mapping[sector] || 'Services & Conseil';
}

function mapSiteType(type: string): string {
  const mapping = {
    'vitrine': 'Vitrine',
    'blog': 'Vitrine',
    'ecommerce': 'Vente',
    'saas': 'Vitrine',
    'institutionnel': 'Vitrine'
  };
  return mapping[type] || 'Vitrine';
}

// Fonction principale de recommandation
export function getRecommendation(questionnaire: QuestionnaireData) {
  // 1. Essayer de trouver un match exact dans le CSV
  const csvMatch = findMatchingPackage(questionnaire);
  
  if (csvMatch) {
    return {
      source: 'csv',
      pack: csvMatch.packHébergement.toLowerCase(),
      domaines: csvMatch.domaines.split(' + '),
      cms: csvMatch.cms,
      ssl: csvMatch.ssl,
      cdn: csvMatch.cdn,
      options: parseOptions(csvMatch.options),
      prix: {
        domaines: csvMatch.prixDomaines,
        hébergement: csvMatch.prixHébergement,
        ssl: csvMatch.prixSSL,
        cdn: csvMatch.prixCDN,
        options: csvMatch.prixOptions,
        totalHT: csvMatch.totalHT,
        totalTTC: csvMatch.totalTTC,
        prixMois: csvMatch.prixMois
      }
    };
  }
  
  // 2. Fallback : utiliser le système de scoring par points
  return {
    source: 'scoring',
    ...calculateHostingScores(questionnaire)
  };
}
```

**Fonction de calcul des scores (FALLBACK uniquement) :**

```typescript
function calculateHostingScores(questionnaire) {
  const scores = { starter: 0, perso: 0, pro: 0, performance: 0 };
  
  // Appliquer la matrice de points (cf. section 3.5.B)
  // Exemple pour Q1 - Taille organisation
  switch(questionnaire.organizationSize) {
    case 'freelance':
      scores.starter += 5;
      scores.perso += 3;
      scores.pro += 1;
      break;
    // ... autres cas
  }
  
  // Répéter pour Q2, Q3, Q4
  
  // Déterminer le pack recommandé
  const recommendedPack = Object.keys(scores).reduce((a, b) => 
    scores[a] > scores[b] ? a : b
  );
  
  // En cas d'égalité, sélectionner le pack supérieur
  if (scores[recommendedPack] === Math.max(...Object.values(scores))) {
    // Logique de départage
  }
  
  return { scores, recommendedPack };
}
```

### 4.4 Intégration de l'Assistant IA (Suggestions de Domaines)

**Spécifications de l'API IA :**

Endpoint : `POST /api/domains/suggestions`

Payload :
```json
{
  "companyName": "string",
  "activitySector": "string",
  "geographicScope": "string"
}
```

Réponse attendue :
```json
{
  "suggestions": [
    {
      "domain": "example-domain",
      "extension": ".fr",
      "available": true,
      "price": 8.99,
      "relevanceScore": 0.95
    }
  ]
}
```

**Algorithme de génération (côté backend) :**

1. Extraction de mots-clés : Analyser le nom d'entreprise et le secteur pour extraire les termes significatifs
2. Génération de variantes :
   * Synonymes (via base de données sémantique)
   * Traductions (si portée internationale)
   * Combinaisons avec mots-clés sectoriels
   * Ajout de préfixes/suffixes pertinents (ex: "le", "ma", "votre")
3. Filtrage d'extensions : Appliquer la logique de recommandation d'extensions (cf. section 2.4)
4. Vérification de disponibilité : Interroger l'API WHOIS pour chaque suggestion
5. Scoring de pertinence : Classer les suggestions par score (longueur, mémorabilité, cohérence sémantique)
6. Retour des 5-8 meilleures suggestions

### 4.5 Principes d'Accessibilité et Performance

**Accessibilité (WCAG 2.1 AA) :**

* Contraste minimum 4.5:1 pour les textes
* Navigation complète au clavier (Tab, Shift+Tab, Enter, Espace)
* Attributs ARIA sur tous les composants interactifs
* Labels explicites sur tous les champs de formulaire
* Annonces vocales des changements d'état (via live regions)

**Performance :**

* Lazy loading des étapes (charger l'étape suivante uniquement à la navigation)
* Images optimisées (WebP avec fallback)
* Code splitting par route
* Debouncing sur le champ de recherche de domaine (300ms)
* Cache des résultats de recherche de domaine (5 minutes)
* Objectif Lighthouse : Score > 90 sur Performance, Accessibilité, Best Practices

**Responsive Design :**

* Breakpoints : Mobile (< 768px), Tablet (768-1024px), Desktop (> 1024px)
* Sur mobile : Sidebar d'options devient un accordéon en bas de page
* Tuiles d'offres empilées verticalement sur toutes tailles d'écran

### 4.6 Terminologie "Zero-Jargon"

**Glossaire de reformulation :**

| Terme Technique | Reformulation Utilisateur |
|----------------|---------------------------|
| Espace disque SSD | Capacité de stockage pour vos fichiers et photos |
| Bande passante | Nombre de visiteurs simultanés |
| Certificat SSL | Sécurité et cadenas HTTPS |
| Base de données MySQL | Espace pour vos données produits et clients |
| Adresses email | Boîtes email professionnelles (@votre-domaine.fr) |
| Sauvegarde automatique | Copie de sécurité quotidienne de votre site |
| CDN | Accélération du chargement à l'international |

Appliquer systématiquement ces reformulations dans toutes les interfaces.

---

## 5. CATALOGUE DES OFFRES D'HÉBERGEMENT (2026)

### 5.1 Matrice Tarifaire Complète

| Pack | Usage Idéal | Prix Mensuel HT | Prix Annuel HT | Stockage SSD | Emails | Bande Passante | Certificat SSL | Sauvegardes |
|------|-------------|-----------------|----------------|--------------|--------|----------------|----------------|-------------|
| Starter | CV en ligne, landing page | 1,19 € | 14,28 € | 10 Go | 2 adresses | Illimitée | Inclus | Hebdomadaires |
| Perso | Blog, site vitrine PME | 2,99 € | 35,88 € | 100 Go | 10 adresses | Illimitée | Inclus | Quotidiennes |
| Pro | Site professionnel, PME | 5,99 € | 71,88 € | 250 Go | 100 adresses | Illimitée | Inclus | Quotidiennes + Restauration 1 clic |
| Performance | E-commerce, fort trafic | 11,99 € | 143,88 € | 500 Go | Illimitées | Garantie 99,9% | Inclus | Temps réel + Rétention 30 jours |

### 5.2 Caractéristiques Techniques Détaillées

#### Starter :
* CPU : 1 cœur partagé
* RAM : 512 Mo
* Bases de données : 1 MySQL (100 Mo)
* Domaines : 1 inclus
* Sous-domaines : 5
* Comptes FTP : 1
* Support : Email uniquement

#### Perso :
* CPU : 2 cœurs partagés
* RAM : 1 Go
* Bases de données : 5 MySQL (500 Mo chacune)
* Domaines : 5 inclus
* Sous-domaines : Illimités
* Comptes FTP : 10
* Support : Email + Chat

#### Pro :
* CPU : 4 cœurs partagés
* RAM : 2 Go
* Bases de données : 20 MySQL (1 Go chacune)
* Domaines : 20 inclus
* Sous-domaines : Illimités
* Comptes FTP : Illimités
* Support : Email + Chat + Téléphone

#### Performance :
* CPU : 6 cœurs dédiés
* RAM : 4 Go garantis
* Bases de données : Illimitées MySQL (2 Go chacune)
* Domaines : Illimités
* Sous-domaines : Illimités
* Comptes FTP : Illimités
* Support : Prioritaire 24/7 (Email + Chat + Téléphone)

### 5.3 Options Complémentaires

| Option | Prix Mensuel HT | Description | Profil Cible |
|--------|----------------|-------------|--------------|
| Base de données SQL Privée | 4,99 € | Serveur MySQL dédié, 25 Go | E-commerce, applications |
| Microsoft 365 Business Basic | 5,00 € /utilisateur | Email + Office Online + 1 To OneDrive | PME, équipes |
| CDN Premium | 9,99 € | Réseau de diffusion mondial, cache intelligent | International, médias |
| Sauvegarde Cloud Supplémentaire | 2,99 € | Rétention 90 jours, restauration granulaire | Tous (sécurité renforcée) |
| Protection Anti-DDoS Avancée | 14,99 € | Mitigation automatique, bande passante illimitée | E-commerce critique |

---

## 7. DESIGN SYSTEM ET CHARTE GRAPHIQUE

### 7.1 ⚠️ OBLIGATION : Utilisation du Design System OVHcloud Officiel

**IMPORTANT** : Le projet **DOIT** utiliser obligatoirement le [Design System OVHcloud officiel](https://ovh.github.io/design-system/latest/?path=/docs/ovhcloud-design-system-welcome--docs) comme référence unique pour tous les composants UI, la palette de couleurs, la typographie et les patterns d'interface.

**Référence officielle :**
* **URL** : https://ovh.github.io/design-system/latest/
* **Documentation complète** : https://ovh.github.io/design-system/latest/?path=/docs/ovhcloud-design-system-welcome--docs
* **Version** : Utiliser la dernière version disponible (latest)

**Règles d'utilisation :**

1. **Composants UI** : Tous les composants (boutons, cartes, formulaires, modals, etc.) doivent être basés sur les composants du design system OVHcloud
2. **Palette de couleurs** : Utiliser exclusivement les couleurs définies dans le design system OVHcloud
3. **Typographie** : Respecter les règles typographiques du design system OVHcloud
4. **Espacements et grilles** : Suivre les guidelines d'espacement et de layout du design system
5. **Accessibilité** : Le design system OVHcloud respecte déjà les standards WCAG 2.1 AA - s'assurer de les maintenir
6. **Mode sombre** : Si le design system OVHcloud propose un mode sombre, l'utiliser conformément aux spécifications

**Intégration technique :**

* Si le design system OVHcloud fournit des packages npm/React, les utiliser en priorité
* Si des composants personnalisés sont nécessaires, ils doivent respecter les tokens de design (couleurs, espacements, typographie) du design system OVHcloud
* Toute déviation du design system doit être justifiée et validée par l'équipe design OVHcloud

**Note** : Les spécifications ci-dessous sont fournies à titre de référence et doivent être alignées avec le design system OVHcloud officiel. En cas de divergence, le design system OVHcloud fait foi.

### 7.2 Palette de Couleurs

**⚠️ À valider avec le Design System OVHcloud officiel**

Les couleurs suivantes sont des références et doivent être remplacées par les tokens de couleur du design system OVHcloud :

#### Couleurs Primaires :
* Accent Principal : `#0050FF` (Bleu OVH) - *À vérifier dans le design system*
* Accent Secondaire : `#00D9FF` (Cyan) - *À vérifier dans le design system*
* Succès : `#00C853` (Vert) - *À vérifier dans le design system*
* Erreur : `#FF1744` (Rouge) - *À vérifier dans le design system*
* Avertissement : `#FFB300` (Orange) - *À vérifier dans le design system*

#### Couleurs Neutres :
* Texte Principal : `#1A1A1A` (Quasi-noir) - *À vérifier dans le design system*
* Texte Secondaire : `#666666` (Gris foncé) - *À vérifier dans le design system*
* Bordures : `#E0E0E0` (Gris clair) - *À vérifier dans le design system*
* Arrière-plan : `#FFFFFF` (Blanc) - *À vérifier dans le design system*
* Arrière-plan Alternatif : `#F5F5F5` (Gris très clair) - *À vérifier dans le design system*

#### Mode Sombre :
* Utiliser les tokens de couleur du mode sombre du design system OVHcloud si disponible
* Arrière-plan : `#121212` - *À vérifier dans le design system*
* Texte Principal : `#FFFFFF` - *À vérifier dans le design system*
* Texte Secondaire : `#B0B0B0` - *À vérifier dans le design system*
* Bordures : `#2C2C2C` - *À vérifier dans le design system*

#### Couleurs Primaires :
* Accent Principal : `#0050FF` (Bleu OVH)
* Accent Secondaire : `#00D9FF` (Cyan)
* Succès : `#00C853` (Vert)
* Erreur : `#FF1744` (Rouge)
* Avertissement : `#FFB300` (Orange)

#### Couleurs Neutres :
* Texte Principal : `#1A1A1A` (Quasi-noir)
* Texte Secondaire : `#666666` (Gris foncé)
* Bordures : `#E0E0E0` (Gris clair)
* Arrière-plan : `#FFFFFF` (Blanc)
* Arrière-plan Alternatif : `#F5F5F5` (Gris très clair)

#### Mode Sombre :
* Arrière-plan : `#121212`
* Texte Principal : `#FFFFFF`
* Texte Secondaire : `#B0B0B0`
* Bordures : `#2C2C2C`

### 7.3 Typographie

**⚠️ À utiliser selon les spécifications du Design System OVHcloud**

La typographie doit être conforme aux règles définies dans le design system OVHcloud officiel.

**Références (à valider avec le design system) :**

* **Police Principale** : À utiliser selon le design system OVHcloud (potentiellement Inter ou police spécifique OVHcloud)
* **Hiérarchie typographique** : Respecter les tailles et poids de police définis dans le design system

**Spécifications de référence (à remplacer par celles du design system) :**

* Titres H1 : 32px, Bold (700) - *À vérifier dans le design system*
* Titres H2 : 24px, Semi-Bold (600) - *À vérifier dans le design system*
* Titres H3 : 20px, Semi-Bold (600) - *À vérifier dans le design system*
* Corps de texte : 16px, Regular (400) - *À vérifier dans le design system*
* Texte secondaire : 14px, Regular (400) - *À vérifier dans le design system*
* Labels : 14px, Medium (500) - *À vérifier dans le design system*

**Hiérarchie :**

* Line-height : Selon les spécifications du design system OVHcloud
* Letter-spacing : Selon les spécifications du design system OVHcloud

### 7.4 Composants UI

**⚠️ OBLIGATOIRE : Utiliser les composants du Design System OVHcloud**

Tous les composants UI doivent être basés sur les composants disponibles dans le [Design System OVHcloud](https://ovh.github.io/design-system/latest/).

**Composants à utiliser depuis le design system :**

* **Boutons** : Utiliser les composants Button du design system OVHcloud (primary, secondary, tertiary, etc.)
* **Cartes** : Utiliser les composants Card du design system OVHcloud
* **Formulaires** : Utiliser les composants Input, Select, Checkbox, Radio, etc. du design system OVHcloud
* **Modals/Dialogs** : Utiliser les composants Modal du design system OVHcloud
* **Badges** : Utiliser les composants Badge du design system OVHcloud
* **Navigation** : Utiliser les composants de navigation du design system OVHcloud
* **Layout/Grid** : Utiliser le système de grille du design system OVHcloud
* **Icônes** : Utiliser la bibliothèque d'icônes du design system OVHcloud

**Spécifications de référence (à remplacer par celles du design system) :**

Les spécifications ci-dessous sont fournies à titre indicatif et doivent être remplacées par les valeurs du design system OVHcloud :

#### Boutons :
* Border-radius : Selon le design system OVHcloud
* Padding : Selon le design system OVHcloud
* Transition : Selon le design system OVHcloud
* Shadow (hover) : Selon le design system OVHcloud
* Variantes : Primary, Secondary, Tertiary selon le design system

#### Cartes :
* Border-radius : Selon le design system OVHcloud
* Border : Selon le design system OVHcloud
* Shadow : Selon le design system OVHcloud
* Padding : Selon le design system OVHcloud

#### Champs de Formulaire :
* Border-radius : Selon le design system OVHcloud
* Border : Selon le design system OVHcloud (focus states inclus)
* Padding : Selon le design system OVHcloud
* Transition : Selon le design system OVHcloud

### 7.5 Intégration du Design System OVHcloud

**Méthode d'intégration recommandée :**

1. **Installation** : Installer le package npm du design system OVHcloud (si disponible)
   ```bash
   npm install @ovhcloud/ods-design-system
   # ou selon le nom du package fourni
   ```

2. **Import des composants** : Importer les composants nécessaires depuis le design system
   ```typescript
   import { Button, Card, Input } from '@ovhcloud/ods-design-system';
   ```

3. **Tokens de design** : Utiliser les tokens CSS/SCSS du design system pour les couleurs, espacements, etc.
   ```css
   /* Exemple d'utilisation des tokens */
   .my-component {
     color: var(--ods-color-primary);
     padding: var(--ods-spacing-md);
   }
   ```

4. **Thème** : Si le design system supporte le mode sombre, l'activer selon les préférences utilisateur

**Documentation à consulter :**

* Composants disponibles : https://ovh.github.io/design-system/latest/?path=/docs/ovhcloud-design-system-welcome--docs
* Guide d'installation : Consulter la documentation du design system
* Exemples d'utilisation : Consulter les Storybook/exemples du design system

**Validation :**

* Tous les composants doivent être validés visuellement avec les exemples du design system OVHcloud
* Les couleurs, espacements et typographie doivent correspondre exactement aux tokens du design system
* En cas de doute, consulter la documentation officielle ou contacter l'équipe design OVHcloud

---

## 8. MÉTRIQUES DE SUCCÈS ET KPIs

### 8.1 Objectifs Quantitatifs

**Taux de Conversion :**
* Objectif global : 25% (de la landing page au paiement)
* Étape 0 → Étape 1 : 80%
* Étape 1 → Étape 2 : 70%
* Étape 2 → Paiement : 45%

**Performance :**
* Temps de chargement par étape : < 2 secondes
* Time to Interactive : < 3 secondes
* Score Lighthouse : > 90

**Engagement :**
* Taux d'adoption du mode guidé : > 60%
* Taux d'acceptation de la recommandation IA : > 70%
* Taux d'ajout d'options complémentaires : > 30%

### 8.2 Tracking Analytics

**Événements à tracker :**

* `funnel_step_viewed` : Affichage de chaque étape
* `guided_mode_selected` : Choix du mode guidé
* `questionnaire_completed` : Fin du questionnaire
* `domain_searched` : Recherche de domaine
* `domain_selected` : Sélection d'un domaine
* `hosting_pack_viewed` : Visualisation d'un pack
* `hosting_pack_selected` : Sélection d'un pack
* `option_toggled` : Activation/désactivation d'une option
* `cart_abandoned` : Sortie du tunnel sans finalisation
* `payment_initiated` : Passage à l'étape de paiement

**Propriétés à capturer :**

* `user_id` : Identifiant anonyme
* `session_id` : Identifiant de session
* `guided_mode` : true/false
* `recommended_pack` : Nom du pack recommandé
* `selected_pack` : Nom du pack sélectionné
* `match_score` : Score de match affiché
* `time_spent` : Temps passé par étape

---

**Document créé le** : 2026  
**Version** : 1.0  
**Statut** : En attente de validation

