import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture } from '@react-three/drei';
import { useStore } from '../store/useStore';
import type { Product } from '../types/product';

interface Product3DProps {
  product: Product;
}

export function Product3D({ product }: Product3DProps) {
  const meshRef = useRef();
  const setSelectedProduct = useStore((state) => state.setSelectedProduct);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group
      position={product.position}
      rotation={product.rotation}
      scale={product.scale}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedProduct(product);
      }}
    >
      <mesh ref={meshRef} castShadow receiveShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          roughness={0.5}
          metalness={0.1}
        />
        <Html
          position={[0, 1.5, 0]}
          className="pointer-events-none"
          center
          distanceFactor={8}
        >
          <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            <p className="text-sm font-bold whitespace-nowrap">{product.name}</p>
            <p className="text-xs text-blue-600 font-semibold">${product.price.toFixed(2)}</p>
          </div>
        </Html>
      </mesh>
    </group>
  );
}