"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

export interface CategoryItem {
  id?: string;
  name: string;
  slug: string;
  image?: string;
  tagline?: string;
  description?: string;
}

const CATEGORY_FALLBACK_IMAGES: Record<string, { img: string; tag: string }> = {
  fish: {
    img: "https://images.unsplash.com/photo-1534483509719-3feaee7c30da?w=600&q=80",
    tag: "Fresh catch & fillets",
  },
  vegetables: {
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&q=80",
    tag: "Farm-direct produce",
  },
  fruits: {
    img: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600&q=80",
    tag: "Seasonal & exotic",
  },
  grocery: {
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&q=80",
    tag: "Bulk staple essentials",
  },
  chocolates: {
    img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&q=80",
    tag: "Gourmet confectionery",
  },
  beverages: {
    img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&q=80",
    tag: "Teas, syrups & bases",
  },
};

const defaultCategories: CategoryItem[] = [
  { name: "Fish & Seafood", slug: "fish" },
  { name: "Vegetables", slug: "vegetables" },
  { name: "Fruits", slug: "fruits" },
  { name: "Grocery & Grains", slug: "grocery" },
  { name: "Chocolates", slug: "chocolates" },
  { name: "Beverages", slug: "beverages" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

interface CategoryGridProps {
  categories?: CategoryItem[];
}

export default function CategoryGrid({
  categories = defaultCategories,
}: CategoryGridProps) {
  const activeCategories = categories.filter((cat) => cat.slug !== "all");

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0a0f1d] via-[#101726] to-[#0a0f1d] py-16 text-white lg:py-20">
      {/* Ambient Lighting Accents */}
      <div className="pointer-events-none absolute -left-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#d32f2f]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-20 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header Section */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold tracking-wider text-neutral-300 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ef4444]" />
              CURATED SUPPLY LINES
            </div>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Explore By Category
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-300">
              Everything in our wholesale catalogue, organized for streamlined commercial kitchen procurement.
            </p>
          </div>

          <Link
            href="/products"
            className="group hidden items-center gap-1.5 text-xs font-bold text-[#ef4444] hover:text-red-400 md:inline-flex"
          >
            <span>View all supplies</span>
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Animated Shelf with Glassmorphic Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-5"
        >
          {activeCategories.map((cat) => {
            const fallback = CATEGORY_FALLBACK_IMAGES[cat.slug] || {
              img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=80",
              tag: "Bulk supplies",
            };

            const imageSrc =
              cat.image && !cat.image.startsWith("/images/categories")
                ? cat.image
                : fallback.img;

            const tagText = cat.tagline || fallback.tag;

            return (
              <motion.div key={cat.slug} variants={itemVariants}>
                <Link
                  href={`/products?category=${cat.slug}`}
                  className="group relative flex h-full flex-col items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#ef4444]/40 hover:bg-white/[0.08] hover:shadow-xl hover:shadow-red-950/20"
                >
                  {/* Circular Image Container */}
                  <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d32f2f]/30 via-transparent to-transparent opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/15 p-1 transition-colors duration-300 group-hover:border-[#ef4444]">
                      <div className="relative h-full w-full overflow-hidden rounded-full bg-neutral-900">
                        <Image
                          src={imageSrc}
                          alt={cat.name}
                          fill
                          sizes="(max-width: 640px) 96px, 112px"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-115"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Labels */}
                  <div className="mt-4">
                    <h3 className="text-sm font-bold text-white transition-colors duration-200 group-hover:text-[#ef4444]">
                      {cat.name}
                    </h3>
                    {tagText && (
                      <p className="mt-1 text-[11px] text-neutral-400">
                        {tagText}
                      </p>
                    )}
                  </div>

                  {/* Arrow Action Button */}
                  <div className="mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-neutral-300 transition-all duration-200 group-hover:bg-[#d32f2f] group-hover:text-white">
                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}