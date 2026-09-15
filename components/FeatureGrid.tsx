"use client";

import { motion, Variants } from "framer-motion";

const features = [
  {
    title: "Updated Daily",
    description: "Stock levels directly mirror daily wholesale dock and farm arrivals, avoiding outdated order sheets.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Origin Noted",
    description: "Every item states exact territorial sourcing—from Gangetic freshwater fish to regional imports.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Streamlined Procurement",
    description: "Multi-category searching tailored for fast commercial chef audits without complex retail checkouts.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
  },
  {
    title: "Direct B2B Contact",
    description: "Cut out middlemen margins. Speak with wholesale coordinators directly for delivery scheduling.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function FeatureGrid() {
  return (
    <section className="bg-[#fafaf9] py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#d32f2f]">
            Procurement Standards
          </span>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-neutral-900 sm:text-4xl">
            Why This Catalogue Works
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-neutral-500">
            Engineered around the operational requirements of hospitality and institutional kitchens.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/80 bg-white p-7 shadow-xs transition-all duration-300 hover:border-red-200 hover:shadow-xl hover:shadow-red-950/5"
            >
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#d32f2f] transition-colors duration-300 group-hover:bg-[#d32f2f] group-hover:text-white">
                  {feature.icon}
                </div>

                <h3 className="mt-5 text-base font-bold text-neutral-900 transition-colors group-hover:text-[#d32f2f]">
                  {feature.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1 text-[11px] font-bold text-[#d32f2f] opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span>Verified Standard</span>
                <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}