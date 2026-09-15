import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

export default function CategoryIconGrid() {
  const categories = getCategories();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-xl">
        <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          Explore by category
        </h2>
        <p className="mt-2 text-sm text-navy/60">
          Everything in the catalogue, grouped the way it comes in from the
          market.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => {
          const sample = getProductsByCategory(category.slug)[0];
          return (
            <Link
              key={category.slug}
              href={`/categories/${category.slug}`}
              className="group flex flex-col items-center gap-3 text-center"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-line bg-white transition-colors group-hover:border-ember">
                {sample && (
                  <Image
                    src={sample.image}
                    alt={category.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </div>
              <span className="text-sm font-medium text-navy">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
