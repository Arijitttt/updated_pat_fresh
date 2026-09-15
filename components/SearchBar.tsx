"use client";

export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="w-full sm:max-w-xs">
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search products, e.g. rohu"
        className="w-full rounded-sm border border-line bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/40 focus:border-ember"
      />
    </div>
  );
}
