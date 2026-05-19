import { notFound } from "next/navigation";
import { Product } from "@/types/product";
import AddToCart from "@/components/AddToCart";

async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to load product: ${res.status} ${res.statusText}`);
  }

  return (await res.json()) as Product;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);

  return { title: product.title };
}

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  const image = product.images[0] ?? product.thumbnail;

  return (
    <div className="min-h-screen text-zinc-950">
      <div className="container mx-auto px-5 py-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="relative overflow-hidden rounded-[34px] border border-black/10 bg-white/80 p-5 shadow-xl shadow-black/5">
            <div className="halftone-panel absolute right-0 top-0 h-28 w-28 rounded-bl-[36px]" />
            <div className="relative grid h-[420px] place-items-center rounded-[28px] bg-[#fff8dc] p-8">
              <img
                src={image}
                alt={product.title}
                className="h-full w-full object-contain drop-shadow-2xl"
              />
            </div>

            {product.images.length > 1 ? (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {product.images.slice(1, 4).map((productImage) => (
                  <img
                    key={productImage}
                    src={productImage}
                    alt={product.title}
                    className="h-28 rounded-2xl border border-black/10 bg-white object-contain p-3"
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="brand-card flex flex-col gap-5 rounded-[34px] p-7 md:p-9">
            <p className="w-fit rounded-full bg-yellow-200 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-zinc-950">
              {product.category}
            </p>
            <h1 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">
              {product.title}
            </h1>

            {product.brand ? (
              <p className="text-lg font-black text-zinc-600">
                Brand: {product.brand}
              </p>
            ) : null}

            <p className="text-5xl font-black text-[#006b63]">
              ${product.price.toFixed(2)}
            </p>

            <div className="flex flex-wrap gap-3 font-black text-zinc-700">
              <span className="rounded-full bg-yellow-200 px-4 py-2">
                Rating {product.rating}
              </span>
              <span className="rounded-full bg-teal-50 px-4 py-2 text-[#006b63]">
                Stock {product.stock}
              </span>
              <span className="rounded-full bg-white px-4 py-2">
                {product.discountPercentage}% off
              </span>
            </div>

            <p className="max-w-2xl text-lg font-bold leading-8 text-zinc-600">
              {product.description}
            </p>

            <div className="max-w-sm">
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
    </div>
  );
}
