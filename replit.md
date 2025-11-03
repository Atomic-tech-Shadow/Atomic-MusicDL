# Atomic MusicDL

## Overview

Atomic MusicDL is a music download platform that allows users to search for and download music from YouTube, with a special focus on anime OST, J-pop, and otaku culture. The application features a purple atomic theme inspired by "The Eminence in Shadow" anime, particularly the "I AM ATOMIC" power. Users can search for songs, preview results with thumbnails and metadata, and download tracks in MP3 format.

## Recent Changes (November 3, 2025)

**Complete Atomic Theme Transformation:**
- Rebranded from "MusicDL" to "Atomic MusicDL"
- Updated color scheme to purple/violet atomic theme (HSL 270°) for both light and dark modes
- Added "I AM ATOMIC" tagline with Zap icon effects throughout the app
- Changed all music suggestions to anime/otaku focused content (Eminence in Shadow OST, J-pop, Vocaloid, Anime Opening)
- Updated features to emphasize atomic power and otaku community
- Modified branding across all components (Header, Hero, Footer, Features)
- Updated page title and meta description for SEO

## User Preferences

Preferred communication style: Simple, everyday language (French).
User interests: Passionate about "The Eminence in Shadow" anime, atomic theme, otaku culture.

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

**Server Framework**
- Express.js with TypeScript for the REST API server
- Custom middleware for request logging and JSON body parsing
- Vite integration in development mode for SSR and HMR support

**API Structure**
The backend exposes RESTful endpoints:
- `/api/search` - YouTube music search using YouTube Data API v3
- `/api/download/:videoId` - Music download endpoint (implementation uses ytdl-core)

**Video Processing**
- `@distube/ytdl-core` library for extracting and downloading YouTube audio
- Duration parsing for video metadata display
- Child process spawning capability for potential additional media processing

### Data Storage

**Database**
- PostgreSQL database accessed via Neon serverless driver
- Drizzle ORM for type-safe database queries and schema management
- Database schema includes user management (id, username, password)

**Session Management**
- In-memory storage implementation (`MemStorage`) for development/simple deployments
- `connect-pg-simple` available for PostgreSQL-backed session storage in production
- User authentication schema defined but not fully implemented in current codebase

**Schema Philosophy**
The application uses Zod schemas for runtime validation combined with Drizzle for compile-time type safety. Shared schema definitions in `/shared/schema.ts` ensure consistency between frontend and backend validation.

### External Dependencies

**YouTube Integration**
- YouTube Data API v3 for searching music content
- Requires `YOUTUBE_API_KEY` environment variable
- API calls fetch video metadata (title, thumbnail, duration) and detailed content information
- Video category filtering (category ID 10 for music)

**Media Extraction**
- `@distube/ytdl-core` for YouTube video/audio extraction
- Handles audio stream extraction and format conversion

**Database Service**
- Neon PostgreSQL serverless database
- Requires `DATABASE_URL` environment variable for connection
- Connection pooling handled by Neon serverless driver

**Development Tools**
- Replit-specific plugins for development environment integration (cartographer, dev banner, runtime error overlay)
- ESBuild for backend bundling in production builds