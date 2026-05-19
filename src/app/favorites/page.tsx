import FavoriteList from "@/components/FavoriteList";

export default function FavoritesPage() {
  return (
    <div className="min-h-screen text-zinc-950">
      <div className="container mx-auto px-5 py-10">
        <div className="mb-8 rounded-[34px] border border-black/10 bg-white/75 p-8 md:p-10">
          <div className="section-kicker rounded-full px-4 py-2">
            Saved picks
          </div>
          <h1 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">
            Your short list.
          </h1>
        </div>
        <FavoriteList />
      </div>
    </div>
  );
}
