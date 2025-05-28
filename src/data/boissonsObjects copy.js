import {Dispo, FormatBottle, Brand, Product} from "./boissonsClasses.js"

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
      formats: new FormatBottle([
        {
          lFormat: ".33",
          pPrix: 7.0,
          dispo: new Dispo({ qte: 50, zoneID: "RAYON SPIRITUEUX" })
        },
        {
          lFormat: "1",
          pPrix: 18.0,
          dispo: new Dispo({ qte: 20, zoneID: "RAYON SPIRITUEUX", dAbsolutePromotion: "2e à -50%" })
        }
      ])
    }),
    new Brand({
      bLabel: "Absolut",
      bImage: "absolut.png",
      bDescription: "La vodka suédoise iconique.",
      formats: new FormatBottle([
        {
          lFormat: ".33",
          pPrix: 8.0,
          dispo: new Dispo({ qte: 10, zoneID: "RAYON SPIRITUEUX" })
        },
        {
          lFormat: "1",
          pPrix: 19.0,
          dispo: new Dispo({ qte: 5, zoneID: "RAYON SPIRITUEUX" })
        }
      ])
    })
  ]
});



