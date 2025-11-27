# ⚛️ Atomic MusicDL - I AM ATOMIC

<div align="center">

![Badge](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge&logo=github)
![Badge](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Badge](https://img.shields.io/badge/Version-1.0.0-purple?style=for-the-badge)
![Badge](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![Badge](https://img.shields.io/badge/React-18.3-cyan?style=for-the-badge&logo=react)
![Badge](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge&logo=node.js)

### 🌌 Fast, Lightweight Music Downloader with Cyberpunk Shadow Aesthetic

*Inspired by "The Eminence in Shadow" anime • Atomic Power Unleashed* ✨

[Live Demo](#demo) • [Features](#features) • [Installation](#installation) • [Tech Stack](#tech-stack) • [Contributing](#contributing)

</div>

---

## 🎭 About

**Atomic MusicDL** is a superfast, lightweight music and video downloader with a stunning cyberpunk design inspired by Shadow's atomic power from "The Eminence in Shadow" anime. Download your favorite tracks and videos in multiple formats with atomic precision.

> *"The power of shadow, amplified by atomic energy"*

---

## ✨ Features

<div align="center">

| Feature | Description |
|---------|-------------|
| 🎵 **MP3 Downloads** | High-quality audio up to 320kbps |
| 🎬 **MP4 Downloads** | Full HD video up to 1080p |
| ⚛️ **Atomic Loader** | Rotating electron orbits with cyberpunk glow |
| 💜 **Purple Cyberpunk Design** | Dark theme inspired by Shadow's aesthetic |
| ⚡ **Lightning Fast** | Minimal animations for maximum performance |
| 🎞️ **Anime Background** | Dynamic video background from "The Eminence in Shadow" |
| 🔍 **YouTube Search** | Direct YouTube music/video search integration |
| 📱 **Fully Responsive** | Works seamlessly on all devices |
| 🌙 **Dark Mode Ready** | Optimized for low-light viewing |
| 🎨 **Shadcn UI Components** | Modern, accessible UI components |

</div>

---

## 🎬 Showcase

### 🌟 Hero Section with Animations

```
┌─────────────────────────────────────┐
│   ⚛️  I AM ATOMIC                   │
│   Shadow Garden Music Downloader    │
│   [S h a d o w   F a l l s]         │
│                                     │
│   ┌──────────────────────────┐      │
│   │ 🔍 Search music...       │      │
│   │              [⚛️ Search] │      │
│   └──────────────────────────┘      │
└─────────────────────────────────────┘

Animations:
✦ Falling text: Each letter drops from top
✦ Atomic glow: Purple pulse effect
✦ Video background: Anime Shadow aesthetic
✦ Mute toggle: Bottom-right corner
```

### ⚛️ Atomic Loader

```
         ↻ Orbit 1 (4s)
        ┌─────┐
       │   ●   │  ← Nucleus (glowing)
        └─────┘
    ⬉ Orbit 2 (6s, reverse)
  ↺ Orbit 3 (8s)

Features:
✦ 3 rotating electron orbits at different speeds
✦ Glowing purple nucleus center
✦ Decreasing opacity by distance
✦ Smooth, continuous rotation
```

### 🎨 Video Cards

```
┌─────────────────────┐
│  [Video Thumbnail]  │
│  Title              │
│  Artist - Duration  │
│                     │
│  [apisyu iframe]    │
│  Format: MP3/MP4    │
│  Quality selector   │
└─────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Modern browser

### Installation

```bash
# Clone the repository
git clone https://github.com/Atomic-tech-Shadow/Atomic-MusicDL.git
cd Atomic-MusicDL

# Install dependencies
npm install

# Start development server
npm run dev

# Production build
npm run build
npm run start
```

**🔗 Local URL:** `http://localhost:5173`

---

## 📋 Usage

### Search & Download

1. **🔍 Search** - Enter artist name, song, or video title
2. **⚛️ Select** - Choose format (MP3/MP4) and quality
3. **⬇️ Download** - Click download or use apisyu directly
4. **✅ Done** - File downloads automatically

### Format Options

#### 🎵 MP3 Audio
- 64kbps - Low quality, small file
- 128kbps - Standard quality
- 192kbps - High quality
- 256kbps - Very high quality
- **320kbps - Maximum quality** ⭐

#### 🎬 MP4 Video
- 240p - Mobile friendly
- 360p - Web streaming
- 480p - HD ready
- 720p - Full HD
- **1080p - Ultra HD** ⭐

---

## 🏗️ Architecture

### Frontend Stack
```
React 18.3 + TypeScript
├── Vite 5.4 (Build tool)
├── Tailwind CSS 3.4 (Styling)
├── Shadcn/ui (Components)
├── TanStack Query 5 (Data fetching)
├── Lucide React (Icons)
└── Wouter 3.3 (Routing)
```

### Backend Stack
```
Node.js + Express
├── TypeScript 5.6
├── ytdl-core (YouTube extraction)
├── yt-search (Search library)
└── Zod (Type validation)
```

### Key Features
- **Full-Stack TypeScript** - Type safety across the stack
- **API Routes** - RESTful endpoints for search & video info
- **Real-time Search** - YouTube integration with caching
- **Direct apisyu Integration** - Embed download iframe directly in cards

---

## 🎨 Design System

### Color Palette
```
Primary (Purple/Violet)     #8B5CF6 (RGB: 270 100% 60%)
Secondary                   #1E1E2E (Dark base)
Accent                      #7C3AED (Brighter purple)
Background                  #1A1A2E (Near black)
Text Foreground             #E0E0FF (Light purple-white)
Atomic Glow                 #A855F7 (Glowing effect)
```

### Typography
- **Headings** - Bold, large, with atomic text-shadow glow
- **Body** - Clean, readable sans-serif
- **Code** - Monospace for technical content

### Animations
```css
/* Atomic pulse on nucleus */
@keyframes atomic-pulse
  0%, 100% -> opacity: 0.6, glow: medium
  50%     -> opacity: 1.0, glow: maximum

/* Electron orbits spin */
@keyframes orbit-spin-1  -> 4s linear infinite
@keyframes orbit-spin-2  -> 6s linear infinite reverse
@keyframes orbit-spin-3  -> 8s linear infinite

/* Falling subtitle text */
@keyframes falling-letter
  0%   -> opacity: 0, translateY(-30px)
  10%  -> opacity: 1, translateY(0)
  90%  -> opacity: 0, translateY(10px)
  100% -> opacity: 0, translateY(-30px)
```

---

## 📁 Project Structure

```
Atomic-MusicDL/
├── client/                    # React frontend
│   ├── public/
│   │   ├── favicon.svg       # Atomic symbol favicon
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── AtomicLoader.tsx      # ⚛️ Loader animation
│   │   │   ├── Hero.tsx              # Main hero section
│   │   │   ├── VideoCard.tsx         # Video result card
│   │   │   └── ui/                   # Shadcn components
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Main page
│   │   │   └── not-found.tsx
│   │   ├── index.css                 # Global animations
│   │   └── main.tsx
│   └── index.html
│
├── server/                    # Express backend
│   ├── index.ts              # Server entry
│   ├── routes.ts             # API routes
│   ├── youtube.ts            # YouTube integration
│   └── vite.ts               # Vite config
│
├── shared/                    # Shared types
│   └── schema.ts             # Zod schemas
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
└── README.md                 # This file!
```

---

## 🔗 API Endpoints

### Search Endpoint
```http
GET /api/youtube/search?q={query}

Response:
{
  "id": "youtube-video-id",
  "title": "Song Title",
  "artist": "Artist Name",
  "duration": "3:45",
  "thumbnail": "url-to-thumbnail",
  "videoId": "video-id",
  "viewCount": 1000000,
  "publishedAt": "2025-01-01T00:00:00Z"
}
```

### Video Info Endpoint
```http
GET /api/youtube/video/{videoId}

Returns video metadata for download options
```

---

## 🛠️ Development

### Commands
```bash
# Development with hot reload
npm run dev

# Type checking
npm run check

# Production build
npm run build

# Build server bundle
npm run build:server

# Start production server
npm start
```

### Environment Setup
```bash
# No env variables needed for basic setup
# Uses public YouTube APIs
```

---

## 🎯 Performance Optimizations

- ⚡ **Minimal CSS animations** - GPU-accelerated transforms only
- 📦 **Small bundle size** - Tree-shaking enabled
- 🎬 **Video background** - Muted by default, toggleable
- 🔍 **Efficient search** - Request caching via TanStack Query
- 📱 **Lazy loading** - Components load on demand
- 🎨 **CSS-in-JS minimized** - Tailwind purging

---

## 🌟 Key Technologies

<div align="center">

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | 18.3 |
| **TypeScript** | Type safety | 5.6 |
| **Vite** | Build tool | 5.4 |
| **Tailwind CSS** | Styling | 3.4 |
| **Express** | Backend server | 4.21 |
| **ytdl-core** | YouTube extraction | 4.16 |
| **Shadcn/ui** | UI components | Latest |
| **TanStack Query** | State management | 5.60 |
| **Zod** | Runtime validation | 3.24 |

</div>

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
# One-click deploy
vercel deploy
```

**Note:** `.vercelignore` is configured to include video files for proper deployment.

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

---

## 🐛 Troubleshooting

### Q: Search not working?
**A:** Check your internet connection and YouTube availability in your region.

### Q: Downloads slow?
**A:** This depends on YouTube's server response. Try a lower quality setting.

### Q: Loader animation choppy?
**A:** Try disabling browser extensions and clearing cache.

### Q: Video background not playing?
**A:** Click the mute button to enable audio, or check browser autoplay policies.

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses
- **React** - MIT
- **Tailwind CSS** - MIT
- **Shadcn/ui** - MIT
- **ytdl-core** - MIT

---

## 👤 Credits

**Dev:** akue alias **Shadow** 🌑

Inspired by:
- "The Eminence in Shadow" anime 🎭
- Atomic power aesthetic ⚛️
- Cyberpunk design trends 💜

---

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use Shadcn components for UI
- Test on dark mode
- Maintain performance (CSS animations only)
- Add `data-testid` attributes to interactive elements

---

## 📞 Support

- 🐛 **Report Issues:** [GitHub Issues](https://github.com/Atomic-tech-Shadow/Atomic-MusicDL/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/Atomic-tech-Shadow/Atomic-MusicDL/discussions)
- 📧 **Contact:** Open an issue with the `[Question]` label

---

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Guide](https://tailwindcss.com/docs)
- [Shadcn/ui Components](https://ui.shadcn.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Express.js Guide](https://expressjs.com)

---

<div align="center">

### ⭐ If you like this project, consider giving it a star! ⭐

**Made with 💜 by Shadow • Powered by ⚛️ Atomic Energy**

```
     ⚛️ I AM ATOMIC
  Searching for music
   with atomic precision
```

</div>

---

<div align="center">

**Last Updated:** November 27, 2025  
**Version:** 1.0.0  
**Status:** ✅ Active Development

</div>
