import React from 'react';
import RaycastView from './RaycastView';

type ViewType = 'aisle' | 'shelf' | 'cart';

interface StoreViewProps {
  currentView: ViewType;
}

const StoreView: React.FC<StoreViewProps> = ({ currentView }) => {
  return (
    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/25 backdrop-blur-sm border border-white/10">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10" />
      
      <div className="relative h-full flex items-center justify-center">
        {currentView === 'aisle' && <RaycastView active={true} />}
        
        {currentView === 'shelf' && (
          <div className="grid grid-cols-3 gap-8 p-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 transform hover:scale-105 transition-transform cursor-pointer"
              >
                <div className="aspect-square rounded-lg bg-white/10 mb-4" />
                <h3 className="text-white font-medium">Shelf {i + 1}</h3>
                <p className="text-white/75 text-sm">Various products</p>
              </div>
            ))}
          </div>
        )}

        {currentView === 'cart' && (
          <div className="text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            <p>Your cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreView;