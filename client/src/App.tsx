import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import ParticleEffect from "@/components/ParticleEffect";
import AudioPlayer from "@/components/AudioPlayer";
import { AudioPlayerProvider, useAudioPlayer } from "@/contexts/AudioPlayerContext";
import Home from "@/pages/Home";
import History from "@/pages/History";
import Favorites from "@/pages/Favorites";
import Trending from "@/pages/Trending";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/history" component={History} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/trending" component={Trending} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { currentTrack, playTrack } = useAudioPlayer();

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1">
          <header className="sticky top-0 z-40 flex items-center justify-between p-4 border-b bg-background/95 backdrop-blur">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
          </header>
          <main className="flex-1 overflow-y-auto">
            <ParticleEffect />
            <Router />
          </main>
        </div>
      </div>
      {currentTrack && (
        <AudioPlayer
          videoId={currentTrack.videoId}
          title={currentTrack.title}
          artist={currentTrack.artist}
          thumbnail={currentTrack.thumbnail}
          onClose={() => playTrack(null)}
        />
      )}
      <Toaster />
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AudioPlayerProvider>
          <AppContent />
        </AudioPlayerProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
