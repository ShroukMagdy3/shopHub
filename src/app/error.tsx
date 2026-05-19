"use client";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <div className="flex min-h-[400px] items-center justify-center bg-amber-50 px-6 text-zinc-950">
      <div className="rounded-2xl border border-amber-200 bg-white p-8 text-center shadow-lg shadow-amber-200/50">
        <h2 className="mb-2 text-xl font-black">{error.message}</h2>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-lg bg-teal-700 px-6 py-2 text-sm font-black text-white transition hover:bg-yellow-400 hover:text-black"
        >
          Please Try again
        </button>
      </div>
    </div>
  );
}
