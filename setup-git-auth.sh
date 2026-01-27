#!/bin/bash

# Script pour configurer l'authentification Git et pousser la branche

echo "🔐 Configuration de l'authentification Git pour GitHub"
echo ""

# Vérifier si un token est fourni en argument
if [ -n "$1" ]; then
    GITHUB_TOKEN="$1"
    echo "✅ Token fourni en argument"
else
    # Option 1 : Utiliser un Personal Access Token
    echo "📝 Pour créer un token GitHub :"
    echo "   1. Allez sur : https://github.com/settings/tokens"
    echo "   2. Cliquez sur 'Generate new token (classic)'"
    echo "   3. Donnez-lui un nom (ex: 'ff-new-webcloud-funnel')"
    echo "   4. Cochez la permission 'repo'"
    echo "   5. Copiez le token"
    echo ""
    read -sp "Entrez votre token GitHub (masqué) : " GITHUB_TOKEN
    echo ""
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Token non fourni"
    echo ""
    echo "💡 Utilisation :"
    echo "   ./setup-git-auth.sh"
    echo "   OU"
    echo "   ./setup-git-auth.sh VOTRE_TOKEN"
    exit 1
fi

# Sauvegarder l'URL actuelle
ORIGINAL_URL=$(git remote get-url origin)
echo "📦 URL actuelle sauvegardée : $ORIGINAL_URL"

# Configurer l'URL avec le token
echo "🔧 Configuration de l'authentification..."
git remote set-url origin https://${GITHUB_TOKEN}@github.com/Naibel/ff-new-webcloud-funnel.git

# Récupérer les dernières mises à jour (règle métier)
echo ""
echo "🔄 Récupération des dernières mises à jour..."
git fetch origin

# Vérifier s'il y a des mises à jour
UPDATES=$(git log HEAD..origin/main --oneline 2>/dev/null)
if [ -n "$UPDATES" ]; then
    echo "⚠️  Des mises à jour sont disponibles sur origin/main"
    echo "🔄 Intégration des mises à jour..."
    git merge origin/main
    if [ $? -ne 0 ]; then
        echo "❌ Conflits détectés. Veuillez les résoudre manuellement."
        git remote set-url origin "$ORIGINAL_URL"
        exit 1
    fi
    echo "✅ Mises à jour intégrées"
fi

# Pousser la branche
echo ""
echo "🚀 Poussage de la branche docs/cahier-des-charges..."
git push -u origin docs/cahier-des-charges

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Push réussi !"
    # Remettre l'URL normale (sans token visible)
    git remote set-url origin https://github.com/Naibel/ff-new-webcloud-funnel.git
    echo "✅ URL du remote remise à la normale"
    echo ""
    echo "🎉 Votre branche est maintenant disponible sur GitHub !"
    echo "📝 Vous pouvez créer une Pull Request :"
    echo "   https://github.com/Naibel/ff-new-webcloud-funnel/compare/main...docs/cahier-des-charges"
else
    echo ""
    echo "❌ Erreur lors du push"
    echo "💡 Vérifiez que :"
    echo "   - Le token est valide et a la permission 'repo'"
    echo "   - Vous avez les droits d'écriture sur le repo"
    # Remettre l'URL normale
    git remote set-url origin "$ORIGINAL_URL"
    exit 1
fi

