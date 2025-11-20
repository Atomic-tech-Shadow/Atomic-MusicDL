import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Clock } from "lucide-react";
import type { YouTubeSearchResult, AudioQuality, VideoQuality } from "@shared/schema";

interface VideoCardProps {
  video: YouTubeSearchResult;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [selectedTab, setSelectedTab] = useState<"mp3" | "mp4">("mp3");
  const [selectedAudioQuality, setSelectedAudioQuality] = useState<AudioQuality>("320");
  const [selectedVideoQuality, setSelectedVideoQuality] = useState<VideoQuality>("720");

  const audioQualities: AudioQuality[] = ["64", "128", "192", "256", "320"];
  const videoQualities: VideoQuality[] = ["240", "360", "480", "720", "1080"];

  const formatViewCount = (count?: number) => {
    if (!count) return "N/A";
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getApiSyuUrl = () => {
    const type = selectedTab;
    const quality = selectedTab === "mp3" ? selectedAudioQuality : selectedVideoQuality;
    return `https://apisyu.com/single/${type}/${video.videoId}?${type === "mp3" ? `audio=${quality}` : `video=${quality}`}&theme=light`;
  };

  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-video-${video.videoId}`}>
      <CardHeader className="p-0">
        <div className="relative aspect-video">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            data-testid={`img-thumbnail-${video.videoId}`}
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md">
            {video.duration}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="font-semibold line-clamp-2 mb-2" data-testid={`text-title-${video.videoId}`}>
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3" data-testid={`text-artist-${video.videoId}`}>
          {video.artist}
        </p>
        
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{formatViewCount(video.viewCount)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{video.duration}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full" data-testid={`button-download-${video.videoId}`}>
              <Download className="w-4 h-4 mr-2" />
              Télécharger
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{video.title}</DialogTitle>
              <DialogDescription>{video.artist}</DialogDescription>
            </DialogHeader>
            
            <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as "mp3" | "mp4")} className="mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mp3" data-testid="tab-mp3">MP3 (Audio)</TabsTrigger>
                <TabsTrigger value="mp4" data-testid="tab-mp4">MP4 (Vidéo)</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mp3" className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-3">Sélectionner la qualité audio:</h4>
                  <div className="flex flex-wrap gap-2">
                    {audioQualities.map((quality) => (
                      <Badge
                        key={quality}
                        variant={selectedAudioQuality === quality ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedAudioQuality(quality)}
                        data-testid={`badge-audio-${quality}`}
                      >
                        {quality} kbps
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-muted/20">
                  <iframe
                    src={getApiSyuUrl()}
                    width="100%"
                    height="130"
                    style={{ border: 'none' }}
                    title="YouTube MP3 Downloader"
                    data-testid="iframe-apisyu-mp3"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="mp4" className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-3">Sélectionner la qualité vidéo:</h4>
                  <div className="flex flex-wrap gap-2">
                    {videoQualities.map((quality) => (
                      <Badge
                        key={quality}
                        variant={selectedVideoQuality === quality ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => setSelectedVideoQuality(quality)}
                        data-testid={`badge-video-${quality}`}
                      >
                        {quality}p
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-md p-4 bg-muted/20">
                  <iframe
                    src={getApiSyuUrl()}
                    width="100%"
                    height="130"
                    style={{ border: 'none' }}
                    title="YouTube MP4 Downloader"
                    data-testid="iframe-apisyu-mp4"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
