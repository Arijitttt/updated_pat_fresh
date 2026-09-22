import vegetables from "@/data/products/vegetables.json";
import fruits from "@/data/products/fruits.json";
import other from "@/data/products/other.json";
import chocolates from "@/data/products/chocolates.json";
import beverages from "@/data/products/beverages.json";
import dairyProducts from "@/data/products/dairy.json";
import frozenProducts from "@/data/products/frozen.json";
import pantryProducts from "@/data/products/pantry.json";
import readyToCookProducts from "@/data/products/ready-to-cook.json";
import type { Product } from "@/types/product";

// Central registry: add a new category file above and register it here.
// Nothing else in the app needs to change.
const productsByCategory: Record<string, Product[]> = {
  
  chocolates,
  beverages,
  dairy: dairyProducts,
  frozen: frozenProducts,
  pantry: pantryProducts,
  "ready-to-cook": readyToCookProducts,
};

const allProducts: Product[] = Object.values(productsByCategory).flat();

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
