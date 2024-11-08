import { Scene } from './components/Scene';
import { Cart } from './components/UI/Cart';
import { ProductDetails } from './components/UI/ProductDetails';

function App() {
  return (
    <div className="w-full h-screen overflow-hidden">
      <Scene />
      <div className="absolute inset-0 pointer-events-none">
        <div className="pointer-events-auto">
          <Cart />
          <ProductDetails />
        </div>
      </div>
    </div>
  );
}

export default App;