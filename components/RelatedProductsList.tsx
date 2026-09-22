"use client";

import { useState } from "react";
import ProductGrid from "@/components/ProductGrid";

interface RelatedProductsListProps {
  products: any[];
  categoryName: string;
}

export default function RelatedProductsList({
  products,
  categoryName,
}: RelatedProductsListProps) {
  // Start showing 3 products initially
  const [displayCount, setDisplayCount] = useState(3);

  const displayedProducts = products.slice(0, displayCount);
  const remainingCount = products.length - displayCount;
  const hasMore = remainingCount > 0;

  return (
    <div className="space-y-8">
      {/* Product Shelf Grid */}
      <ProductGrid products={displayedProducts} />

      {/* View More Button */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={() => setDisplayCount((prev) => prev + 3)}
            className="group inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-6 py-3 text-xs font-bold uppercase tracking-wider text-neutral-800 shadow-sm transition-all hover:border-[#d32f2f] hover:bg-[#d32f2f] hover:text-white"
          >
            <span>View More {categoryName}</span>
            <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-[11px] font-semibold text-neutral-600 transition group-hover:bg-red-800 group-hover:text-white">
              +{remainingCount}
            </span>
          </button>
        </div>
      )}
    </div>
  );
}