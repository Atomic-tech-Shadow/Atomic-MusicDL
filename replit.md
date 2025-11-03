# Music Download Platform

## Overview

This is a music download platform that allows users to search for and download music from YouTube. The application features a modern, clean interface inspired by Spotify and YouTube Music, with a focus on speed and simplicity. Users can search for songs, preview results with thumbnails and metadata, and download tracks in MP3 format.

## User Preferences

Preferred communication style: Simple, everyday language.

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