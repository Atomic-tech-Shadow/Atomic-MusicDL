import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Music, Video, AlertTriangle, Search, Zap } from "lucide-react";
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
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-primary via-purple-500 to-destructive bg-clip-text text-transparent">
                Le Pouvoir en 3 Étapes
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl font-light">Déchaînez la puissance du téléchargement</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative text-center space-y-4 p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-primary/30 hover-elevate transition-all">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shadow-xl shadow-primary/50">
                    <span className="text-3xl font-black text-primary-foreground">1</span>
                  </div>
                  <h3 className="text-2xl font-bold">Recherche</h3>
                  <p className="text-muted-foreground">Trouvez votre cible avec précision absolue</p>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative text-center space-y-4 p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-purple-500/30 hover-elevate transition-all">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/50">
                    <span className="text-3xl font-black text-white">2</span>
                  </div>
                  <h3 className="text-2xl font-bold">Sélection</h3>
                  <p className="text-muted-foreground">Choisissez le format qui libère votre pouvoir</p>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-destructive/5 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                <div className="relative text-center space-y-4 p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-destructive/30 hover-elevate transition-all">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-500 to-destructive flex items-center justify-center shadow-xl shadow-destructive/50">
                    <span className="text-3xl font-black text-white">3</span>
                  </div>
                  <h3 className="text-2xl font-bold">Atomic</h3>
                  <p className="text-muted-foreground">Déclenchez le téléchargement instantané</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-2xl blur-2xl opacity-40"></div>
                <div className="relative p-10 rounded-2xl bg-card/60 backdrop-blur-sm border border-primary/30 hover-elevate transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-purple-500 shadow-lg shadow-primary/50">
                      <Music className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-3xl font-black bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Audio MP3</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 text-lg">Extrayez l'essence pure du son</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>Qualité cristalline jusqu'à 320 kbps</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-primary" />
                      <span>Format universel MP3</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-destructive/30 rounded-2xl blur-2xl opacity-40"></div>
                <div className="relative p-10 rounded-2xl bg-card/60 backdrop-blur-sm border border-purple-500/30 hover-elevate transition-all">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-destructive shadow-lg shadow-purple-500/50">
                      <Video className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black bg-gradient-to-r from-purple-500 to-destructive bg-clip-text text-transparent">Vidéo MP4</h3>
                  </div>
                  <p className="text-muted-foreground mb-6 text-lg">Capturez la réalité dans sa splendeur</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span>Résolution maximale jusqu'à 1080p</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span>Format compatible MP4</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeQuery && (
          <>
            <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-black mb-2 bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent" data-testid="text-results-title">
                  Résultats pour "{activeQuery}"
                </h2>
                <p className="text-muted-foreground font-medium">
                  {results ? `${results.length} cible(s) détectée(s)` : 'Analyse en cours...'}
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => setActiveQuery("")}
                data-testid="button-new-search"
                className="font-bold"
              >
                <Zap className="w-4 h-4 mr-2" />
                Nouvelle recherche
              </Button>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-primary/20"></div>
                  <Loader2 className="w-24 h-24 absolute inset-0 animate-spin text-primary" data-testid="icon-loading" />
                  <div className="absolute inset-0 w-24 h-24 rounded-full bg-primary/20 blur-xl animate-atomic-pulse"></div>
                </div>
                <p className="mt-8 text-xl font-black bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">Activation du pouvoir...</p>
                <p className="text-muted-foreground text-sm mt-2">Analyse des cibles en cours</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-destructive/20 flex items-center justify-center mb-6">
                    <AlertTriangle className="w-12 h-12 text-destructive" />
                  </div>
                  <div className="absolute inset-0 w-24 h-24 rounded-full bg-destructive/30 blur-2xl animate-atomic-pulse"></div>
                </div>
                <p className="text-2xl font-black text-destructive mb-2">Erreur détectée</p>
                <p className="text-muted-foreground text-sm mb-8">{(error as Error).message}</p>
                <Button 
                  variant="default" 
                  onClick={() => setActiveQuery(activeQuery)}
                  data-testid="button-retry"
                  className="font-bold"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Réactiver
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
                <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Search className="w-12 h-12 text-muted-foreground" />
                </div>
                <p className="text-xl font-bold mb-2">Aucune cible trouvée</p>
                <p className="text-muted-foreground">Ajustez vos paramètres de recherche pour "{activeQuery}"</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
