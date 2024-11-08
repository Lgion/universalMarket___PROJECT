import { ShoppingCart, X, Plus, Minus } from 'lucide-react';
import { useStore } from '../../store/useStore';

export function Cart() {
  const cart = useStore((state) => state.cart);
  const removeFromCart = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed top-4 right-4 w-96 bg-white rounded-lg shadow-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <ShoppingCart className="w-6 h-6" />
          Cart
        </h2>
        <span className="text-sm text-gray-500">
          {cart.length} items
        </span>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {cart.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center justify-between py-2 border-b"
          >
            <div className="flex items-center gap-2">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <h3 className="font-medium">{item.product.name}</h3>
                <p className="text-sm text-gray-500">
                  ${item.product.price.toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(item.product.id, Math.max(0, item.quantity - 1))
                }
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
                className="p-1 hover:bg-gray-100 rounded"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => removeFromCart(item.product.id)}
                className="p-1 hover:bg-gray-100 rounded text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold">Total:</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => alert('Checkout functionality coming soon!')}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}