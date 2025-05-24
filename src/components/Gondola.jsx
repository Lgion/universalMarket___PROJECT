import React from "react";
import { Box, Text } from "@react-three/drei";

// Composant Gondola : représente une gondole creuse orientée correctement dans la scène
// - position : position 3D de la gondole dans la scène
// - color : couleur principale de la gondole
// - onClick : callback lors d'un clic sur la structure
// - label : texte affiché sur l'étiquette en façade
// width : largeur dynamique de la gondole (dépend du nombre de sous-catégories)
// Ajout d'une prop subcategories pour afficher les colonnes
export default function Gondola({ position, color, onClick, label, width = 1, subcategories = [] }) {
  return (
    // Groupe 3D principal, pivoté pour que la profondeur soit perpendiculaire à l'allée
    <group position={position} rotation={[0, Math.PI / 2, 0]}>
      // --- Structure creuse de la gondole ---

      // Côté gauche vertical (du sol au plafond)
      <mesh 
        // position : [-width/2, 0, 0]
        //   - x = -width/2   → place le côté gauche à l'extrémité gauche de la gondole
        //   - y = 0          → base du côté posée sur le sol
        //   - z = 0          → centré en profondeur
        position={[-width/2, 0, 0]} 
        onClick={onClick} castShadow receiveShadow>
        <boxGeometry 
          // args : [0.1, 4, width]
          //   - 0.1 : épaisseur du côté (très fin)
          //   - 4   : hauteur du côté (touche le sol en y=0 et monte jusqu'à y=4)
          //   - width : profondeur de la gondole
          args={[0.1, 4, 1.5]} 
        />
        <meshStandardMaterial color={color} />
      </mesh>
      // Côté droit vertical (du sol au plafond)
      <mesh position={[width/2, 0, 0]} onClick={onClick} castShadow receiveShadow>
        <boxGeometry args={[0.1, 4, 1.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      // Fond de la gondole (panneau arrière vertical)
      <mesh position={[0, 0, -width/2]} onClick={onClick} castShadow receiveShadow>
        <boxGeometry args={[1, 4, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>

      // --- Colonnes de sous-catégories (visualisation largeur) ---
      {subcategories && subcategories.length > 0 && subcategories.map((sc, idx) => {
        // Calcul de la position X de la colonne (réparties uniformément)
        const colWidth = width / subcategories.length;
        const x = -width/2 + colWidth/2 + idx * colWidth;
        return (
          <group key={sc.nom}>
            {/* Colonne verticale colorée */}
            <mesh position={[x, 0, 0]}>
              <boxGeometry args={[colWidth * 0.8, 3.6, 1.5]} />
              <meshStandardMaterial color={idx % 2 === 0 ? '#bada55' : '#55aaff'} opacity={0.7} transparent />
            </mesh>
            {/* Nom de la sous-catégorie sous la colonne */}
            <Text
              position={[x, -0.3, 0]}
              fontSize={0.22}
              color="#222"
              anchorX="center"
              anchorY="middle"
              maxWidth={colWidth * 0.9}
            >
              {sc.nom}
            </Text>
          </group>
        );
      })}

      // --- Etiquette en façade ---
      // Plan noir servant d'étiquette en façade de la gondole
      <mesh position={[0, 1.7, width/2 + 0.5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[4, .5]} />
        <meshBasicMaterial color="#000" />
      </mesh>
      // Texte du label affiché sur l'étiquette (centré, blanc)
      {label && (
        <>
          {/* Le texte est positionné juste au-dessus de l'étiquette pour éviter le z-fighting */}
          <Text
            position={[0, 1.71, width/2 + 0.51]}
            rotation={[0, 0, 0]}
            fontSize={0.28}
            color="#fff"
            anchorX="center"
            anchorY="middle"
            maxWidth={Math.max(3.6, width)}
          >
            {label}
          </Text>
        </>
      )}
    </group>
  );
}
