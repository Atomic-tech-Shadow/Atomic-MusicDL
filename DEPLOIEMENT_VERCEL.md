# Guide de Déploiement Vercel - Atomic MusicDL

Ce guide vous explique comment déployer votre application Atomic MusicDL sur Vercel.

## 📋 Prérequis

1. Un compte Vercel (gratuit) : [vercel.com](https://vercel.com)
2. Votre code poussé sur GitHub
3. Une clé API YouTube Data v3

## 🚀 Étapes de Déploiement

### 1. Préparer les Variables d'Environnement

Vous aurez besoin de configurer la variable suivante dans Vercel :

- `YOUTUBE_API_KEY` : Votre clé API YouTube Data v3

#### Comment obtenir une clé API YouTube :

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez-en un existant
3. Activez l'API "YouTube Data API v3"
4. Créez des identifiants → Clé API
5. Copiez votre clé API

### 2. Déployer sur Vercel

#### Option A : Via l'Interface Web (Recommandé)

1. **Connectez votre dépôt GitHub :**
   - Allez sur [vercel.com/dashboard](https://vercel.com/dashboard)
   - Cliquez sur **"Add New"** → **"Project"**
   - Importez votre dépôt GitHub

2. **Configurez le projet :**
   - Vercel détectera automatiquement qu'il s'agit d'un projet Vite
   - **Framework Preset** : Vite
   - **Build Command** : `npm run build` (déjà configuré)
   - **Output Directory** : `dist` (déjà configuré)
   - **Install Command** : `npm install`

3. **Ajoutez les variables d'environnement :**
   - Dans la section "Environment Variables", ajoutez :
     ```
     YOUTUBE_API_KEY=votre_clé_api_youtube
     ```
   - Cochez les cases : Production, Preview, Development

4. **Déployez :**
   - Cliquez sur **"Deploy"**
   - Attendez la fin du build (2-3 minutes)
   - Votre application sera disponible sur `https://votre-projet.vercel.app`

#### Option B : Via la CLI Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Suivez les instructions interactives
# Pour le premier déploiement, répondez :
# - Set up and deploy? → Y
# - Which scope? → Votre compte
# - Link to existing project? → N
# - Project name? → atomic-musicdl (ou autre)
# - In which directory is your code located? → ./
# - Want to override settings? → N

# Ajouter la variable d'environnement
vercel env add YOUTUBE_API_KEY

# Déployer en production
vercel --prod
```

### 3. Vérifier le Déploiement

1. **Testez l'application :**
   - Ouvrez l'URL fournie par Vercel
   - Essayez une recherche (ex: "Eminence in Shadow OST")
   - Testez un téléchargement

2. **Vérifiez les logs :**
   - Dans le dashboard Vercel, allez dans **"Deployments"**
   - Cliquez sur votre déploiement
   - Consultez les logs en cas d'erreur

## 🔧 Configuration Technique

### Structure des Fichiers

```
votre-projet/
├── api/
│   └── index.js          # Backend serverless pour Vercel
├── client/               # Code source frontend
├── dist/                 # Build frontend (généré automatiquement)
├── server/               # Code serveur original (utilisé en dev)
├── vercel.json           # Configuration Vercel
├── .vercelignore         # Fichiers à ignorer lors du déploiement
└── package.json
```

### Comment ça Marche ?

- **Frontend** : Vite build votre application React dans `/dist`
- **Backend** : Le dossier `/api` contient des fonctions serverless
- **Routes** : 
  - `/api/*` → Fonctions serverless (backend)
  - `/*` → Application React statique (frontend)

### Différences avec le Développement Local

| Aspect | Développement Local | Production Vercel |
|--------|---------------------|-------------------|
| Serveur | Express (port 5000) | Fonctions Serverless |
| Frontend | Vite Dev Server | Build statique |
| Hot Reload | Oui | Non (redéployez pour mettre à jour) |

## 🔄 Mises à Jour Automatiques

Vercel peut automatiquement redéployer votre application à chaque push sur GitHub :

1. Dans le dashboard Vercel, allez dans **"Settings"** → **"Git"**
2. Vérifiez que **"Production Branch"** est configuré sur `main` (ou votre branche principale)
3. Activez **"Automatic Deployments"**

Maintenant, chaque push sur `main` déclenchera un nouveau déploiement !

## 🐛 Résolution de Problèmes

### Erreur : "YouTube API key not configured"

- Vérifiez que `YOUTUBE_API_KEY` est bien définie dans les variables d'environnement Vercel
- Assurez-vous qu'elle est activée pour "Production"

### Erreur 404 sur les routes

- Vérifiez que `vercel.json` est bien à la racine du projet
- Les routes API doivent commencer par `/api`

### Le téléchargement ne fonctionne pas

- Les fonctions serverless Vercel ont une limite de temps (10s sur le plan gratuit, 60s sur Pro)
- Pour les gros fichiers, envisagez d'utiliser une solution de streaming ou un service dédié

### Build échoue

- Vérifiez les logs de build dans le dashboard Vercel
- Assurez-vous que toutes les dépendances sont dans `package.json`
- Testez `npm run build` localement

## 💰 Limites du Plan Gratuit Vercel (2025)

- ✅ 100 Go de bande passante par mois
- ✅ Déploiements illimités
- ✅ 100 GB-heures d'exécution serverless
- ⚠️ 10 secondes max par fonction serverless
- ✅ Domaine `.vercel.app` gratuit
- ✅ 1 domaine personnalisé

Pour les besoins de téléchargement de musique, le plan gratuit devrait suffire pour un usage personnel ou de test.

## 🌐 Domaine Personnalisé

Pour utiliser votre propre domaine :

1. Allez dans **"Settings"** → **"Domains"**
2. Ajoutez votre domaine
3. Suivez les instructions pour configurer le DNS
4. Vercel configurera automatiquement HTTPS

## 📊 Analytics

Vercel fournit des analytics gratuites :
- Allez dans **"Analytics"** dans le dashboard
- Consultez les visites, performances, etc.

## 🎉 Votre Application est en Ligne !

Félicitations ! Votre application Atomic MusicDL est maintenant déployée sur Vercel.

**URL de production** : `https://votre-projet.vercel.app`

Partagez-la avec vos amis et profitez du pouvoir atomique du téléchargement de musique ! ⚡

---

## 📞 Support

- Documentation Vercel : https://vercel.com/docs
- Support Vercel : https://vercel.com/support
- API YouTube : https://developers.google.com/youtube/v3
