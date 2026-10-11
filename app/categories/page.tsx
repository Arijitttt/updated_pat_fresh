"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface CategoryDetail {
  slug: string;
  name: string;
  description: string;
  itemCount: string;
  image: string;
  tags: string[];
}

const CATEGORIES: CategoryDetail[] = [
  {
    slug: "bakery",
    name: "Bakery Essentials",
    description:
      "Premium compound slabs, dark couvertures, cocoa powders, fruit fillings, and whipping creams.",
    itemCount: "120+ Items",
    image: "/categories/dark-chocolate-truffles-close-up.jpg",
    tags: ["2M Chocolates", "Tropolite", "Mala's Fillings"],
  },
  {
    slug: "groceries",
    name: "Groceries & Imports",
    description:
      "Imported extra virgin oils, Italian flours, pastas, Japanese condiments, and specialty Asian sauces.",
    itemCount: "350+ Items",
    image: "/categories/groceries.png",
    tags: ["Ristoris", "Del Monte", "Le 5 Stagioni", "Asian Sauces"],
  },
  {
    slug: "bar-ingredients",
    name: "Bar Ingredients",
    description:
      "Artisanal botanical syrups, natural fruit purees, cocktail mixers, and crush bases for mixologists.",
    itemCount: "90+ Items",
    image: "/icons/bar_ingredients.jpeg",
    tags: ["SWA Artisanal", "Mathieu Teisseire", "ODK Purees"],
  },
  {
    slug: "frozen-meat",
    name: "Frozen Meats & Seafood",
    description:
      "Selected cuts, imported lamb, bacon strips, sausages, cold cuts, and premium prawns.",
    itemCount: "80+ Items",
    image: "/icons/frozen_meet.jpeg",
    tags: ["Prasuma", "Seafood", "Cold Cuts"],
  },
  {
    slug: "cheese",
    name: "Commercial & Gourmet Cheese",
    description:
      "Mozzarella blocks, cheddar shreds, parmesan wedges, ricotta, and artisanal cheeses.",
    itemCount: "60+ Items",
    image: "/icons/cheese.jpeg",
    tags: ["Dairy Craft", "Goodrich", "Creme Italia", "President"],
  },
  {
    slug: "frozen-snacks",
    name: "Frozen Appetizers",
    description:
      "Ready-to-fry appetizers, momos, spring rolls, French fries, and finger foods for high-volume service.",
    itemCount: "75+ Items",
    image: "/icons/frozen_snacks.jpeg",
    tags: ["Prasuma Momos", "TOP", "Gadre Snacks"],
  },
  {
    slug: "frozen-fruits-berries",
    name: "Fruits & Berries",
    description:
      "Individual Quick Frozen (IQF) blueberries, raspberries, strawberries, and fruit pulps for bakeries.",
    itemCount: "40+ Items",
    image: "/icons/frozen_barries.jpeg",
    tags: ["IQF Blueberries", "Raspberry Purees", "Fruit Coulis"],
  },
];

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-[#0b1329] text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0f172a] via-[#111c38] to-[#0b1329] py-16 sm:py-20">
        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-[#d32f2f]/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-400 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d32f2f] animate-pulse" />
            Product Catalog Index
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl font-display text-white">
            Commercial Supply Categories
          </h1>
          <p className="mt-3 max-w-2xl text-sm sm:text-base text-slate-300">
            Browse through PatFresh&apos;s commercial categories. Sourced directly from verified global producers and delivered to restaurants, cafes, and bakeries.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#16203c]/90 to-[#0e162c] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-red-500/50 hover:shadow-2xl hover:shadow-black/50"
              >
                <div>
                  <div className="flex items-center justify-between">
                    {/* Rounded Image Avatar */}
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/15 bg-slate-800 shadow-md">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-slate-300">
                      {cat.itemCount}
                    </span>
                  </div>

                  <h2 className="mt-5 text-xl font-bold text-white transition-colors group-hover:text-red-400">
                    {cat.name}
                  </h2>

                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {cat.description}
                  </p>

                  {/* Category Brand Tags */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {cat.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs font-semibold text-slate-400 group-hover:text-white">
                  <span>Browse Category</span>
                  <span className="text-[#ef4444] transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}