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
    <form onSubmit={handleSubmit} className={`w-full ${className} group`}>
      <div className={`relative flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-2 transition-all duration-500 hover:shadow-primary/40 ${
        isFocused ? 'shadow-primary/40 border-primary/50 scale-[1.03] bg-white/15' : 'hover:border-white/30 hover:bg-white/12'
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
        
        <div className="relative flex items-center justify-center w-12 h-14 ml-2">
          <Search className={`w-5 h-5 transition-all duration-500 ${
            isFocused ? 'text-primary scale-125 rotate-12' : 'text-muted-foreground group-hover:scale-110'
          }`} data-testid="icon-search" />
          {isFocused && (
            <div className="absolute inset-0 bg-primary/30 blur-xl rounded-full animate-pulse" />
          )}
        </div>
        
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 h-14 px-2 text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/40 text-white transition-all duration-300"
          data-testid="input-search"
        />
        
        <Button 
          type="submit"
          size="lg"
          className="h-14 px-8 rounded-xl font-semibold bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/95 hover:via-primary/85 hover:to-primary/75 shadow-xl shadow-primary/40 hover:shadow-2xl hover:shadow-primary/60 transition-all duration-500 hover:scale-110 gap-2 animate-pulse hover:animate-none relative overflow-hidden group/btn"
          data-testid="button-search"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
          <Sparkles className="w-4 h-4 group-hover/btn:rotate-180 transition-transform duration-500" />
          Rechercher
        </Button>
      </div>
    </form>
  );
}
