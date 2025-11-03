import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MusicCard from "@/components/MusicCard";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { Music2 } from "lucide-react";

//todo: remove mock functionality
const mockResults = [
  {
    id: "1",
    title: "Clair de Lune - Suite Bergamasque",
    artist: "Claude Debussy",
    duration: "4:32",
    thumbnail: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=225&fit=crop"
  },
  {
    id: "2",
    title: "Moonlight Sonata",
    artist: "Ludwig van Beethoven",
    duration: "5:28",
    thumbnail: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=400&h=225&fit=crop"
  },
  {
    id: "3",
    title: "The Four Seasons - Spring",
    artist: "Antonio Vivaldi",
    duration: "3:15",
    thumbnail: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=225&fit=crop"
  },
  {
    id: "4",
    title: "Canon in D Major",
    artist: "Johann Pachelbel",
    duration: "4:01",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=225&fit=crop"
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    setSearchQuery(query);
    setShowResults(true);
  };

  const handleDownload = (id: string) => {
    console.log('Download initiated for ID:', id);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        <Hero onSearch={handleSearch} />
        
        {showResults && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold font-heading mb-8" data-testid="text-results-title">
                Résultats pour "{searchQuery}"
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {mockResults.map((result) => (
                  <MusicCard
                    key={result.id}
                    {...result}
                    onDownload={handleDownload}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
        
        {!showResults && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 text-center">
              <Music2 className="w-24 h-24 mx-auto mb-6 text-muted-foreground/40" data-testid="icon-empty-state" />
              <h3 className="text-2xl font-bold font-heading mb-3" data-testid="text-empty-title">
                Commencez Votre Recherche
              </h3>
              <p className="text-muted-foreground mb-6" data-testid="text-empty-desc">
                Entrez le nom d'une chanson pour trouver et télécharger de la musique
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="text-sm text-muted-foreground">Suggestions:</span>
                {["Beethoven", "Lo-fi", "Jazz", "Classical"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSearch(suggestion)}
                    className="px-4 py-2 rounded-full bg-muted hover-elevate active-elevate-2 text-sm font-medium"
                    data-testid={`button-suggestion-${suggestion.toLowerCase()}`}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}
        
        <FeaturesSection />
        <HowItWorks />
      </main>
      
      <Footer />
    </div>
  );
}
