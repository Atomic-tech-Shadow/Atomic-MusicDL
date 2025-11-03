import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="w-6 h-6 text-primary" data-testid="icon-logo" />
          <span className="text-xl font-bold font-heading" data-testid="text-logo">
            MusicDL
          </span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#home" 
            className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
            data-testid="link-home"
          >
            Accueil
          </a>
          <a 
            href="#features" 
            className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
            data-testid="link-features"
          >
            Fonctionnalités
          </a>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium hover-elevate px-3 py-2 rounded-md transition-colors"
            data-testid="link-how"
          >
            Comment ça marche
          </a>
        </nav>

        <Button 
          size="sm" 
          variant="ghost"
          className="md:hidden"
          data-testid="button-menu"
        >
          Menu
        </Button>
      </div>
    </header>
  );
}
