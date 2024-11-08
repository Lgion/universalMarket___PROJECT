import { useTexture } from '@react-three/drei';

interface ProductProps {
  position: [number, number, number];
  size: [number, number, number];
  imageUrl: string;
  priceTag?: string;
}

export function Product({ position, size, imageUrl, priceTag = "2.99€" }: ProductProps) {
  const texture = useTexture(imageUrl);

  return (
    <group position={position}>
      {/* Produit avec image */}
      <mesh castShadow position={[0, size[1]/2, 0]}>
        <boxGeometry args={size} />
        <meshStandardMaterial map={texture} roughness={0.3} metalness={0.1} />
      </mesh>
      
      {/* Étiquette de prix */}
      <mesh position={[0.25, 0.02, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[0.15, 0.1]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
}