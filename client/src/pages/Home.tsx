import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MusicCard from "@/components/MusicCard";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import { Music2, Loader2 } from "lucide-react";
import type { YouTubeSearchResult } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  const { data: results, isLoading } = useQuery<YouTubeSearchResult[]>({
    queryKey: ['/api/search', activeQuery],
    enabled: !!activeQuery,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveQuery(query);
  };

  const handleDownload = (videoId: string) => {
    const downloadUrl = `/api/download/${videoId}`;
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-16">
        <Hero onSearch={handleSearch} />
        
        {activeQuery && (
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold font-heading mb-8" data-testid="text-results-title">
                Résultats pour "{searchQuery}"
              </h2>
              
              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" data-testid="icon-loading" />
                  <span className="ml-3 text-muted-foreground">Recherche en cours...</span>
                </div>
              ) : results && results.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {results.map((result) => (
                    <MusicCard
                      key={result.id}
                      id={result.videoId}
                      title={result.title}
                      artist={result.artist}
                      duration={result.duration}
                      thumbnail={result.thumbnail}
                      onDownload={handleDownload}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground">Aucun résultat trouvé pour "{searchQuery}"</p>
                </div>
              )}
            </div>
          </section>
        )}
        
        {!activeQuery && (
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
