import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import ProductDetails from "@/components/ProductDetails";
import ProductGrid from "@/components/ProductGrid";
import {
  getAllProductSlugs,
  getProductBySlug,
  getProductsByCategory,
} from "@/lib/products";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} | PatFresh`,
    description: product.description,
  };
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const related = getProductsByCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#fafaf9] text-navy">
      {/* Top Breadcrumb Navigation */}
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 transition hover:text-[#d32f2f]"
          >
            <svg
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to catalogue
          </Link>
          <span className="text-xs font-medium text-neutral-400 capitalize">
            {product.category} / <span className="font-semibold text-neutral-700">{product.name}</span>
          </span>
        </div>
      </div>

      {/* Main Product Details Component */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <ProductDetails product={product} />

        {/* Related Products Section */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-neutral-200/80 pt-12">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#d32f2f]">
                  Explore Category
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-neutral-900">
                  Related Products
                </h2>
              </div>
              <Link
                href="/products"
                className="text-xs font-semibold text-[#d32f2f] hover:underline"
              >
                View all &rarr;
              </Link>
            </div>

            <div className="mt-8">
              <ProductGrid products={related} />
            </div>
          </div>
        )}
      </section>
    </main>
  );
}