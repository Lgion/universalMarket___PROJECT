import React from "react";
import "./Header.scss";

export default function Header({ onCartClick }) {
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
