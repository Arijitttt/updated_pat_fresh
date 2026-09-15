import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeatureGrid from "@/components/FeatureGrid";
import CtaBanner from "@/components/CtaBanner";
import ProductGrid from "@/components/ProductGrid";
import { getProducts } from "@/lib/products";
import Link from "next/link";

export default function HomePage() {
  const recent = getProducts().slice(0, 8);

  return (
    <>
      <Hero />
      <CategoryGrid />

      {/* Changed: Removed flat "bg-white", now uses soft translucent slate to complement cards */}
      <section className="border-t border-neutral-200/70 bg-[#f1f5f9]/60 py-16 backdrop-blur-xs">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d32f2f]">
                Fresh Arrivals
              </span>
              <h2 className="mt-1 font-display text-2xl font-extrabold text-[#0f172a] sm:text-3xl">
                Recently Listed
              </h2>
            </div>
            <Link 
              href="/products" 
              className="text-xs font-bold text-[#d32f2f] hover:underline"
            >
              See all products &rarr;
            </Link>
          </div>
          <ProductGrid products={recent} />
        </div>
      </section>

      <CtaBanner />
      <FeatureGrid />
    </>
  );
}