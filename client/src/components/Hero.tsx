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
    <div className="relative overflow-hidden flex items-center border-b border-border/50">
      {/* Simplified aurora gradient background */}
      <div className="absolute inset-0 bg-mesh opacity-30"></div>
      
      {/* Single subtle orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-gradient-to-br from-primary/15 to-accent/10 rounded-full blur-[80px]"></div>
      
      {/* Light grain overlay */}
      <div className="absolute inset-0 grain opacity-10"></div>
      
      <div className="relative container mx-auto px-4 py-8 md:py-12 z-10">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          {/* Compact title */}
          <h1 
            className="text-3xl md:text-5xl font-black tracking-tight" 
            data-testid="text-hero-title"
          >
            <span className="text-gradient">Atomic Music</span>
            <span className="text-muted-foreground mx-2">•</span>
            <span className="text-foreground">Téléchargeur</span>
          </h1>
          
          {/* Compact Search bar */}
          <form 
            onSubmit={handleSubmit} 
            className="max-w-3xl mx-auto"
          >
            <div className="relative group">
              <div className="relative flex gap-2 p-2 glass-strong rounded-xl border border-white/10">
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="text"
                    placeholder="Rechercher une musique..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-3 h-10 text-sm border-0 focus-visible:ring-0 bg-transparent font-medium placeholder:text-muted-foreground/60 truncate"
                    data-testid="input-hero-search"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="sm"
                  className="font-bold shrink-0"
                  data-testid="button-hero-search"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Rechercher</span>
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
