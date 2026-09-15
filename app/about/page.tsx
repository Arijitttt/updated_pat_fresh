"use client";

import { getSiteInfo } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import TimelineSection from "@/components/TimelineSection";

const features = [
  {
    title: "Reliable Supply Solutions",
    description:
      "Our strong sourcing network helps businesses avoid stock shortages and maintain smooth daily operations.",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current text-white" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
    bgColor: "bg-[#d32f2f] shadow-red-500/30",
  },
  {
    title: "Premium Product Quality",
    description:
      "We focus on freshness, consistency, and food safety so professional kitchens can serve with confidence.",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current text-white" viewBox="0 0 24 24">
        <path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z" />
      </svg>
    ),
    bgColor: "bg-[#1976d2] shadow-blue-500/30",
  },
  {
    title: "Wide Product Categories",
    description:
      "Our range includes frozen snacks, ready-to-cook items, seafood, chicken products, vegetables, dairy items, and imported gourmet essentials — all under one trusted supplier.",
    icon: (
      <svg className="h-3.5 w-3.5 fill-current text-white" viewBox="0 0 24 24">
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
      </svg>
    ),
    bgColor: "bg-[#d32f2f] shadow-red-500/30",
  },
  {
    title: "Efficient Delivery Network",
    description:
      "Timely delivery is essential for HoReCa businesses. Patfresh offers fast, organized, and dependable delivery support across Kolkata with proper temperature-controlled logistics.",
    icon: (
      <svg className="h-3.5 w-3.5 fill-none stroke-current stroke-[2.5]" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    bgColor: "bg-[#059669] shadow-emerald-500/30",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function AboutPage() {
  const site = getSiteInfo();

  return (
    <main className="relative min-h-screen">
      {/* 1. Cinematic Dark Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0f1d] via-[#101726] to-[#0a0f1d] py-20 text-white lg:py-28">
        {/* Ambient Halo Highlights */}
        <div className="pointer-events-none absolute -left-20 top-0 h-[450px] w-[450px] rounded-full bg-[#d32f2f]/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px]" />

        {/* Micro-dot Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 text-xs font-semibold tracking-widest text-neutral-300 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ef4444] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ef4444]" />
              </span>
              ABOUT OUR INFRASTRUCTURE
            </div>

            <h1 className="mt-6 font-display text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl">
              About{" "}
              <span className="bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent">
                PAT
              </span>
              <span className="bg-gradient-to-r from-[#ff4d4d] via-[#f87171] to-[#ff6b6b] bg-clip-text text-transparent">
                Fresh
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
              Your trusted partner for wholesale fish, vegetables, fruits, and commercial pantry supplies. Operating with scheduled deliveries around {site.address}.
            </p>

            {/* Hub Quick Info Pill */}
            <div className="mt-8 inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs text-neutral-300 backdrop-blur-md">
              <svg className="h-4 w-4 shrink-0 text-[#ef4444]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{site.address}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Control Food Supply / Stepper Section */}
      <section className="relative py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            
            {/* Left Column: Heading & Stepper */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-200/60 bg-red-50/70 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#d32f2f]">
                Institutional Logistics
              </div>

              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl lg:text-5xl">
                Control Your Food Supply.{" "}
                <span className="text-[#d32f2f]">Control It With Patfresh!</span>
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-neutral-600 sm:text-base">
                Patfresh is a dedicated cold-chain and frozen ingredient supplier in Kolkata, helping hotels, restaurants, cafes, cloud kitchens, and catering businesses maintain smooth kitchen operations with reliable procurement schedules.
              </p>

              {/* Stepper Timeline */}
              <div className="relative mt-10">
                {/* Vertical Line */}
                <div className="absolute bottom-6 left-4 top-4 w-0.5 bg-gradient-to-b from-red-500 via-blue-500 to-emerald-500 opacity-40" />

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="space-y-6"
                >
                  {features.map((item, idx) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="group relative flex items-start gap-4 rounded-2xl border border-neutral-200/80 bg-white/90 p-4 shadow-xs backdrop-blur-xs transition duration-300 hover:border-neutral-300 hover:bg-white hover:shadow-md"
                    >
                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-md ${item.bgColor}`}
                      >
                        {item.icon}
                      </div>

                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-[#0f172a] transition-colors group-hover:text-[#d32f2f]">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs leading-relaxed text-neutral-500">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Right Column: Visual Showcase Frame */}
            <div className="lg:col-span-5">
              <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-white p-3 shadow-xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-900 sm:aspect-[3/4]">
                  <Image
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1000&q=80"
                    alt="Patfresh logistics and warehouse operations"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Floating Overlay Badge */}
                  <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/20 bg-neutral-950/80 p-4 shadow-lg backdrop-blur-md">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ef4444]">
                      Kolkata Cold Chain Hub
                    </span>
                    <p className="text-xs font-semibold text-white">
                      Direct temperature-controlled distribution facility.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Dynamic Scrolling Timeline */}
      <div className="border-t border-b border-neutral-200/70 bg-white/50 backdrop-blur-xs">
        <TimelineSection />
      </div>

      {/* 4. Sourcing / Approach Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-xs sm:p-12 md:grid-cols-2 md:gap-14">
            
            <div className="order-2 flex flex-col justify-center md:order-1">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#d32f2f]">
                Quality Assured
              </div>

              <h2 className="mt-4 font-display text-3xl font-extrabold text-[#0f172a] sm:text-4xl">
                Sourced With Complete Care
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-neutral-600">
                We believe culinary teams should have clear, transparent information before committing to supply runs. That&apos;s why our catalogue details territorial origins, freshness grades, cuts, and storage temperatures.
              </p>

              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                As seasonal batches arrive at dockyards and farms, listings are refreshed continuously so your kitchen always sees true availability.
              </p>

              <div className="mt-8">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#d32f2f] hover:text-[#b71c1c]"
                >
                  <span>Explore Available Catalogue</span>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Warehouse / Produce Display Image */}
            <div className="order-1 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-100 shadow-inner md:order-2">
              <Image
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80"
                alt="Fresh market produce sourced with care"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* 5. Modern Bottom Call to Action */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0a0f1d] via-[#101726] to-[#080d18] py-20 text-center text-white">
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[600px] rounded-full bg-[#d32f2f]/15 blur-[120px]" />
        
        <div className="relative mx-auto max-w-xl px-6">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Looking for something specific?
          </h2>
          <p className="mt-3 text-sm text-neutral-300">
            Explore our daily product catalogue or speak directly with our Kolkata supply team for specialized bulk orders.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/30 transition hover:opacity-95 active:scale-95 sm:w-auto"
            >
              Contact Us
            </Link>
            <Link
              href="/products"
              className="w-full rounded-xl border border-white/15 bg-white/5 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/10 active:scale-95 sm:w-auto"
            >
              Browse Catalog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}