
import React, { useState } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onLocationSelect: (location: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock suggestions - in a real app, this would come from an API
  const mockSuggestions = [
    'Paris, France',
    'Tokyo, Japan', 
    'New York, USA',
    'London, UK',
    'Sydney, Australia',
    'Dubai, UAE',
    'Mumbai, India',
    'Barcelona, Spain',
    'Cape Town, South Africa',
    'Rio de Janeiro, Brazil'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 1) {
      const filtered = mockSuggestions.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    onLocationSelect(suggestion);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsSearching(true);
      // Simulate API call
      setTimeout(() => {
        setIsSearching(false);
        onLocationSelect(query);
        setShowSuggestions(false);
      }, 1000);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {isSearching ? (
              <Loader2 className="h-5 w-5 text-gray-600 dark:text-foreground/60 animate-spin" />
            ) : (
              <Search className="h-5 w-5 text-gray-600 dark:text-foreground/60" />
            )}
          </div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for cities, countries, or places..."
            className="w-full pl-12 pr-4 py-4 bg-white/30 dark:bg-background/20 backdrop-blur-lg border border-gray-300/50 dark:border-white/30 rounded-2xl text-gray-800 dark:text-foreground placeholder-gray-600 dark:placeholder-foreground/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-white/50 focus:border-transparent transition-all duration-300"
            onFocus={() => query.length > 1 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/30 dark:bg-background/20 backdrop-blur-lg border border-gray-300/50 dark:border-white/30 rounded-2xl shadow-xl z-50 overflow-hidden animate-fade-in">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full px-4 py-3 text-left text-gray-800 dark:text-foreground hover:bg-white/20 dark:hover:bg-background/10 transition-colors duration-200 flex items-center space-x-3 border-b border-gray-300/30 dark:border-white/10 last:border-b-0"
            >
              <MapPin className="h-4 w-4 text-gray-600 dark:text-foreground/60" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      {/* Popular Searches */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {['Tokyo', 'Paris', 'New York', 'London', 'Dubai'].map((city) => (
          <button
            key={city}
            onClick={() => handleSuggestionClick(`${city}, ${city === 'Tokyo' ? 'Japan' : city === 'Paris' ? 'France' : city === 'New York' ? 'USA' : city === 'London' ? 'UK' : 'UAE'}`)}
            className="px-3 py-1 bg-white/20 dark:bg-background/10 hover:bg-white/30 dark:hover:bg-background/20 backdrop-blur-sm border border-gray-300/30 dark:border-white/20 rounded-full text-gray-700 dark:text-foreground/80 text-sm transition-all duration-200 hover:scale-105"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};
