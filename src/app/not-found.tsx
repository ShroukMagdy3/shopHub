import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50 px-6 text-zinc-950">
      <div className="rounded-2xl border border-amber-200 bg-white p-10 text-center shadow-xl shadow-amber-200/50">
        <h1 className="text-[100px] font-black leading-none tracking-tight text-teal-700">
          404
        </h1>
        <div className="mx-auto my-4 h-[3px] w-12 rounded-full bg-yellow-400" />

        <p className="mb-2 text-lg font-black">Page not found</p>
        <p className="mx-auto mb-8 max-w-xs text-sm font-bold text-zinc-600">
          The product you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>

        <div className="flex justify-center gap-3">
          <Link
            href="/products"
            className="rounded-lg border border-amber-200 bg-white px-5 py-2 text-sm font-black transition hover:bg-yellow-50"
          >
            Go back
          </Link>
          <Link
            href="/"
            className="rounded-lg bg-teal-700 px-5 py-2 text-sm font-black text-white transition hover:bg-yellow-400 hover:text-black"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
