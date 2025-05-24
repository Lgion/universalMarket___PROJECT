import React from "react";
import "./Header.scss";
import { Boissons,boissons} from "../data/Objects.js";

export default function Header({ onCartClick }) {
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
        <button onClick={onCartClick}>Panier</button>
      </div>
    </header>
  );
}
