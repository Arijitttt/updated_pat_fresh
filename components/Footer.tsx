import Link from "next/link";
import { getSiteInfo } from "@/lib/site";
import { getCategories } from "@/lib/categories";

export default function Footer() {
  const site = getSiteInfo();
  const categories = getCategories().filter((c) => c.slug !== "all");

  return (
    <footer className="border-t border-white/10 bg-[#0c121e] text-neutral-300">
      {/* Top Pre-Footer Strip */}
      <div className="border-b border-white/5 bg-white/[0.02]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <p className="text-xs font-semibold text-neutral-200">
              Procuring for a commercial kitchen? Request daily wholesale price sheets.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] px-5 py-2 text-xs font-bold tracking-wide text-white shadow-md shadow-red-600/20 transition hover:opacity-90 active:scale-95"
          >
            Request Quotation
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
        {/* Brand Column */}
        <div className="space-y-4 sm:col-span-2 lg:col-span-4">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#d32f2f] font-display text-xs font-black text-white shadow-md shadow-red-600/30">
              PF
            </span>
            <span className="font-display text-lg font-black tracking-tight text-white">
              {site.name}
            </span>
          </Link>
          <p className="max-w-sm text-xs leading-relaxed text-neutral-400">
            {site.description}
          </p>
          <div className="pt-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">
              Procurement Hours
            </span>
            <p className="mt-0.5 text-xs font-semibold text-neutral-200">
              {site.hours}
            </p>
          </div>
        </div>

        {/* Categories Column */}
        <div className="lg:col-span-3 lg:pl-4">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Categories
          </p>
          <ul className="mt-4 space-y-2.5 text-xs">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/products?category=${category.slug}`}
                  className="text-neutral-400 transition hover:text-white"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Column */}
        <div className="lg:col-span-3">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Contact Hub
          </p>
          <div className="mt-4 space-y-3 text-xs text-neutral-400">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500">Phone</span>
              <a
                href={`tel:${site.phone}`}
                className="block font-semibold text-neutral-200 transition hover:text-[#ef4444]"
              >
                {site.phone}
              </a>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500">Email</span>
              <a
                href={`mailto:${site.email}`}
                className="block font-semibold text-neutral-200 transition hover:text-[#ef4444]"
              >
                {site.email}
              </a>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500">Facility Location</span>
              <p className="mt-0.5 leading-relaxed text-neutral-300">
                {site.address}
              </p>
            </div>
          </div>
        </div>

        {/* Follow Us Column */}
        <div className="lg:col-span-2">
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
            Connect
          </p>
          <div className="mt-4 flex flex-col gap-2">
            <a
              href={`https://wa.me/${site.phone.replace(/[^0-9]/g, "") || "918777352462"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-neutral-200 transition hover:border-[#25D366]/40 hover:bg-[#25D366]/10 hover:text-[#25D366]"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12.004 2C6.48 2 2 6.48 2 12c0 1.84.5 3.56 1.37 5.04L2 22l5.12-1.34A9.95 9.95 0 0012.004 22C17.52 22 22 17.52 22 12s-4.48-10-9.996-10zm0 18.2a8.16 8.16 0 01-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.19 8.19 0 116.94 3.84z" />
              </svg>
              <span>WhatsApp</span>
            </a>

            <a
              href="https://www.instagram.com/patfresh__/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-neutral-200 transition hover:border-pink-500/40 hover:bg-pink-500/10 hover:text-pink-400"
            >
              <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>

            <a
              href="https://www.facebook.com/people/Patfresh/61576476945548/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-neutral-200 transition hover:border-blue-500/40 hover:bg-blue-500/10 hover:text-blue-400"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-neutral-800/80 bg-[#090d16] px-6 py-5 text-xs text-neutral-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row">
          <span>Prices and stock change daily — call ahead to confirm availability.</span>
          <span>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}