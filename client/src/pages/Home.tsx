import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertTriangle, Search, Atom, Music, Film, Download, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Hero from "@/components/Hero";
import VideoCard from "@/components/VideoCard";
import AtomicLoader from "@/components/AtomicLoader";
import type { YouTubeSearchResult } from "@shared/schema";
import videoBackground from "@assets/From KlickPin CF ✦┊SHADOW [Video] in 2025 _ Cool anime backgrounds Anime shadow Anime wallpaper_1764257762396.mp4";

export default function Home() {
  const [activeQuery, setActiveQuery] = useState("");
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const { data: results, isLoading, error } = useQuery<YouTubeSearchResult[]>({
    queryKey: ['/api/youtube/search', activeQuery],
    queryFn: async () => {
      const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(activeQuery)}`);
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Search error' }));
        const error: any = new Error(errorData.message || 'Search error');
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
    <div className="min-h-screen bg-background relative">
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
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Button
        onClick={toggleMute}
        size="icon"
        variant="outline"
        className="fixed bottom-6 right-6 z-50 bg-black/50 border-primary/30"
        data-testid="button-toggle-mute"
      >
        {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </Button>

      <div className="relative z-10">
        <Hero onSearch={handleSearch} />

        <main className="container mx-auto px-4 py-12">
          {!activeQuery && (
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold atomic-text" data-testid="text-tagline">
                  The Power of Shadow
                </h2>
                <p className="text-muted-foreground" data-testid="text-description">
                  Download any music with atomic precision
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Search, title: "Search", desc: "Find any music instantly", step: 1 },
                  { icon: Atom, title: "Select", desc: "Choose quality & format", step: 2 },
                  { icon: Download, title: "Download", desc: "Get your music fast", step: 3 },
                ].map((item) => (
                  <Card key={item.step} className="shadow-card" data-testid={`card-step-${item.step}`}>
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="w-12 h-12 mx-auto rounded-md bg-primary/20 flex items-center justify-center atomic-glow">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="text-3xl font-black text-primary">{item.step}</div>
                      <h3 className="font-bold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-card" data-testid="card-format-mp3">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-md bg-primary/20 atomic-glow">
                        <Music className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">MP3 Audio</h3>
                    </div>
                    <p className="text-muted-foreground">High quality audio up to 320kbps</p>
                  </CardContent>
                </Card>

                <Card className="shadow-card" data-testid="card-format-mp4">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-md bg-accent/20">
                        <Film className="w-6 h-6 text-accent" />
                      </div>
                      <h3 className="text-xl font-bold">MP4 Video</h3>
                    </div>
                    <p className="text-muted-foreground">Full HD video up to 1080p</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeQuery && (
            <>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20" data-testid="container-loading-state">
                  <AtomicLoader />
                  <p className="mt-6 text-xl font-bold" data-testid="text-loading-title">
                    Searching...
                  </p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-20" data-testid="container-error-state">
                  <AlertTriangle className="w-16 h-16 text-destructive mb-4" data-testid="icon-error" />
                  <p className="text-xl font-bold text-destructive mb-2" data-testid="text-error-title">
                    Error
                  </p>
                  <p className="text-muted-foreground mb-6" data-testid="text-error-message">
                    {(error as Error).message}
                  </p>
                  <Button onClick={() => setActiveQuery(activeQuery)} data-testid="button-retry">
                    <Atom className="w-4 h-4 mr-2" />
                    Retry
                  </Button>
                </div>
              ) : results && results.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="container-results-grid">
                  {results.map((video) => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20" data-testid="container-empty-state">
                  <Search className="w-16 h-16 text-muted-foreground mb-4" data-testid="icon-no-results" />
                  <p className="text-xl font-bold mb-2" data-testid="text-no-results-title">
                    No results
                  </p>
                  <p className="text-muted-foreground" data-testid="text-no-results-subtitle">
                    Try different search terms
                  </p>
                </div>
              )}
            </>
          )}
        </main>

        <footer className="border-t border-primary/20 py-6 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              <span className="text-primary font-semibold">Dev akue</span> alias <span className="text-primary font-bold">Shadow</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
