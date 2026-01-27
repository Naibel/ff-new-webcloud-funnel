# RÈGLES MÉTIER - WORKFLOW DE DÉVELOPPEMENT

## Règle Principale : Synchronisation avec le Repo Initial

### ⚠️ OBLIGATOIRE : Toujours récupérer les derniers éléments du repo initial avant d'ajouter ses propres modifications

**Workflow à suivre systématiquement :**

1. **Récupérer les dernières mises à jour du repo distant**
   ```bash
   git fetch origin
   ```

2. **Vérifier les changements sur la branche principale**
   ```bash
   git log HEAD..origin/main --oneline
   ```

3. **Intégrer les mises à jour dans votre branche de travail**
   ```bash
   # Si vous êtes sur votre branche de feature
   git merge origin/main
   # OU
   git rebase origin/main  # (selon préférence de workflow)
   ```

4. **Résoudre les conflits éventuels** (si présents)

5. **Ensuite seulement, ajouter vos propres modifications**
   ```bash
   git add .
   git commit -m "votre message"
   ```

6. **Pousser votre branche**
   ```bash
   git push -u origin votre-branche
   ```

### Pourquoi cette règle ?

- ✅ Assure que vous travaillez toujours sur la base la plus récente
- ✅ Évite les conflits et les divergences
- ✅ Permet de bénéficier des dernières améliorations du repo
- ✅ Maintient la cohérence du projet
- ✅ Facilite les merges ultérieurs

### Checklist avant chaque commit

- [ ] `git fetch origin` exécuté
- [ ] `git merge origin/main` ou `git rebase origin/main` exécuté
- [ ] Aucun conflit non résolu
- [ ] Tests locaux passés
- [ ] Modifications personnelles ajoutées
- [ ] Commit créé avec message descriptif

### En cas de conflit

1. Identifier les fichiers en conflit : `git status`
2. Ouvrir les fichiers et résoudre manuellement les conflits
3. Marquer comme résolu : `git add fichier-resolu`
4. Finaliser : `git commit` (si merge) ou `git rebase --continue` (si rebase)

---

**Date de création** : 2026  
**Version** : 1.0  
**Statut** : Règle métier active

