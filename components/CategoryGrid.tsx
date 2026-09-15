"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";



interface CategoryItem {
  name: string;
  slug: string;
  image: string;
  tagline?: string;
}

const defaultCategories: CategoryItem[] = [
  {
    name: "Fish & Seafood",
    slug: "fish",
    image: "/images/categories/fish.jpg",
    tagline: "Fresh catch & fillets",
  },
  {
    name: "Vegetables",
    slug: "vegetables",
    image: "/images/categories/vegetables.jpg",
    tagline: "Farm-direct produce",
  },
  {
    name: "Fruits",
    slug: "fruits",
    image: "/images/categories/fruits.jpg",
    tagline: "Seasonal & exotic",
  },
  {
    name: "Grocery & Grains",
    slug: "grocery",
    image: "/images/categories/grocery.jpg",
    tagline: "Bulk staple essentials",
  },
  {
    name: "Chocolates",
    slug: "chocolates",
    image: "/images/categories/chocolates.jpg",
    tagline: "Gourmet confectionery",
  },
  {
    name: "Beverages",
    slug: "beverages",
    image: "/images/categories/beverages.jpg",
    tagline: "Teas, syrups & bases",
  },
];

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function CategoryGrid({
  categories = defaultCategories,
}: {
  categories?: CategoryItem[];
}) {
  return (
    <section className="bg-[#fafaf9] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header with Counter Badge */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#d32f2f]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d32f2f]">
                Curated Supply Lines
              </span>
            </div>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
              Explore By Category
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-neutral-500">
              Everything in our wholesale catalogue, organized for streamlined commercial kitchen procurement.
            </p>
          </div>

          <Link
            href="/products"
            className="group hidden items-center gap-1.5 text-xs font-bold text-[#d32f2f] hover:text-[#b71c1c] md:inline-flex"
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

        {/* Animated Category Shelf */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6 lg:gap-6"
        >
          {categories.map((cat) => (
            <motion.div key={cat.slug} variants={itemVariants}>
              <Link
                href={`/products?category=${cat.slug}`}
                className="group relative flex flex-col items-center rounded-2xl border border-neutral-200/80 bg-white p-5 text-center shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-red-200 hover:shadow-xl hover:shadow-red-950/5"
              >
                {/* Round Thumbnail with Hover Glow Accent */}
                <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
                  {/* Subtle Red Ring Backdrop on Hover */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#d32f2f]/20 via-[#d32f2f]/5 to-transparent opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Outer Border Ring */}
                  <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-neutral-100 p-1 transition-colors duration-300 group-hover:border-[#d32f2f]/40">
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-neutral-100">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 96px, 112px"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-115"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Labels */}
                <div className="mt-4">
                  <h3 className="text-sm font-bold text-neutral-900 transition-colors duration-200 group-hover:text-[#d32f2f]">
                    {cat.name}
                  </h3>
                  {cat.tagline && (
                    <p className="mt-0.5 text-[11px] text-neutral-400">
                      {cat.tagline}
                    </p>
                  )}
                </div>

                {/* Micro Arrow Pill */}
                <div className="mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-50 text-neutral-400 transition-all duration-200 group-hover:bg-[#d32f2f] group-hover:text-white">
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
          ))}
        </motion.div>
      </div>
    </section>
  );
}