import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Clock, Music, Film } from "lucide-react";
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
    <Card className="group overflow-hidden hover-elevate transition-all duration-300" data-testid={`card-video-${video.videoId}`}>
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden bg-muted">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            data-testid={`img-thumbnail-${video.videoId}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-2 right-2 bg-black/90 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-lg font-medium">
            {video.duration}
          </div>
          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="px-2.5 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-medium rounded-lg">
              {formatViewCount(video.viewCount)} vues
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-5">
        <h3 className="font-semibold text-base line-clamp-2 mb-2 group-hover:text-primary transition-colors" data-testid={`text-title-${video.videoId}`}>
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-1" data-testid={`text-artist-${video.videoId}`}>
          {video.artist}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5" />
            <span className="font-medium">{formatViewCount(video.viewCount)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-medium">{video.duration}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full group/btn" size="lg" data-testid={`button-download-${video.videoId}`}>
              <Download className="w-4 h-4 mr-2 transition-transform group-hover/btn:translate-y-0.5" />
              <span className="font-semibold">Télécharger</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl">{video.title}</DialogTitle>
              <DialogDescription className="text-base">{video.artist}</DialogDescription>
            </DialogHeader>
            
            <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as "mp3" | "mp4")} className="mt-6">
              <TabsList className="grid w-full grid-cols-2 h-12">
                <TabsTrigger value="mp3" className="text-base font-semibold" data-testid="tab-mp3">
                  <Music className="w-4 h-4 mr-2" />
                  MP3 (Audio)
                </TabsTrigger>
                <TabsTrigger value="mp4" className="text-base font-semibold" data-testid="tab-mp4">
                  <Film className="w-4 h-4 mr-2" />
                  MP4 (Vidéo)
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="mp3" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <h4 className="text-base font-semibold">Sélectionner la qualité audio:</h4>
                  <div className="flex flex-wrap gap-3">
                    {audioQualities.map((quality) => (
                      <Badge
                        key={quality}
                        variant={selectedAudioQuality === quality ? "default" : "outline"}
                        className="cursor-pointer px-4 py-2 text-sm font-semibold transition-all hover:scale-105"
                        onClick={() => setSelectedAudioQuality(quality)}
                        data-testid={`badge-audio-${quality}`}
                      >
                        {quality} kbps
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="border-2 rounded-xl p-6 bg-gradient-to-br from-primary/5 to-purple-500/5">
                  <iframe
                    src={getApiSyuUrl()}
                    width="100%"
                    height="130"
                    style={{ border: 'none' }}
                    title="Music MP3 Downloader"
                    data-testid="iframe-apisyu-mp3"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="mp4" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <h4 className="text-base font-semibold">Sélectionner la qualité vidéo:</h4>
                  <div className="flex flex-wrap gap-3">
                    {videoQualities.map((quality) => (
                      <Badge
                        key={quality}
                        variant={selectedVideoQuality === quality ? "default" : "outline"}
                        className="cursor-pointer px-4 py-2 text-sm font-semibold transition-all hover:scale-105"
                        onClick={() => setSelectedVideoQuality(quality)}
                        data-testid={`badge-video-${quality}`}
                      >
                        {quality}p
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="border-2 rounded-xl p-6 bg-gradient-to-br from-purple-500/5 to-pink-500/5">
                  <iframe
                    src={getApiSyuUrl()}
                    width="100%"
                    height="130"
                    style={{ border: 'none' }}
                    title="Music MP4 Downloader"
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
