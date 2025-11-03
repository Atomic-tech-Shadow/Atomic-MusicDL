import { Zap } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" data-testid="icon-logo" />
          <span className="text-lg font-bold font-heading text-white" data-testid="text-logo">
            Atomic MusicDL
          </span>
        </div>
      </div>
    </header>
  );
}
