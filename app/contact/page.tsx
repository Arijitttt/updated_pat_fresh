import { getSiteInfo } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

export const metadata = {
  title: "Contact Us - PatFresh",
  description: "Direct wholesale supply, quotation lists, and delivery support across Kolkata.",
};

export default function ContactPage() {
  const site = getSiteInfo();

  return (
    <main className="min-h-screen bg-[#fafaf9] text-navy">
      {/* Premium Dark Gradient Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] pb-32 pt-20 text-white">
        {/* Subtle decorative background blur spot */}
        <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-[#d32f2f]/15 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-semibold tracking-wider text-white/90 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            KOLKATA SUPPLY HUB ACTIVE
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Let’s Build Your <span className="text-[#ef4444]">Supply Line</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
            Partner with PatFresh for daily kitchen replenishment, cold chain distribution, and contract wholesale pricing.
          </p>
        </div>
      </section>

      {/* Floating Card Layout (Overlaps Hero) */}
      <section className="relative -mt-20 mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          
          {/* Left Column: Interactive Contact & Logistics Hub Cards */}
          <div className="space-y-5 lg:col-span-5">
            <div className="rounded-3xl border border-neutral-200/80 bg-white p-7 shadow-xl shadow-neutral-900/5">
              <h2 className="text-xl font-bold tracking-tight text-neutral-900">
                Direct Contact Channels
              </h2>
              <p className="mt-1.5 text-xs text-neutral-500">
                Fast turnarounds for chefs, purchase managers, and business owners.
              </p>

              <div className="mt-6 space-y-3.5">
                {/* Phone Card */}
                <a
                  href={`tel:${site.phone}`}
                  className="group flex items-center gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 p-4 transition-all duration-200 hover:border-red-200 hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#d32f2f] transition-transform duration-200 group-hover:scale-110">
                    <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Direct Desk</span>
                    <p className="font-semibold text-neutral-800 transition-colors group-hover:text-[#d32f2f]">{site.phone}</p>
                    <span className="text-[11px] text-neutral-500">Mon–Sat, 7 AM – 8 PM</span>
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 p-4 transition-all duration-200 hover:border-red-200 hover:bg-white hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#d32f2f] transition-transform duration-200 group-hover:scale-110">
                    <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Wholesale Orders</span>
                    <p className="truncate font-semibold text-neutral-800 transition-colors group-hover:text-[#d32f2f]">{site.email}</p>
                    <span className="text-[11px] text-neutral-500">Send RFQs & supply specs</span>
                  </div>
                </a>

                {/* Address Card */}
                <div className="flex items-start gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#d32f2f]">
                    <svg className="h-5 w-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Central Hub</span>
                    <p className="mt-0.5 text-xs font-semibold leading-relaxed text-neutral-800">{site.address}</p>
                  </div>
                </div>
              </div>

              {/* Direct Instant WhatsApp Banner */}
              <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-4 text-white shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold tracking-wide uppercase text-emerald-100">Instant Stock Check</p>
                    <p className="text-sm font-bold">Have a daily item list?</p>
                  </div>
                  <a
  href={`https://wa.me/918777352462?text=${encodeURIComponent(
    "Hello PatFresh team, I would like to check today's stock availability and daily procurement rates for my kitchen."
  )}`}
  target="_blank"
  rel="noopener noreferrer"
  className="shrink-0 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-emerald-800 shadow-sm transition hover:bg-emerald-50 active:scale-95"
>
  Chat on WhatsApp
</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Styled Form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

        </div>
      </section>

      {/* Styled Map Preview Section */}
      <section className="border-t border-neutral-200/80 bg-white py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-6 flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#d32f2f]">Logistics Location</span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900">Acharya Jagadish Chandra Bose Road Facility</h3>
            </div>
            <a
              href="https://www.google.com/maps/place/PatFresh/@22.5435934,88.3605777,17z"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 shadow-xs transition hover:border-[#d32f2f] hover:text-[#d32f2f]"
            >
              Directions in Google Maps &rarr;
            </a>
          </div>

          <div className="h-80 w-full overflow-hidden rounded-3xl border border-neutral-200/80 bg-neutral-100 shadow-lg sm:h-[420px]">
            <iframe
              title="PatFresh Location Map"
              src="https://maps.google.com/maps?q=PatFresh,%20Acharya%20Jagadish%20Chandra%20Bose%20Road,%20Kolkata&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}