import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, Download, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DownloadHistory } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function History() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: history, isLoading } = useQuery<DownloadHistory[]>({
    queryKey: ['/api/history'],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest('DELETE', `/api/history/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/history'] });
      toast({
        title: "Supprimé",
        description: "L'élément a été supprimé de l'historique.",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="h-24 bg-muted rounded"></div>
          <div className="h-24 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading mb-2" data-testid="text-history-title">
          Historique de Téléchargement
        </h1>
        <p className="text-muted-foreground">
          Tous vos téléchargements atomiques
        </p>
      </div>

      {!history || history.length === 0 ? (
        <Card className="p-12 text-center">
          <Download className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">Aucun téléchargement</h3>
          <p className="text-muted-foreground">
            Commencez à télécharger de la musique pour voir votre historique ici
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {history.map((item) => (
            <Card key={item.id} className="overflow-visible p-4 hover-elevate" data-testid={`card-history-${item.id}`}>
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title}
                    className="w-full h-full object-cover rounded-md"
                    data-testid={`img-thumbnail-${item.id}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold line-clamp-1" data-testid={`text-title-${item.id}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate" data-testid={`text-artist-${item.id}`}>
                    {item.artist}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" data-testid={`badge-quality-${item.id}`}>
                      {item.quality} kbps
                    </Badge>
                    <Badge variant="secondary" data-testid={`badge-points-${item.id}`}>
                      <Zap className="w-3 h-3 mr-1" />
                      +{item.atomicPoints}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(item.downloadedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => deleteMutation.mutate(item.id)}
                  data-testid={`button-delete-${item.id}`}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
