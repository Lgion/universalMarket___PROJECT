import {Dispo, FormatBottle, FormatMeat, Brand, Product, MeatProduct} from "./Classes.js"


import boissonsData from './categories/boissons.json';
import viandesData from './categories/viandes.json';

const boissons = {};
const boissons_ = {};
const viandes_ = {};
const viandes = {};

/**
 * Fonction générique pour générer dynamiquement un objet produit à partir d'une sous-catégorie.
 * @param {Object} options
 *   - targetObj: l'objet cible (ex: boissons, viandes)
 *   - ProductClass: classe produit à instancier (Product, MeatProduct...)
 *   - BrandClass: classe marque à instancier (Brand)
 *   - FormatClass: classe format à instancier (FormatBottle, FormatMeat...)
 *   - getBrandLabel: fonction pour transformer la valeur du champ brand (optionnel)
 *   - formatFormatArgs: fonction pour transformer les arguments du format (optionnel)
 */
export function generateFromSousCategorie({
  targetObj,
  ProductClass,
  BrandClass,
  FormatClass,
  getBrandLabel = brand => brand,
  formatFormatArgs = (lFormat, pPrix, extra = {}) => ({ lFormat, pPrix, ...extra }),
}) {
  const getVracBrand = ({ generic, BrandClass, FormatClass, formatFormatArgs }) => {
    return new BrandClass({
      bLabel: "Vrac",
      bDescription: "Vrac sans marque",
      formats: (generic.formats || []).map(([lFormat, pPrix, formats = {}]) =>
        new FormatClass(formatFormatArgs(lFormat, pPrix, formats))
      )
    });
  }
  return function(sousCat) {
    const sousCatKey = sousCat.nom
      .toLowerCase()
      .normalize("NFD").replace(/\p{Diacritic}/gu, "")
      .replace(/\s+/g, "-");
    if (sousCat.produits && typeof sousCat.produits === 'object') {
      targetObj[sousCatKey] = {};
      Object.entries(sousCat.produits).forEach(([prodKey, variantsArr]) => {
        // Générique (brand:null)
        const generic = variantsArr.find(v => v.brand === null) || {};
        const images = generic.images || (variantsArr[0] && variantsArr[0].images) || [];
        const description = generic.description || (variantsArr[0] && variantsArr[0].description) || "";
        const brands = variantsArr
          .filter(variant => variant.brand)
          .map(variant => new BrandClass({
            bLabel: getBrandLabel(variant.brand),
            bDescription: variant.description || "",
            formats: (variant.formats || []).map(([lFormat, pPrix, extra = {}]) =>
              new FormatClass(formatFormatArgs(lFormat, pPrix, extra))
            )
          }));
        // Ajout de la propriété vrac si getVracBrand est fourni
        console.log(getVracBrand);
        const vrac = variantsArr
        .filter(variant => variant.brand===false)
        .map(variant => (variant.formats || []).map(([lFormat, pPrix, extra = {}]) =>
          new FormatClass(formatFormatArgs(lFormat, pPrix, extra)))
        )
        // const vrac = getVracBrand ? getVracBrand({ generic, BrandClass, FormatClass, formatFormatArgs }) : undefined;
        console.log(vrac);
        
        const productObj = {
          label: prodKey.charAt(0).toUpperCase() + prodKey.slice(1).replace(/-/g, ' '),
          images,
          description,
          brands,
          vrac
        };
        console.log(productObj);
        // if (vrac) productObj.vrac = vrac;
        targetObj[sousCatKey][prodKey] = new ProductClass(productObj);
      });
    }
  }
}

// Génération dynamique imbriquée par sous-catégorie
// console.log(boissonsData.sousCategories[0]);
// console.log(viandesData.sousCategories[0]);


boissonsData.sousCategories.forEach(sousCat=>generateFromSousCategorie({
  targetObj: boissons,
  ProductClass: Product,
  BrandClass: Brand,
  FormatClass: FormatBottle,
  getBrandLabel: b => b,
  formatFormatArgs: (lFormat, pPrix) => ({ lFormat, pPrix })
})(sousCat))
viandesData.sousCategories.forEach(sousCat=>generateFromSousCategorie({
  targetObj: viandes,
  ProductClass: MeatProduct,
  BrandClass: Brand,
  FormatClass: FormatMeat,
  getBrandLabel: b => b,
  formatFormatArgs: (lFormat, pPrix, extra) => ({ lFormat, pPrix, ...extra })
})(sousCat))


