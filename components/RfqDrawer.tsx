"use client";

import { useCart } from "@/context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function RfqDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, totalKg } = useCart();
  const [kitchenName, setKitchenName] = useState("");
  const [deliveryArea, setDeliveryArea] = useState("Park Street");

  const sendWhatsAppRFQ = () => {
    if (!cart.length) return;

    let message = `*PATFRESH WHOLESALE RFQ ORDER SHEET*\n`;
    message += `*Facility/Kitchen:* ${kitchenName || "Not Specified"}\n`;
    message += `*Delivery Hub:* ${deliveryArea}\n`;
    message += `*Total Weight:* ${totalKg} KG\n\n`;
    message += `*Requisition Items:*\n`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.category})\n`;
      message += `   - Cut/Prep: ${item.cutType || "Standard"}\n`;
      message += `   - Required Volume: ${item.quantityKg} KG\n`;
    });

    message += `\n_Please confirm availability and daily wholesale dock rates._`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/918777352462?text=${encoded}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
          />

          {/* Drawer Canvas */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-[#0c121e] text-white shadow-2xl"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#d32f2f] text-xs font-black">
                  PF
                </span>
                <div>
                  <h3 className="font-display text-base font-bold">Wholesale RFQ Sheet</h3>
                  <p className="text-[11px] text-neutral-400">{cart.length} line items selected</p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-lg p-2 text-neutral-400 hover:bg-white/5 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Body Item List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {cart.length === 0 ? (
                <div className="flex h-64 flex-col items-center justify-center text-center">
                  <p className="text-sm font-semibold text-neutral-400">Requisition sheet is empty</p>
                  <p className="mt-1 text-xs text-neutral-500">Add commercial items from the catalog</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.id}-${item.cutType}`}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3.5"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-neutral-200">{item.name}</h4>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] text-neutral-400">
                          {item.cutType || "Standard Cut"}
                        </span>
                        <span className="text-[11px] text-neutral-500">Min 5kg</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Quantity Controls */}
                      <div className="flex items-center rounded-lg border border-white/10 bg-white/5">
                        <button
                          onClick={() => updateQuantity(item.id, -5)}
                          className="px-2.5 py-1 text-xs hover:text-[#ef4444]"
                        >
                          -5
                        </button>
                        <span className="px-2 font-mono text-xs font-bold text-white">
                          {item.quantityKg}kg
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 5)}
                          className="px-2.5 py-1 text-xs hover:text-emerald-400"
                        >
                          +5
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-500 hover:text-red-400 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Order Configuration & Dispatch Details */}
            {cart.length > 0 && (
              <div className="border-t border-white/10 bg-white/[0.02] p-6 space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Restaurant / Catering Account
                  </label>
                  <input
                    type="text"
                    value={kitchenName}
                    onChange={(e) => setKitchenName(e.target.value)}
                    placeholder="e.g. Park Street Bistro"
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:border-[#d32f2f] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                    Kolkata Delivery Zone
                  </label>
                  <select
                    value={deliveryArea}
                    onChange={(e) => setDeliveryArea(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-white/10 bg-[#0f172a] px-3.5 py-2 text-xs text-white focus:border-[#d32f2f] focus:outline-none"
                  >
                    <option value="Central (Park Street / Camac St)">Central (Park Street / Camac St)</option>
                    <option value="East (Salt Lake / New Town)">East (Salt Lake / New Town)</option>
                    <option value="South (Ballygunge / Alipore / Jadavpur)">South (Ballygunge / Alipore)</option>
                    <option value="North / Howrah Hub">North / Howrah Hub</option>
                  </select>
                </div>

                <div className="flex justify-between text-xs font-semibold text-neutral-400 pt-2">
                  <span>Gross Requisition:</span>
                  <span className="text-emerald-400 font-bold">{totalKg} KG Total</span>
                </div>

                <button
                  onClick={sendWhatsAppRFQ}
                  className="w-full rounded-xl bg-gradient-to-r from-[#d32f2f] to-[#b71c1c] py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-red-600/30 transition hover:opacity-95"
                >
                  Send Quotation to WhatsApp
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}