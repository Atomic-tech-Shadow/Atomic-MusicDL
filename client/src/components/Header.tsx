import { Zap, Download } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 p-2 rounded-lg border border-primary/30">
            <Zap className="w-5 h-5 text-primary" data-testid="icon-logo" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold font-heading text-white" data-testid="text-logo">
              Atomic MusicDL
            </span>
            <span className="text-xs text-primary/80">Téléchargement MP3</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/30">
            <Download className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-white/90">
              Prêt à télécharger
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
