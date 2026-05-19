"use client";

import { useCartStore } from "@/store/cartStore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type AddToCartProduct = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
};

export default function AddToCart({ product }: { product: AddToCartProduct }) {
  const addItem = useCartStore((state) => state.addItem);
  const { data: session } = useSession();
  const router = useRouter();

  function handleAddToCart() {
    if (!session) {
      router.push("/access-denied");
      return;
    }
    addItem({ ...product, quantity: 1 });
  }

  return (
    <button
      onClick={handleAddToCart}
      className="w-full rounded-full bg-yellow-300 px-8 py-3 font-black text-black transition hover:bg-[#006b63] hover:text-white"
    >
      Add to Cart
    </button>
  );
}
