import categories from "@/data/categories.json";
import type { Category } from "@/types/category";

const allCategories = categories as Category[];

export function getCategories(): Category[] {
  return allCategories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return allCategories.find((category) => category.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return allCategories.map((category) => category.slug);
}
