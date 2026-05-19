import ProductList from "@/components/ProductList";
import Filter from "@/components/Filter";
import Search from "@/components/Search";
import { Category, ProductsResponse } from "@/types/product";

interface Props {
  searchParams: Promise<{ filter?: string; search?: string }>;
}

async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products?limit=0");

  if (!res.ok) {
    throw new Error(`Failed to load products: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as ProductsResponse;
  return data.products;
}

async function fetchCategories() {
  const res = await fetch("https://dummyjson.com/products/categories");

  if (!res.ok) {
    throw new Error(
      `Failed to load categories: ${res.status} ${res.statusText}`,
    );
  }

  return (await res.json()) as Category[];
}

export default async function ProductsPage({ searchParams }: Props) {
  const { filter = "All", search = "" } = await searchParams;
  const [products, categories] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  return (
    <div className="min-h-screen text-zinc-950">
      <div className="container mx-auto px-5 py-10">

        <div className="brand-card mb-8 rounded-[28px] p-4 md:p-5">
          <Search />
          <Filter categories={categories} />
        </div>

        <ProductList products={products} filter={filter} search={search} />
      </div>
    </div>
  );
}
