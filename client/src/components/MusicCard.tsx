import { Download, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  duration: string;
  thumbnail: string;
  onDownload?: (id: string) => Promise<void>;
}

export default function MusicCard({ 
  id, 
  title, 
  artist, 
  duration, 
  thumbnail,
  onDownload 
}: MusicCardProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'complete' | 'error'>('idle');
  const { toast } = useToast();

  const handleDownload = async () => {
    if (downloadState === 'downloading') return;
    
    setDownloadState('downloading');
    
    try {
      if (onDownload) {
        await onDownload(id);
      }
      
      setDownloadState('complete');
      toast({
        title: "Téléchargement réussi",
        description: `"${title}" a été téléchargé avec succès.`,
      });
      
      setTimeout(() => {
        setDownloadState('idle');
      }, 2000);
    } catch (error) {
      setDownloadState('error');
      toast({
        variant: "destructive",
        title: "Erreur de téléchargement",
        description: "Une erreur s'est produite. Veuillez réessayer.",
      });
      
      setTimeout(() => {
        setDownloadState('idle');
      }, 3000);
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
        
        <Button 
          onClick={handleDownload}
          disabled={downloadState === 'downloading'}
          variant={downloadState === 'complete' ? 'default' : downloadState === 'error' ? 'destructive' : 'default'}
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
              Téléchargement en cours...
            </>
          )}
          {downloadState === 'complete' && (
            <>
              <Download className="w-4 h-4 mr-2" />
              Téléchargé !
            </>
          )}
          {downloadState === 'error' && (
            <>
              <AlertCircle className="w-4 h-4 mr-2" />
              Réessayer
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
