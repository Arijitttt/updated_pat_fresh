"use client";

import { motion, AnimatePresence } from "framer-motion";

interface Category {
  slug: string;
  name: string;
  count?: number;
}

interface FilterSidebarProps {
  categories: Category[];
  activeCategory: string;
  activeSubcategory?: string;
  onSelectCategory: (slug: string) => void;
  onSelectSubcategory?: (subSlug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onReset?: () => void;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  bakery: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 0010 11V7a4 4 0 10-8 0v4c0 .621.05 1.23.145 1.823m8.303 6.643L12 21m0-3h5m0 3a2 2 0 002-2v-5a2 2 0 00-2-2H9.828" />
    </svg>
  ),
  beverages: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
  cheese: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18l-9-7-9 7zm0 0v8a3 3 0 003 3h12a3 3 0 003-3v-8M7 15h.01M12 16h.01M17 14h.01" />
    </svg>
  ),
  dairy: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3h6m-5 4h4m-5 4h6m-8 3v5a2 2 0 002 2h6a2 2 0 002-2v-5l-2-4V7a2 2 0 00-2-2h-2a2 2 0 00-2 2v4l-2 4z" />
    </svg>
  ),
  "frozen-meat": (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 6.5l-4-4c-2.5-2.5-6.5-1.5-8 1s-1 6.5 1.5 9l8 8c2.5 2.5 6.5 2 8-1s.5-7-2-9.5l-1.5-1.5zm-8 4a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
  ),
  "frozen-snacks": (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  ),
  "frozen-fruits-berries": (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c1.5-2 3-5 3-9s-1.5-7-3-9c-1.5 2-3 5-3 9s1.5 7 3 9z" />
    </svg>
  ),
  groceries: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  "bar-ingredients": (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 3H5l7 8v8m-4 0h8M8 7h8" />
    </svg>
  ),
};

/* --- Bakery Subcategories --- */
const CHOCOLATE_BAKERY_SUBCATEGORIES = [
  { slug: "bakery-chocolates-2m", name: "2M" },
  { slug: "bakery-chocolates-tenero", name: "Tenero" },
];

const TROPOLITE_BAKERY_SUBCATEGORIES = [
  { slug: "tropolite-aromas", name: "Aromas" },
  { slug: "tropolite-fondants", name: "Fondants" },
  { slug: "tropolite-premixes", name: "Premixes" },
  { slug: "tropolite-whipping-cream", name: "Whipping Cream" },
];

/* --- Cheese Subcategories --- */
const CHEESE_SUBCATEGORIES = [
  { slug: "dairy-craft", name: "Dairy Craft" },
  { slug: "goodrich", name: "Goodrich" },
  { slug: "creme-italia", name: "Creme Italia" },
  { slug: "imported-cheese", name: "Imported Cheese" },
  { slug: "prabhat-dairy", name: "Prabhat Dairy" },
  { slug: "president", name: "President" },
  { slug: "tropolite", name: "Tropolite" },
];

/* --- Frozen Snacks Subcategories --- */
const FROZEN_SNACKS_SUBCATEGORIES = [
  { slug: "prasuma", name: "Prasuma" },
  { slug: "top", name: "TOP" },
  { slug: "gadre", name: "Gadre" },
];

/* --- Groceries Subcategories --- */
const LOCAL_GROCERY_BRANDS = [
  { slug: "delmonte", name: "Del Monte" },
  { slug: "hersheys", name: "Hershey's" },
  { slug: "hindusthan-unilever", name: "Hindusthan Unilever" },
  { slug: "milk-lab", name: "Milk Lab" },
  { slug: "naturesmith", name: "Naturesmith" },
  { slug: "peanuts", name: "Peanuts" },
  { slug: "tropolite-cooking-cream", name: "Tropolite" },
];

const IMPORTED_FLOUR_BRANDS = [
  { slug: "le-sinfonie", name: "Le Sinfonie" },
  { slug: "le-5-stagioni", name: "Le 5 Stagioni" },
];

const IMPORTED_GROCERIES_SECTIONS = [
  { slug: "imported-asian-sushi", name: "Asian & Sushi" },
  { slug: "imported-pastas-grains", name: "Pastas & Grains" },
  { slug: "imported-sauces-condiments", name: "Sauces & Condiments" },
  { slug: "imported-oils-vinegars", name: "Oils & Vinegars" },
  { slug: "imported-canned-baking", name: "Canned, Fruits & Baking" },
];

