#!/bin/bash

# Script pour pousser la branche docs/cahier-des-charges
# Ce script applique la règle métier : récupérer les dernières mises à jour avant de pousser

echo "🔄 Récupération des dernières mises à jour du repo..."
git fetch origin

echo "📊 Vérification des changements sur origin/main..."
UPDATES=$(git log HEAD..origin/main --oneline)
if [ -n "$UPDATES" ]; then
    echo "⚠️  Des mises à jour sont disponibles sur origin/main :"
    echo "$UPDATES"
    echo ""
    read -p "Voulez-vous les intégrer maintenant ? (o/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Oo]$ ]]; then
        echo "🔄 Intégration des mises à jour..."
        git merge origin/main
        if [ $? -ne 0 ]; then
            echo "❌ Conflits détectés. Veuillez les résoudre manuellement."
            exit 1
        fi
        echo "✅ Mises à jour intégrées avec succès"
    fi
else
    echo "✅ Votre branche est à jour avec origin/main"
fi

echo ""
echo "🚀 Poussage de la branche docs/cahier-des-charges..."
git push -u origin docs/cahier-des-charges

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Branche poussée avec succès !"
    echo "📝 Vous pouvez maintenant créer une Pull Request sur GitHub"
else
    echo ""
    echo "❌ Erreur lors du push. Vérifiez vos credentials GitHub."
    echo "💡 Astuce : Utilisez un Personal Access Token comme mot de passe"
fi

