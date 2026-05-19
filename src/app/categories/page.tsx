import Link from "next/link";
import { Category } from "@/types/product";

async function fetchCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");

  if (!res.ok) {
    throw new Error(
      `Failed to load categories: ${res.status} ${res.statusText}`,
    );
  }

  return (await res.json()) as Category[];
}

export default async function CategoriesPage() {
  const categories = await fetchCategories();

  return (
    <div className="min-h-screen text-zinc-950">
      <section className="container mx-auto px-5 py-10">

        <div className="mb-8 flex justify-end">
          <Link
            href="/products"
            className="brand-outline w-fit rounded-full px-5 py-3 text-sm font-black uppercase tracking-wide"
          >
            All Products
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/products?filter=${category.slug}`}
              className={`group rounded-[28px] border border-black/10 p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10 ${
                index % 4 === 0
                  ? "halftone-panel"
                  : index % 4 === 1
                    ? "bg-[#006b63] text-white"
                    : "bg-white/80 text-zinc-950"
              }`}
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white/85 text-xl font-black text-[#11110f] transition group-hover:scale-105">
                {category.name.charAt(0)}
              </div>
              <h2 className="text-xl font-black capitalize">
                {category.name}
              </h2>
              <p className="mt-2 text-sm font-bold opacity-70">
                View products
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
