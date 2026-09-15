import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ProductGrid from "@/components/ProductGrid";
import { getAllCategorySlugs, getCategoryBySlug } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <Link href="/categories" className="text-sm text-navy/50 hover:text-ember">
        Back to categories
      </Link>
      <h1 className="mt-6 font-display text-3xl font-medium text-navy sm:text-4xl">
        {category.name}
      </h1>
      <p className="mt-2 max-w-prose text-sm text-navy/60">
        {category.description}
      </p>
      <p className="mt-1 text-xs text-navy/40">{products.length} items listed</p>

      <div className="mt-8">
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
