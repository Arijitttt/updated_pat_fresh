"use client";

import { useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@/components/Pagination";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import FilterSidebar from "@/components/FilterSidebar";

const PAGE_SIZE = 9;

function ProductsCatalogContent() {
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "all";
  const initialSubcategory = searchParams.get("subcategory") || "all";

  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [subcategory, setSubcategory] = useState(initialSubcategory);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const activeCat = category.toLowerCase();

    return allProducts.filter((product: any) => {
      // 1. Category check
      const matchesCategory =
        category === "all" ||
        product.category?.toLowerCase() === activeCat;

      // 2. Subcategory check (Active for both Chocolates and Groceries)
      const hasSubcategories =
        activeCat === "chocolates" || activeCat === "groceries";

      const matchesSubcategory =
        !hasSubcategories ||
        subcategory === "all" ||
        product.subcategory?.toLowerCase() === subcategory.toLowerCase();

      // 3. Search query check
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        (product.description && product.description.toLowerCase().includes(q));

      return matchesCategory && matchesSubcategory && matchesQuery;
    });
  }, [allProducts, query, category, subcategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <main className="min-h-screen bg-[#fafaf9] text-navy">
      {/* Dark Header Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] py-16 text-white">
        <div className="pointer-events-none absolute -left-20 top-0 h-80 w-80 rounded-full bg-[#d32f2f]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ef4444]">
                PatFresh Catalog
              </p>
              <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
                Commercial Food Supplies
              </h1>
              <p className="mt-2 text-xs text-white/70 sm:text-sm">
                Bulk ingredients, seafood, frozen meats, and grocery essentials across Kolkata.
              </p>
            </div>

            {/* Live Filter Counter Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium text-white/90 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>
                {filtered.length} of {allProducts.length} items available
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Left Column: Styled Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <FilterSidebar
              categories={categories}
              activeCategory={category}
              activeSubcategory={subcategory}
              onSelectCategory={(slug) => {
                setCategory(slug);
                setSubcategory("all"); // Reset subcategory when switching category
                setPage(1);
              }}
              onSelectSubcategory={(subSlug) => {
                setSubcategory(subSlug); // Switches "all", "imported", "local", "2m", "tenero"
                setPage(1);
              }}
              searchQuery={query}
              onSearchChange={(val) => {
                setQuery(val);
                setPage(1);
              }}
              onReset={() => {
                setCategory("all");
                setSubcategory("all");
                setQuery("");
                setPage(1);
              }}
            />
          </aside>

          {/* Right Column: Dynamic Animated Products View */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  className="flex min-h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white p-8 text-center shadow-xs"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-neutral-800">No products found</h3>
                  <p className="mt-1 max-w-sm text-xs text-neutral-500">
                    We couldn&apos;t find anything matching your filter criteria. Try choosing another subcategory or clearing the search.
                  </p>
                  <button
                    onClick={() => {
                      setQuery("");
                      setCategory("all");
                      setSubcategory("all");
                      setPage(1);
                    }}
                    className="mt-5 rounded-lg bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800"
                  >
                    Clear all filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`${category}-${subcategory}-${query}-${currentPage}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  <ProductGrid products={visible} />

                  <div className="flex justify-center border-t border-neutral-200/80 pt-6">
                    <Pagination
                      page={currentPage}
                      totalPages={totalPages}
                      onChange={(nextPage) => {
                        setPage(nextPage);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fafaf9]" />}>
      <ProductsCatalogContent />
    </Suspense>
  );
}