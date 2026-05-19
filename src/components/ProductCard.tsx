"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import AddToCart from "@/components/AddToCart";

const FAVORITES_KEY = "favoriteProducts";
const OLD_FAVORITES_KEY = "favoriteRecipes";

type ProductCardProps = {
  product: Product;
  onFavoriteChange?: (favoriteIds: string[]) => void;
};

function readFavoriteIds() {
  const favoritesText =
    localStorage.getItem(FAVORITES_KEY) ??
    localStorage.getItem(OLD_FAVORITES_KEY) ??
    "[]";

  try {
    return JSON.parse(favoritesText) as string[];
  } catch {
    return [];
  }
}

export default function ProductCard({
  product,
  onFavoriteChange,
}: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const productId = String(product.id);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const favoriteIds = readFavoriteIds();
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoriteIds));
      setIsFavorite(favoriteIds.includes(productId));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [productId]);

  function handleFavorite() {
    const favoriteIds = readFavoriteIds();
    let newFavoriteIds: string[];

    if (favoriteIds.includes(productId)) {
      newFavoriteIds = favoriteIds.filter((id) => id !== productId);
      setIsFavorite(false);
    } else {
      newFavoriteIds = [...favoriteIds, productId];
      setIsFavorite(true);
    }

    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavoriteIds));
    onFavoriteChange?.(newFavoriteIds);
  }

  return (
    <div className="group overflow-hidden rounded-[30px] border border-black/10 bg-white/85 p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10">
      <div className="relative overflow-hidden rounded-[24px] bg-[#fff8dc]">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-72 w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute left-4 top-4 rounded-full bg-[#11110f] px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-lg">
          {product.category}
        </div>
        <button
          type="button"
          onClick={handleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 ${
            isFavorite
              ? "border-rose-300 bg-rose-500 text-white shadow-lg shadow-rose-300/40"
              : "border-black/10 bg-white/90 text-zinc-800 hover:bg-[#006b63] hover:text-white"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4 pt-5">
        <h2 className="mb-3 line-clamp-2 min-h-[60px] text-xl font-black leading-snug text-zinc-900">
          {product.title}
        </h2>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-zinc-400">
              Price
            </p>
            <p className="text-3xl font-black text-[#11110f]">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-yellow-200 px-3 py-2 text-sm font-black text-zinc-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="size-4"
            >
              <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>

            {product.rating}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href={`/products/${product.id}`}
            className="group/button flex items-center justify-center gap-2 rounded-full bg-[#11110f] px-5 py-3.5 text-sm font-black text-white transition-all duration-300 hover:bg-gray-700 hover:text-white"
          >
            View Details
            <span className="transition-transform duration-300 group-hover/button:translate-x-1">
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
                  d="m16.49 12 3.75 3.75m0 0-3.75 3.75m3.75-3.75H3.74V4.499"
                />
              </svg>
            </span>
          </Link>

          <div className="overflow-hidden rounded-full">
            <AddToCart
              product={{
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
