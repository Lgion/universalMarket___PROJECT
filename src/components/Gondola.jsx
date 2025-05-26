import React from "react";
import { Box, Text } from "@react-three/drei";
import { boissons } from "../data/Objects.js";
// --- Composant interactif minimal pour un produit boissons ---
import { useState } from "react";
import { a, useSpring } from "@react-spring/three";

// Composant Gondola : représente une gondole creuse orientée correctement dans la scène
// - position : position 3D de la gondole dans la scène
// - color : couleur principale de la gondole
// - onClick : callback lors d'un clic sur la structure
// - label : texte affiché sur l'étiquette en façade
// width : largeur dynamique de la gondole (dépend du nombre de sous-catégories)
// Ajout d'une prop subcategories pour afficher les colonnes
export default function Gondola({ position, color, onClick, label, width = 1, subcategories = [], onAddToCart }) {
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

      // --- Colonnes de sous-catégories (visualisation largeur + produits) ---
      {subcategories && subcategories.length > 0 && subcategories.map((sc, idx) => {
        // Calcul de la position X de la colonne (réparties uniformément)
        const colWidth = width / subcategories.length;
        const x = -width/2 + colWidth/2 + idx * colWidth;
        // Récupère les produits de la sous-catégorie (clé normalisée)
        const sousCatKey = sc.nom
          .toLowerCase()
          .normalize("NFD").replace(/\p{Diacritic}/gu, "")
          .replace(/\s+/g, "-");
        const produitsObj = boissons[sousCatKey] || {};
        const produitKeys = Object.keys(produitsObj);
        return (
          <group key={sc.nom}>
            {/* Colonne verticale colorée */}
            <mesh position={[x, 0, 0]}>
              <boxGeometry args={[colWidth * 0.8, 3.6, 1.5]} />
              <meshStandardMaterial color={"idx % 2 === 0 ? '#bada55' : '#55aaff'"} opacity={0.7} transparent />
            </mesh>
            {/* Nom de la sous-catégorie EN HAUT de la colonne avec fond noir */}
            <group>
              {/* Fond noir */}
              <mesh position={[x, 2.05, 0.95]}>
                <planeGeometry args={[colWidth * 0.9, 0.28]} />
                <meshBasicMaterial color="#000" />
              </mesh>
              {/* Texte blanc */}
              <Text
                position={[x, 1.85, 1]}
                fontSize={0.22}
                color="#fff"
                anchorX="center"
                anchorY="bottom"
                maxWidth={colWidth * 0.9}
              >
                {sc.nom}
              </Text>
            </group>
            {/* Affichage vertical des produits de la sous-catégorie */}
            {produitKeys.map((prodKey, rowIdx) => (
              <BoissonProduct3D
                key={prodKey}
                produit={produitsObj[prodKey]}
                position={[x, 1.5 - rowIdx * 0.7, 0.8]}
                onAddToCart={typeof onAddToCart === 'function' ? onAddToCart : undefined}
              />
            ))}
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


function BoissonProduct3D({ produit, position, onAddToCart = () => {} }) {
  const [step, setStep] = useState(0); // 0=produit, 1=marque, 2=format
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const { rotationY } = useSpring({ rotationY: step * Math.PI / 2 });

  // Gestion du clic principal
  const handleClick = () => {
    if (step === 0) setStep(1);
    else if (step === 1 && selectedBrand) setStep(2);
  };

  // Clic sur format = ajout au panier
  const handleAddToCart = (format) => {
    setSelectedFormat(format);
    onAddToCart({ produit, brand: selectedBrand, format });
    // Reset pour éviter le double ajout
    setStep(0);
    setSelectedBrand(null);
    setSelectedFormat(null);
  };



  // Affichage dynamique
  let display = null;
  if (step === 0) {
    // Affiche le produit (image ou cube avec nom)
    display = (
      <mesh onClick={handleClick} position={[0,0,0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.3]} />
        <meshStandardMaterial color="#fff8e1" />
        {/* Image produit si dispo */}
        {/* Optionnel: <Image ... /> */}
        <Text position={[0,0,0.18]} fontSize={0.15} color="#333" anchorX="center" anchorY="middle">
          {produit.label}
        </Text>
      </mesh>
    );
  } else if (step === 1) {
    // Affiche les marques (boutons cliquables)
    display = produit.brands.map((brand, i) => (
      <mesh
        key={brand.bLabel}
        position={[0, 0.25 - i*0.3, 0]}
        onClick={() => { setSelectedBrand(brand); setStep(2); }}
        castShadow
      >
        <boxGeometry args={[0.5, 0.22, 0.25]} />
        <meshStandardMaterial color="#e1f5fe" />
        <Text position={[0,0,0.14]} fontSize={0.11} color="#01579b" anchorX="center" anchorY="middle">
          {brand.bLabel}
        </Text>
      </mesh>
    ));
  } else if (step === 2 && selectedBrand) {
    // Affiche les formats (boutons cliquables)
    display = selectedBrand.formats.map((format, i) => (
      <mesh
        key={format.lFormat}
        position={[0, 0.25 - i*0.22, 0]}
        onClick={e => { e.stopPropagation(); handleAddToCart(format); }}
        castShadow
      >
        <boxGeometry args={[0.35, 0.16, 0.18]} />
        <meshStandardMaterial color="#ffe0b2" />
        <Text position={[0,0,0.1]} fontSize={0.09} color="#bf360c" anchorX="center" anchorY="middle">
          {format.lFormat}L - {format.pPrix}€
        </Text>
      </mesh>
    ));
  }

  return (
    // <a.group position={position} rotation-y={rotationY}>
    <a.group position={position}>
      {display}
    </a.group>
  );
}
