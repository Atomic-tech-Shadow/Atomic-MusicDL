import SearchBar from "./SearchBar";
import heroImage from "@assets/generated_images/Music_visualization_hero_background_99e4f3ca.png";

interface HeroProps {
  onSearch?: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${heroImage})` }}
        data-testid="img-hero-background"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6" data-testid="text-hero-title">
          Téléchargez Votre Musique Préférée
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          Recherchez et téléchargez n'importe quelle chanson en MP3 haute qualité. Simple, rapide et gratuit.
        </p>
        
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar onSearch={onSearch} />
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/70">
          <span>Essayez:</span>
          <button 
            className="text-white/90 hover:text-white underline hover-elevate px-2 py-1 rounded"
            data-testid="button-example-beethoven"
          >
            Beethoven
          </button>
          <span>•</span>
          <button 
            className="text-white/90 hover:text-white underline hover-elevate px-2 py-1 rounded"
            data-testid="button-example-lofi"
          >
            Lo-fi
          </button>
          <span>•</span>
          <button 
            className="text-white/90 hover:text-white underline hover-elevate px-2 py-1 rounded"
            data-testid="button-example-jazz"
          >
            Jazz
          </button>
        </div>
      </div>
    </div>
  );
}
