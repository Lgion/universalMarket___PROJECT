import React, { useState } from "react";
import Header from "./components/Header";
import ThreeScene from "./components/ThreeScene";
import InfoPanel from "./components/InfoPanel";
import CartModal from "./components/CartModal";

export default function App() {
  // Gestion du panier et de la sélection d'éléments
  const [cart, setCart] = useState([]);
  const [info, setInfo] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);

  console.log("ok");
  

  return (
    <div className="App">sdds
      <Header onCartClick={() => setCartOpen(true)} />
      <ThreeScene setInfo={setInfo} />
      <InfoPanel info={info} setInfo={setInfo} setCart={setCart} />
      <CartModal open={cartOpen} setOpen={setCartOpen} cart={cart} setCart={setCart} />
    </div>
  );
}
