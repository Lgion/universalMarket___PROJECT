import { X } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function ProductDetails() {
  const selectedProduct = useStore((state) => state.selectedProduct);
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);
  const addToCart = useStore((state) => state.addToCart);

  if (!selectedProduct) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-96 bg-white rounded-lg shadow-xl p-4">
      <button
        onClick={() => setSelectedProduct(null)}
        className="absolute top-2 right-2 p-1 hover:bg-gray-100 rounded"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex gap-4">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="w-32 h-32 object-cover rounded"
        />
        <div>
          <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
          <p className="text-gray-600 text-sm mt-1">
            {selectedProduct.description}
          </p>
          <p className="text-lg font-bold mt-2">
            ${selectedProduct.price.toFixed(2)}
          </p>
          <button
            onClick={() => addToCart(selectedProduct)}
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}