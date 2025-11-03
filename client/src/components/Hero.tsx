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
        <div className="mb-4">
          <span className="text-sm md:text-base font-bold text-primary tracking-wider uppercase animate-pulse" data-testid="text-hero-tagline">
            ⚡ I AM ATOMIC ⚡
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold font-heading text-white mb-6" data-testid="text-hero-title">
          Atomic MusicDL
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto" data-testid="text-hero-subtitle">
          Téléchargez vos OST d'anime et musiques préférées en MP3 haute qualité. Le pouvoir atomique du téléchargement de musique.
        </p>
        
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar onSearch={onSearch} />
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/70">
          <span>Essayez:</span>
          <button 
            onClick={() => onSearch?.("Eminence in Shadow OST")}
            className="text-white/90 hover:text-white underline hover-elevate px-2 py-1 rounded"
            data-testid="button-example-eminence-in-shadow"
          >
            Eminence in Shadow OST
          </button>
          <span>•</span>
          <button 
            onClick={() => onSearch?.("J-pop")}
            className="text-white/90 hover:text-white underline hover-elevate px-2 py-1 rounded"
            data-testid="button-example-jpop"
          >
            J-pop
          </button>
          <span>•</span>
          <button 
            onClick={() => onSearch?.("Anime Opening")}
            className="text-white/90 hover:text-white underline hover-elevate px-2 py-1 rounded"
            data-testid="button-example-anime-op"
          >
            Anime Opening
          </button>
          <span>•</span>
          <button 
            onClick={() => onSearch?.("Vocaloid")}
            className="text-white/90 hover:text-white underline hover-elevate px-2 py-1 rounded"
            data-testid="button-example-vocaloid"
          >
            Vocaloid
          </button>
        </div>
      </div>
    </div>
  );
}
