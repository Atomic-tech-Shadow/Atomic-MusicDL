import { Download, Loader2, AlertCircle, Heart, Play, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { AudioQuality } from "@shared/schema";

interface MusicCardProps {
  id: string;
  title: string;
  artist: string;
  duration: string;
  thumbnail: string;
  viewCount?: number;
  onDownload?: (id: string, quality: AudioQuality) => Promise<void>;
  onPlay?: (id: string) => void;
  viewMode?: 'grid' | 'list';
}

export default function MusicCard({ 
  id, 
  title, 
  artist, 
  duration, 
  thumbnail,
  viewCount,
  onDownload,
  onPlay,
  viewMode = 'grid'
}: MusicCardProps) {
  const [downloadState, setDownloadState] = useState<'idle' | 'downloading' | 'complete' | 'error'>('idle');
  const [quality, setQuality] = useState<AudioQuality>('320');
  const [showQualitySelect, setShowQualitySelect] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: favoriteCheck } = useQuery<{ isFavorite: boolean }>({
    queryKey: [`/api/favorites/check/${id}`],
  });

  const isFavorite = favoriteCheck?.isFavorite || false;

  const addFavoriteMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('POST', '/api/favorites', {
        videoId: id,
        title,
        artist,
        thumbnail,
        duration,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
      queryClient.invalidateQueries({ queryKey: [`/api/favorites/check/${id}`] });
      toast({
        title: "Ajouté aux favoris",
        description: `"${title}" a été ajouté à vos favoris.`,
      });
    },
  });

  const removeFavoriteMutation = useMutation({
    mutationFn: async () => {
      return apiRequest('DELETE', `/api/favorites/by-video/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/favorites'] });
      queryClient.invalidateQueries({ queryKey: [`/api/favorites/check/${id}`] });
      toast({
        title: "Retiré des favoris",
        description: `"${title}" a été retiré de vos favoris.`,
      });
    },
  });

  const handleFavoriteToggle = async () => {
    if (isFavorite) {
      removeFavoriteMutation.mutate();
    } else {
      addFavoriteMutation.mutate();
    }
  };

  const handleDownload = async () => {
    if (downloadState === 'downloading') return;
    
    setDownloadState('downloading');
    
    try {
      if (onDownload) {
        await onDownload(id, quality);
      }
      
      await apiRequest('POST', '/api/history', {
        videoId: id,
        title,
        artist,
        thumbnail,
        duration,
        quality,
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/history'] });
      queryClient.invalidateQueries({ queryKey: ['/api/stats'] });
      
      setDownloadState('complete');
      toast({
        title: "⚡ Téléchargement atomique réussi!",
        description: `"${title}" a été téléchargé en ${quality}kbps. +${quality === '320' ? 3 : quality === '192' ? 2 : 1} points atomiques!`,
      });
      
      setTimeout(() => {
        setDownloadState('idle');
        setShowQualitySelect(false);
      }, 2000);
    } catch (error) {
      console.error('[MusicCard] Download failed:', error);
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

  if (viewMode === 'list') {
    return (
      <Card className="overflow-visible hover-elevate active-elevate-2 transition-all" data-testid={`card-music-${id}`}>
        <div className="flex items-center gap-4 p-3">
          <div className="relative w-24 h-24 flex-shrink-0">
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full h-full object-cover rounded-md"
              data-testid={`img-thumbnail-${id}`}
            />
            <div className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded" data-testid={`text-duration-${id}`}>
              {duration}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base line-clamp-1 mb-0.5" data-testid={`text-title-${id}`}>
              {title}
            </h3>
            <p className="text-sm text-muted-foreground truncate" data-testid={`text-artist-${id}`}>
              {artist}
            </p>
            {viewCount !== undefined && (
              <p className="text-xs text-muted-foreground mt-1">
                {viewCount.toLocaleString()} vues
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onPlay && (
              <Button 
                size="icon" 
                variant="outline"
                onClick={() => onPlay(id)}
                data-testid={`button-play-${id}`}
              >
                <Play className="w-4 h-4" />
              </Button>
            )}
            <Button 
              size="icon" 
              variant="ghost"
              onClick={handleFavoriteToggle}
              data-testid={`button-favorite-${id}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-primary text-primary' : ''}`} />
            </Button>
            
            {!showQualitySelect ? (
              <Button 
                onClick={() => setShowQualitySelect(true)}
                disabled={downloadState === 'downloading'}
                variant={downloadState === 'complete' ? 'default' : 'default'}
                size="sm"
                data-testid={`button-download-${id}`}
              >
                {downloadState === 'idle' && (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </>
                )}
                {downloadState === 'downloading' && (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Téléchargement...
                  </>
                )}
                {downloadState === 'complete' && (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Téléchargé !
                  </>
                )}
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Select value={quality} onValueChange={(v) => setQuality(v as AudioQuality)} disabled={downloadState === 'downloading'}>
                  <SelectTrigger className="w-24" data-testid={`select-quality-${id}`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="128">128 kbps</SelectItem>
                    <SelectItem value="192">192 kbps</SelectItem>
                    <SelectItem value="320">320 kbps</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  size="sm" 
                  onClick={handleDownload}
                  disabled={downloadState === 'downloading'}
                  variant={downloadState === 'complete' ? 'default' : downloadState === 'error' ? 'destructive' : 'default'}
                  data-testid={`button-confirm-download-${id}`}
                >
                  {downloadState === 'idle' && <Download className="w-4 h-4" />}
                  {downloadState === 'downloading' && <Loader2 className="w-4 h-4 animate-spin" />}
                  {downloadState === 'complete' && <Zap className="w-4 h-4 animate-pulse" />}
                  {downloadState === 'error' && <AlertCircle className="w-4 h-4" />}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-visible hover-elevate active-elevate-2 group relative transition-all" data-testid={`card-music-${id}`}>
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
        {onPlay && (
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
            <Button 
              size="icon" 
              variant="default"
              className="opacity-0 group-hover:opacity-100 transition-opacity scale-110"
              onClick={() => onPlay(id)}
              data-testid={`button-play-${id}`}
            >
              <Play className="w-6 h-6" />
            </Button>
          </div>
        )}
        <Button 
          size="icon" 
          variant="ghost"
          className="absolute top-2 left-2 bg-black/50 hover:bg-black/70"
          onClick={handleFavoriteToggle}
          data-testid={`button-favorite-${id}`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-primary text-primary' : 'text-white'}`} />
        </Button>
        {viewCount !== undefined && (
          <Badge className="absolute bottom-2 left-2 bg-black/70" variant="secondary">
            {viewCount.toLocaleString()} vues
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg line-clamp-2 mb-1" data-testid={`text-title-${id}`}>
          {title}
        </h3>
        <p className="text-sm text-muted-foreground truncate mb-4" data-testid={`text-artist-${id}`}>
          {artist}
        </p>
        
        {!showQualitySelect ? (
          <Button 
            onClick={() => setShowQualitySelect(true)}
            disabled={downloadState === 'downloading'}
            variant={downloadState === 'complete' ? 'default' : downloadState === 'error' ? 'destructive' : 'default'}
            className="w-full rounded-md"
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
                <Zap className="w-4 h-4 mr-2 animate-pulse" />
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
        ) : (
          <div className="space-y-2">
            <Select value={quality} onValueChange={(v) => setQuality(v as AudioQuality)} disabled={downloadState === 'downloading'}>
              <SelectTrigger className="w-full" data-testid={`select-quality-${id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="128">128 kbps (+1 ⚡)</SelectItem>
                <SelectItem value="192">192 kbps (+2 ⚡)</SelectItem>
                <SelectItem value="320">320 kbps (+3 ⚡)</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button 
                onClick={handleDownload}
                className="flex-1"
                disabled={downloadState === 'downloading'}
                variant={downloadState === 'complete' ? 'default' : downloadState === 'error' ? 'destructive' : 'default'}
                data-testid={`button-confirm-download-${id}`}
              >
                {downloadState === 'idle' && (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Confirmer
                  </>
                )}
                {downloadState === 'downloading' && (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Téléchargement...
                  </>
                )}
                {downloadState === 'complete' && (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
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
              <Button 
                variant="outline"
                onClick={() => setShowQualitySelect(false)}
                disabled={downloadState === 'downloading'}
                data-testid={`button-cancel-download-${id}`}
              >
                Annuler
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
