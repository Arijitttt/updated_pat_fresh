"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  image: string;
  description: string;
  origin?: string;
  unit?: string;
}

// Reliable high-res fallback mapping for seafood & items
const PRODUCT_FALLBACK_IMAGES: Record<string, string> = {
  rohu: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&q=80",
  katla: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80",
  hilsa: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80",
  pomfret: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=600&q=80",
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();

  const handleAddToRfq = () => {
    addToCart({
      id: product.slug || product.id,
      name: product.name,
      category: product.category,
      quantityKg: 20,
      cutType: "Standard / Cleaned",
    });
  };

  // Safe fallback if placeholder/pizza image was passed in data
  const isBrokenOrSampleImage =
    !product.image ||
    product.image.includes("placeholder") ||
    (product.slug === "katla" && product.image.includes("1565299624946"));

  const displayImage = isBrokenOrSampleImage
    ? PRODUCT_FALLBACK_IMAGES[product.slug] || "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&q=80"
    : product.image;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-xs transition-all duration-300 hover:border-red-200 hover:shadow-xl hover:shadow-neutral-900/5"
    >
      {/* 1. Image Showcase & Non-Overlapping Badges */}
      <div>
        <Link
          href={`/products/${product.slug}`}
          className="relative block aspect-[4/3] w-full overflow-hidden bg-neutral-100"
        >
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

          {/* Top Info Bar: Category + Origin without overlap */}
          <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-2">
            <span className="shrink-0 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
              {product.category}
            </span>

            {product.origin && (
              <span
                title={product.origin}
                className="max-w-[130px] truncate rounded-md bg-white/90 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-neutral-800 shadow-xs backdrop-blur-md"
              >
                {product.origin}
              </span>
            )}
          </div>
        </Link>

        {/* 2. Text Details */}
        <div className="p-4 sm:p-5">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-base font-bold text-neutral-900 transition-colors group-hover:text-[#d32f2f]">
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </h3>
            {product.unit && (
              <span className="shrink-0 rounded bg-neutral-100 px-1.5 py-0.5 text-[11px] font-semibold text-neutral-600">
                {product.unit}
              </span>
            )}
          </div>

          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-500">
            {product.description}
          </p>
        </div>
      </div>

      {/* 3. Action Footer: Clean Spacing & Separated Actions */}
      <div className="border-t border-neutral-100 p-4 pt-3 sm:p-5 sm:pt-3.5">
        <div className="flex items-center justify-between gap-2">
          {/* Details Link */}
          <Link
            href={`/products/${product.slug}`}
            className="text-xs font-semibold text-neutral-500 transition hover:text-[#d32f2f]"
          >
            Details &rarr;
          </Link>

          {/* Action CTAs */}
          <div className="flex items-center gap-1.5">
            <a
              href={`https://wa.me/918777352462?text=${encodeURIComponent(
                `Hello, I would like to enquire about wholesale rates for ${product.name}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-neutral-200 px-2.5 py-1.5 text-xs font-semibold text-neutral-700 transition hover:bg-neutral-100 active:scale-95"
            >
              Enquire
            </a>

            <button
              onClick={handleAddToRfq}
              className="flex items-center gap-1 rounded-lg bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] px-3 py-1.5 text-xs font-bold text-white shadow-xs shadow-red-600/20 transition hover:opacity-95 active:scale-95"
            >
              <span>+</span>
              <span>RFQ</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}