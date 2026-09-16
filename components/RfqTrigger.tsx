"use client";

import { useCart } from "@/context/CartContext";

export default function RfqTrigger() {
  const { cart, setIsCartOpen, totalKg } = useCart();

  if (cart.length === 0) return null;

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full border border-white/20 bg-[#d32f2f] px-5 py-3 text-xs font-bold text-white shadow-2xl shadow-red-600/50 transition hover:scale-105 active:scale-95"
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#d32f2f] font-black">
        {cart.length}
      </span>
      <span>RFQ Purchase Sheet</span>
      <span className="rounded-md bg-black/20 px-2 py-0.5 font-mono">{totalKg}kg</span>
    </button>
  );
}