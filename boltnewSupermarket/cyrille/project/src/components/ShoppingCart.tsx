import React from 'react';

export const ShoppingCart = () => {
  return (
    <group position={[0, 0, 0.5]} scale={[1, 1, 1]}>
      {/* Cart base */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[0.8, 0.8, 1.2]} />
        <meshStandardMaterial color="#666666" />
      </mesh>

      {/* Cart handle */}
      <mesh castShadow receiveShadow position={[0, 1, -0.4]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Handle supports */}
      <mesh castShadow receiveShadow position={[-0.3, 0.7, -0.4]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#444444" />
      </mesh>
      <mesh castShadow receiveShadow position={[0.3, 0.7, -0.4]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#444444" />
      </mesh>

      {/* Wheels */}
      {[[-0.3, 0, 0.4], [0.3, 0, 0.4], [-0.3, 0, -0.4], [0.3, 0, -0.4]].map((pos, i) => (
        <mesh key={i} castShadow receiveShadow position={pos}>
          <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#333333" />
        </mesh>
      ))}
    </group>
  );
};