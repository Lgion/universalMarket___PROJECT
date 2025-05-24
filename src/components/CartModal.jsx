import React from "react";
import "./CartModal.scss";

export default function CartModal({ open, setOpen, cart, setCart }) {
  if (!open) return null;
  return (
    <div className="cart-modal">
  <div className="cart-modal__box">
      <button className="cart-modal__close" onClick={() => setOpen(false)}>&times;</button>
      <h2 className="cart-modal__title">Mon Panier</h2>
      {/* TODO: Afficher le contenu du panier */}
    </div>
  </div>);
}
