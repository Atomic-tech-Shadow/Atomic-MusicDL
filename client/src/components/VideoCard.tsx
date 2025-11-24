import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Clock, Music, Film, Sparkles, ChevronUp, X } from "lucide-react";
import type { YouTubeSearchResult, AudioQuality, VideoQuality } from "@shared/schema";

interface VideoCardProps {
  video: YouTubeSearchResult;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
    return `https://apisyu.com/single/${type}/${video.videoId}?${type === "mp3" ? `audio=${quality}` : `video=${quality}`}&theme=dark`;
  };

  return (
    <Card 
      className="group relative overflow-hidden glass grain transition-all duration-700 border-0 hover:translate-y-[-8px] hover:scale-[1.02] hover:rotate-1 hover:shadow-[0_25px_70px_-10px_rgba(124,58,237,0.5),0_15px_40px_-5px_rgba(168,85,247,0.4),inset_0_2px_0_0_rgba(255,255,255,0.15)] active:scale-[1.01] cursor-pointer"
      data-testid={`card-video-${video.videoId}`}
      style={{
        boxShadow: '0 10px 40px -8px rgba(124, 58, 237, 0.2), 0 5px 20px -4px rgba(168, 85, 247, 0.15), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        animation: 'float 8s ease-in-out infinite',
      }}
    >
      {/* Ultra Dynamic 3D Aurora gradient with depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/3 to-destructive/5 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/3 via-transparent to-black/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-50 transition-all duration-700 blur-xl"></div>
      
      <CardHeader className="p-0 relative">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-125 group-hover:rotate-2"
            data-testid={`img-thumbnail-${video.videoId}`}
          />
          
          {/* Simplified gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
          
          {/* Duration badge - 3D glass effect */}
          <div className="absolute bottom-3 right-3 glass-strong px-3 py-1.5 rounded-lg transition-all duration-300 hover:scale-105"
            style={{
              boxShadow: '0 4px 15px -2px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <span className="text-white text-xs font-bold flex items-center gap-1.5 drop-shadow-lg">
              <Clock className="w-3 h-3" />
              {video.duration}
            </span>
          </div>
          
          {/* View count - 3D badge appears on hover */}
          <div className="absolute top-3 left-3 glass-strong px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:translate-y-0 -translate-y-2 hover:scale-105"
            style={{
              boxShadow: '0 4px 15px -2px rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <span className="text-white text-xs font-bold flex items-center gap-1.5 drop-shadow-lg">
              <Eye className="w-3 h-3" />
              {formatViewCount(video.viewCount)}
            </span>
          </div>

          {/* Simplified hover effect - removed heavy blur orbs */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
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
        <Button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full group/btn relative overflow-hidden shadow-lg" 
          size="lg" 
          data-testid={`button-download-${video.videoId}`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover/btn:opacity-10 transition-opacity duration-500"></div>
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2 transition-transform group-hover/btn:translate-y-[-2px] duration-300" />
              <span className="font-bold">Fermer</span>
              <X className="w-4 h-4 ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2 transition-transform group-hover/btn:translate-y-0.5 duration-300" />
              <span className="font-bold">Télécharger</span>
              <Sparkles className="w-4 h-4 ml-2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
            </>
          )}
        </Button>
      </CardFooter>

      {/* Expanded Download Options */}
      {isExpanded && (
        <CardContent className="p-5 pt-0 relative z-10 animate-in slide-in-from-top duration-500"
          data-testid={`container-download-options-${video.videoId}`}
        >
          <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as "mp3" | "mp4")} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 h-12 sm:h-14 glass p-1">
              <TabsTrigger 
                value="mp3" 
                className="text-sm sm:text-base font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300" 
                data-testid="tab-mp3"
              >
                <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                <span className="hidden xs:inline">MP3 Audio</span>
                <span className="xs:hidden">MP3</span>
              </TabsTrigger>
              <TabsTrigger 
                value="mp4" 
                className="text-sm sm:text-base font-bold data-[state=active]:bg-accent data-[state=active]:text-accent-foreground transition-all duration-300" 
                data-testid="tab-mp4"
              >
                <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                <span className="hidden xs:inline">MP4 Vidéo</span>
                <span className="xs:hidden">MP4</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="mp3" className="space-y-3 sm:space-y-4 mt-0">
                <div className="space-y-3 sm:space-y-4 glass-strong p-3 sm:p-6 rounded-xl grain">
                  <h4 className="text-sm sm:text-base font-bold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
                    Qualité Audio
                  </h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {audioQualities.map((quality) => (
                      <Badge
                        key={quality}
                        variant={selectedAudioQuality === quality ? "default" : "outline"}
                        className="cursor-pointer px-3 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold transition-spring hover:scale-110"
                        onClick={() => setSelectedAudioQuality(quality)}
                        data-testid={`badge-audio-${quality}`}
                      >
                        {quality} kbps
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="glass-strong rounded-xl p-2 sm:p-4 md:p-6 grain relative overflow-hidden">
                  {/* Simplified background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                  <iframe
                    src={getApiSyuUrl()}
                    width="100%"
                    height="100"
                    style={{ border: 'none' }}
                    title="Music MP3 Downloader"
                    data-testid="iframe-apisyu-mp3"
                    className="relative z-10 sm:h-[110px] md:h-[130px]"
                  />
                </div>
              </TabsContent>
            
            <TabsContent value="mp4" className="space-y-3 sm:space-y-4 mt-0">
                <div className="space-y-3 sm:space-y-4 glass-strong p-3 sm:p-6 rounded-xl grain">
                  <h4 className="text-sm sm:text-base font-bold flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent" />
                    Qualité Vidéo
                  </h4>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {videoQualities.map((quality) => (
                      <Badge
                        key={quality}
                        variant={selectedVideoQuality === quality ? "default" : "outline"}
                        className="cursor-pointer px-3 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold transition-spring hover:scale-110"
                        onClick={() => setSelectedVideoQuality(quality)}
                        data-testid={`badge-video-${quality}`}
                      >
                        {quality}p
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="glass-strong rounded-xl p-2 sm:p-4 md:p-6 grain relative overflow-hidden">
                  {/* Simplified background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-destructive/5"></div>
                  <iframe
                    src={getApiSyuUrl()}
                    width="100%"
                    height="100"
                    style={{ border: 'none' }}
                    title="Music MP4 Downloader"
                    data-testid="iframe-apisyu-mp4"
                    className="relative z-10 sm:h-[110px] md:h-[130px]"
                  />
                </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      )}
    </Card>
  );
}
