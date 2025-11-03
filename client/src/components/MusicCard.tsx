import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  duration: string;
  thumbnail: string;
  onDownload?: (id: string) => void;
}

export default function MusicCard({ 
  id, 
  title, 
  artist, 
  duration, 
  thumbnail,
  onDownload 
}: MusicCardProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    if (downloadState !== 'idle') return;
    
    setDownloadState('downloading');
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadState('complete');
          setTimeout(() => {
            setDownloadState('idle');
            setProgress(0);
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    
    if (onDownload) {
      onDownload(id);
    }
  };

  return (
    <Card className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow" data-testid={`card-music-${id}`}>
      <div className="relative aspect-video">
        <img 
          src={thumbnail} 
          alt={title}
          className="w-full h-full object-cover"
          data-testid={`img-thumbnail-${id}`}
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded" data-testid={`text-duration-${id}`}>
          {duration}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 mb-1" data-testid={`text-title-${id}`}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground truncate mb-4" data-testid={`text-artist-${id}`}>
          {artist}
        </p>
        
        {downloadState === 'downloading' && (
          <Progress value={progress} className="mb-2 h-1" data-testid={`progress-${id}`} />
        )}
        
        <Button 
          onClick={handleDownload}
          disabled={downloadState === 'downloading'}
          variant={downloadState === 'complete' ? 'default' : 'default'}
          className="w-full rounded-lg"
          data-testid={`button-download-${id}`}
        >
          {downloadState === 'idle' && (
            <>
              <Download className="w-4 h-4 mr-2" />
              Télécharger MP3
            </>
          )}
          {downloadState === 'downloading' && (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Téléchargement... {progress}%
            </>
          )}
          {downloadState === 'complete' && (
            <>
              Téléchargement terminé!
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
