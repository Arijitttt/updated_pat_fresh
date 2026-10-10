"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Pagination from "@/components/Pagination";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import FilterSidebar from "@/components/FilterSidebar";

const PAGE_SIZE = 9;

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialCategory = searchParams.get("category") || "all";
  const initialSubcategory = searchParams.get("subcategory") || "all";
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const allProducts = useMemo(() => getProducts(), []);
  const categories = useMemo(() => getCategories(), []);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [subcategory, setSubcategory] = useState(initialSubcategory);
  const [page, setPage] = useState(initialPage);

  // Sync state when navigating back/forward via browser history
  useEffect(() => {
    const urlCat = searchParams.get("category") || "all";
    const urlSub = searchParams.get("subcategory") || "all";
    const urlPage = parseInt(searchParams.get("page") || "1", 10);

    setCategory(urlCat);
    setSubcategory(urlSub);
    setPage(urlPage);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const activeCat = category.toLowerCase();
    const activeSub = subcategory.toLowerCase();

    return allProducts.filter((product: any) => {
      const prodCategory = (product.category || "").toLowerCase();

      // Category Alias Definitions
      const isFrozenCategory =
        activeCat === "frozen" || activeCat === "frozen-foods";
      const isProdFrozen =
        prodCategory === "frozen" || prodCategory === "frozen-foods";

      const isFrozenMeatCategory =
        activeCat === "frozen-meat" || activeCat === "meat";
      const isProdFrozenMeat =
        prodCategory === "frozen-meat" || prodCategory === "meat";

      const isCheeseCategory = activeCat === "cheese";
      const isProdCheese = prodCategory === "cheese";

      const isFrozenSnacksCategory =
        activeCat === "frozen-snacks" || activeCat === "snacks";
      const isProdFrozenSnacks =
        prodCategory === "frozen-snacks" || prodCategory === "snacks";

      const isFrozenFruitsCategory =
        activeCat === "frozen-fruits-berries" || activeCat === "fruits-berries";
      const isProdFrozenFruits =
        prodCategory === "frozen-fruits-berries" || prodCategory === "fruits-berries";

      const isBarIngredientsCategory =
        activeCat === "bar-ingredients" || activeCat === "bar";
      const isProdBarIngredients =
        prodCategory === "bar-ingredients" || prodCategory === "bar";

      const isBakeryCategory =
        activeCat === "bakery" || activeCat === "chocolates";
      const isProdBakery =
        prodCategory === "bakery" || prodCategory === "chocolates";

      // 1. Category Matching
      const matchesCategory =
        activeCat === "all" ||
        prodCategory === activeCat ||
        (isBakeryCategory && isProdBakery) ||
        (isFrozenCategory && isProdFrozen) ||
        (isFrozenMeatCategory && isProdFrozenMeat) ||
        (isCheeseCategory && isProdCheese) ||
        (isFrozenSnacksCategory && isProdFrozenSnacks) ||
        (isFrozenFruitsCategory && isProdFrozenFruits) ||
        (isBarIngredientsCategory && isProdBarIngredients);

      if (!matchesCategory) return false;

      // 2. Subcategory Matching
      const hasSubcategories =
        isBakeryCategory ||
        activeCat === "groceries" ||
        activeCat === "dairy" ||
        activeCat === "dairy-non-dairy" ||
        isFrozenCategory ||
        isFrozenMeatCategory ||
        isCheeseCategory ||
        isFrozenSnacksCategory ||
        isBarIngredientsCategory;

      if (hasSubcategories && activeSub !== "all") {
        const itemSub = (product.subcategory || "").toLowerCase();
        const itemBrand = (
          product.brand ||
          product.specifications?.brand ||
          ""
        ).toLowerCase();
        const itemName = (product.name || "").toLowerCase();
        const imgPath = (product.image || "").toLowerCase();

        let matchesSubcategory = false;

        // Specific Matching for Bakery
        if (isBakeryCategory) {
          if (activeSub === "bakery-imported-dairy") {
            matchesSubcategory =
              itemSub === "bakery-imported-dairy" ||
              itemName.includes("butter sheet") ||
              itemName.includes("candia") ||
              itemName.includes("millac");
          } else if (activeSub === "bakery-chocolates") {
            matchesSubcategory =
              itemSub.includes("chocolate") ||
              itemSub.includes("2m") ||
              itemSub.includes("tenero") ||
              itemBrand.includes("2m") ||
              itemBrand.includes("tenero") ||
              itemName.includes("2m") ||
              itemName.includes("tenero");
          } else if (activeSub === "bakery-chocolates-2m" || activeSub === "2m") {
            matchesSubcategory =
              itemSub === "bakery-chocolates-2m" ||
              itemSub === "2m" ||
              itemBrand === "2m" ||
              (itemName.startsWith("2m") && !itemName.includes("tenero"));
          } else if (activeSub === "bakery-chocolates-tenero" || activeSub === "tenero") {
            matchesSubcategory =
              itemSub === "bakery-chocolates-tenero" ||
              itemSub === "tenero" ||
              itemBrand === "tenero" ||
              itemName.includes("tenero") ||
              itemName.includes("hazelnut") ||
              itemName.includes("hazel nut");
          } else if (activeSub === "tropolite-bakery") {
            matchesSubcategory =
              itemSub.startsWith("tropolite-") ||
              itemBrand.includes("tropolite");
          } else if (activeSub === "tropolite-aromas") {
            matchesSubcategory =
              itemSub === "tropolite-aromas" ||
              itemName.includes("aromas");
          } else if (activeSub === "tropolite-fondants") {
            matchesSubcategory =
              itemSub === "tropolite-fondants" ||
              itemName.includes("fondant");
          } else if (activeSub === "tropolite-premixes") {
            matchesSubcategory =
              itemSub === "tropolite-premixes" ||
              itemName.includes("mix") ||
              itemName.includes("premix") ||
              itemName.includes("frappe base");
          } else if (activeSub === "tropolite-whipping-cream") {
            matchesSubcategory =
              itemSub === "tropolite-whipping-cream" ||
              itemName.includes("trop") ||
              itemName.includes("bake sheen") ||
              itemName.includes("ganache") ||
              itemName.includes("whip topping");
          } else if (activeSub === "malas-bakery-fillings") {
            matchesSubcategory =
              itemSub === "malas-bakery-fillings" ||
              itemName.includes("filling");
          }
        } else if (isBarIngredientsCategory) {
          // Specific Matching for Bar Ingredients
          if (activeSub === "syrups") {
            matchesSubcategory =
              itemSub === "syrups" ||
              [
                "swa-artisanal-syrups",
                "mathieu-teisseire",
                "pente-vuna-syrups",
                "malas-syrups",
              ].includes(itemSub) ||
              itemName.includes("syrup") ||
              itemName.includes("mocktail");
          } else if (activeSub === "swa-artisanal-syrups") {
            matchesSubcategory =
              itemSub === "swa-artisanal-syrups" ||
              itemBrand.includes("swa") ||
              itemName.includes("rtm syrup") ||
              itemName.includes("classic syrup");
          } else if (activeSub === "mathieu-teisseire") {
            matchesSubcategory =
              itemSub === "mathieu-teisseire" ||
              itemBrand.includes("teisseire") ||
              itemName.includes("mtsr");
          } else if (activeSub === "pente-vuna-syrups") {
            matchesSubcategory =
              itemSub === "pente-vuna-syrups" ||
              (itemName.includes("penta vuna") && itemName.includes("mocktail")) ||
              (itemBrand.includes("pente vuna") && itemName.includes("mocktail"));
          } else if (activeSub === "malas-syrups") {
            matchesSubcategory =
              itemSub === "malas-syrups" ||
              (
                (itemBrand.includes("mala") || itemName.includes("mala")) &&
                (imgPath.includes("/syrups/malas") || imgPath.includes("/syrups/")) &&
                !imgPath.includes("/crushes/") &&
                !itemSub.includes("crush") &&
                !itemName.includes("crush")
              );
          } else if (activeSub === "fruit-purees" || activeSub === "orsadrinks-odk") {
            matchesSubcategory =
              itemSub === "fruit-purees" ||
              itemSub === "orsadrinks-odk" ||
              itemBrand.includes("odk") ||
              itemName.includes("odk") ||
              itemName.includes("fruity mix");
          } else if (activeSub === "juice" || activeSub === "pente-vuna-juice") {
            matchesSubcategory =
              itemSub === "juice" ||
              itemSub === "pente-vuna-juice" ||
              (itemName.includes("penta vuna") && !itemName.includes("mocktail")) ||
              (itemBrand.includes("pente vuna") && !itemName.includes("mocktail"));
          } else if (activeSub === "crushes" || activeSub === "malas-crushes") {
            matchesSubcategory =
              itemSub === "malas-crushes" ||
              itemSub === "crushes" ||
              (
                itemBrand.includes("mala") &&
                (imgPath.includes("/crushes/") || itemName.includes("crush") || itemSub.includes("crush"))
              );
          }
        } else if (activeCat === "groceries") {
          // Specific Matching for Groceries
          if (activeSub === "ristoris") {
            matchesSubcategory =
              itemSub === "ristoris" ||
              itemBrand.includes("ristoris") ||
              itemName.includes("ristoris");
          } else if (activeSub === "local-groceries") {
            matchesSubcategory = [
              "delmonte",
              "hersheys",
              "hindusthan-unilever",
              "milk-lab",
              "naturesmith",
              "peanuts",
              "tropolite-cooking-cream",
            ].includes(itemSub);
          } else if (activeSub === "delmonte") {
            matchesSubcategory =
              itemSub === "delmonte" ||
              itemBrand.includes("del monte") ||
              itemBrand.includes("delmonte") ||
              itemName.includes("del monte") ||
              imgPath.includes("/delmonte/");
          } else if (activeSub === "hersheys") {
            matchesSubcategory =
              itemSub === "hersheys" ||
              itemBrand.includes("hershey") ||
              itemName.includes("hershey");
          } else if (activeSub === "hindusthan-unilever") {
            matchesSubcategory =
              itemSub === "hindusthan-unilever" ||
              itemBrand.includes("knorr") ||
              itemBrand.includes("kissan") ||
              itemBrand.includes("hellmann") ||
              itemBrand.includes("best foods") ||
              itemBrand.includes("rex");
          } else if (activeSub === "milk-lab") {
            matchesSubcategory =
              itemSub === "milk-lab" ||
              itemBrand.includes("milklab") ||
              itemName.includes("milklab");
          } else if (activeSub === "naturesmith") {
            matchesSubcategory =
              itemSub === "naturesmith" ||
              itemBrand.includes("naturesmith") ||
              itemName.includes("naturesmith");
          } else if (activeSub === "peanuts") {
            matchesSubcategory =
              itemSub === "peanuts" ||
              itemName.includes("peanut");
          } else if (activeSub === "tropolite-cooking-cream") {
            matchesSubcategory =
              itemSub === "tropolite-cooking-cream" ||
              itemBrand.includes("tropolite") ||
              itemName.includes("flexi") ||
              itemName.includes("cooklite");
          } else if (activeSub === "imported-flour") {
            matchesSubcategory =
              itemSub === "imported-flour" ||
              itemSub === "le-sinfonie" ||
              itemSub === "le-5-stagioni" ||
              itemName.includes("farina");
          } else if (activeSub === "le-sinfonie") {
            matchesSubcategory =
              itemSub === "le-sinfonie" ||
              itemName.includes("sinfonie") ||
              itemBrand.includes("sinfonie");
          } else if (activeSub === "le-5-stagioni") {
            matchesSubcategory =
              itemSub === "le-5-stagioni" ||
              itemName.includes("stagioni") ||
              itemBrand.includes("stagioni");
          } else if (activeSub === "imported-groceries") {
            matchesSubcategory =
              itemSub === "imported-groceries" ||
              itemSub.startsWith("imported-");
          } else if (activeSub === "imported-asian-sushi") {
            matchesSubcategory = itemSub === "imported-asian-sushi";
          } else if (activeSub === "imported-pastas-grains") {
            matchesSubcategory = itemSub === "imported-pastas-grains";
          } else if (activeSub === "imported-sauces-condiments") {
            matchesSubcategory = itemSub === "imported-sauces-condiments";
          } else if (activeSub === "imported-oils-vinegars") {
            matchesSubcategory = itemSub === "imported-oils-vinegars";
          } else if (activeSub === "imported-canned-baking") {
            matchesSubcategory = itemSub === "imported-canned-baking";
          } else if (activeSub === "imported-water") {
            matchesSubcategory =
              itemSub === "imported-water" ||
              itemSub === "san-benedetto" ||
              itemSub === "evian" ||
              itemName.includes("water");
          } else if (activeSub === "san-benedetto") {
            matchesSubcategory =
              itemSub === "san-benedetto" ||
              itemName.includes("san benedetto") ||
              itemBrand.includes("san benedetto");
          } else if (activeSub === "evian") {
            matchesSubcategory =
              itemSub === "evian" ||
              itemName.includes("evian") ||
              itemBrand.includes("evian");
          }
        } else if (isFrozenSnacksCategory) {
          // Specific Matching for Frozen Snacks
          if (activeSub === "prasuma") {
            matchesSubcategory =
              itemSub === "prasuma" ||
              itemBrand.includes("prasuma") ||
              itemName.includes("prasuma");
          } else if (activeSub === "top") {
            matchesSubcategory =
              itemSub === "top" ||
              itemBrand === "top" ||
              itemBrand.includes("top") ||
              itemName.includes("top");
          } else if (activeSub === "gadre") {
            matchesSubcategory =
              itemSub === "gadre" ||
              itemBrand.includes("gadre") ||
              itemName.includes("gadre");
          }
        } else if (isCheeseCategory) {
          // Specific Matching for Cheese
          if (activeSub === "imported-cheese") {
            matchesSubcategory =
              itemSub === "imported-cheese" ||
              itemName.includes("parmesan") ||
              itemName.includes("feta") ||
              itemName.includes("brie") ||
              itemName.includes("gouda") ||
              itemName.includes("edam") ||
              itemName.includes("blue cheese") ||
              itemName.includes("camembert") ||
              itemName.includes("emmenthal") ||
              itemName.includes("gruyere") ||
              itemName.includes("goat cheese") ||
              itemSub.includes("imported") ||
              itemName.includes("philadelphia");
          } else if (activeSub === "prabhat-dairy") {
            matchesSubcategory =
              itemSub === "prabhat-dairy" ||
              itemSub.includes("prabhat") ||
              itemBrand.includes("prabhat") ||
              itemName.includes("prabhat");
          } else if (activeSub === "president") {
            matchesSubcategory =
              itemSub === "president" ||
              itemBrand.includes("president") ||
              itemName.includes("president");
          } else if (activeSub === "tropolite") {
            matchesSubcategory =
              itemSub === "tropolite" ||
              itemBrand.includes("tropolite") ||
              itemName.includes("tropolite");
          } else if (activeSub === "dairy-craft") {
            matchesSubcategory =
              itemSub === "dairy-craft" ||
              itemBrand.includes("dairy craft") ||
              itemName.includes("dairy craft") ||
              itemName.includes("la cremella") ||
              itemName.includes("john");
          } else if (activeSub === "goodrich") {
            matchesSubcategory =
              itemSub === "goodrich" ||
              itemBrand.includes("goodrich") ||
              itemName.includes("goodrich") ||
              itemName.includes("wizzie");
          } else if (activeSub === "creme-italia") {
            matchesSubcategory =
              itemSub === "creme-italia" ||
              itemBrand.includes("creme italia") ||
              itemName.includes("creme italia");
          }
        } else if (isFrozenMeatCategory) {
          // Specific Matching for Frozen Meat
          if (activeSub === "imported-meat") {
            matchesSubcategory =
              itemSub === "imported-meat" ||
              itemSub.includes("imported") ||
              itemName.includes("lamb") ||
              itemName.includes("pork") ||
              itemName.includes("duck") ||
              itemName.includes("salmon");
          } else if (activeSub === "seafood") {
            matchesSubcategory =
              itemSub === "seafood" ||
              itemSub.includes("prawn") ||
              itemSub.includes("fish") ||
              itemSub.includes("crab") ||
              itemSub.includes("squid") ||
              itemSub.includes("basa") ||
              itemSub.includes("trout");
          } else if (activeSub === "cold-cuts-sausages") {
            matchesSubcategory =
              itemSub === "cold-cuts-sausages" ||
              itemSub.includes("sausage") ||
              itemSub.includes("salami") ||
              itemSub.includes("bacon") ||
              itemSub.includes("ham") ||
              itemBrand.includes("prasuma");
          } else if (activeSub === "honesty-foods") {
            matchesSubcategory =
              itemBrand.includes("honesty") ||
              itemName.includes("honesty") ||
              itemSub.includes("honesty");
          }
        }

        const matchesGeneralSub =
          itemSub === activeSub ||
          itemSub.includes(activeSub) ||
          itemBrand.includes(activeSub) ||
          itemName.includes(activeSub);

        if (!matchesSubcategory && !matchesGeneralSub) return false;
      }

      // 3. Search Query Matching
      if (q) {
        const matchesQuery =
          product.name?.toLowerCase().includes(q) ||
          product.description?.toLowerCase().includes(q) ||
          product.origin?.toLowerCase().includes(q) ||
          product.brand?.toLowerCase().includes(q);

        if (!matchesQuery) return false;
      }

      return true;
    });
  }, [allProducts, query, category, subcategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  // Helper to update the browser URL search params without refreshing the page
  const updateUrl = (newCat: string, newSub: string, newPage: number) => {
    const params = new URLSearchParams();
    if (newCat && newCat !== "all") params.set("category", newCat);
    if (newSub && newSub !== "all") params.set("subcategory", newSub);
    if (newPage > 1) params.set("page", newPage.toString());

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    updateUrl(category, subcategory, nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
                Bulk ingredients, seafood, cheese, syrups, fruit purees, groceries, and bakery essentials across Kolkata.
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
                setSubcategory("all");
                setPage(1);
                updateUrl(slug, "all", 1);
              }}
              onSelectSubcategory={(subSlug) => {
                setSubcategory(subSlug);
                setPage(1);
                updateUrl(category, subSlug, 1);
              }}
              searchQuery={query}
              onSearchChange={(val) => {
                setQuery(val);
                if (val.trim().length > 0) {
                  setSubcategory("all");
                }
                setPage(1);
              }}
              onReset={() => {
                setCategory("all");
                setSubcategory("all");
                setQuery("");
                setPage(1);
                router.replace(pathname, { scroll: false });
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
                      router.replace(pathname, { scroll: false });
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
                      onChange={handlePageChange}
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