import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MusicCard from "@/components/MusicCard";
import { Loader2 } from "lucide-react";
import type { YouTubeSearchResult } from "@shared/schema";
import videoFile from "@assets/PinDown.io_@Azizology_1762201393_1762202048928.mp4";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const { playTrack } = useAudioPlayer();

  const { data: results, isLoading } = useQuery<YouTubeSearchResult[]>({
    queryKey: ['/api/search', activeQuery],
    enabled: !!activeQuery,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveQuery(query);
  };

  const handlePlay = (videoId: string) => {
    const track = results?.find(r => r.videoId === videoId);
    if (track) {
      playTrack({
        videoId: track.videoId,
        title: track.title,
        artist: track.artist,
        thumbnail: track.thumbnail,
      });
    }
  };

  const handleDownload = async (videoId: string, quality: string, onProgress?: (percent: number) => void): Promise<void> => {
    try {
      console.log('Starting download for:', videoId, 'quality:', quality);
      const downloadUrl = `/api/download/${videoId}?quality=${quality}`;
      
      let simulatedProgress = 0;
      let progressInterval: NodeJS.Timeout | null = null;
      
      if (onProgress) {
        onProgress(5);
        progressInterval = setInterval(() => {
          simulatedProgress = Math.min(simulatedProgress + Math.random() * 8 + 2, 90);
          onProgress(simulatedProgress);
        }, 200);
      }
      
      console.log('Fetching from:', downloadUrl);
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        if (progressInterval) clearInterval(progressInterval);
        throw new Error(`Erreur de téléchargement: ${response.statusText}`);
      }
      
      const contentLength = response.headers.get('Content-Length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      
      if (!response.body) {
        if (progressInterval) clearInterval(progressInterval);
        throw new Error('ReadableStream not supported');
      }
      
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let receivedLength = 0;
      
      if (total && progressInterval) {
        clearInterval(progressInterval);
        progressInterval = null;
      }
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        receivedLength += value.length;
        
        if (total && onProgress) {
          const percent = Math.min((receivedLength / total) * 100, 99);
          onProgress(percent);
        }
      }
      
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      
      if (onProgress) {
        onProgress(95);
      }
      
      console.log('Creating blob...');
      const blob = new Blob(chunks);
      console.log('Blob created, size:', blob.size);
      
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = 'audio.mp3';
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/);
        if (filenameMatch) {
          filename = filenameMatch[1];
        }
      }
      
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      if (onProgress) {
        onProgress(100);
      }
      
      console.log('Download triggered successfully');
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 100);
    } catch (error) {
      console.error('Download error:', error);
      throw error;
    }
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
        <source src={videoFile} type="video/mp4" />
      </video>
      
      <Header />
      
      <main className="pt-16">
        <Hero onSearch={handleSearch} />
        
        {activeQuery && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="bg-content rounded-lg p-6 mb-8">
                <h2 className="text-2xl font-bold font-heading text-enhanced" data-testid="text-results-title">
                  Résultats pour "{searchQuery}"
                </h2>
              </div>
              
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
                      viewCount={result.viewCount}
                      onDownload={handleDownload}
                      onPlay={handlePlay}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-content rounded-lg p-12 text-center">
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
