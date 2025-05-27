import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { categoriesMeta, loadCategoriesData } from "../data/categories";
import { adsData } from "../data/ads";
import Gondola from "./Gondola";

// Constantes de dimensions (adaptées du JS original)
const AISLE_WIDTH = 10;
const SHELF_DEPTH = 1;
const GONDOLA_HEIGHT = 4;
const GONDOLA_LENGTH = 5;
const GONDOLA_SPACING = .5;
const AD_WIDTH = 2.5;
const AD_HEIGHT = 3;
const HOSTESS_COUNTER_HEIGHT = 1.2;
const HOSTESS_COUNTER_WIDTH = 1.2;
const HOSTESS_COUNTER_DEPTH = 0.7;

function Floor({ length }) {
  // Tapis roulant : bandes noires latérales + bande centrale
  const mainWidth = AISLE_WIDTH;
  const border = 0.35;
  return (
    <group>
      {/* Bande centrale (tapis) */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.02, -length / 2 + 5]} receiveShadow>
        <planeGeometry args={[mainWidth - border * 2, length - 0.1]} />
        <meshStandardMaterial color="#e6e6e6" />
      </mesh>
      {/* Bande noire gauche */}
      <mesh rotation-x={-Math.PI / 2} position={[-(mainWidth / 2) + border / 2, 0.03, -length / 2 + 5]}>
        <planeGeometry args={[border, length]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Bande noire droite */}
      <mesh rotation-x={-Math.PI / 2} position={[(mainWidth / 2) - border / 2, 0.03, -length / 2 + 5]}>
        <planeGeometry args={[border, length]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      {/* Optionnel : lignes blanches fines pour accentuer */}
      <mesh rotation-x={-Math.PI / 2} position={[-(mainWidth / 2) + border + 0.04, 0.031, -length / 2 + 5]}>
        <planeGeometry args={[0.07, length]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh rotation-x={-Math.PI / 2} position={[(mainWidth / 2) - border - 0.04, 0.031, -length / 2 + 5]}>
        <planeGeometry args={[0.07, length]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
    </group>
  );
}


function Wall({ side, length }) {
  // side: -1 (gauche), 1 (droite)
  return (
    <mesh
      position={[
        (AISLE_WIDTH / 2 + SHELF_DEPTH + 0.05) * side,
        (GONDOLA_HEIGHT + 1) / 2,
        -length / 2 + 5,
      ]}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[0.1, GONDOLA_HEIGHT + 1, length]} />
      <meshStandardMaterial color="#b0b0b0" />
    </mesh>
  );
}

function Ceiling({ length }) {
  // Plafond couvrant toute l'allée
  return (
    <mesh position={[0, GONDOLA_HEIGHT + 1, -length / 2 + 5]} receiveShadow>
      <boxGeometry args={[AISLE_WIDTH + SHELF_DEPTH * 2, 0.12, length]} />
      <meshStandardMaterial color="#f9f9f9" />
    </mesh>
  );
}

function CeilingLights({ length }) {
  // Plusieurs luminaires suspendus régulièrement
  const n = Math.max(3, Math.floor(length / 12));
  const lights = [];
  for (let i = 0; i < n; i++) {
    const z = -i * (length / (n - 1)) + 5;
    lights.push(
      <group key={i} position={[0, GONDOLA_HEIGHT + 0.85, z]}>
        {/* Corps du luminaire */}
        <mesh>
          <cylinderGeometry args={[0.25, 0.25, 0.08, 24]} />
          <meshStandardMaterial color="#eeeeee" />
        </mesh>
        {/* Ampoule */}
        <mesh position={[0, -0.07, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#fffbe6" emissive="#fffbe6" emissiveIntensity={0.5} />
        </mesh>
        {/* Lumière réelle */}
        <pointLight intensity={1.3} distance={6} decay={2} color="#fffbe6" castShadow position={[0, -0.1, 0]} />
      </group>
    );
  }
  return <>{lights}</>;
}

function AdPanel({ ad, position }) {
  return (
    <mesh
      position={position}
      rotation={[0, -Math.PI / 2, 0]}
      userData={{ type: "ad", data: ad, name: `Publicité: ${ad.name}` }}
      castShadow
    >
      <planeGeometry args={[AD_WIDTH, AD_HEIGHT]} />
      <meshStandardMaterial color="#ffb347" side={2} />
    </mesh>
  );
}

function HostessCounter({ position }) {
  return (
    <mesh position={position} castShadow>
      <boxGeometry args={[HOSTESS_COUNTER_DEPTH, HOSTESS_COUNTER_HEIGHT, HOSTESS_COUNTER_WIDTH]} />
      <meshStandardMaterial color="#6c757d" />
    </mesh>
  );
}

function SupermarcheScene({ setInfo, categories }) {
  // Calcul de la longueur totale du sol et de l'allée
  const floorLength = (GONDOLA_LENGTH + GONDOLA_SPACING) * categories.length + 10;
  let currentZ = 0;

  return (
    <>
      {/* Sol */}
      <Floor length={floorLength} />
      {/* Murs latéraux */}
      <Wall side={-1} length={floorLength} />
      <Wall side={1} length={floorLength} />
      {/* Mur du fond */}
      <mesh position={[0, (GONDOLA_HEIGHT + 1) / 2, -floorLength + 5]}>
        <boxGeometry args={[AISLE_WIDTH + SHELF_DEPTH * 2, GONDOLA_HEIGHT + 1, 0.15]} />
        <meshStandardMaterial color="#b0b0b0" />
      </mesh>
      {/* Plafond */}
      <Ceiling length={floorLength} />
      {/* Luminaires */}
      <CeilingLights length={floorLength} />
      {/* Gondoles, Ads, Comptoirs hôtesses */}
      {categories.map((category, index) => {
        // Largeur dynamique de la gondole en fonction du nombre de sous-catégories
        const SUBCATEGORY_WIDTH = 1; // Largeur d'une colonne de sous-catégorie
        const sousCategories = category.sousCategories || category.subcategories || [];
        const gondolaWidth = (sousCategories.length || 1) * SUBCATEGORY_WIDTH;
        const gondolaPos = [
          -(AISLE_WIDTH / 2 + SHELF_DEPTH / 2),
          GONDOLA_HEIGHT / 2,
          currentZ - GONDOLA_LENGTH / 2,
        ];
        const adPos = [
          AISLE_WIDTH / 2 + 0.05,
          GONDOLA_HEIGHT / 2,
          currentZ - GONDOLA_LENGTH / 2,
        ];
        const hostessPos = [
          AISLE_WIDTH / 2 + SHELF_DEPTH / 2,
          HOSTESS_COUNTER_HEIGHT / 2,
          currentZ - GONDOLA_LENGTH - GONDOLA_SPACING / 2,
        ];
        const ad = adsData[index];
        const elts = [
          <Gondola
            key={category.categorie || category.name || index}
            position={gondolaPos}
            color={category.color || '#ccc'}
            label={category.categorie || category.name}
            width={gondolaWidth}
            subcategories={sousCategories}
            {...(category.gondolaProps || {})}
          />,
          // <Gondola
          //   key={`gondola-${category.id}`}
          //   position={gondolaPos}
          //   color={category.color}
          //   label={category.name}
          //   onClick={() => setInfo({ type: "gondola", data: category })}
          // />
        ];
        if (ad) {
          elts.push(
            <AdPanel
              key={`ad-${ad.id}`}
              ad={ad}
              position={adPos}
            />
          );
        }
        elts.push(
          <HostessCounter key={`hostess-${index}`} position={hostessPos} />
        );
        currentZ -= GONDOLA_LENGTH + GONDOLA_SPACING;
        return elts;
      })}
    </>
  );
}

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function CameraController() {
  // Etat actuel
  const [z, setZ] = useState(8); // position actuelle
  const [angle, setAngle] = useState(0); // angle actuel
  // Cibles
  const targetZ = useRef(8);
  const targetAngle = useRef(0);
  const targetY = 1;

  // Gestion clavier/molette : modifie uniquement les cibles
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.repeat) return;
      if (e.key === "ArrowUp") {
        targetZ.current = clamp(targetZ.current - 1, -40, 12);
      }
      if (e.key === "ArrowDown") {
        targetZ.current = clamp(targetZ.current + 1, -40, 12);
      }
      if (e.key === "ArrowLeft") targetAngle.current = -70;
      if (e.key === "ArrowRight") targetAngle.current = 70;
      if (e.key === " ") targetAngle.current = 0;
    };
    const handleWheel = (e) => {
      targetZ.current = clamp(targetZ.current + (e.deltaY > 0 ? 1 : -1), -40, 12);
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useFrame(() => {
    setZ((prevZ) => {
      const next = lerp(prevZ, targetZ.current, 0.13);
      if (Math.abs(next - targetZ.current) < 0.01) return targetZ.current;
      return next;
    });
    setAngle((prevAngle) => {
      const next = lerp(prevAngle, targetAngle.current, 0.15);
      if (Math.abs(next - targetAngle.current) < 0.5) return targetAngle.current;
      return next;
    });
  });

  useFrame(({ camera }) => {
    camera.position.set(0, 2, z);
    const rad = (angle * Math.PI) / 180;
    camera.lookAt(Math.sin(rad) * 10, targetY, camera.position.z - Math.cos(rad) * 10);
  });

  return null;
}



import CartModal from "./CartModal";
import Header from "./Header";

export default function ThreeScene({ setInfo }) {
  const [categories, setCategories] = useState(null);
  const [lookAt, setLookAt] = useState(null);
  // Persistance du panier avec localStorage
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });
  const [openCart, setOpenCart] = useState(false);

  useEffect(() => {
    loadCategoriesData().then(setCategories);
  }, []);

  // Sauvegarde le panier à chaque modification
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Fonction d'ajout au panier
  const addToCart = ({ produit, brand, format }) => {
    setCart(prev => {
      // Cherche si l'article existe déjà (même produit, marque, format)
      const idx = prev.findIndex(item =>
        item.produit.label === produit.label &&
        item.brand.bLabel === brand.bLabel &&
        item.format.lFormat === format.lFormat
      );
      let newCart;
      if (idx > -1) {
        // Incrémente la quantité
        newCart = prev.map((item, i) =>
          i === idx ? { ...item, qty: (item.qty || 1) + 1 } : item
        );
      } else {
        // Ajoute nouvel article
        newCart = [...prev, { produit, brand, format, qty: 1 }];
      }
      console.log("Panier:", newCart.map(item => `${item.produit.label} - ${item.brand.bLabel} - ${item.format.lFormat}L - ${item.format.pPrix}€ x${item.qty || 1}`).join(" | "));
      return newCart;
    });
  };

  const removeFromCart = (index) => {
    setCart(prev => {
      const item = prev[index];
      if (!item) return prev;
      if ((item.qty || 1) > 1) {
        return prev.map((it, i) => i === index ? { ...it, qty: it.qty - 1 } : it);
      } else {
        return prev.filter((_, i) => i !== index);
      }
    });
  };

  const clearCart = () => setCart([]);

  // Calcule le total
  const cartTotal = cart.reduce((sum, item) => sum + (parseFloat(item.format.pPrix) * (item.qty || 1)), 0);


  if (!categories) return <div className="threejs-container">Chargement des rayons...</div>;

  // On injecte addToCart et openCart dans chaque gondole boissons
  const categoriesWithCart = categories.map(cat => {
    if (cat.id === "boissons") {
      return {
        ...cat,
        gondolaProps: {
          onAddToCart: addToCart
        }
      };
    }
    return cat;
  });

  return (
    <>
      <Header onCartClick={() => setOpenCart(true)} cartQty={cart.reduce((sum, item) => sum + (item.qty || 1), 0)} />
      <div className="threejs-container">
        <Canvas camera={{ position: [0, 2, 8], fov: 60 }} shadows>
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <SupermarcheScene setInfo={setInfo} categories={categoriesWithCart} />
          <Environment preset="sunset" />
          <CameraController />
        </Canvas>
      </div>
      <CartModal
        open={openCart}
        setOpen={setOpenCart}
        cart={cart}
        setCart={setCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        total={cartTotal}
      />
    </>
  );
}
