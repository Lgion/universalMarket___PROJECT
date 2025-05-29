import {
  Grill,Raw,Details,Nutrition,Autre,
  PARTIE_MEAT
} from "./SubClasses"

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
    // j'aimerai pouvoir ici avoir un paramètre pour diversifier les objets "racine" comme Format, Brand,...)
    // ex: this.type="bottle"
    // ...si bien sur je garde Format comme objet racine...
    this.lFormat = lFormat;
    this.pPrix = pPrix;
    this.dispo = dispo instanceof Dispo ? dispo : new Dispo(dispo);
    this.unit="---noUnit---"
  }
}
export class FormatBottle extends Format {
  constructor(rest) {
    super(rest)
    this.unit = "Litre";
  }
}
export class FormatMeat extends Format {
  constructor({ pack=[1],  travail="simple raw", raw=null,froze=null,grill=null, ...rest }) {
    super(rest)
    this.unit = "Kg";
    this.pack = pack
    this.travail = travail
    this.grill = grill?new Grill(grill):grill
    this.raw = raw?new Raw(raw):raw
    this.froze = froze===undefined?froze:true
    this.state = raw?"raw":froze?"froze":grill?"grill":null
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


export class Product {
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


export class MeatProduct extends Product {
  constructor({
    partie = [],
    details = {},
    nutrition = {},
    autre = {},
    ...rest
  }) {
    super(rest);
    console.log(this);
    
    // this.partie = PARTIE_MEAT[this.partie[0]]
    //                 .findIndex(p=>p===this.partie[1])===-1 ? null : this.partie[1]
    this.details = new Details(details);
    this.nutrition = new Nutrition(nutrition);
    this.autre = new Autre(autre);
  }
}

