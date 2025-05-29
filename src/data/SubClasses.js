
// --- CLASSES AVANCÉES POUR VIANDES ---
export const PARTIE_MEAT = {
    boeuf:["full","epaule","patte","cuisse"],
    porc:["full","epaule","patte","cuisse"],
    poulet:["full","epaule","patte","cuisse"]
}
export class Raw {
    constructor({ details=null, quality="medium", prepared="none", ...rest } = {}) {
        this.details = new Details(rest)
        this.quality = quality
    }
}
export class Grill {
    constructor({ method=null } = {}) {
        this.method = method
    }
}
export class Nutrition {
    constructor({ kcal = null, protein = null, fat = null, carbs = null } = {}) {
        this.kcal = kcal;
        this.protein = protein;
        this.fat = fat;
        this.carbs = carbs;
    }
}

export class Details {
    constructor({ origine = null, labelsQualite = [], decoupe = null, conservation = null, allergens = [] } = {}) {
        this.origine = origine;
        this.labelsQualite = labelsQualite;
        this.decoupe = decoupe;
        this.conservation = conservation;
        this.allergens = allergens;
    }
}

export class Autre {
    constructor({ conseilsCuisson = "", ingredients = [], ecoScore = null } = {}) {
        this.conseilsCuisson = conseilsCuisson;
        this.ingredients = ingredients;
        this.ecoScore = ecoScore;
    }
}


