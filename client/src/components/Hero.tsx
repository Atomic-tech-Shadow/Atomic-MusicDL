import { useState } from "react";
import { Search, Atom } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onSearch: (query: string) => void;
}

function FallingText({ text }: { text: string }) {
  const letters = text.split("");
  const totalDuration = letters.length * 0.08;
  const animationDuration = totalDuration + 2;

  return (
    <span className="inline-flex flex-wrap justify-center">
      {letters.map((letter, index) => (
        <span
          key={index}
          className="falling-letter"
          style={{
            animationDelay: `${index * 0.08}s`,
            animationDuration: `${animationDuration}s`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  );
}

export default function Hero({ onSearch }: HeroProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="relative py-16 md:py-24 border-b border-primary/20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Atom className="w-10 h-10 text-primary animate-atomic" data-testid="icon-atomic" />
          </div>
          
          <h1 
            className="text-4xl md:text-6xl font-black tracking-tight atomic-text" 
            data-testid="text-hero-title"
          >
            <span className="text-primary">I AM</span>
            <span className="text-foreground ml-3">ATOMIC</span>
          </h1>
          
          <p className="text-muted-foreground text-lg h-8 overflow-hidden" data-testid="text-hero-subtitle">
            <FallingText text="Shadow Garden Music Downloader" />
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex gap-2 p-2 bg-card rounded-md border border-primary/20 atomic-glow">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search music..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-10 border-0 bg-transparent focus-visible:ring-0"
                  data-testid="input-hero-search"
                />
              </div>
              <Button type="submit" data-testid="button-hero-search">
                <Atom className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
