"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#111c33] to-[#0a0f1d] py-24 text-white">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[680px] rounded-full bg-[#d32f2f]/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-10 top-10 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          {/* Header Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold tracking-wider text-neutral-300 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            DAILY INVENTORY REPLENISHMENT
          </div>

          <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            See What&apos;s <span className="text-[#ef4444]">Fresh This Week</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">
            The catalogue is updated live as fresh catches and farm batches arrive at our Kolkata hub. Check stock status or call ahead for specialized bulk orders.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d32f2f] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/25 transition duration-200 hover:bg-[#b71c1c] active:scale-[0.99] sm:w-auto"
            >
              <span>Browse Full Catalogue</span>
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>

            <a
              href="https://wa.me/919830000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition duration-200 hover:border-white/40 hover:bg-white/10 active:scale-[0.99] sm:w-auto"
            >
              Direct WhatsApp Inquire
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}