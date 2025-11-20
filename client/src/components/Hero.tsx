import { useState } from "react";
import { Search, Sparkles } from "lucide-react";
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
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Le meilleur convertisseur YouTube</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight animate-fade-in-up-delay">
            Téléchargez vos vidéos
            <span className="block mt-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              YouTube en MP3 ou MP4
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up-delay" style={{ animationDelay: '0.2s' }}>
            Convertissez et téléchargez vos vidéos YouTube préférées en haute qualité.
            Rapide, gratuit et sans inscription.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto animate-fade-in-up-delay" style={{ animationDelay: '0.4s' }}>
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative flex gap-2 p-2 bg-background/80 backdrop-blur-sm border border-border rounded-xl shadow-lg">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Recherchez une vidéo YouTube ou collez un lien..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-12 h-12 md:h-14 text-base border-0 focus-visible:ring-0 bg-transparent"
                    data-testid="input-hero-search"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  className="h-12 md:h-14 px-6 md:px-8 font-semibold"
                  data-testid="button-hero-search"
                >
                  Rechercher
                </Button>
              </div>
            </div>
          </form>
          
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in-up-delay" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              <span>Gratuit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <span>Haute qualité</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <span>Sans limite</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
    </div>
  );
}
