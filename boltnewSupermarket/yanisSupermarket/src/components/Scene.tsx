import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Shelf } from './Shelf';
import { Floor } from './Floor';
import { Ceiling } from './Ceiling';

export function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const [position, setPosition] = useState(0);
  const [rotation, setRotation] = useState(0);
  const { camera } = useThree();
  
  useFrame((state, delta) => {
    if (cameraRef.current) {
      const moveSpeed = 5;
      const rotateSpeed = 2;
      const keyState = state.gl.domElement.ownerDocument.defaultView;
      
      if (keyState?.document.activeElement?.tagName !== 'INPUT') {
        // Forward/Backward movement
        if (keyState?.document.querySelector('[data-key="ArrowUp"]')?.ariaPressed === 'true') {
          setPosition((prev) => Math.min(prev + moveSpeed * delta * Math.cos(rotation), 20));
        }
        if (keyState?.document.querySelector('[data-key="ArrowDown"]')?.ariaPressed === 'true') {
          setPosition((prev) => Math.max(prev - moveSpeed * delta * Math.cos(rotation), -1));
        }
        
        // Left/Right rotation
        if (keyState?.document.querySelector('[data-key="ArrowLeft"]')?.ariaPressed === 'true') {
          setRotation((prev) => prev + rotateSpeed * delta);
        }
        if (keyState?.document.querySelector('[data-key="ArrowRight"]')?.ariaPressed === 'true') {
          setRotation((prev) => prev - rotateSpeed * delta);
        }
      }

      // Update camera position and rotation
      camera.position.z = -position;
      camera.rotation.y = rotation;
      camera.updateProjectionMatrix();
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 1.7, 0]}
        fov={75}
        near={0.1}
        far={1000}
      />
      
      {/* Enhanced lighting setup */}
      <ambientLight intensity={0.6} />
      <hemisphereLight
        intensity={0.5}
        color="#ffffff"
        groundColor="#bbbbbb"
      />
      
      {/* Ceiling lights */}
      {Array.from({ length: 8 }).map((_, i) => (
        <group key={i} position={[0, 3, -i * 3]}>
          <pointLight
            intensity={15}
            distance={5}
            decay={2}
            castShadow
          />
          <mesh position={[0, -0.1, 0]}>
            <boxGeometry args={[0.5, 0.1, 0.5]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}

      {/* Floor */}
      <Floor />

      {/* Ceiling */}
      <Ceiling />

      {/* Left shelves */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Shelf
          key={`left-${i}`}
          position={[-2, 0, -i * 4]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}

      {/* Right shelves */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Shelf
          key={`right-${i}`}
          position={[2, 0, -i * 4]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      ))}
    </>
  );
}