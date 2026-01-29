# Guide Rapide : Créer un Token GitHub

## 🚀 Méthode Rapide (5 minutes)

### Étape 1 : Ouvrir la page de création de token

**Lien direct** : https://github.com/settings/tokens/new

Ou suivez ce chemin :
1. Allez sur GitHub.com
2. Cliquez sur votre avatar (en haut à droite)
3. Cliquez sur **"Settings"**
4. Dans le menu de gauche, cliquez sur **"Developer settings"** (tout en bas)
5. Cliquez sur **"Personal access tokens"** → **"Tokens (classic)"**
6. Cliquez sur **"Generate new token"** → **"Generate new token (classic)"**

### Étape 2 : Configurer le token

1. **Note** : Donnez un nom descriptif
   ```
   ff-new-webcloud-funnel
   ```

2. **Expiration** : Choisissez une durée
   - Recommandé : **90 days** (ou **No expiration** si vous préférez)

3. **Permissions** : Cochez **UNIQUEMENT** :
   - ✅ **repo** (toutes les sous-permissions seront automatiquement cochées)
     - repo:status
     - repo_deployment
     - public_repo
     - repo:invite
     - security_events

4. **Ne cochez RIEN d'autre** (sauf si vous avez besoin d'autres permissions)

### Étape 3 : Générer et copier le token

1. Cliquez sur **"Generate token"** (tout en bas de la page)
2. **⚠️ IMPORTANT** : Copiez le token IMMÉDIATEMENT
   - Il ressemble à : `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
   - Vous ne pourrez plus le voir après avoir quitté la page
   - Si vous le perdez, vous devrez en créer un nouveau

### Étape 4 : Utiliser le token

Une fois le token copié, revenez dans votre terminal et exécutez :

```bash
cd /Users/ngaldini/ff-new-webcloud-funnel
./setup-git-auth.sh VOTRE_TOKEN_COPIE_ICI
```

**OU** si vous préférez entrer le token de manière sécurisée (masqué) :

```bash
cd /Users/ngaldini/ff-new-webcloud-funnel
./setup-git-auth.sh
# Puis collez votre token quand demandé
```

---

## 🔒 Sécurité

- ⚠️ Ne partagez JAMAIS votre token
- ⚠️ Ne le commitez JAMAIS dans Git
- ⚠️ Si vous pensez qu'il a été compromis, supprimez-le et créez-en un nouveau
- ✅ Vous pouvez créer plusieurs tokens pour différents projets
- ✅ Vous pouvez révoquer un token à tout moment depuis les settings

---

## 📝 Vérification

Pour vérifier que votre token fonctionne :

```bash
# Tester l'authentification
curl -H "Authorization: token VOTRE_TOKEN" https://api.github.com/user
```

Si ça retourne vos informations GitHub, le token fonctionne !

---

## 🆘 En cas de problème

**Erreur "Bad credentials"** :
- Vérifiez que vous avez bien copié tout le token
- Vérifiez que le token n'a pas expiré
- Vérifiez que vous avez bien coché la permission "repo"

**Erreur "Resource not accessible by integration"** :
- Vérifiez que vous avez les droits d'écriture sur le repo
- Vérifiez que le repo existe et que vous y avez accès

**Token perdu** :
- Créez simplement un nouveau token
- Les anciens tokens continuent de fonctionner jusqu'à expiration

