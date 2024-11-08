import React from 'react';
import { Search, Mic } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="relative flex-1 max-w-xl">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full bg-white/5 border border-white/20 rounded-lg py-2 pl-10 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder="Search products..."
      />
      <Search className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
      <Mic className="absolute right-3 top-2.5 h-5 w-5 text-white/50 cursor-pointer hover:text-white/75 transition-colors" />
    </div>
  );
};

export default SearchBar;