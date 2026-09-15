"use client";

import Link from "next/link";
import Image from "next/image";
import { MouseEvent } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { getSiteInfo } from "@/lib/site";

export default function Hero() {
  const site = getSiteInfo();

  // Mouse tilt physics values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-gradient-to-b from-[#0a0f1d] via-[#101726] to-[#080d18] py-16 text-white lg:py-24"
    >
      {/* Dynamic Background Glow Rings */}
      <div className="pointer-events-none absolute -left-20 top-10 h-[500px] w-[500px] rounded-full bg-[#d32f2f]/15 blur-[140px]" />
      <div className="pointer-events-none absolute -right-20 bottom-10 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[130px]" />

      {/* Grid Texture Overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3.5 py-1.5 text-xs font-semibold tracking-wider text-neutral-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              LOCAL MARKET SOURCING • CATALOGUED DAILY
            </div>

            {/* Headline */}
            <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight leading-[1.08] sm:text-5xl lg:text-6xl">
              Fresh stock from the market,{" "}
              <span className="bg-gradient-to-r from-[#ff4d4d] via-[#f87171] to-[#ff6b6b] bg-clip-text text-transparent">
                tracked every single day
              </span>
            </h1>

            {/* Description using dynamic site info */}
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-neutral-300 sm:text-base">
              {site.description} Every listing carries its origin and unit, so you know exactly what&apos;s available before you call or visit.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Browse The Catalogue</span>
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link
                href="/categories"
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10 active:scale-[0.98]"
              >
                Explore Categories
              </Link>
            </div>
          </motion.div>

          {/* Right Column: 3D Parallax Tilt Card with Floating Status Pills */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-2.5 shadow-2xl backdrop-blur-sm">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-neutral-900 sm:aspect-[5/4]">
                <Image
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&q=80"
                  alt="Fresh produce at a local market"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating Top Badge */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute left-6 top-6 flex items-center gap-2 rounded-2xl border border-white/20 bg-[#0f172a]/80 px-3.5 py-2 shadow-lg backdrop-blur-md"
              >
                <span className="flex h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-xs font-semibold text-white">Cold Chain -18°C</span>
              </motion.div>

              {/* Floating Bottom Metric Badge */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 right-6 rounded-2xl border border-white/15 bg-neutral-900/90 p-3.5 shadow-xl backdrop-blur-md"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Morning Arrivals
                </span>
                <p className="font-display text-sm font-black text-emerald-400">
                  99.4% On-Time Dispatch
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-3 gap-6 border-t border-white/10 pt-10 sm:mt-24 sm:gap-8"
        >
          {site.stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="font-display text-3xl font-black text-[#ff4d4d] sm:text-4xl">
                {stat.value}
              </p>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 sm:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}