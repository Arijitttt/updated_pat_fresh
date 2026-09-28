import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import FeatureGrid from "@/components/FeatureGrid";
import CtaBanner from "@/components/CtaBanner";
import CategoryShowcaseCarousel from "@/components/CategoryShowcaseCarousel";
import { getCategories } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

export default function HomePage() {
  const categories = getCategories().filter((c) => c.slug !== "all");

  // Load all products for each category without limiting to 6
  const productsByCategory = categories.reduce<Record<string, any>>((acc, cat) => {
    acc[cat.slug] = getProductsByCategory(cat.slug);
    return acc;
  }, {});

  return (
    <>
      <Hero />
      <CategoryGrid />

      <section className="border-t border-neutral-200/70 bg-[#f1f5f9]/60 backdrop-blur-xs">
        <CategoryShowcaseCarousel
          categories={categories}
          productsByCategory={productsByCategory}
        />
      </section>

      <CtaBanner />
      <FeatureGrid />
    </>
  );
}