import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Clock, Music, Film, Sparkles } from "lucide-react";
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
    <Card 
      className="group relative overflow-hidden glass grain transition-smooth border-0 shadow-lg"
      data-testid={`card-video-${video.videoId}`}
    >
      {/* Aurora gradient background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-gradient-shift"></div>
      
      <CardHeader className="p-0 relative">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            data-testid={`img-thumbnail-${video.videoId}`}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
          
          {/* Duration badge - glass effect */}
          <div className="absolute bottom-3 right-3 glass-strong px-3 py-1.5 rounded-lg">
            <span className="text-white text-xs font-bold flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {video.duration}
            </span>
          </div>
          
          {/* View count - appears on hover */}
          <div className="absolute top-3 left-3 glass-strong px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 -translate-y-2">
            <span className="text-white text-xs font-bold flex items-center gap-1.5">
              <Eye className="w-3 h-3" />
              {formatViewCount(video.viewCount)}
            </span>
          </div>

          {/* Sparkle effect on hover */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/30 rounded-full blur-3xl animate-aurora-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-accent/30 rounded-full blur-3xl animate-aurora-float" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-5 relative z-10">
        <h3 
          className="font-bold text-base line-clamp-2 mb-2 group-hover:text-gradient transition-all duration-500" 
          data-testid={`text-title-${video.videoId}`}
        >
          {video.title}
        </h3>
        <p 
          className="text-sm text-muted-foreground mb-4 line-clamp-1 font-medium" 
          data-testid={`text-artist-${video.videoId}`}
        >
          {video.artist}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5 glass-strong px-2.5 py-1 rounded-md">
            <Eye className="w-3.5 h-3.5" />
            <span className="font-semibold">{formatViewCount(video.viewCount)}</span>
          </div>
          <div className="flex items-center gap-1.5 glass-strong px-2.5 py-1 rounded-md">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-semibold">{video.duration}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-5 pt-0 relative z-10">
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="w-full group/btn relative overflow-hidden shadow-lg" 
              size="lg" 
              data-testid={`button-download-${video.videoId}`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover/btn:opacity-20 transition-opacity duration-500 bg-[length:200%_100%] animate-shimmer"></div>
              <Download className="w-4 h-4 mr-2 transition-transform group-hover/btn:translate-y-0.5 duration-300" />
              <span className="font-bold">Télécharger</span>
              <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto glass-strong grain border-0 shadow-2xl">
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-black text-gradient">{video.title}</DialogTitle>
              <DialogDescription className="text-base font-medium">{video.artist}</DialogDescription>
            </DialogHeader>
            
            <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as "mp3" | "mp4")} className="mt-6">
              <TabsList className="grid w-full grid-cols-2 h-14 glass p-1">
                <TabsTrigger 
                  value="mp3" 
                  className="text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300" 
                  data-testid="tab-mp3"
                >
                  <Music className="w-4 h-4 mr-2" />
                  MP3 Audio
                </TabsTrigger>
                <TabsTrigger 
                  value="mp4" 
                  className="text-base font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all duration-300" 
                  data-testid="tab-mp4"
                >
                  <Film className="w-4 h-4 mr-2" />
                  MP4 Vidéo
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="mp3" className="space-y-6 mt-6">
                <div className="space-y-4 glass-strong p-6 rounded-xl grain">
                  <h4 className="text-base font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    Qualité Audio
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {audioQualities.map((quality) => (
                      <Badge
                        key={quality}
                        variant={selectedAudioQuality === quality ? "default" : "outline"}
                        className="cursor-pointer px-5 py-2.5 text-sm font-bold transition-spring hover:scale-110"
                        onClick={() => setSelectedAudioQuality(quality)}
                        data-testid={`badge-audio-${quality}`}
                      >
                        {quality} kbps
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="glass-strong rounded-xl p-6 grain relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-gradient-shift"></div>
                  <iframe
                    src={getApiSyuUrl()}
                    width="100%"
                    height="130"
                    style={{ border: 'none' }}
                    title="Music MP3 Downloader"
                    data-testid="iframe-apisyu-mp3"
                    className="relative z-10"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="mp4" className="space-y-6 mt-6">
                <div className="space-y-4 glass-strong p-6 rounded-xl grain">
                  <h4 className="text-base font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    Qualité Vidéo
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {videoQualities.map((quality) => (
                      <Badge
                        key={quality}
                        variant={selectedVideoQuality === quality ? "default" : "outline"}
                        className="cursor-pointer px-5 py-2.5 text-sm font-bold transition-spring hover:scale-110"
                        onClick={() => setSelectedVideoQuality(quality)}
                        data-testid={`badge-video-${quality}`}
                      >
                        {quality}p
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="glass-strong rounded-xl p-6 grain relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-destructive/10 animate-gradient-shift"></div>
                  <iframe
                    src={getApiSyuUrl()}
                    width="100%"
                    height="130"
                    style={{ border: 'none' }}
                    title="Music MP4 Downloader"
                    data-testid="iframe-apisyu-mp4"
                    className="relative z-10"
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
