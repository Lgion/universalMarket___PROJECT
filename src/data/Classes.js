// Objets de base
// Nouvelle structure optimisée pour les boissons

// Exemple pour la Vodka
// Factories pour la structure imbriquée
// --- CLASSES ---
export class Dispo {
  constructor({ qte = 0, dAbsolutePromotion = 0, zoneID = null } = {}) {
    this.qte = qte;
    this.dAbsolutePromotion = dAbsolutePromotion;
    this.zoneID = zoneID;
  }


  // Méthode pour modifier la disponibilité
  setQte(newQte) {
    this.qte = newQte;
  }
}
export class NewDispo {
  constructor({ qte = null, dFormat = null, dAbsolutePromotion = null, zoneID = null } = {}) {
    this.qte = qte;
    this.dFormat = dFormat;
    this.dAbsolutePromotion = dAbsolutePromotion;
    this.zoneID = zoneID;
  }
  // Méthode pour modifier la disponibilité
  setQte(newQte) {
    this.qte = newQte;
  }
}

export class Format {
  constructor({ lFormat, pPrix, dispo }) {
    this.lFormat = lFormat;
    this.pPrix = pPrix;
    this.dispo = dispo instanceof Dispo ? dispo : new Dispo(dispo);
  }
}

export class Brand {
  constructor({ bLabel, bImage = null, bDescription = null, formats = [] }) {
    this.bLabel = bLabel;
    this.bImage = bImage;
    this.bDescription = bDescription;
    // formats : array d'objets Format
    this.formats = formats;
  }

  // Méthode pour changer la dispo d'un format (par index ou label)
  setQteToFormat(formatLabel = null, newQte ) {
    let target = null;
    if (formatLabel !== null) {
      target = this.formats.formats.find(f => f.lFormat === formatLabel);
    }
    if (target && target.dispo instanceof Dispo) {
      target.dispo.setQte(newQte);
    }
  }
}


export class Boissons {
  constructor({ label, description = null, images = [], brands = [] }) {
    this.label = label;
    this.description = description;
    this.images = images;
    this.brands = brands.map(b => b instanceof Brand ? b : new Brand(b));
  }

  // Méthode de classe pour log les brands d'une boisson portant un label donné
  static logBrandsIfLabel(boissonInstance) {
    if (boissonInstance.brands) {
      boissonInstance.brands.forEach(brand => {
        console.log(brand);
        console.log(brand.bLabel);
      });
    } else {
      console.log(`Aucune boisson trouvée avec le label "${label}".`);
    }
  }
}
