"use client";

import { motion } from "framer-motion";

interface Category {
  slug: string;
  name: string;
  count?: number;
}

interface FilterSidebarProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onReset?: () => void;
}

// Category icons mapped for fresh/commercial food supply
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  all: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  ),
  fish: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4c4.418 0 8 3.582 8 8 0 2.21-.895 4.21-2.343 5.657L21 21l-3.343-3.343A7.962 7.962 0 0112 20c-4.418 0-8-3.582-8-8s3.582-8 8-8z" />
    </svg>
  ),
  vegetables: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  fruits: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <circle cx="12" cy="12" r="8" strokeWidth="2" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v4m0-4c1-1 3-1 4 0" />
    </svg>
  ),
  grocery: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
    </svg>
  ),
  chocolates: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ),
  beverages: (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
};

export default function FilterSidebar({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onReset,
}: FilterSidebarProps) {
  const isFiltered = activeCategory !== "all" || searchQuery.trim().length > 0;

  // Ensure "All" is always first
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, e.g. rohu"
              className="w-full rounded-2xl border border-neutral-200/90 bg-neutral-50/70 py-2.5 pl-10 pr-9 text-xs font-medium text-neutral-800 placeholder:text-neutral-400 outline-none transition duration-200 focus:border-[#d32f2f] focus:bg-white focus:ring-4 focus:ring-red-500/10"
            />

            {/* Clear "X" Button */}
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
              const isActive = activeCategory.toLowerCase() === item.slug.toLowerCase();
              const icon = CATEGORY_ICONS[item.slug.toLowerCase()] || CATEGORY_ICONS.all;

              return (
                <button
                  key={item.slug}
                  onClick={() => onSelectCategory(item.slug)}
                  className={`group relative flex w-full items-center justify-between rounded-xl px-3.5 py-2.5 text-left text-xs font-semibold transition-colors duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900"
                  }`}
                >
                  {/* Sliding Active Background (Framer Motion) */}
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

                  {/* Left Label & Icon */}
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

                  {/* Right Active Indicator / Count */}
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}