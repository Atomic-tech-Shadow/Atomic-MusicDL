# Guide de Déploiement sur Vercel

## Prérequis

1. Un compte Vercel (gratuit sur [vercel.com](https://vercel.com))
2. Une clé API YouTube Data v3 (optionnel mais recommandé)

## Obtenir une clé API YouTube

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API "YouTube Data API v3"
4. Créez des identifiants (Credentials) → API Key
5. Copiez votre clé API

## Déploiement

### Option 1: Déploiement via l'interface web Vercel

1. Connectez-vous à [Vercel](https://vercel.com)
2. Cliquez sur "New Project"
3. Importez votre repository GitHub/GitLab/Bitbucket
4. Configurez les variables d'environnement:
   - `YOUTUBE_API_KEY`: Votre clé API YouTube (optionnel, une clé par défaut est incluse)
5. Cliquez sur "Deploy"

### Option 2: Déploiement via CLI

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Pour déployer en production
vercel --prod
```

## Configuration des Variables d'Environnement

Dans les paramètres du projet Vercel, ajoutez:

- `YOUTUBE_API_KEY` (optionnel): Votre clé API YouTube personnelle

## Fonctionnalités en Production

### ✅ Fonctionnalités Actives

- Recherche de musiques YouTube
- Téléchargement MP3 avec barre de progression
- Navigation entre pages (Tendances, Favoris, Historique, Profil)
- Interface responsive avec thème sombre/clair

### ⚠️ Limitations en Mode Serverless

- **Historique et Favoris**: En mode serverless, ces données sont stockées en mémoire et seront réinitialisées à chaque redémarrage de la fonction. Pour une persistance réelle, il faudrait ajouter une base de données (PostgreSQL, MongoDB, etc.)
- **Statistiques**: Les statistiques utilisateur sont également en mémoire

## Améliorer la Persistance des Données

Pour ajouter une vraie base de données en production:

1. **Option 1**: Utiliser Vercel Postgres
   ```bash
   vercel postgres create
   ```

2. **Option 2**: Utiliser une base de données externe
   - Supabase (PostgreSQL gratuit)
   - MongoDB Atlas
   - PlanetScale
   - Neon

3. Mettre à jour les fichiers API dans le dossier `api/` pour utiliser la base de données au lieu du stockage en mémoire

## Vérification du Déploiement

Une fois déployé, testez:

1. ✅ La page d'accueil se charge
2. ✅ La recherche fonctionne
3. ✅ Les téléchargements fonctionnent avec la barre de progression
4. ✅ La navigation entre les pages fonctionne
5. ⚠️ L'historique et les favoris (reset après chaque redémarrage)

## Troubleshooting

### Erreur "YouTube API quota exceeded"

- Vous avez dépassé la limite quotidienne de l'API YouTube
- Solution: Utilisez votre propre clé API ou attendez 24h

### Les téléchargements ne fonctionnent pas

- Vérifiez que la fonction `api/download/[videoId].ts` est bien déployée
- Vérifiez les logs Vercel pour voir les erreurs

### Les favoris/historique ne persistent pas

- C'est normal en mode serverless sans base de données
- Ajoutez une base de données pour la persistance (voir section ci-dessus)

## Support

Pour toute question ou problème, consultez:
- [Documentation Vercel](https://vercel.com/docs)
- [YouTube Data API Docs](https://developers.google.com/youtube/v3)
