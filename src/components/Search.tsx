"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const searchValue = search.trim();
    const params = new URLSearchParams(searchParams);

    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
    }, 500);

    return () => clearTimeout(timer);
  }, [search, searchParams, pathname, router]);

  return (
    <div className="mb-4">
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <input
        id="product-search"
        name="search"
        type="search"
        placeholder="Search products..."
        className="w-full rounded-3xl border border-black/10 bg-white px-5 py-4 text-base font-black text-zinc-950 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-[#006b63] focus:ring-4 focus:ring-[#006b63]/10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
