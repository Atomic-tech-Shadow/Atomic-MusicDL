import { useQuery } from "@tanstack/react-query";
import { TrendingUp, Loader2 } from "lucide-react";
import { useAudioPlayer } from "@/contexts/AudioPlayerContext";
import MusicCard from "@/components/MusicCard";
import type { YouTubeSearchResult, AudioQuality } from "@shared/schema";
import { Button } from "@/components/ui/button";
import videoFile from "@assets/PinDown.io_@Azizology_1762201393_1762202048928.mp4";

export default function Trending() {
  const { data: trending, isLoading, refetch } = useQuery<YouTubeSearchResult[]>({
    queryKey: ['/api/trending'],
  });
  const { playTrack } = useAudioPlayer();

  const handlePlay = (videoId: string) => {
    const track = trending?.find(t => t.videoId === videoId);
    if (track) {
      playTrack({
        videoId: track.videoId,
        title: track.title,
        artist: track.artist,
        thumbnail: track.thumbnail,
      });
    }
  };

  const handleDownload = async (videoId: string, quality: AudioQuality, onProgress?: (percent: number) => void): Promise<void> => {
    try {
      const downloadUrl = `/api/download/${videoId}?quality=${quality}`;
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        throw new Error(`Erreur de téléchargement: ${response.statusText}`);
      }
      
      const contentLength = response.headers.get('Content-Length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      
      if (!response.body) {
        throw new Error('ReadableStream not supported');
      }
      
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let receivedLength = 0;
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        chunks.push(value);
        receivedLength += value.length;
        
        if (total && onProgress) {
          const percent = (receivedLength / total) * 100;
          onProgress(percent);
        }
      }
      
      const blob = new Blob(chunks);
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
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-content rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold font-heading mb-2 flex items-center gap-2 text-enhanced" data-testid="text-trending-title">
                <TrendingUp className="w-8 h-8 text-primary" />
                Tendances Anime OST
              </h1>
              <p className="text-muted-foreground">
                Les musiques anime les plus populaires du moment
              </p>
            </div>
            <Button onClick={() => refetch()} variant="outline" data-testid="button-refresh">
              Actualiser
            </Button>
          </div>
        </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" data-testid="icon-loading" />
          <span className="ml-3 text-muted-foreground">Chargement des tendances...</span>
        </div>
      ) : trending && trending.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {trending.map((result) => (
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
          <p className="text-muted-foreground">Aucune tendance disponible pour le moment</p>
        </div>
      )}
      </div>
    </div>
  );
}
