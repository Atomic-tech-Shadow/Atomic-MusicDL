import { useState, useMemo } from "react";
import { Search, Zap, Sparkles, Music, Headphones } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [query, setQuery] = useState("");

  // Memoize particle positions to prevent re-render thrashing
  const particles = useMemo(() => 
    Array.from({ length: 20 }, () => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 3}px`,
      hue: 260 + Math.random() * 90,
      saturation: 70 + Math.random() * 20,
      lightness: 50 + Math.random() * 20,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 8}s`,
      opacity: 0.15 + Math.random() * 0.25,
    }))
  , []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="relative overflow-hidden min-h-[85vh] flex items-center">
      {/* Simplified aurora gradient background - removed heavy blur */}
      <div className="absolute inset-0 bg-mesh"></div>
      
      {/* Reduced to 2 animated orbs instead of 3 for performance */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-accent/15 rounded-full blur-[100px] animate-aurora-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-accent/20 to-destructive/15 rounded-full blur-[120px] animate-aurora-float" style={{ animationDelay: '3s' }}></div>
      
      {/* Light grain overlay - reduced opacity */}
      <div className="absolute inset-0 grain opacity-20"></div>
      
      {/* Optimized floating particles with memoized positions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-aurora-float"
            style={{
              left: particle.left,
              top: particle.top,
              width: particle.size,
              height: particle.size,
              background: `hsl(${particle.hue}, ${particle.saturation}%, ${particle.lightness}%)`,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              opacity: particle.opacity,
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
          
          {/* Search bar - Modern mobile-optimized design */}
          <form 
            onSubmit={handleSubmit} 
            className="max-w-4xl mx-auto animate-fade-in-up animate-delay-200"
          >
            <div className="relative group">
              {/* Dynamic glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-destructive rounded-2xl md:rounded-3xl blur-xl md:blur-2xl opacity-20 group-hover:opacity-40 group-focus-within:opacity-50 transition-opacity duration-700"></div>
              
              <div className="relative flex gap-2 md:gap-3 p-2 md:p-3 glass-strong grain rounded-2xl md:rounded-3xl shadow-2xl border border-white/20">
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3 md:left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-muted-foreground transition-colors group-focus-within:text-primary pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="Nom de chanson, artiste..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-11 md:pl-14 pr-3 h-12 md:h-20 text-sm md:text-xl border-0 focus-visible:ring-0 bg-transparent font-semibold placeholder:text-muted-foreground/60 placeholder:font-normal truncate"
                    data-testid="input-hero-search"
                  />
                </div>
                
                {/* Mobile: Icon only button | Desktop: Full button with text */}
                <Button 
                  type="submit" 
                  size="icon"
                  className="h-12 w-12 md:h-20 md:w-auto md:px-14 font-black text-base md:text-xl shadow-xl relative overflow-hidden group/btn shrink-0"
                  data-testid="button-hero-search"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover/btn:opacity-30 transition-opacity duration-500 bg-[length:200%_100%]"></div>
                  
                  {/* Mobile view: Only Zap icon */}
                  <Zap className="w-5 h-5 md:hidden" />
                  
                  {/* Desktop view: Full content */}
                  <span className="hidden md:flex items-center">
                    <Zap className="w-6 h-6 mr-3" />
                    Rechercher
                    <Sparkles className="w-6 h-6 ml-3 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                  </span>
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
