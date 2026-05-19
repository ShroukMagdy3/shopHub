"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Product, ProductsResponse } from "@/types/product";

const FAVORITES_KEY = "favoriteProducts";
const OLD_FAVORITES_KEY = "favoriteRecipes";

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

export default function FavoriteList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const ids = readFavoriteIds();
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
      setFavoriteIds(ids);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=0");

        if (!res.ok) {
          throw new Error("Failed to load favorite products.");
        }

        const data = (await res.json()) as ProductsResponse;
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const favoriteProducts = products.filter((product) =>
    favoriteIds.includes(String(product.id)),
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 animate-spin rounded-full border-4 border-teal-700 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center font-bold text-rose-500">{error}</p>;
  }

  if (favoriteProducts.length === 0) {
    return (
      <div className="rounded-[28px] border border-black/10 bg-white/75 p-12 text-center">
        <p className="text-xl font-black text-zinc-900">No favorites yet.</p>
        <p className="mt-2 font-bold text-zinc-500">
          Tap the heart on a product to save it here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {favoriteProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onFavoriteChange={setFavoriteIds}
        />
      ))}
    </div>
  );
}
