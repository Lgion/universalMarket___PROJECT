import { useRef } from 'react';
import type { Product } from '../types/product';
import { Product3D } from './Product3D';

interface ShelfProps {
  position: [number, number, number];
  rotation: [number, number, number];
  products: Product[];
}

export function Shelf({ position, rotation, products }: ShelfProps) {
  const shelfRef = useRef();

  return (
    <group position={position} rotation={rotation} ref={shelfRef}>
      {/* Main shelf surface */}
      <mesh
        castShadow
        receiveShadow
        position={[0, 1, 0]}
      >
        <boxGeometry args={[6, 0.2, 2]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Shelf supports */}
      <mesh position={[-2.8, 0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 1, 2]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[2.8, 0.5, 0]} castShadow>
        <boxGeometry args={[0.2, 1, 2]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      
      {/* Products */}
      {products.map((product) => (
        <Product3D key={product.id} product={product} />
      ))}
    </group>
  );
}