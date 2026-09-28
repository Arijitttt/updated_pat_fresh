"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

export interface CategoryInfo {
  slug: string;
  name: string;
  tagline?: string;
  description?: string;
  image?: string;
}

interface CategoryShowcaseCarouselProps {
  categories: CategoryInfo[];
  productsByCategory: Record<string, Product[]>;
}

export default function CategoryShowcaseCarousel({
  categories,
  productsByCategory,
}: CategoryShowcaseCarouselProps) {
  const activeSlides = categories.slice(0, 6);
  const [currentIndex, setCurrentIndex] = useState(0);
  const productTrackRef = useRef<HTMLDivElement>(null);

  const currentCategory = activeSlides[currentIndex] || activeSlides[0];
  // ✅ New (loads every product in that category):
const categoryProducts = productsByCategory[currentCategory?.slug] || [];

  // Scrolls exactly 1 card width or a full 3-card page on click
  const scrollProducts = (direction: "left" | "right") => {
    if (!productTrackRef.current) return;
    const containerWidth = productTrackRef.current.clientWidth;
    // Scroll by one full visible row (3 items)
    productTrackRef.current.scrollBy({
      left: direction === "left" ? -containerWidth : containerWidth,
      behavior: "smooth",
    });
  };

  if (!currentCategory) return null;

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200/80 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d32f2f]">
            Browse Catalog
          </span>
          <h2 className="mt-1 font-display text-2xl font-extrabold text-[#0f172a] sm:text-3xl">
            Featured Categories
          </h2>
        </div>

        {/* Top-Right Arrow Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollProducts("left")}
            aria-label="Scroll products left"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-100 hover:text-black active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollProducts("right")}
            aria-label="Scroll products right"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-100 hover:text-black active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* 6 Category Navigation Slide Pills */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {activeSlides.map((cat, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => {
                setCurrentIndex(idx);
                if (productTrackRef.current) {
                  productTrackRef.current.scrollTo({ left: 0, behavior: "smooth" });
                }
              }}
              className={`relative whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#d32f2f] text-white shadow-md shadow-red-600/25"
                  : "border border-neutral-200/80 bg-white text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
              }`}
            >
              {idx + 1}. {cat.name}
            </button>
          );
        })}
      </div>

      {/* Slide Details Header */}
      <div className="mt-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="font-display text-xl font-bold text-neutral-900">
            {currentCategory.name}
          </h3>
          <p className="text-xs text-neutral-500">
            {currentCategory.tagline || currentCategory.description || "Fresh commercial food supplies."}
          </p>
        </div>
        <Link
          href={`/products?category=${currentCategory.slug}`}
          className="text-xs font-bold text-[#d32f2f] hover:underline"
        >
          View all {currentCategory.name} &rarr;
        </Link>
      </div>

      {/* Products Carousel Track: Clean 3 Cards Per Window */}
      <div className="relative group mt-6">
        {/* Floating Side Left Arrow */}
        <button
          type="button"
          onClick={() => scrollProducts("left")}
          aria-label="Scroll left"
          className="absolute -left-4 top-1/2 z-20 hidden -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-lg transition-all hover:bg-neutral-50 hover:text-black active:scale-95 group-hover:flex"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Scroll Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCategory.slug}
            ref={productTrackRef}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categoryProducts.length > 0 ? (
              categoryProducts.map((product) => (
                <div
                  key={product.id || product.slug}
                  /* Exactly 1 on mobile, 2 on tablet, and precisely 3 on desktop */
                  className="w-full sm:w-[calc((100%-24px)/2)] md:w-[calc((100%-48px)/3)] shrink-0 snap-start"
                >
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="flex h-48 w-full items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white/60 p-6 text-xs text-neutral-400">
                No products found in this category.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Floating Side Right Arrow */}
        <button
          type="button"
          onClick={() => scrollProducts("right")}
          aria-label="Scroll right"
          className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-lg transition-all hover:bg-neutral-50 hover:text-black active:scale-95 group-hover:flex"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}