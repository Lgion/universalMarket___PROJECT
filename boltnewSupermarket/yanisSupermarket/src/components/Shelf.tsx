import { useRef } from 'react';
import * as THREE from 'three';
import { Product } from './Product';

const PRODUCTS_DATA = [
  {
    name: "Céréales",
    size: [0.2, 0.3, 0.15],
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=128"
  },
  {
    name: "Conserve",
    size: [0.15, 0.2, 0.15],
    image: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=128"
  },
  {
    name: "Pâtes",
    size: [0.2, 0.25, 0.1],
    image: "https://images.unsplash.com/photo-1551462147-ff29053bfc14?auto=format&fit=crop&w=128"
  },
  {
    name: "Sauce",
    size: [0.15, 0.25, 0.15],
    image: "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=128"
  }
];

interface ShelfProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

export function Shelf({ position, rotation }: ShelfProps) {
  const shelfRef = useRef<THREE.Group>(null);

  return (
    <group ref={shelfRef} position={position} rotation={rotation}>
      {/* Structure principale */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 3, 2]} />
        <meshStandardMaterial color="#666666" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Étagères */}
      {Array.from({ length: 4 }).map((_, shelfLevel) => (
        <group key={shelfLevel} position={[0.3, 0.5 + shelfLevel * 0.8, 0]}>
          {/* Planche de l'étagère */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.6, 0.05, 2]} />
            <meshStandardMaterial color="#888888" roughness={0.5} metalness={0.2} />
          </mesh>
          
          {/* Produits fixes */}
          {PRODUCTS_DATA.map((product, index) => (
            <Product
              key={`${shelfLevel}-${index}`}
              position={[0, 0.1, -0.75 + index * 0.5]}
              size={product.size}
              imageUrl={product.image}
              priceTag={`${(2.99 + shelfLevel + index).toFixed(2)}€`}
            />
          ))}
        </group>
      ))}
    </group>
  );
}