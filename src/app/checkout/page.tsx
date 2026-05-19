"use client";

import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/access-denied");
  }, [status, router]);

  if (!session) return null;

  function handleOrder() {
    clearCart();
    setOrdered(true);
  }

  if (ordered) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-zinc-950">
        <div className="brand-card max-w-md rounded-[34px] p-10 text-center">
          <div className="halftone-panel mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl font-black text-zinc-950">
            OK
          </div>
          <h1 className="mb-4 text-4xl font-black">Order Placed!</h1>
          <p className="mb-8 text-zinc-600">
            Thank you {session.user?.name}, your order is confirmed.
          </p>
          <button
            onClick={() => router.push("/products")}
            className="rounded-full bg-[#11110f] px-8 py-3 font-black text-white transition hover:bg-yellow-300 hover:text-black"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-zinc-950">
      <div className="container mx-auto max-w-6xl px-5 py-10">
        <div className="mb-8 rounded-[34px] border border-black/10 bg-[#11110f] p-8 text-white md:p-10">
          <p className="mb-4 w-fit rounded-full bg-yellow-300 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#11110f]">
            Final step
          </p>
          <h1 className="text-5xl font-black tracking-tight md:text-6xl">
            Checkout
          </h1>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex flex-1 flex-col gap-6">
            <div className="brand-card rounded-[28px] p-8">
              <h2 className="mb-6 text-xl font-black">Shipping Information</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {[
                  ["First Name", "text", session.user?.name?.split(" ")[0] ?? ""],
                  ["Last Name", "text", session.user?.name?.split(" ")[1] ?? ""],
                  ["Email", "email", session.user?.email ?? ""],
                ].map(([label, type, value]) => (
                  <div
                    key={label}
                    className={`flex flex-col gap-2 ${label === "Email" ? "md:col-span-2" : ""}`}
                  >
                    <label className="text-sm font-bold text-zinc-600">
                      {label}
                    </label>
                    <input
                      type={type}
                      defaultValue={value}
                      className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-zinc-950 focus:border-[#006b63] focus:bg-white focus:outline-none"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-sm font-bold text-zinc-600">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="123 Main St"
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-zinc-950 placeholder:text-zinc-400 focus:border-[#006b63] focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-zinc-600">
                    City
                  </label>
                  <input
                    type="text"
                    placeholder="Cairo"
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-zinc-950 placeholder:text-zinc-400 focus:border-[#006b63] focus:bg-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-zinc-600">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+20 1234567890"
                    className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-zinc-950 placeholder:text-zinc-400 focus:border-[#006b63] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="brand-card rounded-[28px] p-8">
              <h2 className="mb-6 text-xl font-black">Payment Method</h2>
              <div className="flex flex-col gap-3">
                {["Credit Card", "Cash on Delivery", "PayPal"].map((method) => (
                  <label
                    key={method}
                    className="flex cursor-pointer items-center gap-4 rounded-2xl border border-black/10 bg-white/70 p-4 transition hover:border-[#006b63] hover:bg-yellow-50"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      className="accent-[#006b63]"
                    />
                    <span className="font-bold text-zinc-800">{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="halftone-panel h-fit w-full rounded-[28px] border border-black/10 p-8 shadow-xl shadow-black/10 lg:w-80">
            <h2 className="mb-6 text-2xl font-black">Order Summary</h2>

            <div className="mb-6 flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="mr-2 flex-1 truncate font-bold text-zinc-700">
                    {item.title} x{item.quantity}
                  </span>
                  <span className="font-black text-zinc-950">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-6 border-t border-black/10 pt-4">
              <div className="mb-2 flex justify-between font-bold text-zinc-700">
                <span>Subtotal</span>
                <span className="text-zinc-950">${totalPrice().toFixed(2)}</span>
              </div>
              <div className="mb-4 flex justify-between font-bold text-zinc-700">
                <span>Shipping</span>
                <span className="font-black text-[#006b63]">Free</span>
              </div>
              <div className="flex justify-between text-xl font-black">
                <span>Total</span>
                <span className="text-[#006b63]">${totalPrice().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleOrder}
              className="w-full rounded-full bg-[#11110f] py-3 font-black text-white transition hover:bg-white hover:text-black"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
