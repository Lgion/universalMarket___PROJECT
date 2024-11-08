import * as THREE from 'three';

export function Floor() {
  const geometry = new THREE.PlaneGeometry(6, 30);
  const material = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.3,
    metalness: 0.2,
  });

  return (
    <group>
      {/* Main floor */}
      <mesh
        geometry={geometry}
        material={material}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, -15]}
        receiveShadow
      />
      
      {/* Guide lines */}
      <mesh position={[0, 0.01, -15]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.1, 30]} />
        <meshBasicMaterial color="#999999" />
      </mesh>
      
      {/* Distance markers */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, 0.01, -i * 5]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[2, 0.1]} />
          <meshBasicMaterial color="#999999" />
        </mesh>
      ))}
    </group>
  );
}