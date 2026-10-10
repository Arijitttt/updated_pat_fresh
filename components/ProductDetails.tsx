"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";

export default function ProductDetails({ product }: { product: Product }) {
  const prod = product as any;

  const whatsappMessage = encodeURIComponent(
    `Hello PatFresh, I would like to inquire about wholesale pricing and supply availability for: ${product.name} (${product.category}).`
  );

  const specs = prod.specifications || {};
  const specEntries = Object.entries(specs);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
      {/* Left Column: Product Image with Floating Pills */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative lg:col-span-6"
      >
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-2 shadow-xl shadow-neutral-900/5 sm:aspect-square">
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-neutral-100">
            <Image
              src={product.image || "/images/placeholder.jpg"}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              priority
            />
          </div>

          {/* Floating Category & Origin Tags */}
          <div className="absolute left-6 top-6 flex flex-wrap gap-2">
            <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-medium capitalize text-white backdrop-blur-md">
              {product.category}
            </span>
            {product.origin && (
              <span className="rounded-full border border-neutral-200/80 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-neutral-700 shadow-xs backdrop-blur-md">
                {product.origin}
              </span>
            )}
          </div>
        </div>

        {/* B2B Assurance Badges below image */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center rounded-2xl border border-neutral-200/80 bg-white p-3 text-center shadow-2xs">
            <svg
              className="h-5 w-5 text-[#d32f2f]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span className="mt-1 text-[11px] font-bold text-neutral-800">
              Same-Day Dispatch
            </span>
            <span className="text-[10px] text-neutral-400">Order by 2 PM</span>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-neutral-200/80 bg-white p-3 text-center shadow-2xs">
            <svg
              className="h-5 w-5 text-[#d32f2f]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="mt-1 text-[11px] font-bold text-neutral-800">
              Direct From Source
            </span>
            <span className="text-[10px] text-neutral-400">100% Authentic</span>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-neutral-200/80 bg-white p-3 text-center shadow-2xs">
            <svg
              className="h-5 w-5 text-[#d32f2f]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="mt-1 text-[11px] font-bold text-neutral-800">
              Flexible MoQ
            </span>
            <span className="text-[10px] text-neutral-400">
              Carton & Case Packs
            </span>
          </div>
        </div>
      </motion.div>

      {/* Right Column: Information, Specs & Actions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="flex flex-col lg:col-span-6"
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d32f2f]">
            {product.category}
          </span>
          <span className="h-1 w-1 rounded-full bg-neutral-300" />
          <span className="text-xs font-semibold text-emerald-600">
            Bulk Inventory In Stock
          </span>
        </div>

        <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
          {product.name}
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-neutral-600">
          {product.description}
        </p>

        {/* Dynamic Specifications Matrix */}
        <div className="mt-6 rounded-2xl border border-neutral-200/80 bg-white p-4 shadow-2xs">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-700">
              Product Specifications
            </span>
            <span className="text-[11px] font-semibold text-neutral-400">
              Commercial Grade
            </span>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
            {prod.packSize && (
              <div className="flex justify-between border-b border-dashed border-neutral-100 pb-1.5">
                <dt className="text-neutral-500">Standard Pack</dt>
                <dd className="font-semibold text-neutral-900">{prod.packSize}</dd>
              </div>
            )}
            {prod.unit && (
              <div className="flex justify-between border-b border-dashed border-neutral-100 pb-1.5">
                <dt className="text-neutral-500">Billing Unit</dt>
                <dd className="font-semibold text-neutral-900">{prod.unit}</dd>
              </div>
            )}
            {prod.storage && (
              <div className="flex justify-between border-b border-dashed border-neutral-100 pb-1.5">
                <dt className="text-neutral-500">Storage Cond.</dt>
                <dd className="font-semibold text-neutral-900">{prod.storage}</dd>
              </div>
            )}
            {specEntries.map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between border-b border-dashed border-neutral-100 pb-1.5"
              >
                <dt className="capitalize text-neutral-500">
                  {key.replace(/([A-Z])/g, " $1")}
                </dt>
                <dd className="font-semibold text-neutral-900">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Wholesale HoReCa Note */}
        <div className="mt-4 rounded-2xl border border-neutral-200/80 bg-neutral-50/70 p-3.5">
          <div className="flex items-start gap-3">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-100 text-[#d32f2f]">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900">
                Commercial HoReCa Supply
              </p>
              <p className="mt-0.5 text-xs text-neutral-600">
                Scheduled delivery cycles across Kolkata for cafes, hotels, and cloud
                kitchens. Custom case breakdowns available.
              </p>
            </div>
          </div>
        </div>

        {/* Primary CTA Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <a
            href={`https://wa.me/918777352462?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#20ba59] active:scale-[0.99]"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.276-.1-.477-.15-.678.15s-.779.979-.955 1.18c-.176.2-.352.226-.653.076-.301-.15-1.272-.469-2.424-1.496-.897-.799-1.503-1.788-1.68-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.3-.502.1-.2.05-.376-.025-.526-.075-.15-.678-1.634-.929-2.238-.244-.588-.492-.508-.678-.517-.176-.009-.377-.01-.578-.01-.201 0-.527.075-.803.376s-1.054 1.029-1.054 2.509c0 1.48 1.079 2.909 1.23 3.11.15.2 2.124 3.243 5.145 4.548.718.311 1.279.497 1.716.636.721.23 1.377.197 1.896.12.578-.087 1.78-.727 2.031-1.43.251-.703.251-1.305.176-1.43-.075-.126-.276-.201-.577-.351zM12.004 21.996h-.002c-1.802 0-3.568-.485-5.116-1.403l-.367-.218-3.805.998 1.016-3.709-.239-.38a9.96 9.96 0 0 1-1.527-5.281c0-5.514 4.486-10 10.003-10s10 4.486 10 10-4.486 9.993-9.963 9.993zm0-21.996C5.373 0 0 5.373 0 12c0 2.115.553 4.103 1.521 5.836L0 24l6.326-1.488C8.016 23.468 9.962 24 12.004 24 18.631 24 24 18.627 24 12s-5.369-12-11.996-12z" />
            </svg>
            Instant WhatsApp Quote
          </a>

          <Link
            href="/contact"
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-neutral-300 bg-white px-5 py-3 text-xs font-bold text-neutral-800 transition hover:border-[#d32f2f] hover:text-[#d32f2f] active:scale-[0.99]"
          >
            Send Supply Inquiry
          </Link>
        </div>
      </motion.div>
    </div>
  );
}