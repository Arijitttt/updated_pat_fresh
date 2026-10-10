"use client";

import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import ProductDetails from "@/components/ProductDetails";
import ProductGrid from "@/components/ProductGrid";
import {
  getProductBySlug,
  getProductsByCategory,
} from "@/lib/products";

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const categoryProducts = getProductsByCategory(product.category);
  const subcategory = (product as any).subcategory;

  const filteredList = subcategory
    ? categoryProducts.filter(
        (item: any) =>
          item.subcategory?.toLowerCase() === subcategory.toLowerCase() &&
          item.slug !== product.slug
      )
    : categoryProducts.filter((item) => item.slug !== product.slug);

  const related = (
    filteredList.length > 0
      ? filteredList
      : categoryProducts.filter((item) => item.slug !== product.slug)
  ).slice(0, 3);

  const categoryParam = encodeURIComponent(product.category.toLowerCase());
  const targetHref = subcategory
    ? `/products?category=${categoryParam}&subcategory=${encodeURIComponent(subcategory.toLowerCase())}`
    : `/products?category=${categoryParam}`;

  const brandOrCategoryLabel = subcategory
    ? `${subcategory.replace(/-/g, " ").toUpperCase()}`
    : product.category;

  return (
    <main className="min-h-screen bg-[#fafaf9] text-navy">
      <div className="border-b border-neutral-200/80 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          {/* Dual Back Navigation Controls */}
          <div className="flex items-center gap-3">
            {/* Option 1: True Browser Previous Page (Preserves exact scroll position, search queries & filters) */}
            {/* <div className="inline-flex items-center rounded-full border border-neutral-200/90 bg-neutral-50/80 p-1 shadow-xs backdrop-blur-sm">
              </div> */}
              <button
                type="button"
                onClick={() => router.back()}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-neutral-800 shadow-xs transition-all hover:bg-[#d32f2f] hover:text-white active:scale-95"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-neutral-100 text-neutral-600 transition-colors group-hover:bg-red-700 group-hover:text-white">
                  <svg
                    className="h-2.5 w-2.5 stroke-[3] transition-transform group-hover:-translate-x-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </span>
                <span>Back</span>
              </button>

              <span className="mx-1 h-3.5 w-px bg-neutral-200" />
            

            {/* Option 2: Category Catalog Link */}
            <Link
              href={targetHref}
              className="group inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 transition hover:text-[#d32f2f]"
            >
              <span>Back to {brandOrCategoryLabel}</span>
              <svg
                className="h-3.5 w-3.5 text-neutral-400 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Breadcrumbs */}
          <span className="text-xs font-medium text-neutral-400 capitalize">
            <Link
              href={`/products?category=${categoryParam}`}
              className="hover:text-neutral-700 hover:underline"
            >
              {product.category}
            </Link>{" "}
            {subcategory && (
              <>
                /{" "}
                <Link
                  href={targetHref}
                  className="hover:text-neutral-700 hover:underline uppercase"
                >
                  {subcategory}
                </Link>
              </>
            )}{" "}
            / <span className="font-semibold text-neutral-700">{product.name}</span>
          </span>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <ProductDetails product={product} />

        {related.length > 0 && (
          <div className="mt-20 border-t border-neutral-200/80 pt-12">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#d32f2f]">
                  Explore Category
                </span>
                <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-neutral-900">
                  Related {brandOrCategoryLabel}
                </h2>
              </div>
              <Link
                href={targetHref}
                className="text-xs font-semibold text-[#d32f2f] hover:underline"
              >
                View all {brandOrCategoryLabel} &rarr;
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