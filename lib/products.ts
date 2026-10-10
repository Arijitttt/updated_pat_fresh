import chocolates from "@/data/products/chocolates.json";
//import beverages from "@/data/products/beverages.json";
//import dairyProducts from "@/data/products/dairy.json";
//import frozenProducts from "@/data/products/frozen.json";
import groceries from "@/data/products/groceries.json";
// import readyToCookProducts from "@/data/products/ready-to-cook.json";
import barIngredients from "@/data/products/bar-ingredients.json";
import frozenMeat from "@/data/products/frozen-meat.json";
import cheeseProducts from "@/data/products/cheese.json";
import frozenSnacks from "@/data/products/frozen-snacks.json";
import frozenFruitsBerries from "@/data/products/frozen-fruits-berries.json";
import type { Product } from "@/types/product";

// Central registry: add a new category file above and register it here.
// Nothing else in the app needs to change.
const productsByCategory: Record<string, Product[]> = {
  bakery: chocolates,
  chocolates, // alias so legacy URLs/routes don't break
  //beverages,
  // dairy: dairyProducts,
  // frozen: frozenProducts,
  groceries: groceries,
  // "ready-to-cook": readyToCookProducts,
  "bar-ingredients": barIngredients,
  "frozen-meat": frozenMeat,
  "frozen-snacks": frozenSnacks,
  "frozen-fruits-berries": frozenFruitsBerries,
  cheese: cheeseProducts,
};

// Deduplicate products using a Set so the alias doesn't duplicate items in allProducts
const allProducts: Product[] = Array.from(
  new Map(
    Object.values(productsByCategory)
      .flat()
      .map((p) => [p.slug || p.id, p])
  ).values()
);

export function getProducts(): Product[] {
  return allProducts;
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return productsByCategory[category] ?? [];
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return allProducts;
  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q)
  );
}

export function getAllProductSlugs(): string[] {
  return allProducts.map((product) => product.slug);
}