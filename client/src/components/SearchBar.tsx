import { Search } from "lucide-react";
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
      <div className={`relative flex items-center gap-3 bg-white/10 backdrop-blur-md border rounded-full px-2 transition-all duration-300 ${
        isFocused 
          ? 'border-primary/60 bg-white/15 shadow-lg shadow-primary/20' 
          : 'border-white/20 hover:border-white/30'
      }`}>
        <div className="pl-4">
          <Search className={`w-5 h-5 transition-colors duration-300 ${
            isFocused ? 'text-primary' : 'text-white/60'
          }`} data-testid="icon-search" />
        </div>
        
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 h-14 px-2 text-base border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/50 text-white"
          data-testid="input-search"
        />
        
        <Button 
          type="submit"
          size="default"
          className="rounded-full font-medium"
          data-testid="button-search"
        >
          Rechercher
        </Button>
      </div>
    </form>
  );
}
