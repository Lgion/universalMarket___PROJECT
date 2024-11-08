import React from 'react';
import { Star, Trophy, Map } from 'lucide-react';
import GameCard from './GameCard';

const GameSection: React.FC = () => {
  return (
    <div className="mt-8 grid grid-cols-3 gap-4">
      <GameCard
        icon={Star}
        title="Daily Quest"
        description="Visit 3 different aisles"
        progress={33}
      />
      <GameCard
        icon={Trophy}
        title="Leaderboard"
        description="Rank #42 this week"
      />
      <GameCard
        icon={Map}
        title="Treasure Hunt"
        description="2 hidden items nearby"
      />
    </div>
  );
};

export default GameSection;