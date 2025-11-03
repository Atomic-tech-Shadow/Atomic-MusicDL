import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MusicCard from "@/components/MusicCard";
import { Loader2 } from "lucide-react";
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
    <div className="min-h-screen relative">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover -z-10"
        data-testid="video-background"
      >
        <source src="/attached_assets/PinDown.io_@Azizology_1762201393_1762202048928.mp4" type="video/mp4" />
      </video>
      
      <Header />
      
      <main className="pt-16">
        <Hero onSearch={handleSearch} />
        
        {activeQuery && (
          <section className="py-16 bg-background/90 backdrop-blur-sm">
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
      </main>
    </div>
  );
}
