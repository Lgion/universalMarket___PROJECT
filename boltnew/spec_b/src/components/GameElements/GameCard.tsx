import React from 'react';
import { LucideIcon } from 'lucide-react';

interface GameCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  progress?: number;
}

const GameCard: React.FC<GameCardProps> = ({ icon: Icon, title, description, progress }) => {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
      <div className="flex items-center space-x-2 mb-2">
        <Icon className="h-5 w-5 text-yellow-400" />
        <h3 className="text-white font-medium">{title}</h3>
      </div>
      <p className="text-white/75 text-sm">{description}</p>
      {progress !== undefined && (
        <div className="mt-2 w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-purple-500 rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default GameCard;