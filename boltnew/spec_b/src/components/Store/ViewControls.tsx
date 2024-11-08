import React from 'react';

type ViewType = 'aisle' | 'shelf' | 'cart';

interface ViewControlsProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

const ViewControls: React.FC<ViewControlsProps> = ({ currentView, onViewChange }) => {
  return (
    <div className="flex justify-center mb-8 space-x-4">
      {(['aisle', 'shelf', 'cart'] as const).map((view) => (
        <button
          key={view}
          onClick={() => onViewChange(view)}
          className={`px-6 py-2 rounded-lg font-medium transition-colors ${
            currentView === view
              ? 'bg-purple-500 text-white'
              : 'bg-white/5 text-white/75 hover:bg-white/10'
          }`}
        >
          {view.charAt(0).toUpperCase() + view.slice(1)} View
        </button>
      ))}
    </div>
  );
};

export default ViewControls;