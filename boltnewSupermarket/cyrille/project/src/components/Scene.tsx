import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store';
import { ShoppingCart } from './ShoppingCart';
import { Hands } from './Hands';
import { Supermarket } from './Supermarket';

const Scene = () => {
  const playerRef = useRef<THREE.Group>(null);
  const { position, rotation } = useStore();

  useFrame(() => {
    if (playerRef.current) {
      playerRef.current.position.x = position.x;
      playerRef.current.position.z = position.z;
      playerRef.current.rotation.y = rotation;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <group ref={playerRef}>
        <ShoppingCart />
        <Hands />
      </group>

      <Supermarket />
    </>
  );
};

export default Scene;