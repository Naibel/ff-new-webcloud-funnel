# Instructions pour Pousser la Branche

## 🚀 Méthode Rapide (Recommandée)

### Étape 1 : Créer un Personal Access Token GitHub

1. Allez sur : https://github.com/settings/tokens
2. Cliquez sur **"Generate new token (classic)"**
3. Donnez-lui un nom : `ff-new-webcloud-funnel`
4. Cochez la permission **`repo`** (toutes les sous-permissions)
5. Cliquez sur **"Generate token"**
6. **⚠️ IMPORTANT** : Copiez le token immédiatement (vous ne pourrez plus le voir après)

### Étape 2 : Pousser avec le token

Exécutez cette commande dans votre terminal :

```bash
cd /Users/ngaldini/ff-new-webcloud-funnel

# Méthode 1 : Utiliser le token directement dans l'URL (temporaire)
git remote set-url origin https://VOTRE_TOKEN@github.com/Naibel/ff-new-webcloud-funnel.git
git push -u origin docs/cahier-des-charges

# Puis remettre l'URL normale
git remote set-url origin https://github.com/Naibel/ff-new-webcloud-funnel.git
```

**OU** utilisez le script automatique :

```bash
./setup-git-auth.sh
```

Le script vous demandera votre token et fera tout automatiquement.

---

## 🔄 Méthode Alternative : Utiliser le Keychain macOS

### Étape 1 : Pousser une première fois (Git vous demandera les identifiants)

```bash
cd /Users/ngaldini/ff-new-webcloud-funnel
git push -u origin docs/cahier-des-charges
```

Quand Git demande :
- **Username** : Votre nom d'utilisateur GitHub
- **Password** : Utilisez votre **Personal Access Token** (pas votre mot de passe GitHub)

### Étape 2 : macOS Keychain stockera automatiquement les credentials

Les prochaines fois, Git utilisera automatiquement les credentials stockés dans le Keychain.

---

## ✅ Vérification

Une fois poussé, vérifiez sur GitHub :
- https://github.com/Naibel/ff-new-webcloud-funnel/branches

Vous devriez voir la branche `docs/cahier-des-charges`.

---

## 📝 Contenu de la branche

La branche contient :
- ✅ `CahierDesCharges.md` - Document complet (1147 lignes)
- ✅ `PreconisationsTechniques.md` - Guide d'implémentation
- ✅ `QuestionsClarification.md` - Questions de validation
- ✅ `REGLES_METIER.md` - Règle métier de workflow
- ✅ `push-branch.sh` - Script pour automatiser le workflow
- ✅ `setup-git-auth.sh` - Script pour configurer l'authentification

---

## 🆘 En cas de problème

Si vous rencontrez des erreurs :
1. Vérifiez que vous avez bien les permissions sur le repo
2. Vérifiez que le token a bien la permission `repo`
3. Essayez de régénérer un nouveau token
4. Vérifiez votre connexion internet

