import React, { useState } from 'react';
import Navbar from './Navigation/Navbar';
import ViewControls from './Store/ViewControls';
import StoreView from './Store/StoreView';
import GameSection from './GameElements/GameSection';

const Store: React.FC = () => {
  const [view, setView] = useState<'aisle' | 'shelf' | 'cart'>('aisle');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ViewControls currentView={view} onViewChange={setView} />
        <StoreView currentView={view} />
        <GameSection />
      </main>
    </div>
  );
};

export default Store;