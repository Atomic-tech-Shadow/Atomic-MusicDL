import { Zap } from "lucide-react";
import SearchBar from "./SearchBar";
import TypewriterText from "./TypewriterText";
import videoFile from "@assets/PinDown.io_@Azizology_1762201393_1762202048928.mp4";

interface HeroProps {
  onSearch?: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        data-testid="video-hero-background"
      >
        <source src={videoFile} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-background/60" />
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Zap className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm md:text-base font-bold text-primary tracking-wider uppercase animate-pulse" data-testid="text-hero-tagline">
            I AM ATOMIC
          </span>
          <Zap className="w-4 h-4 text-primary animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 animate-fade-in-up" data-testid="text-hero-title">
          <span className="inline-block animate-bounce-slow bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
            Atomic MusicDL
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-medium min-h-[120px]" data-testid="text-hero-subtitle">
          <TypewriterText 
            text="Téléchargez vos OST d'anime et musiques préférées en MP3 haute qualité."
            speed={5}
            delay={300}
            className="inline-block text-primary"
            loop={true}
          />
          <span className="block mt-2 font-bold">
            <TypewriterText 
              text="Le pouvoir atomique du téléchargement de musique."
              speed={5}
              delay={800}
              className="inline-block text-primary"
              loop={true}
            />
          </span>
        </p>
        
        <div className="max-w-2xl mx-auto mb-8">
          <SearchBar onSearch={onSearch} />
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-white/70">
          <span className="text-white/60 font-medium">Essayez:</span>
          <button 
            onClick={() => onSearch?.("Eminence in Shadow OST")}
            className="text-white/90 hover:text-white underline px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30"
            data-testid="button-example-eminence-in-shadow"
          >
            Eminence in Shadow OST
          </button>
          <span className="text-white/30">•</span>
          <button 
            onClick={() => onSearch?.("J-pop")}
            className="text-white/90 hover:text-white underline px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30"
            data-testid="button-example-jpop"
          >
            J-pop
          </button>
          <span className="text-white/30">•</span>
          <button 
            onClick={() => onSearch?.("Anime Opening")}
            className="text-white/90 hover:text-white underline px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30"
            data-testid="button-example-anime-op"
          >
            Anime Opening
          </button>
          <span className="text-white/30">•</span>
          <button 
            onClick={() => onSearch?.("Vocaloid")}
            className="text-white/90 hover:text-white underline px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30"
            data-testid="button-example-vocaloid"
          >
            Vocaloid
          </button>
        </div>
      </div>
    </div>
  );
}
