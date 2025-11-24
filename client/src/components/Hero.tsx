import { useState } from "react";
import { Search, Zap, Sparkles, Music, Headphones } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Aurora mesh gradient background */}
      <div className="absolute inset-0 bg-mesh"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/30 to-accent/20 rounded-full blur-[140px] animate-aurora-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-accent/25 to-destructive/20 rounded-full blur-[160px] animate-aurora-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-destructive/20 to-primary/15 rounded-full blur-[120px] animate-aurora-float" style={{ animationDelay: '4s' }}></div>
      
      {/* Grain texture overlay */}
      <div className="absolute inset-0 grain opacity-40"></div>
      
      {/* Floating particles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-aurora-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: `hsl(${260 + Math.random() * 100}, 85%, ${50 + Math.random() * 20}%)`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 10}s`,
              opacity: 0.2 + Math.random() * 0.4,
            }}
          ></div>
        ))}
      </div>
      
      <div className="relative container mx-auto px-4 py-32 md:py-40 z-10">
        <div className="max-w-6xl mx-auto text-center space-y-10">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full glass-strong grain animate-scale-in shadow-xl"
            data-testid="badge-atomic-power"
          >
            <Zap className="w-5 h-5 text-primary animate-glow-pulse" data-testid="icon-zap" />
            <span className="text-sm font-black text-gradient tracking-wider" data-testid="text-badge-label">
              ATOMIC MUSIC DOWNLOADER
            </span>
            <Sparkles className="w-5 h-5 text-accent animate-glow-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Main title */}
          <h1 
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight animate-fade-in-up" 
            data-testid="text-hero-title"
          >
            <span className="block mb-4 text-foreground">La</span>
            <span className="block text-gradient text-glow leading-tight">
              PUISSANCE
            </span>
            <span className="block mt-4 text-foreground">Atomique</span>
          </h1>
          
          {/* Subtitle */}
          <p 
            className="text-xl md:text-3xl text-muted-foreground max-w-4xl mx-auto animate-fade-in-up animate-delay-100 font-medium leading-relaxed" 
            data-testid="text-hero-subtitle"
          >
            Téléchargez vos musiques préférées en{" "}
            <span className="text-primary font-bold">MP3</span> ou{" "}
            <span className="text-accent font-bold">MP4</span>
            <span className="block mt-3 text-lg md:text-xl opacity-80">
              Qualité maximale • Vitesse fulgurante • Simplicité absolue
            </span>
          </p>
          
          {/* Search bar */}
          <form 
            onSubmit={handleSubmit} 
            className="max-w-4xl mx-auto animate-fade-in-up animate-delay-200"
          >
            <div className="relative group">
              {/* Glow effect behind search bar */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-destructive rounded-3xl blur-3xl opacity-30 group-hover:opacity-60 group-focus-within:opacity-70 transition-all duration-700 animate-glow-pulse"></div>
              
              <div className="relative flex gap-3 p-3 glass-strong grain rounded-3xl shadow-2xl border border-white/20">
                <div className="relative flex-1">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-muted-foreground transition-colors group-focus-within:text-primary" />
                  <Input
                    type="text"
                    placeholder="Entrez le nom d'une chanson, artiste ou album..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-14 h-16 md:h-20 text-base md:text-xl border-0 focus-visible:ring-0 bg-transparent font-semibold placeholder:text-muted-foreground/60 placeholder:font-normal"
                    data-testid="input-hero-search"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  className="h-16 md:h-20 px-10 md:px-14 font-black text-base md:text-xl shadow-xl relative overflow-hidden group/btn"
                  data-testid="button-hero-search"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer"></div>
                  <Zap className="w-6 h-6 mr-3" />
                  Rechercher
                  <Sparkles className="w-6 h-6 ml-3 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                </Button>
              </div>
            </div>
          </form>
          
          {/* Features */}
          <div 
            className="flex items-center justify-center gap-8 md:gap-16 text-sm md:text-base text-muted-foreground animate-fade-in-up animate-delay-300 flex-wrap" 
          >
            <div className="flex items-center gap-3 glass-strong px-5 py-3 rounded-full grain" data-testid="feature-unlimited">
              <div className="w-3 h-3 rounded-full bg-primary animate-glow-pulse shadow-lg shadow-primary/50"></div>
              <Music className="w-5 h-5 text-primary" />
              <span className="font-bold">Illimité</span>
            </div>
            <div className="flex items-center gap-3 glass-strong px-5 py-3 rounded-full grain" data-testid="feature-quality">
              <div className="w-3 h-3 rounded-full bg-accent animate-glow-pulse shadow-lg shadow-accent/50" style={{ animationDelay: '0.5s' }}></div>
              <Sparkles className="w-5 h-5 text-accent" />
              <span className="font-bold">Haute Qualité</span>
            </div>
            <div className="flex items-center gap-3 glass-strong px-5 py-3 rounded-full grain" data-testid="feature-speed">
              <div className="w-3 h-3 rounded-full bg-destructive animate-glow-pulse shadow-lg shadow-destructive/50" style={{ animationDelay: '1s' }}></div>
              <Headphones className="w-5 h-5 text-destructive" />
              <span className="font-bold">Ultra Rapide</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
    </div>
  );
}