const IMPORTED_WATER_BRANDS = [
  { slug: "san-benedetto", name: "San Benedetto" },
  { slug: "evian", name: "Evian" },
];

/* --- Bar Ingredients Subcategories --- */
const SYRUP_BRANDS = [
  { slug: "swa-artisanal-syrups", name: "SWA Artisanal" },
  { slug: "mathieu-teisseire", name: "Mathieu Teisseire" },
  { slug: "pente-vuna-syrups", name: "Pente Vuna" },
  { slug: "malas-syrups", name: "Mala's" },
];

const FRUIT_PUREE_BRANDS = [
  { slug: "orsadrinks-odk", name: "Orsadrinks ODK" },
];

const JUICE_BRANDS = [
  { slug: "pente-vuna-juice", name: "Pente Vuna" },
];

const CRUSH_BRANDS = [
  { slug: "malas-crushes", name: "Mala's" },
];

export default function FilterSidebar({
  categories,
  activeCategory,
  activeSubcategory = "all",
  onSelectCategory,
  onSelectSubcategory,
  searchQuery,
  onSearchChange,
  onReset,
}: FilterSidebarProps) {
  const isFiltered =
    activeCategory !== "all" ||
    activeSubcategory !== "all" ||
    searchQuery.trim().length > 0;

  const fullCategories: Category[] = [
    { slug: "all", name: "All Products" },
    ...categories.filter((c) => c.slug !== "all"),
  ];

  return (
    <aside className="w-full">
      <div className="overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-5 shadow-lg shadow-neutral-900/5 transition-all">
        {/* Header with quick reset */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#d32f2f]" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-neutral-400">
              Filters
            </span>
          </div>

          {isFiltered && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              onClick={onReset}
              className="text-[11px] font-bold text-[#d32f2f] hover:underline"
            >
              Reset all
            </motion.button>
          )}
        </div>

        {/* Search Input */}
        <div className="mt-5">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Search
          </label>
          <div className="group relative mt-2 flex items-center">
            <svg
              className="pointer-events-none absolute left-3.5 h-4 w-4 text-neutral-400 transition-colors group-focus-within:text-[#d32f2f]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                onSearchChange(e.target.value);
                if (e.target.value.trim().length > 0 && onSelectSubcategory) {
                  onSelectSubcategory("all");
                }
              }}
              placeholder="Search products, e.g. fondant, syrup, cream"
              className="w-full rounded-2xl border border-neutral-200/90 bg-neutral-50/70 py-2.5 pl-10 pr-9 text-xs font-medium text-neutral-800 placeholder:text-neutral-400 outline-none transition duration-200 focus:border-[#d32f2f] focus:bg-white focus:ring-4 focus:ring-red-500/10"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-neutral-200/70 text-neutral-600 hover:bg-neutral-300 text-[10px]"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Category List */}
        <div className="mt-7">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500">
            Category
          </label>

          <nav className="relative mt-3 space-y-1.5">
            {fullCategories.map((item) => {
              const activeCategoryLower = activeCategory.toLowerCase();
              const itemSlugLower = item.slug.toLowerCase();
              const isActive = activeCategoryLower === itemSlugLower;
              const icon = CATEGORY_ICONS[itemSlugLower] || CATEGORY_ICONS.all;

              const isBakery = itemSlugLower === "bakery";
              const isCheese = itemSlugLower === "cheese";
              const isGroceries = itemSlugLower === "groceries";
              const isFrozenMeat =
                itemSlugLower === "frozen-meat" || itemSlugLower === "meat";
              const isFrozenSnacks =
                itemSlugLower === "frozen-snacks" || itemSlugLower === "snacks";
              const isBarIngredients =
                itemSlugLower === "bar-ingredients" || itemSlugLower === "bar";

              const hasSubcategories =
                isBakery || isCheese || isGroceries || isFrozenMeat || isFrozenSnacks || isBarIngredients;

              return (
                <div key={item.slug} className="flex flex-col">
                  <button
                    onClick={() => {
                      onSelectCategory(item.slug);
                      if (onSelectSubcategory && !hasSubcategories) {
                        onSelectSubcategory("all");
                      }
                    }}
                    className={`group relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition-colors duration-200 ${
                      isActive
                        ? "text-white"
                        : "text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] shadow-md shadow-red-600/25"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-2.5">
                      <span
                        className={`transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-neutral-400 group-hover:text-neutral-700"
                        }`}
                      >
                        {icon}
                      </span>
                      <span className="capitalize">{item.name}</span>
                    </span>

                    <span className="relative z-10 flex items-center">
                      {isActive ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="h-1.5 w-1.5 rounded-full bg-white"
                        />
                      ) : (
                        <svg
                          className="h-3.5 w-3.5 text-neutral-300 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      )}
                    </span>
                  </button>

                  {/* 1. BAKERY Accordion */}
                  {isBakery && (
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 mt-1 flex flex-col gap-1 border-l-2 border-red-200 pl-3.5 overflow-hidden"
                        >
                          {/* All Bakery */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("all");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "all"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "all"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>All Bakery</span>
                          </button>

                          {/* Imported Dairy Products */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("bakery-imported-dairy");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "bakery-imported-dairy"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "bakery-imported-dairy"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>Imported Dairy Products</span>
                          </button>

                          {/* Chocolates (Nested: 2M & Tenero) */}
                          <div className="mt-1 flex flex-col">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectSubcategory) onSelectSubcategory("bakery-chocolates");
                              }}
                              className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 font-bold ${
                                activeSubcategory.toLowerCase() === "bakery-chocolates" ||
                                CHOCOLATE_BAKERY_SUBCATEGORIES.some(
                                  (s) => s.slug === activeSubcategory.toLowerCase()
                                )
                                  ? "text-[#d32f2f]"
                                  : "text-neutral-800 hover:text-neutral-900"
                              }`}
                            >
                              <span>Chocolates</span>
                            </button>

                            <div className="ml-2.5 flex flex-col gap-1 border-l border-neutral-300 pl-3">
                              {CHOCOLATE_BAKERY_SUBCATEGORIES.map((sub) => {
                                const isSubActive =
                                  activeSubcategory.toLowerCase() === sub.slug.toLowerCase();

                                return (
                                  <button
                                    key={sub.slug}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onSelectSubcategory) onSelectSubcategory(sub.slug);
                                    }}
                                    className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                                      isSubActive
                                        ? "font-bold text-[#d32f2f]"
                                        : "font-medium text-neutral-500 hover:text-neutral-900"
                                    }`}
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        isSubActive ? "bg-[#d32f2f]" : "bg-neutral-300"
                                      }`}
                                    />
                                    <span>{sub.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Tropolite (Nested: Aromas, Fondants, Premixes, Whipping Cream) */}
                          <div className="mt-1 flex flex-col">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectSubcategory) onSelectSubcategory("tropolite-bakery");
                              }}
                              className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 font-bold ${
                                activeSubcategory.toLowerCase() === "tropolite-bakery" ||
                                TROPOLITE_BAKERY_SUBCATEGORIES.some(
                                  (s) => s.slug === activeSubcategory.toLowerCase()
                                )
                                  ? "text-[#d32f2f]"
                                  : "text-neutral-800 hover:text-neutral-900"
                              }`}
                            >
                              <span>Tropolite</span>
                            </button>

                            <div className="ml-2.5 flex flex-col gap-1 border-l border-neutral-300 pl-3">
                              {TROPOLITE_BAKERY_SUBCATEGORIES.map((sub) => {
                                const isSubActive =
                                  activeSubcategory.toLowerCase() === sub.slug.toLowerCase();

                                return (
                                  <button
                                    key={sub.slug}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onSelectSubcategory) onSelectSubcategory(sub.slug);
                                    }}
                                    className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                                      isSubActive
                                        ? "font-bold text-[#d32f2f]"
                                        : "font-medium text-neutral-500 hover:text-neutral-900"
                                    }`}
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        isSubActive ? "bg-[#d32f2f]" : "bg-neutral-300"
                                      }`}
                                    />
                                    <span>{sub.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Fruit Fillings */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("malas-bakery-fillings");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "malas-bakery-fillings"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "malas-bakery-fillings"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>Fruit Fillings (MALA&apos;S)</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* 2. GROCERIES Accordion */}
                  {isGroceries && (
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 mt-1 flex flex-col gap-1 border-l-2 border-red-200 pl-3.5 overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("all");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "all"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "all"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>All Groceries</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("ristoris");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "ristoris"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "ristoris"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>RISTORIS</span>
                          </button>

                          {/* Local Groceries */}
                          <div className="mt-1 flex flex-col">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectSubcategory) onSelectSubcategory("local-groceries");
                              }}
                              className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 font-bold ${
                                activeSubcategory.toLowerCase() === "local-groceries" ||
                                LOCAL_GROCERY_BRANDS.some((b) => b.slug === activeSubcategory.toLowerCase())
                                  ? "text-[#d32f2f]"
                                  : "text-neutral-800 hover:text-neutral-900"
                              }`}
                            >
                              <span>Local Groceries</span>
                            </button>

                            <div className="ml-2.5 flex flex-col gap-1 border-l border-neutral-300 pl-3">
                              {LOCAL_GROCERY_BRANDS.map((brand) => {
                                const isBrandActive =
                                  activeSubcategory.toLowerCase() === brand.slug.toLowerCase();

                                return (
                                  <button
                                    key={brand.slug}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onSelectSubcategory) onSelectSubcategory(brand.slug);
                                    }}
                                    className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                                      isBrandActive
                                        ? "font-bold text-[#d32f2f]"
                                        : "font-medium text-neutral-500 hover:text-neutral-900"
                                    }`}
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        isBrandActive ? "bg-[#d32f2f]" : "bg-neutral-300"
                                      }`}
                                    />
                                    <span>{brand.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Imported Flour */}
                          <div className="mt-1 flex flex-col">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectSubcategory) onSelectSubcategory("imported-flour");
                              }}
                              className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 font-bold ${
                                activeSubcategory.toLowerCase() === "imported-flour" ||
                                IMPORTED_FLOUR_BRANDS.some((b) => b.slug === activeSubcategory.toLowerCase())
                                  ? "text-[#d32f2f]"
                                  : "text-neutral-800 hover:text-neutral-900"
                              }`}
                            >
                              <span>Imported Flour</span>
                            </button>

                            <div className="ml-2.5 flex flex-col gap-1 border-l border-neutral-300 pl-3">
                              {IMPORTED_FLOUR_BRANDS.map((flour) => {
                                const isFlourActive =
                                  activeSubcategory.toLowerCase() === flour.slug.toLowerCase();

                                return (
                                  <button
                                    key={flour.slug}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onSelectSubcategory) onSelectSubcategory(flour.slug);
                                    }}
                                    className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                                      isFlourActive
                                        ? "font-bold text-[#d32f2f]"
                                        : "font-medium text-neutral-500 hover:text-neutral-900"
                                    }`}
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        isFlourActive ? "bg-[#d32f2f]" : "bg-neutral-300"
                                      }`}
                                    />
                                    <span>{flour.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Imported Groceries (Nested Subsections) */}
                          <div className="mt-1 flex flex-col">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectSubcategory) onSelectSubcategory("imported-groceries");
                              }}
                              className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 font-bold ${
                                activeSubcategory.toLowerCase() === "imported-groceries" ||
                                IMPORTED_GROCERIES_SECTIONS.some((s) => s.slug === activeSubcategory.toLowerCase())
                                  ? "text-[#d32f2f]"
                                  : "text-neutral-800 hover:text-neutral-900"
                              }`}
                            >
                              <span>Imported Groceries</span>
                            </button>

                            <div className="ml-2.5 flex flex-col gap-1 border-l border-neutral-300 pl-3">
                              {IMPORTED_GROCERIES_SECTIONS.map((sec) => {
                                const isSecActive =
                                  activeSubcategory.toLowerCase() === sec.slug.toLowerCase();

                                return (
                                  <button
                                    key={sec.slug}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onSelectSubcategory) onSelectSubcategory(sec.slug);
                                    }}
                                    className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                                      isSecActive
                                        ? "font-bold text-[#d32f2f]"
                                        : "font-medium text-neutral-500 hover:text-neutral-900"
                                    }`}
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        isSecActive ? "bg-[#d32f2f]" : "bg-neutral-300"
                                      }`}
                                    />
                                    <span>{sec.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Imported Water */}
                          <div className="mt-1 flex flex-col">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectSubcategory) onSelectSubcategory("imported-water");
                              }}
                              className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 font-bold ${
                                activeSubcategory.toLowerCase() === "imported-water" ||
                                IMPORTED_WATER_BRANDS.some((b) => b.slug === activeSubcategory.toLowerCase())
                                  ? "text-[#d32f2f]"
                                  : "text-neutral-800 hover:text-neutral-900"
                              }`}
                            >
                              <span>Imported Water</span>
                            </button>

                            <div className="ml-2.5 flex flex-col gap-1 border-l border-neutral-300 pl-3">
                              {IMPORTED_WATER_BRANDS.map((water) => {
                                const isWaterActive =
                                  activeSubcategory.toLowerCase() === water.slug.toLowerCase();

                                return (
                                  <button
                                    key={water.slug}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onSelectSubcategory) onSelectSubcategory(water.slug);
                                    }}
                                    className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                                      isWaterActive
                                        ? "font-bold text-[#d32f2f]"
                                        : "font-medium text-neutral-500 hover:text-neutral-900"
                                    }`}
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        isWaterActive ? "bg-[#d32f2f]" : "bg-neutral-300"
                                      }`}
                                    />
                                    <span>{water.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* 3. BAR INGREDIENTS Accordion */}
                  {isBarIngredients && (
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 mt-1 flex flex-col gap-1 border-l-2 border-red-200 pl-3.5 overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("all");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "all"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "all"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>All Bar Ingredients</span>
                          </button>

                          {/* Syrups */}
                          <div className="mt-1 flex flex-col">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectSubcategory) onSelectSubcategory("syrups");
                              }}
                              className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 font-bold ${
                                activeSubcategory.toLowerCase() === "syrups" ||
                                SYRUP_BRANDS.some((b) => b.slug === activeSubcategory.toLowerCase())
                                  ? "text-[#d32f2f]"
                                  : "text-neutral-800 hover:text-neutral-900"
                              }`}
                            >
                              <span>Syrups</span>
                            </button>

                            <div className="ml-2.5 flex flex-col gap-1 border-l border-neutral-300 pl-3">
                              {SYRUP_BRANDS.map((brand) => {
                                const isBrandActive =
                                  activeSubcategory.toLowerCase() === brand.slug.toLowerCase();

                                return (
                                  <button
                                    key={brand.slug}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onSelectSubcategory) onSelectSubcategory(brand.slug);
                                    }}
                                    className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                                      isBrandActive
                                        ? "font-bold text-[#d32f2f]"
                                        : "font-medium text-neutral-500 hover:text-neutral-900"
                                    }`}
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        isBrandActive ? "bg-[#d32f2f]" : "bg-neutral-300"
                                      }`}
                                    />
                                    <span>{brand.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Fruit Purees */}
                          <div className="mt-1 flex flex-col">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectSubcategory) onSelectSubcategory("fruit-purees");
                              }}
                              className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 font-bold ${
                                activeSubcategory.toLowerCase() === "fruit-purees" ||
                                FRUIT_PUREE_BRANDS.some((b) => b.slug === activeSubcategory.toLowerCase())
                                  ? "text-[#d32f2f]"
                                  : "text-neutral-800 hover:text-neutral-900"
                              }`}
                            >
                              <span>Fruit Purees</span>
                            </button>

                            <div className="ml-2.5 flex flex-col gap-1 border-l border-neutral-300 pl-3">
                              {FRUIT_PUREE_BRANDS.map((brand) => {
                                const isBrandActive =
                                  activeSubcategory.toLowerCase() === brand.slug.toLowerCase();

                                return (
                                  <button
                                    key={brand.slug}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onSelectSubcategory) onSelectSubcategory(brand.slug);
                                    }}
                                    className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                                      isBrandActive
                                        ? "font-bold text-[#d32f2f]"
                                        : "font-medium text-neutral-500 hover:text-neutral-900"
                                    }`}
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        isBrandActive ? "bg-[#d32f2f]" : "bg-neutral-300"
                                      }`}
                                    />
                                    <span>{brand.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Juice */}
                          <div className="mt-1 flex flex-col">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectSubcategory) onSelectSubcategory("juice");
                              }}
                              className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 font-bold ${
                                activeSubcategory.toLowerCase() === "juice" ||
                                JUICE_BRANDS.some((b) => b.slug === activeSubcategory.toLowerCase())
                                  ? "text-[#d32f2f]"
                                  : "text-neutral-800 hover:text-neutral-900"
                              }`}
                            >
                              <span>Juice</span>
                            </button>

                            <div className="ml-2.5 flex flex-col gap-1 border-l border-neutral-300 pl-3">
                              {JUICE_BRANDS.map((brand) => {
                                const isBrandActive =
                                  activeSubcategory.toLowerCase() === brand.slug.toLowerCase();

                                return (
                                  <button
                                    key={brand.slug}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onSelectSubcategory) onSelectSubcategory(brand.slug);
                                    }}
                                    className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                                      isBrandActive
                                        ? "font-bold text-[#d32f2f]"
                                        : "font-medium text-neutral-500 hover:text-neutral-900"
                                    }`}
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        isBrandActive ? "bg-[#d32f2f]" : "bg-neutral-300"
                                      }`}
                                    />
                                    <span>{brand.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Crushes */}
                          <div className="mt-1 flex flex-col">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onSelectSubcategory) onSelectSubcategory("crushes");
                              }}
                              className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 font-bold ${
                                activeSubcategory.toLowerCase() === "crushes" ||
                                CRUSH_BRANDS.some((b) => b.slug === activeSubcategory.toLowerCase())
                                  ? "text-[#d32f2f]"
                                  : "text-neutral-800 hover:text-neutral-900"
                              }`}
                            >
                              <span>Crushes</span>
                            </button>

                            <div className="ml-2.5 flex flex-col gap-1 border-l border-neutral-300 pl-3">
                              {CRUSH_BRANDS.map((brand) => {
                                const isBrandActive =
                                  activeSubcategory.toLowerCase() === brand.slug.toLowerCase();

                                return (
                                  <button
                                    key={brand.slug}
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (onSelectSubcategory) onSelectSubcategory(brand.slug);
                                    }}
                                    className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                                      isBrandActive
                                        ? "font-bold text-[#d32f2f]"
                                        : "font-medium text-neutral-500 hover:text-neutral-900"
                                    }`}
                                  >
                                    <span
                                      className={`h-1.5 w-1.5 rounded-full ${
                                        isBrandActive ? "bg-[#d32f2f]" : "bg-neutral-300"
                                      }`}
                                    />
                                    <span>{brand.name}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* 4. CHEESE Accordion */}
                  {isCheese && (
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 mt-1 flex flex-col gap-1 border-l-2 border-red-200 pl-3.5 overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("all");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "all"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "all"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>All Cheese</span>
                          </button>

                          {CHEESE_SUBCATEGORIES.map((sub) => {
                            const isSubActive =
                              activeSubcategory.toLowerCase() === sub.slug.toLowerCase();

                            return (
                              <button
                                key={sub.slug}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onSelectSubcategory) onSelectSubcategory(sub.slug);
                                }}
                                className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                                  isSubActive
                                    ? "font-bold text-[#d32f2f]"
                                    : "font-medium text-neutral-500 hover:text-neutral-900"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    isSubActive ? "bg-[#d32f2f]" : "bg-neutral-300"
                                  }`}
                                />
                                <span>{sub.name}</span>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* 5. FROZEN SNACKS Accordion */}
                  {isFrozenSnacks && (
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 mt-1 flex flex-col gap-1 border-l-2 border-red-200 pl-3.5 overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("all");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "all"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "all"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>All Frozen Snacks</span>
                          </button>

                          {FROZEN_SNACKS_SUBCATEGORIES.map((sub) => {
                            const isSubActive =
                              activeSubcategory.toLowerCase() === sub.slug.toLowerCase();

                            return (
                              <button
                                key={sub.slug}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onSelectSubcategory) onSelectSubcategory(sub.slug);
                                }}
                                className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                                  isSubActive
                                    ? "font-bold text-[#d32f2f]"
                                    : "font-medium text-neutral-500 hover:text-neutral-900"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    isSubActive ? "bg-[#d32f2f]" : "bg-neutral-300"
                                  }`}
                                />
                                <span>{sub.name}</span>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* 6. FROZEN MEAT Accordion */}
                  {isFrozenMeat && (
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="ml-6 mt-1 flex flex-col gap-1 border-l-2 border-red-200 pl-3.5 overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("all");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "all"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "all"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>All Frozen Meat</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("imported-meat");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "imported-meat"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "imported-meat"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>Imported Meat</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("seafood");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "seafood"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "seafood"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>Seafood</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("cold-cuts-sausages");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "cold-cuts-sausages" ||
                              activeSubcategory.toLowerCase() === "prasuma"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "cold-cuts-sausages" ||
                                activeSubcategory.toLowerCase() === "prasuma"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>Cold Cuts & Sausages</span>
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectSubcategory) onSelectSubcategory("honesty-foods");
                            }}
                            className={`text-left text-[11px] py-1 transition-colors flex items-center gap-1.5 ${
                              activeSubcategory.toLowerCase() === "honesty-foods"
                                ? "font-bold text-[#d32f2f]"
                                : "font-medium text-neutral-500 hover:text-neutral-900"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                activeSubcategory.toLowerCase() === "honesty-foods"
                                  ? "bg-[#d32f2f]"
                                  : "bg-neutral-300"
                              }`}
                            />
                            <span>Honesty Foods</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}