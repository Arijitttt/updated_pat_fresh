"use client";

export default function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  // Generate a compact windowed page list with ellipses
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first page
      pages.push(1);

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      if (start > 2) {
        pages.push("...");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <nav
      aria-label="Product pages"
      className="mt-10 flex items-center justify-center gap-1.5"
    >
      {/* Previous Button */}
      <button
        type="button"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="inline-flex h-9 items-center justify-center gap-1 rounded-xl border border-neutral-200/90 bg-white px-3 text-xs font-semibold text-neutral-600 shadow-2xs transition hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 disabled:pointer-events-none disabled:opacity-40"
      >
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Dynamic Page Items */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((item, index) => {
          if (item === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="flex h-9 w-7 items-center justify-center text-xs font-bold text-neutral-400 select-none"
              >
                &hellip;
              </span>
            );
          }

          const pageNumber = Number(item);
          const isActive = pageNumber === page;

          return (
            <button
              key={pageNumber}
              type="button"
              onClick={() => onChange(pageNumber)}
              aria-current={isActive ? "page" : undefined}
              className={`h-9 min-w-[36px] rounded-xl px-2 text-xs font-bold transition duration-200 ${
                isActive
                  ? "bg-[#d32f2f] text-white shadow-md shadow-red-600/20"
                  : "border border-neutral-200/80 bg-white text-neutral-600 hover:border-neutral-300 hover:bg-neutral-100/70 hover:text-neutral-900"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="inline-flex h-9 items-center justify-center gap-1 rounded-xl border border-neutral-200/90 bg-white px-3 text-xs font-semibold text-neutral-600 shadow-2xs transition hover:border-neutral-300 hover:bg-neutral-50 hover:text-neutral-900 disabled:pointer-events-none disabled:opacity-40"
      >
        <span className="hidden sm:inline">Next</span>
        <svg
          className="h-3.5 w-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </nav>
  );
}