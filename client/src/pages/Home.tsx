import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Music, Video, AlertTriangle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import VideoCard from "@/components/VideoCard";
import type { YouTubeSearchResult } from "@shared/schema";

export default function Home() {
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

  const handleSearch = (query: string) => {
    setActiveQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      {!activeQuery && <Hero onSearch={handleSearch} />}

      <main className="container mx-auto px-4 py-12">
        {!activeQuery && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
              <p className="text-muted-foreground text-lg">Simple et rapide en 3 étapes</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 hover-elevate transition-all">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold">Recherchez</h3>
                <p className="text-muted-foreground">Entrez le nom de la vidéo ou collez le lien YouTube</p>
              </div>
              
              <div className="text-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-purple-500/5 to-purple-500/10 border border-purple-500/20 hover-elevate transition-all">
                <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-500">2</span>
                </div>
                <h3 className="text-xl font-semibold">Choisissez la qualité</h3>
                <p className="text-muted-foreground">Sélectionnez MP3 ou MP4 et la qualité souhaitée</p>
              </div>
              
              <div className="text-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-pink-500/5 to-pink-500/10 border border-pink-500/20 hover-elevate transition-all">
                <div className="w-16 h-16 mx-auto rounded-full bg-pink-500/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-pink-500">3</span>
                </div>
                <h3 className="text-xl font-semibold">Téléchargez</h3>
                <p className="text-muted-foreground">Cliquez sur télécharger et profitez de votre fichier</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 to-purple-500/10 border border-primary/20">
                <Music className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-2">Audio MP3</h3>
                <p className="text-muted-foreground mb-4">Convertissez vos vidéos en fichiers audio de haute qualité</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Qualité jusqu'à 320 kbps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <span>Format MP3 compatible</span>
                  </li>
                </ul>
              </div>
              
              <div className="p-8 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <Video className="w-12 h-12 text-purple-500 mb-4" />
                <h3 className="text-2xl font-bold mb-2">Vidéo MP4</h3>
                <p className="text-muted-foreground mb-4">Téléchargez vos vidéos dans différentes résolutions</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <span>Résolution jusqu'à 1080p</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                    <span>Format MP4 universel</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeQuery && (
          <>
            <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-2" data-testid="text-results-title">
                  Résultats pour "{activeQuery}"
                </h2>
                <p className="text-muted-foreground">
                  {results ? `${results.length} résultat(s) trouvé(s)` : 'Recherche en cours...'}
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => setActiveQuery("")}
                data-testid="button-new-search"
              >
                Nouvelle recherche
              </Button>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-primary/20"></div>
                  <Loader2 className="w-20 h-20 absolute inset-0 animate-spin text-primary" data-testid="icon-loading" />
                </div>
                <p className="mt-6 text-lg font-medium">Recherche en cours...</p>
                <p className="text-muted-foreground text-sm">Veuillez patienter</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
                  <AlertTriangle className="w-10 h-10 text-destructive" />
                </div>
                <p className="text-xl font-semibold text-destructive mb-2">Erreur lors de la recherche</p>
                <p className="text-muted-foreground text-sm mb-6">{(error as Error).message}</p>
                <Button 
                  variant="default" 
                  onClick={() => setActiveQuery(activeQuery)}
                  data-testid="button-retry"
                >
                  Réessayer
                </Button>
              </div>
            ) : results && results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {results.map((video, index) => (
                  <div 
                    key={video.id} 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
                  >
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-xl font-semibold mb-2">Aucun résultat trouvé</p>
                <p className="text-muted-foreground">Essayez avec d'autres mots-clés pour "{activeQuery}"</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
