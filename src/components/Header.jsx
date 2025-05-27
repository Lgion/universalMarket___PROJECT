import React, { useEffect, useRef } from "react";
import "./Header.scss";
import { Boissons,boissons} from "../data/Objects.js";


export default function Header({ onCartClick, cartQty }) {
  const badgeRef = useRef();
  // Animation rebond sur changement de quantité
  useEffect(() => {
    if (badgeRef.current) {
      badgeRef.current.classList.remove("cart-badge-animate");
      void badgeRef.current.offsetWidth; // force reflow
      badgeRef.current.classList.add("cart-badge-animate");
    }
  }, [cartQty]);
  console.log(boissons);
  
  // Boissons.logBrandsIfLabel(Vodka)
  // Vodka.brands[0].setQteToFormat(".33",1)
  // console.log(Vodka.brands[0].formats.formats[0].dispo.qte);
  return (
    <header className="header">
      <h1>Supermarché 3D</h1>
      <nav className="nav-links">
        {/* Les liens de navigation seront ajoutés ici */}
      </nav>
      <div className="header-actions">
        <button onClick={onCartClick} style={{position:'relative'}}>
          Panier
          {cartQty > 0 && (
            <span ref={badgeRef} className="cart-badge">{cartQty}</span>
          )}
        </button>
      </div>
    </header>
  );
}
