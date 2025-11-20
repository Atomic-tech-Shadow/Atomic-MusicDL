import { useState } from "react";
import { Search, Zap } from "lucide-react";
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
    <div className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background min-h-[70vh] flex items-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-atomic-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-destructive/15 rounded-full blur-[140px] animate-atomic-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="absolute top-0 left-0 w-full h-full">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-atomic-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.3 + Math.random() * 0.3,
            }}
          ></div>
        ))}
      </div>
      
      <div className="relative container mx-auto px-4 py-24 md:py-32 z-10">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 animate-fade-in-up backdrop-blur-sm">
            <Zap className="w-4 h-4 text-primary animate-cyber-glow" />
            <span className="text-sm font-bold text-primary tracking-wide">ATOMIC POWER</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight animate-fade-in-up-delay">
            <span className="block mb-3 text-foreground">I AM</span>
            <span className="block bg-gradient-to-r from-primary via-purple-500 to-destructive bg-clip-text text-transparent animate-cyber-glow">
              ATOMIC
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-up-delay font-light" style={{ animationDelay: '0.2s' }}>
            Libérez la puissance ultime du téléchargement.
            <span className="block mt-2 text-base md:text-lg">
              Recherchez et téléchargez vos vidéos YouTube en MP3 ou MP4
            </span>
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-3xl mx-auto animate-fade-in-up-delay" style={{ animationDelay: '0.4s' }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-500 to-destructive rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
              <div className="relative flex gap-2 p-2 bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Entrez votre recherche ou collez un lien YouTube..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-12 h-14 md:h-16 text-base md:text-lg border-0 focus-visible:ring-0 bg-transparent font-medium"
                    data-testid="input-hero-search"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  className="h-14 md:h-16 px-8 md:px-12 font-bold text-base md:text-lg shadow-lg shadow-primary/50"
                  data-testid="button-hero-search"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Activer
                </Button>
              </div>
            </div>
          </form>
          
          <div className="flex items-center justify-center gap-12 text-sm text-muted-foreground animate-fade-in-up-delay flex-wrap" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-atomic-pulse shadow-lg shadow-primary/50"></div>
              <span className="font-medium">Puissance illimitée</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-atomic-pulse shadow-lg shadow-purple-500/50" style={{ animationDelay: '0.3s' }}></div>
              <span className="font-medium">Qualité maximale</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-destructive animate-atomic-pulse shadow-lg shadow-destructive/50" style={{ animationDelay: '0.6s' }}></div>
              <span className="font-medium">Vitesse fulgurante</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
    </div>
  );
}
