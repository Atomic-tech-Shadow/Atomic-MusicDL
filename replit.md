# Atomic MusicDL

## Overview

Atomic MusicDL est une application web permettant de rechercher des vidéos YouTube et de les télécharger en MP3 ou MP4 via l'API apisyu.com. L'application utilise `@distube/ytdl-core` pour rechercher et récupérer les métadonnées des vidéos, puis intègre les widgets apisyu.com pour gérer le téléchargement.

## Recent Changes

### November 20, 2025 - Modernisation du Design

**Nouveau Design Moderne:**
- Nouveau schéma de couleurs vibrant (bleu/violet moderne)
- Hero section avec animations fluides et gradients
- VideoCard amélioré avec effets hover et transitions
- Page d'accueil avec sections "Comment ça marche" et fonctionnalités
- Animations et transitions fluides sur toute l'application
- Design responsive et moderne
- Remplacement de tous les emojis par des icônes Lucide React

### November 20, 2025 - Refonte Complète avec apisyu.com

**Migration vers apisyu.com pour les téléchargements:**
- Suppression de l'ancien système de téléchargement interne
- Intégration des widgets iframe apisyu.com pour MP3 et MP4
- Support de multiples qualités audio (64, 128, 192, 256, 320 kbps) et vidéo (240p, 360p, 480p, 720p, 1080p)
- Interface simplifiée sans historique, favoris, playlists, ou statistiques
- Recherche YouTube avec `@distube/ytdl-core` et récupération parallèle des métadonnées

**Améliorations de Performance et Robustesse:**
- Parallélisation des appels API avec Promise.all pour améliorer les performances de recherche
- Gestion d'erreurs robuste avec retry intelligent (uniquement pour les erreurs 5xx)
- Validation des requêtes côté backend avec messages d'erreur clairs
- Logs détaillés pour le monitoring et le debugging

**Simplification de l'Architecture:**
- Suppression de la sidebar, du lecteur audio, et des pages inutilisées
- Interface simple avec une page de recherche unique
- Pas de stockage de données (historique, favoris, etc.)
- Focus uniquement sur la recherche et le téléchargement via apisyu.com

## User Preferences

Preferred communication style: Simple, everyday language (French).

## System Architecture

### Frontend Architecture

**Framework & Build Tools**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and dev server for fast HMR and optimized production builds
- Wouter for lightweight client-side routing
- TanStack Query (React Query) for server state management and API data fetching

**UI Component System**
- Shadcn/ui component library built on Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design system
- Custom CSS variables for theming (light/dark mode support)
- Typography system using Inter and Poppins fonts from Google Fonts

**Design Pattern**
The application uses a component-based architecture with functional React components. State management is handled through React Query for server state and local React state for UI interactions. The design follows a "New York" style variant from Shadcn with custom color schemes and spacing systems.

### Backend Architecture

**Development Server (Replit)**
- Express.js with TypeScript for the REST API server
- Custom middleware for request logging and JSON body parsing
- Vite integration in development mode for SSR and HMR support

**Production Deployment**
- **Replit Publishing**: Full Express server with all features
- **Vercel**: Serverless functions in `/api` directory
  - `/api/search.ts` - Search endpoint
  - `/api/download/[videoId].ts` - Download endpoint (subject to platform limits)

**API Structure**
The backend exposes RESTful endpoints:
- `/api/youtube/search?q=query` - YouTube video search using ytdl-core
- `/api/youtube/video/:videoId` - Get video metadata by ID

### Data Schema

**Schema Philosophy**
The application uses Zod schemas for runtime validation. Shared schema definitions in `/shared/schema.ts` ensure consistency between frontend and backend:
- `YouTubeSearchResult` - Video metadata (title, artist, duration, thumbnail, etc.)
- `AudioQuality` - MP3 quality levels (64, 128, 192, 256, 320 kbps)
- `VideoQuality` - MP4 resolution levels (240p, 360p, 480p, 720p, 1080p)
- `DownloadType` - Type de téléchargement (mp3 ou mp4)

**No Database**
The application does not use a database. All data is transient and handled in-memory during the request/response cycle.

### External Dependencies

**YouTube Search & Metadata**
- `@distube/ytdl-core` - YouTube video metadata extraction
- Scrapes YouTube search results HTML to find video IDs
- Fetches video info in parallel with Promise.all for better performance
- No API keys required
- Returns title, artist (channel name), duration, thumbnail, view count

**Download Service**
- **apisyu.com** - Free YouTube to MP3 & MP4 conversion API
- Embedded via iframe widgets in the frontend
- Supports multiple audio qualities (64-320 kbps) and video resolutions (240p-1080p)
- No API keys or backend integration required
- Handles conversion and download entirely client-side via iframe
- API URL format: `https://apisyu.com/single/{type}/{videoId}?audio={quality}&theme=light`

**Development Tools**
- Replit-specific plugins for development environment integration (cartographer, dev banner, runtime error overlay)
- ESBuild for backend bundling in production builds

**Performance Optimizations**
- Parallel fetching of video metadata (up to 12 videos simultaneously)
- Smart retry logic (only for 5xx errors, not 4xx validation errors)
- Request validation to prevent unnecessary API calls
- Detailed logging for monitoring and debugging