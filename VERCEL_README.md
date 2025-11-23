# 🚀 Guide de Déploiement Vercel - Configuration Serverless

## ✅ Configurations Mises à Jour

Les fichiers suivants ont été configurés pour un déploiement serverless optimal sur Vercel :

### 📁 Structure du Projet

```
votre-projet/
├── api/                      # ✨ Fonctions serverless Vercel
│   └── youtube/
│       ├── search.ts         # API de recherche YouTube
│       └── video/
│           └── [videoId].ts  # API d'informations vidéo
├── client/                   # Code source frontend
├── dist/                     # Build frontend (auto-généré)
├── server/                   # Serveur Express (dev local uniquement)
├── vercel.json              # ✨ Configuration Vercel mise à jour
├── .vercelignore            # ✨ Fichiers à ignorer
└── package.json
```

### 🔧 Fichiers Configurés

#### 1. **vercel.json** - Configuration Principale
- ✅ Runtime Node.js 20
- ✅ Timeout de 10 secondes pour les fonctions serverless
- ✅ Rewrites pour les routes API et SPA
- ✅ Headers CORS configurés
- ✅ Build command et output directory

#### 2. **api/youtube/search.ts** - Fonction de Recherche
- ✅ Recherche de vidéos YouTube via `yt-search`
- ✅ Validation des paramètres de requête
- ✅ Gestion des erreurs robuste
- ✅ Limite de 12 résultats

#### 3. **api/youtube/video/[videoId].ts** - Informations Vidéo
- ✅ Récupération des détails d'une vidéo spécifique
- ✅ Routes dynamiques Vercel
- ✅ Validation de l'ID vidéo

#### 4. **.vercelignore** - Optimisation du Build
- ✅ Exclut les fichiers inutiles du déploiement
- ✅ Réduit la taille du build

## 📋 Comment Déployer

### Option 1 : Via l'Interface Vercel (Recommandé)

1. **Connectez votre repository GitHub**
   - Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
   - Cliquez sur "Add New" → "Project"
   - Importez votre repository GitHub

2. **Configuration automatique**
   - Vercel détectera automatiquement `vercel.json`
   - Framework Preset : **Vite** (auto-détecté)
   - Build Command : `npm run build`
   - Output Directory : `dist/public`

3. **Variables d'environnement** (optionnel)
   - Aucune variable requise pour le fonctionnement de base
   - Si vous avez besoin d'une clé API YouTube personnalisée :
     ```
     YOUTUBE_API_KEY=votre_clé_api
     ```

4. **Déployez**
   - Cliquez sur **"Deploy"**
   - Attendez 2-3 minutes
   - Votre app sera disponible sur `https://votre-projet.vercel.app`

### Option 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

## 🎯 Routes API Disponibles

Une fois déployé, vos endpoints API seront :

```
GET https://votre-projet.vercel.app/api/youtube/search?q=query
GET https://votre-projet.vercel.app/api/youtube/video/[videoId]
```

### Exemples :

```bash
# Rechercher des vidéos
curl "https://votre-projet.vercel.app/api/youtube/search?q=lofi"

# Obtenir les infos d'une vidéo
curl "https://votre-projet.vercel.app/api/youtube/video/dQw4w9WgXcQ"
```

## ⚙️ Fonctionnalités Serverless

### ✅ Avantages
- **Scaling automatique** : Vercel scale automatiquement selon la charge
- **Temps de démarrage rapide** : Fonctions serverless optimisées
- **Pas de serveur à gérer** : Vercel gère l'infrastructure
- **HTTPS par défaut** : Sécurité intégrée
- **CDN global** : Distribution mondiale du frontend

### ⚠️ Limitations (Plan Gratuit)

- **Timeout** : 10 secondes max par requête
- **Taille mémoire** : 1024 MB
- **Bande passante** : 100 GB/mois
- **Builds** : 100 heures/mois

Pour augmenter ces limites, passez au plan Pro.

## 🔍 Différences Dev vs Production

### Développement Local (Replit)
```bash
npm run dev
```
- Utilise Express server (server/index.ts)
- Port 5000
- Hot reload avec Vite

### Production Vercel
- Fonctions serverless dans `/api`
- Routes automatiques basées sur la structure des fichiers
- Frontend statique servi par CDN
- Backend serverless à la demande

## 🐛 Dépannage

### Erreur : "Function invocation timeout"
- **Cause** : La fonction prend plus de 10 secondes
- **Solution** : Optimisez le code ou passez au plan Pro (60s timeout)

### Erreur : "404 on API routes"
- **Cause** : Routes mal configurées
- **Solution** : Vérifiez que `vercel.json` est bien à la racine

### Build échoue
```bash
# Testez localement
npm run build

# Vérifiez les logs Vercel
# Dashboard → Votre projet → Deployments → Logs
```

### CORS errors
- Les headers CORS sont déjà configurés dans `vercel.json`
- Si problème persiste, vérifiez les requêtes depuis votre frontend

## 📊 Monitoring

Une fois déployé, vous pouvez monitorer :

1. **Analytics** : Trafic et performance
2. **Logs** : Logs en temps réel des fonctions
3. **Deployments** : Historique des déploiements
4. **Speed Insights** : Performance du site

Accédez à tout cela depuis le dashboard Vercel.

## 🔄 Redéploiement Automatique

Configurez les déploiements automatiques :

1. Dans Vercel Dashboard → Settings → Git
2. Activez "Automatic deployments from Git"
3. Chaque push sur `main` déclenchera un déploiement

## 💡 Bonnes Pratiques

1. **Testez localement avant de déployer**
   ```bash
   npm run build
   npm run start
   ```

2. **Utilisez les preview deployments**
   - Créez une branche → Push → Vercel crée un preview
   - Testez avant de merger sur main

3. **Surveillez les quotas**
   - Vérifiez régulièrement votre usage dans le dashboard
   - Optimisez les requêtes API pour rester dans les limites

4. **Sécurisez vos variables d'environnement**
   - Ne committez jamais de clés API
   - Utilisez les variables d'environnement Vercel

## 🎉 Résumé

Votre application est maintenant configurée pour :

- ✅ Déploiement serverless sur Vercel
- ✅ Frontend React/Vite optimisé
- ✅ API YouTube fonctionnelle
- ✅ Scaling automatique
- ✅ HTTPS et CDN global

Bon déploiement ! 🚀
