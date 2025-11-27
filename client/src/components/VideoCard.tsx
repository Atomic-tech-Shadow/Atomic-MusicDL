import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Music, Film, Clock, Eye } from "lucide-react";
import type { YouTubeSearchResult, AudioQuality, VideoQuality } from "@shared/schema";

interface VideoCardProps {
  video: YouTubeSearchResult;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [format, setFormat] = useState<"mp3" | "mp4">("mp3");
  const [audioQuality, setAudioQuality] = useState<AudioQuality>("320");
  const [videoQuality, setVideoQuality] = useState<VideoQuality>("720");

  const audioQualities: AudioQuality[] = ["128", "192", "256", "320"];
  const videoQualities: VideoQuality[] = ["360", "480", "720", "1080"];

  const formatViews = (count?: number) => {
    if (!count) return "N/A";
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  const getApiSyuUrl = () => {
    const quality = format === "mp3" ? audioQuality : videoQuality;
    return `https://apisyu.com/single/${format}/${video.videoId}?${format === "mp3" ? `audio=${quality}` : `video=${quality}`}&theme=dark`;
  };

  return (
    <Card 
      className="shadow-card overflow-hidden"
      data-testid={`card-video-${video.videoId}`}
    >
      <div className="relative aspect-video">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
          data-testid={`img-thumbnail-${video.videoId}`}
        />
        {video.duration && (
          <Badge 
            variant="secondary" 
            className="absolute bottom-2 right-2 bg-black/80 text-white border-0"
            data-testid={`badge-duration-${video.videoId}`}
          >
            <Clock className="w-3 h-3 mr-1" />
            {video.duration}
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <h3 
          className="font-semibold text-sm line-clamp-2 text-foreground"
          data-testid={`text-title-${video.videoId}`}
        >
          {video.title}
        </h3>

        <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
          <span className="truncate" data-testid={`text-channel-${video.videoId}`}>
            {video.artist}
          </span>
          {video.viewCount && (
            <span className="flex items-center gap-1 shrink-0">
              <Eye className="w-3 h-3" />
              {formatViews(video.viewCount)}
            </span>
          )}
        </div>

        <div className="space-y-3 pt-2 border-t border-primary/10">
          <div className="flex gap-2">
            <Button
              variant={format === "mp3" ? "default" : "outline"}
              size="sm"
              onClick={() => setFormat("mp3")}
              className="flex-1"
              data-testid="button-format-mp3"
            >
              <Music className="w-4 h-4 mr-1" />
              MP3
            </Button>
            <Button
              variant={format === "mp4" ? "default" : "outline"}
              size="sm"
              onClick={() => setFormat("mp4")}
              className="flex-1"
              data-testid="button-format-mp4"
            >
              <Film className="w-4 h-4 mr-1" />
              MP4
            </Button>
          </div>

          <div className="flex flex-wrap gap-1">
            {format === "mp3" ? (
              audioQualities.map((q) => (
                <Button
                  key={q}
                  variant={audioQuality === q ? "default" : "outline"}
                  size="sm"
                  onClick={() => setAudioQuality(q)}
                  data-testid={`button-quality-${q}`}
                >
                  {q}kbps
                </Button>
              ))
            ) : (
              videoQualities.map((q) => (
                <Button
                  key={q}
                  variant={videoQuality === q ? "default" : "outline"}
                  size="sm"
                  onClick={() => setVideoQuality(q)}
                  data-testid={`button-quality-${q}`}
                >
                  {q}p
                </Button>
              ))
            )}
          </div>

          <div className="rounded-md overflow-hidden border border-primary/20">
            <iframe
              src={getApiSyuUrl()}
              width="100%"
              height="55"
              style={{ border: 'none' }}
              title={`Download ${format.toUpperCase()}`}
              data-testid={`iframe-apisyu-${video.videoId}`}
              sandbox="allow-scripts allow-same-origin allow-downloads"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
