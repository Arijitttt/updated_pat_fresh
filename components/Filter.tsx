"use client";

import type { Category } from "@/types/category";

export default function Filter({
  categories,
  active,
  onChange,
  layout = "row",
}: {
  categories: Category[];
  active: string;
  onChange: (slug: string) => void;
  layout?: "row" | "column";
}) {
  const options = [{ slug: "all", name: "All", description: "" }, ...categories];

  if (layout === "column") {
    return (
      <ul className="space-y-1">
        {options.map((option) => {
          const isActive = option.slug === active;
          return (
            <li key={option.slug}>
              <button
                type="button"
                onClick={() => onChange(option.slug)}
                aria-pressed={isActive}
                className={`w-full rounded-sm px-3 py-2 text-left text-sm transition-colors ${
                  isActive
                    ? "bg-navy text-white"
                    : "text-navy/70 hover:bg-line/40"
                }`}
              >
                {option.name}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isActive = option.slug === active;
        return (
          <button
            key={option.slug}
            type="button"
            onClick={() => onChange(option.slug)}
            aria-pressed={isActive}
            className={`rounded-sm border px-4 py-2 text-sm transition-colors ${
              isActive
                ? "border-line bg-navy text-white"
                : "border-line text-navy/70 hover:border-steel"
            }`}
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
}
