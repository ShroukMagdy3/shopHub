"use client";

import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    items,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalPrice,
  } = useCartStore();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/access-denied");
    }
  }, [status, router]);

  if (!session) return null;

  return (
    <div className="min-h-screen text-zinc-950">
      <div className="container mx-auto px-5 py-10">
        <div className="mb-8 rounded-[34px] border border-black/10 bg-[#11110f] p-8 text-white md:p-10">
          <div className="mb-4 w-fit rounded-full bg-yellow-300 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#11110f]">
            Bag check
          </div>
          <h1 className="text-5xl font-black tracking-tight md:text-6xl">
            Your Cart
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[34px] border border-black/10 bg-white/75 py-20 text-center">
            <p className="mb-4 text-2xl font-black text-zinc-700">Your cart is empty</p>
            <Link
              href="/products"
              className="brand-button inline-flex rounded-full px-8 py-3 font-black"
            >
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">

            <div className="flex-1 flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-[28px] border border-black/10 bg-white/80 p-5 shadow-sm md:flex-row md:items-center"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-24 w-24 rounded-2xl bg-[#fff8dc] object-contain p-2"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-zinc-950">{item.title}</h3>
                    <p className="font-black text-[#006b63]">${item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="h-9 w-9 rounded-full bg-yellow-200 font-black text-zinc-950 hover:bg-yellow-300"
                    >
                      -
                    </button>
                    <span className="font-bold text-lg text-zinc-950">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="h-9 w-9 rounded-full bg-yellow-200 font-black text-zinc-950 hover:bg-yellow-300"
                    >
                      +
                    </button>
                  </div>

                  <p className="w-24 text-right text-lg font-black text-zinc-950">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-rose-500 hover:text-rose-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              <button
                onClick={clearCart}
                className="text-rose-500 font-bold hover:underline self-start"
              >
                Clear Cart
              </button>
            </div>

            <div className="halftone-panel h-fit w-full rounded-[28px] border border-black/10 p-8 shadow-xl shadow-black/10 lg:w-80">
              <h2 className="text-2xl font-black mb-6 text-zinc-950">Order Summary</h2>

              <div className="flex justify-between mb-3 font-bold text-zinc-600">
                <span>Subtotal</span>
                <span className="text-zinc-950">${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3 font-bold text-zinc-600">
                <span>Shipping</span>
                <span className="text-teal-700 font-black">Free</span>
              </div>
              <div className="my-4 border-t border-black/10" />
              <div className="flex justify-between font-black text-xl mb-6">
                <span className="text-zinc-950">Total</span>
                <span className="text-teal-700">${totalPrice().toFixed(2)}</span>
              </div>

              <Link
                href="/checkout"
                className="block w-full rounded-full bg-[#11110f] py-3 text-center font-black text-white transition hover:bg-white hover:text-black"
              >
                Checkout 
              </Link>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
