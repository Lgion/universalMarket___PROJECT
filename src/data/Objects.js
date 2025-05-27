import {Dispo, Format, Brand, Product, MeatProduct} from "./Classes.js"


import boissonsData from './categories/boissons.json';
import viandesData from './categories/viandes.json';

const boissons = {};
const viandes = {};


// Génération dynamique imbriquée par sous-catégorie
boissonsData.sousCategories.forEach(sousCat => {
  // Normalise le nom de la sous-catégorie (minuscule, sans accent ni espace)
  const sousCatKey = sousCat.nom
    .toLowerCase()
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "-");
  if (sousCat.produits && typeof sousCat.produits === 'object') {
    boissons[sousCatKey] = {};
    Object.entries(sousCat.produits).forEach(([boissonKey, brandsArr]) => {
      boissons[sousCatKey][boissonKey] = new Product({
        label: boissonKey.charAt(0).toUpperCase() + boissonKey.slice(1),
        images: (!brandsArr[0].brand)?brandsArr[0].images:[],
        description: (!brandsArr[0].brand)?brandsArr[0].description:"",
        brands: brandsArr
          .filter(brandData => brandData.brand)
          .map(brandData =>
            new Brand({
              bLabel: brandData.brand,
              bDescription: brandData.description,
              formats: brandData.formats.map(([lFormat, pPrix]) =>
                new Format({
                  lFormat: lFormat.toString(),
                  pPrix,
                  dispo: new Dispo({})
                })
              )
            })
          )
      });
    });
  }
});


viandesData.sousCategories.forEach(sousCat => {
  const sousCatKey = sousCat.nom
    .toLowerCase()
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "-");
  if (sousCat.produits && typeof sousCat.produits === 'object') {
    viandes[sousCatKey] = {};
    Object.entries(sousCat.produits).forEach(([viandeKey, variantsArr]) => {
      // On prend la première entrée comme base
      const base = variantsArr[0];
      viandes[sousCatKey][viandeKey] = new MeatProduct({
        label: viandeKey.charAt(0).toUpperCase() + viandeKey.slice(1).replace(/-/g, ' '),
        description: base.description || "",
        images: base.images || [],
        brands: [], // À enrichir si besoin
        details: {
          origine: base.origine || null,
          labelsQualite: base.labelsQualite || [],
          decoupe: base.decoupe || null,
          conservation: base.conservation || null,
          allergens: base.allergens || []
        },
        nutrition: base.nutrition || {},
        autre: {
          conseilsCuisson: base.conseilsCuisson || "",
          ingredients: base.ingredients || [],
          ecoScore: base.ecoScore || null
        }
      });
    });
  }
});


export { Product };
export { boissons };
export { viandesData, viandes };

/*
// --- EXEMPLE D'INSTANTIATION ---
export const Vodka = new Product({
  label: "Vodka",
  description: "Vodka pure, idéale pour cocktails",
  images: ["vodka.png", "vodka_ambiance.png"],
  brands: [
    new Brand({
      bLabel: "POLIAKOV",
      bImage: "poliakov.png",
      bDescription: "Une vodka française de qualité.",
      formats: [
        new Format({
          lFormat: ".33",
          pPrix: 7.0,
          dispo: new Dispo({})
        }),
        new Format({
          lFormat: "1",
          pPrix: 18.0,
          dispo: new Dispo({})
        })
      ]
    }),
    new Brand({
      bLabel: "Absolut",
      bImage: "absolut.png",
      bDescription: "La vodka suédoise iconique.",
      formats: [
        new Format({
          lFormat: ".33",
          pPrix: 8.0,
          dispo: new Dispo({})
        }),
        new Format({
          lFormat: "1",
          pPrix: 19.0,
          dispo: new Dispo({})
        })
      ]
    }),
    new Brand({
      bLabel: "Grey Goose",
      bImage: "greygoose.png",
      bDescription: "Vodka française premium, réputée pour sa pureté.",
      formats: new Format([
        {
          lFormat: ".33",
          pPrix: 12.0,
          dispo: new Dispo({})
        },
        {
          lFormat: "1",
          pPrix: 29.0,
          dispo: new Dispo({})
        }
      ])
    }),
    new Brand({
      bLabel: "Belvedere",
      bImage: "belvedere.png",
      bDescription: "Une vodka polonaise de luxe, distillée à partir de seigle.",
      formats: new Format([
        {
          lFormat: ".33",
          pPrix: 14.0,
          dispo: new Dispo({})
        },
        {
          lFormat: "1",
          pPrix: 32.0,
          dispo: new Dispo({})
        }
      ])
    }),
    new Brand({
      bLabel: "Smirnoff",
      bImage: "smirnoff.png",
      bDescription: "La vodka la plus vendue au monde, d'origine russe.",
      formats: new Format([
        {
          lFormat: ".33",
          pPrix: 6.0,
          dispo: new Dispo({})
        },
        {
          lFormat: "1",
          pPrix: 16.0,
          dispo: new Dispo({})
        }
      ])
    })
  ]
});
*/


