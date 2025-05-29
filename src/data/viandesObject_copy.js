import { MeatProduct,Format,FormatMeat } from "./Classes.js";

// --- EXEMPLES DE PRODUITS VIANDES ---

// export const Filet = new MeatProduct({
// export const Abats = new MeatProduct({
export const CoteBoeuf = new MeatProduct({
  label: "Côtes",
  partie: ["boeuf","cote"],
  description: "Une tranche égale une cote",
  images: ["cotes.png"],
  brands: [
    new Brand({
      bLabel: "CHARAL",
      bImage: "charal.png",
      bDescription: "...",
      formats: new FormatMeat([
        {
          lFormat: ".1",
          pPrix: 7.0,
          dispo: new Dispo({ qte: 0, zoneID: 67966576 }),
          froze: true,
          pack: [2,5,10],
        },
        {
          lFormat: "1",
          pPrix: 75,
          dispo: new Dispo({ qte: 0, zoneID: 89776876 }),
          raw: new Raw({ quality: "low" }),
        },
        {
          lFormat: ".1",
          pPrix: 7.0,
          dispo: new Dispo({ qte: 0, zoneID: 67966576 }),
          grill: new Grill({ method: "four" }),
        },
      ]),
    })
  ],
  vrac: [
    new FormatMeat([
      {
        lFormat: ".1",
        pPrix: 7.0,
        dispo: new Dispo({ qte: 0, zoneID: 76556457 }),
        froze: true,
        pack: [2,5,10],
      },
      {
        lFormat: "1",
        pPrix: 75,
        dispo: new Dispo({ qte: 0, zoneID: 78543453 }),
        raw: new Raw({ quality: "low" }),
        travail: "haché",
      },
    ]),
  ]
  // details: {
  //   origine: "France",
  //   labelsQualite: ["Label Rouge"],
  //   decoupe: "haché",
  //   conservation: "frais",
  //   allergens: []
  // },
  // nutrition: {
  //   kcal: 250,
  //   protein: 26,
  //   fat: 18,
  //   carbs: 0
  // },
  // autre: {
  //   conseilsCuisson: "Cuire à la poêle 3 min de chaque côté.",
  //   ingredients: ["viande de bœuf"],
  //   ecoScore: "C"
  // }
});





// export const EscalopePoulet = new MeatProduct({
//   label: "Escalope de poulet",
//   description: "Escalope tendre de poulet.",
//   images: ["escalope_poulet.png"],
//   brands: [],
//   details: {
//     origine: "France",
//     labelsQualite: ["Bio"],
//     decoupe: "escalope",
//     conservation: "frais",
//     allergens: []
//   },
//   nutrition: {
//     kcal: 110,
//     protein: 23,
//     fat: 1.2,
//     carbs: 0
//   },
//   autre: {
//     conseilsCuisson: "Cuire à la poêle ou au four.",
//     ingredients: ["filet de poulet"],
//     ecoScore: "B"
//   }
// });

// export const JambonBlanc = new MeatProduct({
//   label: "Jambon blanc",
//   description: "Jambon blanc supérieur, découenné, dégraissé.",
//   images: ["jambon_blanc.png"],
//   brands: [],
//   details: {
//     origine: "France",
//     labelsQualite: [],
//     decoupe: "tranches",
//     conservation: "frais",
//     allergens: ["lactose"]
//   },
//   nutrition: {
//     kcal: 120,
//     protein: 20,
//     fat: 3,
//     carbs: 1
//   },
//   autre: {
//     conseilsCuisson: "Prêt à consommer.",
//     ingredients: ["jambon de porc", "sel", "conservateur"],
//     ecoScore: "C"
//   }
// });
