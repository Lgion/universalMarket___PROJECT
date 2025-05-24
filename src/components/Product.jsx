import React from "react";
import { Sphere } from "@react-three/drei";

export default function Product({ position, color, onClick }) {
  return (
    <Sphere args={[0.3, 32, 32]} position={position} onClick={onClick} castShadow>
      <meshStandardMaterial attach="material" color={color} />
    </Sphere>
  );
}
