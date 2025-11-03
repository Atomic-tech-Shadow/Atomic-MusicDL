import { Zap, Music } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer transform hover:scale-105 transition-all duration-500">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/50 blur-2xl rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-primary via-primary/80 to-primary/60 p-3 rounded-xl shadow-2xl shadow-primary/40 group-hover:shadow-primary/60 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110 animate-pulse">
              <Zap className="w-5 h-5 text-primary-foreground" data-testid="icon-logo" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-heading bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent animate-pulse" data-testid="text-logo">
              Atomic MusicDL
            </span>
            <span className="text-xs text-white/60 font-medium">
              Téléchargement Haute Qualité
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 cursor-pointer group">
            <Music className="w-4 h-4 text-primary group-hover:animate-pulse" />
            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
              Prêt à télécharger
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
