import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import VideoCard from "@/components/VideoCard";
import type { YouTubeSearchResult } from "@shared/schema";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  const { data: results, isLoading, error } = useQuery<YouTubeSearchResult[]>({
    queryKey: ['/api/youtube/search', activeQuery],
    queryFn: async () => {
      const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(activeQuery)}`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Erreur de recherche' }));
        const error: any = new Error(errorData.message || 'Erreur de recherche');
        error.status = res.status;
        throw error;
      }
      return res.json();
    },
    enabled: !!activeQuery,
    retry: (failureCount, error: any) => {
      if (error?.status && error.status >= 400 && error.status < 500) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: 1000,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveQuery(searchQuery.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-primary" data-testid="text-app-title">
              YouTube Downloader
            </h1>
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Rechercher une vidéo YouTube..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    data-testid="input-search"
                  />
                </div>
                <Button type="submit" data-testid="button-search">
                  Rechercher
                </Button>
              </div>
            </form>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {!activeQuery && (
          <div className="flex flex-col items-center justify-center py-20">
            <Search className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Recherchez des vidéos YouTube</h2>
            <p className="text-muted-foreground text-center max-w-md">
              Utilisez la barre de recherche pour trouver des vidéos YouTube et les télécharger en MP3 ou MP4
            </p>
          </div>
        )}

        {activeQuery && (
          <>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-2" data-testid="text-results-title">
                Résultats pour "{activeQuery}"
              </h2>
              <p className="text-muted-foreground">
                {results ? `${results.length} résultat(s) trouvé(s)` : 'Recherche en cours...'}
              </p>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" data-testid="icon-loading" />
                <span className="ml-3 text-muted-foreground">Recherche en cours...</span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-destructive mb-2">Erreur lors de la recherche</p>
                <p className="text-muted-foreground text-sm">{(error as Error).message}</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setActiveQuery(searchQuery)}
                  data-testid="button-retry"
                >
                  Réessayer
                </Button>
              </div>
            ) : results && results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-muted-foreground">Aucun résultat trouvé pour "{activeQuery}"</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
