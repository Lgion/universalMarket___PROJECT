import {boissons} from "./Objects.js"

// Nouvelle structure : catégories alignées avec le prompt, chargement dynamique des données JSON
export const categoriesMeta = [
  // { id: "viandes", name: "Viandes", color: 0x8B4513 },
  { id: "boissons", name: "Boissons", color: 0x007bff, object: boissons },
  // { id: "boulangerie", name: "Boulangerie/Pâtisserie", color: 0xffe4b5 },
  // { id: "cuisine", name: "Cuisine", color: 0xf5c542 },
  // { id: "friandises", name: "Friandises", color: 0x6f42c1 }
];

// Fonction utilitaire pour charger dynamiquement les données de chaque catégorie
export async function loadCategoriesData() {
  const data = await Promise.all(
    categoriesMeta.map(async (cat) => {
      const json = await fetch(`/src/data/categories/${cat.id}.json`).then(r => r.json());
      return { ...cat, ...json };
    })
  );
  return data;
}
