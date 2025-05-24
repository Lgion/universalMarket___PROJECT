import React from "react";
import { Box, Text } from "@react-three/drei";

export default function Gondola({ position, color, onClick, label }) {
  return (
    <group position={position}>
      <Box args={[1, 3, 4]} onClick={onClick} castShadow receiveShadow>
        <meshStandardMaterial attach="material" color={color} />
      </Box>
      {/* Etiquette de la gondole */}
      <mesh position={[.55, 1.7, 0]} rotation={[0, Math.PI/2, 0]}>
        <planeGeometry args={[4, .5]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      {/* Label text sur l'étiquette */}
      {label && (
        <>
          {/* Le texte est positionné juste au-dessus de l'étiquette pour éviter le z-fighting */}
          <Text
            position={[.55, 1.71, 0]}
            rotation={[0, Math.PI/2, 0]}
            fontSize={0.28}
            color="#fff"
            anchorX="center"
            anchorY="middle"
            maxWidth={3.6}
          >
            {label}
          </Text>
        </>
      )}
    </group>
  );
}
