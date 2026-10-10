"use client";

import { useState } from "react";

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    businessName: "",
    supplyCategory: "frozen",
    deliveryOutlet: "",
    requirements: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to transmit inquiry");
      }

      setSubmitted(true);
      setFormData({
        fullName: "",
        contactNumber: "",
        businessName: "",
        supplyCategory: "frozen",
        deliveryOutlet: "",
        requirements: "",
      });
    } catch (err: any) {
      setError(err.message || "An error occurred while saving your inquiry.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[520px] flex-col items-center justify-center rounded-3xl border border-neutral-200/80 bg-white p-10 text-center shadow-xl shadow-neutral-900/5">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shadow-inner">
          <svg className="h-10 w-10 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl">
          Inquiry Transmitted!
        </h3>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-600">
          Thank you for reaching out. Your request has been logged and our wholesale operations desk will get back to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 inline-flex items-center rounded-xl bg-neutral-900 px-6 py-2.5 text-xs font-semibold text-white transition-all hover:bg-neutral-800 active:scale-95"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-neutral-200/80 bg-white p-8 shadow-xl shadow-neutral-900/5 sm:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900">
            Request Quotation & Inquiries
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            Standard response window within 2 operational hours.
          </p>
        </div>
        <span className="hidden rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-[#d32f2f] sm:inline-block">
          B2B Priority
        </span>
      </div>

      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. James Bond"
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 outline-none transition duration-150 focus:border-[#d32f2f] focus:bg-white focus:ring-4 focus:ring-red-500/10"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="contactNumber"
              required
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="+91 98300 00000"
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 outline-none transition duration-150 focus:border-[#d32f2f] focus:bg-white focus:ring-4 focus:ring-red-500/10"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
              Business / Kitchen Name
            </label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="e.g. Urban Cafe & Bistro"
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 outline-none transition duration-150 focus:border-[#d32f2f] focus:bg-white focus:ring-4 focus:ring-red-500/10"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
              Supply Category
            </label>
            <div className="relative mt-2">
              <select
                name="supplyCategory"
                value={formData.supplyCategory}
                onChange={handleChange}
                className="w-full appearance-none rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 outline-none transition duration-150 focus:border-[#d32f2f] focus:bg-white focus:ring-4 focus:ring-red-500/10"
              >
                <option value="frozen">Frozen Seafood & Meats</option>
                <option value="frozen-snacks">Frozen Snacks</option>
                <option value="frozen-fruits-berries">Frozen Fruits & Berries</option>
                <option value="bakery">Bakery & Pastry Ingredients</option>
                <option value="bar-ingredients">Bar Ingredients & Syrups</option>
                <option value="cheese">Cheese & Dairy Essentials</option>
                <option value="groceries">Groceries & Commercial Staples</option>
                <option value="all">Full Catalog Mixed Supply</option>
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400">
                <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
            Delivery Outlet / Pincode
          </label>
          <input
            type="text"
            name="deliveryOutlet"
            value={formData.deliveryOutlet}
            onChange={handleChange}
            placeholder="e.g. Park Street, Kolkata - 700016"
            className="mt-2 w-full rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 outline-none transition duration-150 focus:border-[#d32f2f] focus:bg-white focus:ring-4 focus:ring-red-500/10"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
            Detailed Requirements / Volume <span className="text-red-500">*</span>
          </label>
          <textarea
            name="requirements"
            rows={4}
            required
            value={formData.requirements}
            onChange={handleChange}
            placeholder="Item cuts, estimated weekly order frequency, delivery schedules..."
            className="mt-2 w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-neutral-800 outline-none transition duration-150 focus:border-[#d32f2f] focus:bg-white focus:ring-4 focus:ring-red-500/10"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#d32f2f] py-3.5 text-sm font-bold tracking-wide text-white shadow-lg shadow-red-600/25 transition-all duration-200 hover:bg-[#b71c1c] active:scale-[0.99] disabled:opacity-60"
        >
          {loading ? (
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <>
              <span>Transmit Inquiry</span>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </>
          )}
        </button>
      </form>
    </div>
  );
}