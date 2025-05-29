import React from "react";
import { Box, Text, Html } from "@react-three/drei";
import * as products from "../data/Objects.js";
// --- Composant interactif minimal pour un produit boissons ---

// Style pour le bouton panier 3D
// À placer dans le SCSS global si pas de CSS-in-JS
/*
.btn-panier-3d {
  background: #fff;
  color: #d32f2f;
  border: 2px solid #d32f2f;
  border-radius: 50%;
  font-size: 1.15em;
  font-weight: bold;
  width: 2.1em;
  height: 2.1em;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(211,47,47,0.12);
  cursor: pointer;
  transition: background 0.15s, color 0.15s, transform 0.15s;
  margin-left: 0.5em;
}
.btn-panier-3d:hover, .btn-panier-3d:focus {
  background: #d32f2f;
  color: #fff;
  transform: scale(1.13);
  outline: none;
}
*/
import { useState } from "react";
import { a, useSpring } from "@react-spring/three";


// const products = {boissons, viandes}


// Composant Gondola : représente une gondole creuse orientée correctement dans la scène
// - position : position 3D de la gondole dans la scène
// - color : couleur principale de la gondole
// - onClick : callback lors d'un clic sur la structure
// - label : texte affiché sur l'étiquette en façade
// width : largeur dynamique de la gondole (dépend du nombre de sous-catégories)
// Ajout d'une prop subcategories pour afficher les colonnes
export default function Gondola({ position, color, onClick, label, width = 1, subcategories = [], onAddToCart, productLabel }) {
  const produitsData = products[productLabel]
  
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
        const produitsObj = produitsData[sousCatKey] || {};
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
  const [step, setStep] = useState(0); // 0=produit, 1=marque, 2=format, 3=prix/qty
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState(null);
  const { rotationY } = useSpring({ rotationY: step * Math.PI / 2 });

  // Gestion du clic principal
  const handleClick = () => {
    if (step === 0) setStep(1);
    else if (step === 1 && selectedBrand) setStep(2);
  };

  // Affichage dynamique
  // Bandeau récapitulatif des choix précédents
  let display = null;
  let recap = null;
  if (step > 0) {
    recap = (
      <Html center position={[0,0.45,0]} zIndex={10} occlude={false}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.35em',
          background: 'rgba(255,255,255,0.92)',
          borderRadius: '22px',
          boxShadow: '0 2px 12px rgba(60,60,90,0.10)',
          padding: '0.25em 1.1em',
          fontSize: '1em',
          fontWeight: 500,
          minHeight: '2.1em',
          marginBottom: '0.15em',
        }}>
          <span className="recap-pill" style={{background: step===0 ? '#1976d2':'#e3f2fd', color: step===0 ? '#fff':'#1976d2', borderRadius: '14px', padding: '0.2em 0.9em', fontWeight: 600}}>
            {produit.label}
          </span>
          {step > 1 && selectedBrand && (
            <>
              <span style={{color:'#bdbdbd',fontWeight:700}}>&rarr;</span>
              <span className="recap-pill" style={{background: step===1 ? '#1976d2':'#e3f2fd', color: step===1 ? '#fff':'#1976d2', borderRadius: '14px', padding: '0.2em 0.9em', fontWeight: 600}}>
                {selectedBrand.bLabel}
              </span>
            </>
          )}
          {step > 2 && selectedFormat && (
            <>
              <span style={{color:'#bdbdbd',fontWeight:700}}>&rarr;</span>
              <span className="recap-pill" style={{background: step===2 ? '#1976d2':'#e3f2fd', color: step===2 ? '#fff':'#1976d2', borderRadius: '14px', padding: '0.2em 0.9em', fontWeight: 600}}>
                {selectedFormat.lFormat}L
              </span>
            </>
          )}
        </div>
      </Html>
    );
  }

  if (step === 0) {
    // Affiche le produit (image si dispo, sinon cube avec nom)
    const img = produit.images && produit.images[0] && [
      'coca.png','fanta.png','jin.png','jus_pomme.png','oasis.png','rhum.png','vodka.png','wiskey.png'
    ].includes(produit.images[0]) ? produit.images[0] : null;
    display = (
      <mesh onClick={handleClick} position={[0,0,0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.3]} />
        <meshStandardMaterial color="#fff8e1" />
        {img ? (
          <Html center position={[0,0,0.19]} zIndex={10} billboard distanceFactor={1.6}>
            <div
              style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',cursor:'pointer'}}
              onClick={e => { e.stopPropagation(); handleClick(); }}
              title={produit.label}
            >
              <img src={`/src/public/${img}`} alt={produit.label} style={{width:'5.2em',height:'5.2em',objectFit:'contain',borderRadius:'10px',boxShadow:'0 2px 10px rgba(0,0,0,0.13)'}} />
              <span style={{fontSize:'0.62em',color:'#333',fontWeight:600,marginTop:'0.09em',textShadow:'0 1px 3px #fff'}}> {produit.label} </span>
            </div>
          </Html>
        ) : (
          <Text position={[0,0,0.18]} fontSize={0.15} color="#333" anchorX="center" anchorY="middle">
            {produit.label}
          </Text>
        )}
      </mesh>
    );
  } else if (step === 1) {
    // Affiche les marques (boutons cliquables)
    display = (
      <>
        {produit.brands.map((brand, i) => (
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
        ))}
        <Html center position={[0,-0.45,0]}>
          <button className="btn-retour-3d" onClick={e => { e.stopPropagation(); setStep(0); setSelectedBrand(null); setSelectedFormat(null); }}>
            ← Retour
          </button>
        </Html>
      </>
    );
  } else if (step === 2 && selectedBrand) {
    // Affiche les formats (boutons cliquables, nouvelle étape)
    display = (
      <>
        {selectedBrand.formats.map((format, i) => (
          <mesh
            key={format.lFormat}
            position={[0, 0.25 - i*0.22, 0]}
            onClick={e => { e.stopPropagation(); setSelectedFormat(format); setStep(3); }}
            castShadow
          >
            <boxGeometry args={[0.35, 0.16, 0.18]} />
            <meshStandardMaterial color="#ffe0b2" />
            <Text position={[0,0,0.1]} fontSize={0.09} color="#bf360c" anchorX="center" anchorY="middle">
              {format.lFormat}
            </Text>
          </mesh>
        ))}
        <Html center position={[0,-0.45,0]}>
          <button className="btn-retour-3d" onClick={e => { e.stopPropagation(); setStep(1); setSelectedFormat(null); }}>
            ← Retour
          </button>
        </Html>
      </>
    );
  } else if (step === 3 && selectedBrand && selectedFormat) {
    // Affiche le prix, input quantité et bouton panier pour le format sélectionné
    display = (
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.35, 0.16, 0.18]} />
        <meshStandardMaterial color="#ffe0b2" />
        <Text position={[0,0,0.1]} fontSize={0.09} color="#bf360c" anchorX="center" anchorY="middle">
          {selectedFormat.lFormat}L - {selectedFormat.pPrix}€
        </Text>
        <Html center position={[0,0,0.15]}>
          <div style={{display:'flex',alignItems:'center',gap:'0.4em'}}>
            <input
              type="number"
              min={1}
              max={selectedFormat?.dispo?.qte > 0 ? selectedFormat.dispo.qte : 1}
              defaultValue={1}
              className="cart-qty-input"
              style={{width:'2.4em',marginRight:'0.2em'}}
              aria-label="Quantité"
              onClick={e => e.stopPropagation()}
              id={`input-qty-${selectedFormat.lFormat}`}
              disabled={selectedFormat?.dispo?.qte <= 0}
              placeholder={selectedFormat?.dispo?.qte <= 0 ? 'Rupture' : undefined}
            />
            <button
              className="btn-panier-3d"
              title="Ajouter au panier"
              disabled={selectedFormat?.dispo?.qte <= 0}
              onClick={e => {
                e.stopPropagation();
                const input = document.getElementById(`input-qty-${selectedFormat.lFormat}`);
                let qty = 1;
                const max = selectedFormat?.dispo?.qte > 0 ? selectedFormat.dispo.qte : 1;
                if (input && input.value) {
                  qty = Math.max(1, Math.min(max, parseInt(input.value) || 1));
                }
                // Ajoute au panier avec la quantité
                onAddToCart({ produit, brand: selectedBrand, format: selectedFormat, qty });
                // Reset
                setStep(0);
                setSelectedBrand(null);
                setSelectedFormat(null);
              }}
            >
              🛒
            </button>
            {selectedFormat?.dispo?.qte <= 0 && (
              <span style={{color:'#d32f2f',fontWeight:600,marginLeft:'0.5em'}}>Rupture de stock</span>
            )}
            <button
              className="btn-retour-3d"
              style={{marginLeft:'0.7em'}}
              onClick={e => { e.stopPropagation(); setStep(2); }}
            >
              ← Retour
            </button>
          </div>
        </Html>
      </mesh>
    );
  }

  return (
    <a.group position={position}>
      {recap}
      {display}
    </a.group>
  );
}
