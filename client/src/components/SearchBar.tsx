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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="relative flex items-center gap-2 bg-card border border-border rounded-2xl shadow-xl p-2">
        <Search className="absolute left-6 w-6 h-6 text-muted-foreground" data-testid="icon-search" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 h-14 pl-14 pr-4 text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
          data-testid="input-search"
        />
        <Button 
          type="submit"
          size="lg"
          className="h-14 px-8 rounded-xl font-semibold"
          data-testid="button-search"
        >
          Rechercher
        </Button>
      </div>
    </form>
  );
}
