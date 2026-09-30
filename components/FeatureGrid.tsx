"use client";

import { motion, Variants } from "framer-motion";

const features = [
  {
    title: "Explore Our Range",
    description:
      "Browse our categories and discover the brands, ingredients and products we supply. The catalogue is designed to give you a clear idea of what’s available through PatFresh.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
        />
      </svg>
    ),
  },
  {
    title: "Product Information",
    description:
      "Find useful details about products, pack sizes, brands and categories so you can make an informed choice before getting in touch with our team.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Availability on Request",
    description:
      "Our warehouse inventory changes regularly, so product availability may vary. Found something you need? Give us a call or speak to our team to confirm current availability.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
        />
      </svg>
    ),
  },
  {
    title: "Built for B2B",
    description:
      "Need larger quantities, regular supplies or something specific for your business? Our team can help you check availability and discuss your requirements directly.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
        />
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
            Why PatFresh?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-neutral-500">
            From everyday essentials to specialty ingredients, our catalogue brings together the products that cafés, restaurants, retailers and food businesses look for — all in one place.
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
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Tagline Banner */}
        <div className="mt-14 text-center">
          <p className="inline-block rounded-full border border-red-100 bg-red-50/80 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-[#d32f2f] shadow-xs">
            Browse. Find. Call. We’ll take care of the rest.
          </p>
        </div>
      </div>
    </section>
  );
}