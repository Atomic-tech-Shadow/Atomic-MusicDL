import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface AudioPlayerProps {
  videoId: string;
  title: string;
  artist: string;
  thumbnail: string;
  onClose: () => void;
}

export default function AudioPlayer({ videoId, title, artist, thumbnail, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="fixed bottom-0 left-0 right-0 z-50 border-t p-4 backdrop-blur-lg bg-background/95" data-testid="audio-player">
      <div className="container mx-auto">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 flex-shrink-0">
            <img 
              src={thumbnail} 
              alt={title}
              className="w-full h-full object-cover rounded-md"
              data-testid="player-thumbnail"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm line-clamp-1" data-testid="player-title">
              {title}
            </h4>
            <p className="text-xs text-muted-foreground truncate" data-testid="player-artist">
              {artist}
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost"
              data-testid="button-skip-back"
            >
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              size="icon" 
              variant="default"
              onClick={togglePlay}
              data-testid="button-play-pause"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button 
              size="icon" 
              variant="ghost"
              data-testid="button-skip-forward"
            >
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          <div className="hidden lg:flex items-center gap-2 w-32">
            <Button 
              size="icon" 
              variant="ghost"
              onClick={toggleMute}
              data-testid="button-mute"
            >
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider
              value={[isMuted ? 0 : volume]}
              onValueChange={handleVolumeChange}
              max={1}
              step={0.01}
              className="w-20"
              data-testid="slider-volume"
            />
          </div>

          <Button 
            size="icon" 
            variant="ghost"
            onClick={onClose}
            data-testid="button-close-player"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="hidden mt-2">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="w-0 h-0"
          />
        </div>
      </div>
    </Card>
  );
}
