import React from 'react';
import { useFrame } from '@react-three/fiber';

export const Hands = () => {
  const leftHandRef = React.useRef<THREE.Mesh>(null);
  const rightHandRef = React.useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Add subtle hand movement animation
    if (leftHandRef.current && rightHandRef.current) {
      const t = state.clock.getElapsedTime();
      leftHandRef.current.position.y = Math.sin(t * 2) * 0.05 + 0.7;
      rightHandRef.current.position.y = Math.sin(t * 2 + Math.PI) * 0.05 + 0.7;
    }
  });

  return (
    <group position={[0, 0, 0.3]}>
      {/* Left Hand */}
      <mesh ref={leftHandRef} position={[-0.25, 0.7, 0]} castShadow>
        <boxGeometry args={[0.08, 0.15, 0.04]} />
        <meshStandardMaterial color="#ffdbac" />
        {/* Fingers */}
        <mesh position={[0, -0.08, 0]} castShadow>
          <boxGeometry args={[0.08, 0.05, 0.04]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
      </mesh>

      {/* Right Hand */}
      <mesh ref={rightHandRef} position={[0.25, 0.7, 0]} castShadow>
        <boxGeometry args={[0.08, 0.15, 0.04]} />
        <meshStandardMaterial color="#ffdbac" />
        {/* Fingers */}
        <mesh position={[0, -0.08, 0]} castShadow>
          <boxGeometry args={[0.08, 0.05, 0.04]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
      </mesh>
    </group>
  );
};