"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import AnimatedText from "@/components/AnimatedText";

interface TimelineEvent {
  year: string;
  subtitle: string;
  title: string;
  description: string;
  align: "left" | "right";
  icon: React.ReactNode;
}

const events: TimelineEvent[] = [
  {
    year: "2021",
    subtitle: "Kolkata, India",
    title: "Founded with a Vision",
    description:
      "Patfresh was established with a clear vision to provide professional kitchens with reliable access to premium frozen food products at competitive wholesale pricing.",
    align: "left",
    icon: (
      <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1.5" className="fill-current" />
      </svg>
    ),
  },
  {
    year: "2022",
    subtitle: "New Categories Added",
    title: "Expanding Product Range",
    description:
      "We expanded our portfolio by introducing frozen snacks, seafood, ready-to-cook products, dairy essentials, and imported gourmet items for diverse business needs.",
    align: "right",
    icon: (
      <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    year: "2024",
    subtitle: "Growing Partnerships",
    title: "Building Client Trust",
    description:
      "Patfresh became a preferred supply partner for restaurants, hotels, cafés, and caterers through consistent quality, timely deliveries, and responsive service.",
    align: "left",
    icon: (
      <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 11l4.5 4.5L21 6M3 7l4 4M10 18l3-3" />
      </svg>
    ),
  },
  {
    year: "2026 & Beyond",
    subtitle: "Future Ready",
    title: "Moving Forward",
    description:
      "Patfresh continues to grow with new product lines, smarter logistics, and stronger partnerships to remain one of Kolkata's most trusted frozen food distributors.",
    align: "right",
    icon: (
      <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 14l5-5 4 4 5-5" />
      </svg>
    ),
  },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tracks scroll progression through this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Maps scroll progression (0% to 100%) to vertical height
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-xs font-bold tracking-wider text-[#d32f2f] uppercase">
            Company Timeline
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#1e2022] sm:text-4xl lg:text-5xl">
            A Timeline of Growth and Excellence in <br className="hidden sm:inline" />
            Frozen Food Supply
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-xs text-[#6b7280] sm:text-sm">
            Our journey reflects continuous improvement, market expansion, and dedication to serving HoReCa businesses with excellence.
          </p>
        </div>

        {/* Timeline Line & Items */}
        <div className="relative mt-16 lg:mt-24">
          {/* Base Gray Central Line */}
          <div className="absolute left-1/2 top-4 bottom-8 hidden -translate-x-1/2 w-0.5 bg-neutral-200 lg:block">
            {/* Dynamic Animated Red Progress Line */}
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-[#d32f2f] origin-top will-change-[height]"
            />
          </div>

          <div className="space-y-12 lg:space-y-24">
            {events.map((event, idx) => (
              <TimelineItem key={idx} event={event} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ event }: { event: TimelineEvent }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 70%", "center center"],
  });

  // Turn active (red outline & red text) once reached on scroll
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setIsActive(latest > 0.5);
    });
  }, [scrollYProgress]);

  return (
    <div
      ref={itemRef}
      className={`relative flex flex-col items-center gap-6 lg:flex-row lg:gap-0 ${
        event.align === "right" ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Content Card Side */}
      <div className="w-full lg:w-1/2 lg:px-10">
        <div className="rounded-2xl border border-neutral-100 bg-white p-6 shadow-sm transition-all hover:shadow-md sm:p-8 text-center">
          <h3 className="text-xl font-bold text-[#1e2022]">
            <AnimatedText text={event.title} />
          </h3>
          <p className="mt-3 text-xs leading-relaxed text-[#6b7280] sm:text-sm">
            {event.description}
          </p>
        </div>
      </div>

      {/* Center Icon Node */}
      <div className="relative z-10 flex shrink-0 items-center justify-center">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full border-2 bg-white shadow-sm transition-colors duration-300 ${
            isActive
              ? "border-[#d32f2f] text-[#d32f2f]"
              : "border-neutral-200 text-neutral-400"
          }`}
        >
          {event.icon}
        </div>
      </div>

      {/* Year Label Side */}
      <div
        className={`w-full text-center lg:w-1/2 lg:px-10 ${
          event.align === "left" ? "lg:text-left" : "lg:text-right"
        }`}
      >
        <p className="text-lg font-bold text-[#d32f2f]">{event.year}</p>
        <p className="mt-0.5 text-xs text-[#6b7280]">{event.subtitle}</p>
      </div>
    </div>
  );
}