import React from 'react';

export const Supermarket = () => {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      {/* Shelves - Left Side */}
      {Array.from({ length: 5 }).map((_, i) => (
        <group key={`left-${i}`} position={[-5, 1.5, -5 + i * 3]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.5, 3, 2]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Products on shelves */}
          {Array.from({ length: 3 }).map((_, j) => (
            <mesh
              key={`product-left-${i}-${j}`}
              position={[0, -0.5 + j, 0]}
              castShadow
            >
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial color={`hsl(${Math.random() * 360}, 70%, 50%)`} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Shelves - Right Side */}
      {Array.from({ length: 5 }).map((_, i) => (
        <group key={`right-${i}`} position={[5, 1.5, -5 + i * 3]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.5, 3, 2]} />
            <meshStandardMaterial color="#8B4513" />
          </mesh>
          {/* Products on shelves */}
          {Array.from({ length: 3 }).map((_, j) => (
            <mesh
              key={`product-right-${i}-${j}`}
              position={[0, -0.5 + j, 0]}
              castShadow
            >
              <boxGeometry args={[0.3, 0.3, 0.3]} />
              <meshStandardMaterial color={`hsl(${Math.random() * 360}, 70%, 50%)`} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};