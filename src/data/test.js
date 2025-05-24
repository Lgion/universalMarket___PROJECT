export function Variete({ variete, dispo, codeBarre, promotion, nom, poids, quantite, unite, image, prix, devise = "€" }) {
    return {
      ...Dispo({ variete, dispo, codeBarre, promotion }),
      variete, // ex: "POLIAKOV", "Absolut", "nature", etc.
      ...rest
    };
  }
  
  // Objet Dispo : hérite de Variete, ajoute dispo, code-barre, promotion
  export function Dispo({ dispo, codeBarre = null, promotion = null, ...rest }) {
    return {
      ...VolumeQte({ variete, dispo, codeBarre, promotion, nom, poids = null, quantite = null, unite = null, image = null, ...rest }{ variete, dispo, codeBarre, promotion, nom, poids = null, quantite = null, unite = null, image = null, ...rest }),
      dispo,
      codeBarre,
      promotion,
      ...rest
    };
  }
  
  // Objet VolumeQte : hérite de Dispo, ajoute nom, poids, quantité, unité, image
  export function VolumeQte({ nom, poids, quantite, unite, image }) {
    return {
      ...PrixUnitaire({ variete, dispo, codeBarre, promotion }),
      nom,
      poids,
      quantite,
      unite,
      image,
      ...rest
    };
  }
  
  // Objet PrixUnitaire : hérite de VolumeQte, ajoute prix et devise
  export function PrixUnitaire({ prix, devise, ...rest }) {
    return {
      prixUnitaire: prix,
      devise
      ...rest
    };
  }