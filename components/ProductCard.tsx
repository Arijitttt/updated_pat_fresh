"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

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

export default function ProductCard({ product }: { product: Product }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -4 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-xs transition-shadow duration-300 hover:shadow-xl hover:shadow-neutral-900/5"
    >
      {/* Image Container with Zoom Effect */}
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <Image
          src={product.image || "/images/placeholder.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Floating Category Pill */}
        <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-md">
          {product.category}
        </span>

        {product.origin && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-neutral-700 shadow-xs backdrop-blur-md">
            {product.origin}
          </span>
        )}
      </Link>

      {/* Content Details */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-bold tracking-tight text-neutral-900 transition-colors group-hover:text-[#d32f2f]">
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </h3>
            {product.unit && (
              <span className="shrink-0 rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-semibold text-neutral-600">
                {product.unit}
              </span>
            )}
          </div>

          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-neutral-500">
            {product.description}
          </p>
        </div>

        {/* Actions Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-700 transition hover:text-[#d32f2f]"
          >
            Details
            <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </Link>

          <a
            href={`https://wa.me/919830000000?text=${encodeURIComponent(
              `Hello, I would like to inquire about wholesale pricing for ${product.name}.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#d32f2f]/10 px-3 py-1.5 text-xs font-bold text-[#d32f2f] transition hover:bg-[#d32f2f] hover:text-white active:scale-95"
          >
            Enquire
          </a>
        </div>
      </div>
    </motion.div>
  );
}