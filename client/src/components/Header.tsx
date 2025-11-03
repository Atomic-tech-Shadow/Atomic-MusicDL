import { Zap, Music } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/20 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/50 blur-xl rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-primary to-primary/60 p-2.5 rounded-xl shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-all duration-300 group-hover:scale-110">
              <Zap className="w-5 h-5 text-primary-foreground" data-testid="icon-logo" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold font-heading bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent" data-testid="text-logo">
              Atomic MusicDL
            </span>
            <span className="text-xs text-muted-foreground/70 font-medium">
              Téléchargement Haute Qualité
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <Music className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">
              Prêt à télécharger
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
