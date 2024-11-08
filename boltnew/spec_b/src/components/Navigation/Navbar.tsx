import React from 'react';
import { ShoppingCart, Trophy } from 'lucide-react';
import SearchBar from './SearchBar';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="bg-white/10 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-white">VirtualMart</h1>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <ShoppingCart className="h-6 w-6 text-white" />
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
              <Trophy className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;