"use client";

import { useRef } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/types/product";

interface RecentlyListedCarouselProps {
  products: Product[];
}

export default function RecentlyListedCarousel({
  products,
}: RecentlyListedCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 340;
    scrollContainerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d32f2f]">
            Fresh Arrivals
          </p>
          <h2 className="mt-1 font-display text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
            Recently Listed
          </h2>
        </div>

        {/* Controls and Link */}
        <div className="flex items-center gap-3">
          <Link
            href="/products"
            className="mr-2 hidden text-xs font-bold text-[#d32f2f] hover:underline sm:inline-block"
          >
            See all products &rarr;
          </Link>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous products"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-100 hover:text-black active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next products"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:bg-neutral-100 hover:text-black active:scale-95"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto pb-4 scroll-smooth scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product) => (
          <div
            key={product.id || product.slug}
            className="w-[280px] shrink-0 snap-start sm:w-[320px]"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Mobile Link */}
      <div className="mt-4 text-center sm:hidden">
        <Link
          href="/products"
          className="text-xs font-bold text-[#d32f2f] hover:underline"
        >
          See all products &rarr;
        </Link>
      </div>
    </section>
  );
}