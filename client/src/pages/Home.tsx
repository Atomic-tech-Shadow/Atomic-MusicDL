import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Music, Video, AlertTriangle, Search, Zap, Sparkles, Download, Headphones, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero from "@/components/Hero";
import VideoCard from "@/components/VideoCard";
import type { YouTubeSearchResult } from "@shared/schema";
import videoBackground from "@assets/From KlickPin CF ✦┊SHADOW [Video] in 2025 _ Cool anime backgrounds Anime shadow Anime wallpaper_1764001019345.mp4";

export default function Home() {
  const [activeQuery, setActiveQuery] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      {/* Video Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          data-testid="video-background"
        >
          <source src={videoBackground} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Mute/Unmute Button */}
      <Button
        onClick={toggleMute}
        size="icon"
        variant="outline"
        className="fixed bottom-6 right-6 z-50 glass-strong border-white/20 hover:border-white/40"
        data-testid="button-toggle-mute"
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" data-testid="icon-muted" />
        ) : (
          <Volume2 className="w-5 h-5" data-testid="icon-unmuted" />
        )}
      </Button>
      
      <Hero onSearch={handleSearch} />

      <main className="container mx-auto px-4 py-12 relative z-10">
        {!activeQuery && (
          <div className="max-w-7xl mx-auto">
            {/* How it works section - Bento Grid */}
            <div className="text-center mb-20">
              <h2 
                className="text-4xl md:text-6xl font-black mb-6 text-gradient" 
                data-testid="text-how-it-works-title"
              >
                Simple & Puissant
              </h2>
              <p 
                className="text-muted-foreground text-lg md:text-2xl font-medium max-w-3xl mx-auto" 
                data-testid="text-how-it-works-subtitle"
              >
                Trois étapes pour libérer la puissance atomique
              </p>
            </div>
            
            {/* Steps - Bento Grid Layout */}
            <div className="grid md:grid-cols-3 gap-6 mb-24">
              {[
                {
                  number: 1,
                  title: "Recherche",
                  desc: "Trouvez n'importe quelle musique instantanément",
                  icon: Search,
                  gradient: "from-primary to-accent",
                  testId: "card-step-1"
                },
                {
                  number: 2,
                  title: "Sélection",
                  desc: "Choisissez le format et la qualité parfaits",
                  icon: Sparkles,
                  gradient: "from-accent to-destructive",
                  testId: "card-step-2"
                },
                {
                  number: 3,
                  title: "Téléchargement",
                  desc: "Obtenez votre musique en un clic",
                  icon: Download,
                  gradient: "from-destructive to-primary",
                  testId: "card-step-3"
                }
              ].map((step, index) => (
                <div 
                  key={step.number}
                  className="relative group"
                  data-testid={step.testId}
                >
                  {/* Multi-layered 3D glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-2xl blur-2xl opacity-20`}></div>
                  
                  <div className="relative glass-strong grain p-8 rounded-2xl border border-white/10"
                    style={{
                      boxShadow: '0 10px 40px -8px rgba(124, 58, 237, 0.2), 0 5px 20px -4px rgba(168, 85, 247, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {/* 3D Bevel effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 via-transparent to-black/5 pointer-events-none"></div>
                    
                    <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center cursor-pointer`}
                      style={{
                        boxShadow: '0 8px 25px -5px rgba(124, 58, 237, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      <step.icon className="w-10 h-10 text-white drop-shadow-lg" />
                    </div>
                    <div className="text-center space-y-3">
                      <div className="text-5xl font-black text-gradient mb-4" data-testid={`text-step-number-${step.number}`}>
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-black" data-testid={`text-step-title-${step.number}`}>
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground font-medium" data-testid={`text-step-desc-${step.number}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Formats section - Bento Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {/* MP3 Card - 3D Enhanced */}
              <div className="relative group" data-testid="card-format-mp3">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-3xl opacity-30"></div>
                <div className="relative glass-strong grain p-10 rounded-3xl border border-white/10"
                  style={{
                    boxShadow: '0 15px 50px -10px rgba(124, 58, 237, 0.3), 0 8px 25px -5px rgba(168, 85, 247, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-2xl cursor-pointer"
                    >
                      <Music className="w-10 h-10 text-white drop-shadow-lg" data-testid="icon-mp3" />
                    </div>
                    <h3 className="text-4xl font-black text-gradient" data-testid="text-format-title-mp3">
                      Audio MP3
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-8 text-xl font-medium" data-testid="text-format-desc-mp3">
                    Extraction audio pure et cristalline
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: Zap, text: "Qualité jusqu'à 320 kbps" },
                      { icon: Sparkles, text: "Format universel compatible" },
                      { icon: Headphones, text: "Audio optimisé pour tous appareils" }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 glass px-4 py-3 rounded-xl" data-testid={`text-feature-mp3-${i}`}>
                        <feature.icon className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="font-semibold">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* MP4 Card - 3D Enhanced */}
              <div className="relative group" data-testid="card-format-mp4">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-destructive/30 rounded-3xl blur-3xl opacity-30"></div>
                <div className="relative glass-strong grain p-10 rounded-3xl border border-white/10"
                  style={{
                    boxShadow: '0 15px 50px -10px rgba(168, 85, 247, 0.3), 0 8px 25px -5px rgba(239, 68, 68, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <div className="flex items-center gap-5 mb-8">
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-accent to-destructive shadow-2xl cursor-pointer"
                    >
                      <Video className="w-10 h-10 text-white drop-shadow-lg" data-testid="icon-mp4" />
                    </div>
                    <h3 className="text-4xl font-black text-gradient" data-testid="text-format-title-mp4">
                      Vidéo MP4
                    </h3>
                  </div>
                  <p className="text-muted-foreground mb-8 text-xl font-medium" data-testid="text-format-desc-mp4">
                    Expérience audiovisuelle complète
                  </p>
                  <div className="space-y-4">
                    {[
                      { icon: Zap, text: "Résolution jusqu'à 1080p HD" },
                      { icon: Sparkles, text: "Format MP4 universel" },
                      { icon: Video, text: "Qualité vidéo maximale" }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center gap-4 glass px-4 py-3 rounded-xl" data-testid={`text-feature-mp4-${i}`}>
                        <feature.icon className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="font-semibold">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeQuery && (
          <>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-32" data-testid="container-loading-state">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full glass-strong"></div>
                  <Loader2 className="w-32 h-32 absolute inset-0 animate-spin text-primary" data-testid="icon-loading" />
                  <div className="absolute inset-0 w-32 h-32 rounded-full bg-primary/30 blur-3xl"></div>
                </div>
                <p className="mt-10 text-3xl font-black text-gradient" data-testid="text-loading-title">
                  Recherche en cours...
                </p>
                <p className="text-muted-foreground text-lg mt-4 font-medium" data-testid="text-loading-subtitle">
                  Analyse des résultats
                </p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-32" data-testid="container-error-state">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-destructive/20 flex items-center justify-center glass-strong mb-8">
                    <AlertTriangle className="w-16 h-16 text-destructive" data-testid="icon-error" />
                  </div>
                  <div className="absolute inset-0 w-32 h-32 rounded-full bg-destructive/30 blur-3xl"></div>
                </div>
                <p className="text-3xl font-black text-destructive mb-4" data-testid="text-error-title">
                  Erreur détectée
                </p>
                <p className="text-muted-foreground text-lg mb-10" data-testid="text-error-message">
                  {(error as Error).message}
                </p>
                <Button 
                  size="lg"
                  onClick={() => setActiveQuery(activeQuery)}
                  data-testid="button-retry"
                  className="font-bold"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Réessayer
                </Button>
              </div>
            ) : results && results.length > 0 ? (
              <div className="bento-grid" data-testid="container-results-grid">
                {results.map((video, index) => (
                  <div 
                    key={video.id}
                  >
                    <VideoCard video={video} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32" data-testid="container-empty-state">
                <div className="w-32 h-32 rounded-full glass-strong flex items-center justify-center mb-8">
                  <Search className="w-16 h-16 text-muted-foreground" data-testid="icon-no-results" />
                </div>
                <p className="text-3xl font-black mb-4" data-testid="text-no-results-title">
                  Aucun résultat
                </p>
                <p className="text-muted-foreground text-lg" data-testid="text-no-results-subtitle">
                  Essayez avec d'autres termes de recherche
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
