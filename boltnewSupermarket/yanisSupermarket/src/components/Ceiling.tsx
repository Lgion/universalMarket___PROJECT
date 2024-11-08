import * as THREE from 'three';

export function Ceiling() {
  return (
    <mesh position={[0, 3.5, -15]} rotation={[Math.PI / 2, 0, 0]}>
      <planeGeometry args={[6, 30]} />
      <meshStandardMaterial color="#e5e5e5" side={THREE.DoubleSide} />
    </mesh>
  );
}