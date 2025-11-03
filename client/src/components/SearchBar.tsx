import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ 
  onSearch, 
  placeholder = "Rechercher une chanson, artiste ou album...",
  className = ""
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className={`relative flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-2 transition-all duration-300 ${
        isFocused ? 'shadow-primary/30 border-primary/40 scale-[1.02]' : ''
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative flex items-center justify-center w-12 h-14 ml-2">
          <Search className={`w-5 h-5 transition-all duration-300 ${
            isFocused ? 'text-primary scale-110' : 'text-muted-foreground'
          }`} data-testid="icon-search" />
          {isFocused && (
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full animate-pulse" />
          )}
        </div>
        
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 h-14 px-2 text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 text-white"
          data-testid="input-search"
        />
        
        <Button 
          type="submit"
          size="lg"
          className="h-14 px-8 rounded-xl font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-105 gap-2"
          data-testid="button-search"
        >
          <Sparkles className="w-4 h-4" />
          Rechercher
        </Button>
      </div>
    </form>
  );
}
