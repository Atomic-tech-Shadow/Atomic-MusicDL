import { useQuery } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import MusicCard from "@/components/MusicCard";
import type { Favorite, AudioQuality } from "@shared/schema";

export default function Favorites() {
  const { data: favorites, isLoading } = useQuery<Favorite[]>({
    queryKey: ['/api/favorites'],
  });

  const handleDownload = async (videoId: string, quality: AudioQuality): Promise<void> => {
    try {
      const downloadUrl = `/api/download/${videoId}?quality=${quality}`;
      const response = await fetch(downloadUrl);
      
      if (!response.ok) {
        throw new Error(`Erreur de téléchargement: ${response.statusText}`);
      }
      
      const blob = await response.blob();
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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading mb-2" data-testid="text-favorites-title">
          Mes Favoris
        </h1>
        <p className="text-muted-foreground">
          Votre collection de musiques préférées
        </p>
      </div>

      {!favorites || favorites.length === 0 ? (
        <Card className="p-12 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Aucun favori</h3>
          <p className="text-muted-foreground">
            Ajoutez des musiques à vos favoris pour les retrouver facilement ici
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((favorite) => (
            <MusicCard
              key={favorite.id}
              id={favorite.videoId}
              title={favorite.title}
              artist={favorite.artist}
              duration={favorite.duration}
              thumbnail={favorite.thumbnail}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}
    </div>
  );
}
