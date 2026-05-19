import Link from "next/link";
import { Category, Product, ProductsResponse } from "@/types/product";

async function getCategories() {
  const res = await fetch("https://dummyjson.com/products/categories", {
    next: { revalidate: 3600 },
  });

  return (await res.json()) as Category[];
}

async function getFeaturedProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=8&skip=0", {
    next: { revalidate: 3600 },
  });

  const data = (await res.json()) as ProductsResponse;
  return data.products;
}

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
  ]);

  const heroProduct = products[0];
  const featured = products.slice(0, 8);
  const categoryHighlights = categories.slice(0, 10);

  return (
    <div className="min-h-screen text-zinc-950">
      <section className="relative overflow-hidden px-5 pb-16 pt-10 md:pb-24 md:pt-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="section-kicker mb-5 rounded-full px-4 py-2">
              Curated drops, daily deals
            </div>

            <h1 className="max-w-4xl text-6xl font-black leading-[0.9] tracking-tight text-[#11110f] md:text-8xl">
              The shop that feels handpicked.
            </h1>

            <p className="mt-7 max-w-2xl text-lg font-bold leading-8 text-zinc-600 md:text-xl">
              ShopHub blends useful everyday finds with standout pieces, bold
              discounts, and a checkout flow made for fast decisions.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/products"
                className="brand-button rounded-full px-8 py-4 text-center text-sm font-black uppercase tracking-wide"
              >
                Browse products
              </Link>
              <Link
                href="/categories"
                className="brand-outline rounded-full px-8 py-4 text-center text-sm font-black uppercase tracking-wide"
              >
                Shop categories
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["194+", "products"],
                ["30+", "categories"],
                ["Free", "shipping"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-black/10 bg-white/60 p-4"
                >
                  <p className="text-2xl font-black text-[#006b63]">
                    {value}
                  </p>
                  <p className="text-xs font-black uppercase tracking-wide text-zinc-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {heroProduct ? (
            <Link
              href={`/products/${heroProduct.id}`}
              className="group relative min-h-[540px] overflow-hidden rounded-[36px] border border-black/10 bg-[#11110f] p-5 text-white shadow-[0_28px_70px_rgba(17,17,15,0.20)]"
            >
              <div className="halftone-panel absolute right-0 top-0 h-44 w-44 rounded-bl-[48px]" />
              <div className="relative z-10 flex items-center justify-between">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-[#11110f]">
                  Featured find
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black backdrop-blur">
                  ${heroProduct.price}
                </span>
              </div>

              <div className="relative z-10 mt-10 flex h-72 items-center justify-center rounded-[28px] bg-white/95 p-8 transition duration-500 group-hover:-translate-y-1">
                <img
                  src={heroProduct.thumbnail}
                  alt={heroProduct.title}
                  className="h-full w-full object-contain drop-shadow-2xl"
                />
              </div>

              <div className="relative z-10 mt-8">
                <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-300">
                  {heroProduct.category}
                </p>
                <h2 className="mt-3 text-4xl font-black leading-tight">
                  {heroProduct.title}
                </h2>
                <p className="mt-4 line-clamp-2 text-sm font-bold leading-6 text-white/70">
                  {heroProduct.description}
                </p>
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="px-5 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="section-kicker rounded-full px-4 py-2">
                Quick aisles
              </div>
              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Pick a mood, not a menu.
              </h2>
            </div>
            <Link
              href="/categories"
              className="w-fit text-sm font-black uppercase tracking-wide text-[#006b63] hover:underline"
            >
              View all categories
            </Link>
          </div>

          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-4">
            {categoryHighlights.map((cat, index) => (
              <Link
                key={cat.slug}
                href={`/products?filter=${cat.slug}`}
                className={`min-w-[220px] rounded-[28px] border border-black/10 p-5 transition hover:-translate-y-1 ${
                  index % 3 === 0
                    ? "halftone-panel text-[#11110f]"
                    : index % 3 === 1
                      ? "bg-[#006b63] text-white"
                      : "bg-white/80 text-zinc-950"
                }`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-black/10 bg-white/80 text-xl font-black text-[#11110f]">
                  {cat.name.charAt(0)}
                </span>
                <h3 className="mt-8 text-xl font-black capitalize">
                  {cat.name}
                </h3>
                <p className="mt-2 text-sm font-bold opacity-70">
                  Explore collection
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 pt-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="section-kicker rounded-full px-4 py-2">
                Trending now
              </div>
              <h2 className="mt-4 text-4xl font-black tracking-tight md:text-5xl">
                Fresh picks with shelf appeal.
              </h2>
            </div>
            <Link
              href="/products"
              className="brand-outline w-fit rounded-full px-6 py-3 text-sm font-black uppercase tracking-wide"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product: Product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group overflow-hidden rounded-[30px] border border-black/10 bg-white/80 p-3 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10"
              >
                <div className="relative grid h-60 place-items-center overflow-hidden rounded-[24px] bg-[#fff8dc] p-6">
                  <span className="absolute left-4 top-4 rounded-full bg-[#11110f] px-3 py-1 text-xs font-black uppercase tracking-wide text-white">
                    {product.discountPercentage}% off
                  </span>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-[#006b63]">
                    {product.category}
                  </p>
                  <h3 className="mt-2 line-clamp-2 min-h-[52px] text-lg font-black leading-snug text-zinc-900">
                    {product.title}
                  </h3>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="text-2xl font-black text-[#11110f]">
                      ${product.price}
                    </p>
                    <span className="rounded-full bg-yellow-200 px-3 py-1 text-sm font-black text-zinc-900">
                      {product.rating} star
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-24">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[36px] border border-black/10 bg-[#11110f] text-white lg:grid-cols-[0.9fr_1.1fr]">
          <div className="halftone-panel min-h-72" />
          <div className="p-8 md:p-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-yellow-300">
              ShopHub promise
            </p>
            <h2 className="mt-4 text-4xl font-black leading-tight md:text-6xl">
              Less scrolling. Better finds. Faster checkout.
            </h2>
            <p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-white/70">
              A marketplace experience with bold discovery, saved favorites,
              protected cart actions, and categories that move like real aisles.
            </p>
            <Link
              href="/products"
              className="mt-8 inline-flex rounded-full bg-yellow-300 px-8 py-4 text-sm font-black uppercase tracking-wide text-[#11110f] transition hover:bg-white"
            >
              Start shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
