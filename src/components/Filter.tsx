"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Category } from "@/types/product";

type FilterProps = {
  categories: Category[];
};

export default function Filter({ categories }: FilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") ?? "All";

  const filters = [
    { label: "All", value: "All" },
    ...categories.map((category) => ({
      label: category.name,
      value: category.slug,
    })),
  ];

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);

    if (filter === "All") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }

  function getButtonClass(value: string) {
    const isActive = currentFilter === value;

    return `rounded-full px-4 py-2 text-sm font-black transition ${
      isActive
        ? "bg-[#11110f] text-white shadow-md shadow-black/10"
        : "border border-black/10 bg-white/80 text-zinc-700 hover:border-[#006b63] hover:bg-yellow-100 hover:text-zinc-950"
    }`;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          onClick={() => handleFilter(filter.value)}
          className={getButtonClass(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
