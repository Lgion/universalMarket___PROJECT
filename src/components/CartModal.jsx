import React, { useState } from "react";
import "./CartModal.scss";

export default function CartModal({ open, setOpen, cart, setCart, removeFromCart, clearCart, total = 0 }) {
  const [confirmation, setConfirmation] = useState("");
  if (!open) return null;

  // Ajout bouton + pour augmenter la quantité
  const addQty = (idx) => {
    setCart(prev => prev.map((item, i) => i === idx ? { ...item, qty: (item.qty || 1) + 1 } : item));
  };
  // Suppression totale d'une ligne
  const removeLine = (idx) => setCart(prev => prev.filter((_, i) => i !== idx));

  const handleValidate = () => {
    setConfirmation("Commande validée ! Merci pour votre achat.");
    setTimeout(() => {
      setConfirmation("");
      setOpen(false);
      clearCart();
    }, 1800);
  };

  return (
    <div className="cart-modal">
      <div className="cart-modal__box">
        <button className="cart-modal__close" onClick={() => setOpen(false)}>&times;</button>
        <h2 className="cart-modal__title">Mon Panier</h2>
        {confirmation && <div className="cart-modal__confirmation">{confirmation}</div>}
        <div className="cart-modal__content">
          {cart.length === 0 ? (
            <p className="cart-modal__empty">Votre panier est vide.</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Marque</th>
                  <th>Format</th>
                  <th>Prix</th>
                  <th>Quantité</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.produit.label}</td>
                    <td>{item.brand.bLabel}</td>
                    <td>{item.format.lFormat}L</td>
                    <td>{parseFloat(item.format.pPrix).toFixed(2)} €</td>
                    <td>
                      <button className="cart-btn" onClick={() => removeFromCart(idx)}>-</button>
                      <span className="cart-qty">{item.qty || 1}</span>
                      <button className="cart-btn" onClick={() => addQty(idx)}>+</button>
                    </td>
                    <td>
                      <button className="cart-btn cart-btn--delete" onClick={() => removeLine(idx)}>Supprimer</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {cart.length > 0 && (
            <div className="cart-modal__footer">
              <div className="cart-total">Total : <span>{total.toFixed(2)} €</span></div>
              <div className="cart-modal__actions">
                <button className="cart-btn cart-btn--clear" onClick={clearCart}>Vider le panier</button>
                <button className="cart-btn cart-btn--validate" onClick={handleValidate}>Valider la commande</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