/*
// Génération dynamique imbriquée par sous-catégorie
boissonsData.sousCategories.forEach(sousCat => {
  // Normalise le nom de la sous-catégorie (minuscule, sans accent ni espace)
  const sousCatKey = sousCat.nom
    .toLowerCase()
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "-");
  if (sousCat.produits && typeof sousCat.produits === 'object') {
    boissons_[sousCatKey] = {};
    Object.entries(sousCat.produits).forEach(([boissonKey, brandsArr]) => {
      boissons_[sousCatKey][boissonKey] = new Product({
        label: boissonKey.charAt(0).toUpperCase() + boissonKey.slice(1),
// brand===null {
  images: (!brandsArr[0].brand)?brandsArr[0].images:[],
  description: (!brandsArr[0].brand)?brandsArr[0].description:"",
// }
        brands: brandsArr
// brand!==null {
  .filter(brandData => brandData.brand)
// }
          .map(brandData =>
            new Brand({
              bLabel: brandData.brand,
              bDescription: brandData.description,
              formats: brandData.formats.map(([lFormat, pPrix]) =>
                new FormatBottle({
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
console.log(boissons_);


viandesData.sousCategories.forEach(sousCat => {
  // Normalisation du nom de la sous-catégorie
  const sousCatKey = sousCat.nom
    .toLowerCase()
    .normalize("NFD").replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "-");

  if (sousCat.produits && typeof sousCat.produits === 'object') {
    viandes_[sousCatKey] = {};

    Object.entries(sousCat.produits).forEach(([viandeKey, variantsArr]) => {
      // Cherche l'entrée générique (brand:null)
      const generic = variantsArr.find(v => v.brand === null) || {};
      // Récupère images/description du générique, sinon fallback sur la première entrée
      const images = generic.images || (variantsArr[0] && variantsArr[0].images) || [];
      const description = generic.description || (variantsArr[0] && variantsArr[0].description) || "";

      // Génère les brands (marques ou vrac ou générique)
      const brands = variantsArr
        .filter(variant => variant.brand !== null)
        .map(variant => new Brand({
          bLabel: variant.brand === false ? "Vrac" : variant.brand,
          bDescription: variant.description || "",
          formats: (variant.formats || []).map(([lFormat, pPrix, formats = {}]) =>
            new FormatMeat({
              lFormat: lFormat.toString(),
              pPrix,
              pack: formats.pack || null,
              travail: formats.travail || null,
              grill: formats.grill || null,
              raw: formats.raw || null,
              froze: formats.froze || false,
              dispo: new Dispo({}) // à adapter si tu veux gérer la dispo
            })
          )
        }));
      const vrac = new Brand({
        formats: (generic.formats || []).map(([lFormat, pPrix, formats = {}]) =>
          new FormatMeat({
            lFormat: lFormat.toString(),
            pPrix,
            pack: formats.pack || null,
            travail: formats.travail || null,
            grill: formats.grill || null,
            raw: formats.raw || null,
            froze: formats.froze || false,
            dispo: new Dispo({}) // à adapter si tu veux gérer la dispo
          })
        )
      });


      viandes_[sousCatKey][viandeKey] = new MeatProduct({
        label: viandeKey.charAt(0).toUpperCase() + viandeKey.slice(1).replace(/-/g, ' '),
        images,
        description,
        brands,
        vrac,
        partie: [sousCatKey, ...Object.keys(sousCat.produits).filter(k => k !== viandeKey)],
      });
    });
  }
});
console.log(viandes_);
*/



export { Product };
export { boissons };
export { viandes };

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
        new FormatBottle({
          lFormat: ".33",
          pPrix: 7.0,
          dispo: new Dispo({})
        }),
        new FormatBottle({
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
        new FormatBottle({
          lFormat: ".33",
          pPrix: 8.0,
          dispo: new Dispo({})
        }),
        new FormatBottle({
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
      formats: new FormatBottle([
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
      formats: new FormatBottle([
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
      formats: new FormatBottle([
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


