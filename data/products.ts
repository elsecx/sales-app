import { generateRandomId } from "@/utils/helpers";

export type Category =
  | "Sayuran"
  | "Buah-buahan"
  | "Hasil laut"
  | "Daging"
  | "Bumbu dapur"
  | "Minuman"
  | "Makanan kering"
  | "Produk olahan";

export type Unit = "Ikat" | "Kg" | "Lusin" | "Pcs" | "Pack";

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  stock: number;
  unit: Unit;
};

export const categories: Category[] = [
  "Sayuran",
  "Buah-buahan",
  "Hasil laut",
  "Daging",
  "Bumbu dapur",
  "Minuman",
  "Makanan kering",
  "Produk olahan",
];

export const units: Unit[] = ["Ikat", "Kg", "Lusin", "Pcs", "Pack"];

const productNames: Record<Category, string[]> = {
  Sayuran: ["Bayam", "Kangkung", "Wortel", "Kentang", "Tomat", "Kubis", "Sawi"],
  "Buah-buahan": ["Apel", "Jeruk", "Pisang", "Mangga", "Semangka", "Melon", "Anggur"],
  "Hasil laut": ["Ikan Kembung", "Udang", "Cumi-cumi", "Kepiting", "Ikan Salmon"],
  Daging: ["Daging Sapi", "Daging Ayam", "Daging Kambing", "Telur Ayam", "Sosis"],
  "Bumbu dapur": ["Bawang Merah", "Bawang Putih", "Cabai", "Jahe", "Lengkuas"],
  Minuman: ["Air Mineral", "Teh Botol", "Kopi Sachet", "Susu UHT", "Jus Buah"],
  "Makanan kering": ["Kerupuk", "Kacang", "Biskuit", "Mie Instan", "Snack Jagung"],
  "Produk olahan": ["Tempe", "Tahu", "Nugget", "Bakso", "Abon"],
};

function randomUnit(): Unit {
  return units[Math.floor(Math.random() * units.length)];
}

function randomPrice(category: Category): number {
  switch (category) {
    case "Sayuran":
      return Math.floor(Math.random() * 5000) + 3000; // 3k–8k
    case "Buah-buahan":
      return Math.floor(Math.random() * 20000) + 8000; // 8k–28k
    case "Hasil laut":
      return Math.floor(Math.random() * 70000) + 30000; // 30k–100k
    case "Daging":
      return Math.floor(Math.random() * 100000) + 30000; // 30k–130k
    case "Bumbu dapur":
      return Math.floor(Math.random() * 10000) + 2000; // 2k–12k
    case "Minuman":
      return Math.floor(Math.random() * 15000) + 5000; // 5k–20k
    case "Makanan kering":
      return Math.floor(Math.random() * 20000) + 5000; // 5k–25k
    case "Produk olahan":
      return Math.floor(Math.random() * 30000) + 8000; // 8k–38k
    default:
      return 10000;
  }
}

export const products: Product[] = [];

categories.forEach((cat) => {
  productNames[cat].forEach((name) => {
    products.push({
      id: generateRandomId(),
      name,
      category: cat,
      price: randomPrice(cat),
      stock: Math.floor(Math.random() * 200) + 20,
      unit: randomUnit(),
    });
  });
});

while (products.length < 100) {
  const randomCat = categories[Math.floor(Math.random() * categories.length)];
  const baseName = productNames[randomCat][Math.floor(Math.random() * productNames[randomCat].length)];
  products.push({
    id: generateRandomId(),
    name: `${baseName} Premium`,
    category: randomCat,
    price: randomPrice(randomCat),
    stock: Math.floor(Math.random() * 200) + 20,
    unit: randomUnit(),
  });
}
