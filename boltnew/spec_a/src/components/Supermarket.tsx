import { useRef } from 'react';
import { Shelf } from './Shelf';
import { products } from '../data/products';

export function Supermarket() {
  const groupRef = useRef();

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <Shelf 
        position={[0, 0, 0]} 
        rotation={[0, 0, 0]} 
        products={products}
      />
      
      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.1, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Ambient lighting for better visibility */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 4, 0]} intensity={0.5} castShadow />
    </group>
  );
}