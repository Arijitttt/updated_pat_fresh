import CategoryGrid from "@/components/CategoryGrid";
import { getCategories } from "@/lib/categories";

export const metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  const categories = getCategories();

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="font-display text-3xl font-medium text-navy sm:text-4xl">
        Categories
      </h1>
      <p className="mt-2 max-w-prose text-sm text-navy/60">
        Everything in the catalogue, grouped the way it comes in from the
        market.
      </p>
      <div className="mt-8">
        <CategoryGrid categories={categories} />
      </div>
    </section>
  );
}
