import React from "react";
import "./InfoPanel.scss";

export default function InfoPanel({ info, setInfo, setCart }) {
  if (!info) return null;
  return (
    <aside className="info-panel info-panel--visible">
      {/* Affichage dynamique selon le type d'info */}
      <button className="info-panel__close" onClick={() => setInfo(null)}>&times;</button>
      {/* TODO: Afficher le détail de l'élément sélectionné */}
    </aside>
  );
}
