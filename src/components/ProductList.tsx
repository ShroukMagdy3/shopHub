import ProductCard from "./ProductCard";
import { Product } from "@/types/product";

type ProductListProps = Readonly<{
  products: Product[];
  filter: string;
  search: string;
}>;

export default function ProductList({
  products,
  filter,
  search,
}: ProductListProps) {
  const normalizedSearch = search.trim().toLowerCase();
  const filteredProducts =
    !filter || filter === "All"
      ? products
      : products.filter((product) => product.category === filter);

  const searchedProducts = normalizedSearch
    ? filteredProducts.filter((product) =>
        [product.title, product.description, product.brand, product.category]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(normalizedSearch)),
      )
    : filteredProducts;

  if (searchedProducts.length === 0) {
    return (
      <div className="rounded-[28px] border border-black/10 bg-white/75 p-12 text-center">
        <p className="text-xl font-black text-zinc-900">No products found.</p>
        <p className="mt-2 font-bold text-zinc-500">
          Try a different search term or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {searchedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
