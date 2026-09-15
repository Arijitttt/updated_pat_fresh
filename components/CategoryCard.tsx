import Link from "next/link";
import Image from "next/image";
import type { Category } from "@/types/category";

export default function CategoryCard({
  category,
  image,
  count,
}: {
  category: Category;
  image?: string;
  count: number;
}) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group flex items-center gap-4 rounded-sm border border-line bg-white p-4 transition-colors hover:border-ember/50"
    >
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-sm bg-navy/5">
        {image && (
          <Image
            src={image}
            alt={category.name}
            fill
            sizes="80px"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <div>
        <h3 className="font-display text-lg text-navy">{category.name}</h3>
        <p className="mt-1 text-sm leading-relaxed text-navy/60">
          {category.description}
        </p>
        <p className="mt-2 text-xs text-navy/40">{count} items listed</p>
      </div>
    </Link>
  );
}
