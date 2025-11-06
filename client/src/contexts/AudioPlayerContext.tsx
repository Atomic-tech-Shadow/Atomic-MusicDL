import { createContext, useContext, useState, ReactNode } from "react";

interface CurrentTrack {
  videoId: string;
  title: string;
  artist: string;
  thumbnail: string;
}

interface AudioPlayerContextType {
  currentTrack: CurrentTrack | null;
  playTrack: (track: CurrentTrack | null) => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error("useAudioPlayer must be used within AudioPlayerProvider");
  }
  return context;
};

interface AudioPlayerProviderProps {
  children: ReactNode;
}

export function AudioPlayerProvider({ children }: AudioPlayerProviderProps) {
  const [currentTrack, setCurrentTrack] = useState<CurrentTrack | null>(null);

  const playTrack = (track: CurrentTrack | null) => {
    setCurrentTrack(track);
  };

  return (
    <AudioPlayerContext.Provider value={{ currentTrack, playTrack }}>
      {children}
    </AudioPlayerContext.Provider>
  );
}
