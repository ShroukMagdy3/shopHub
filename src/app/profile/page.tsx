import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) redirect("/access-denied");

  return (
    <div className="min-h-screen px-5 py-10 text-zinc-950">
      <div className="mx-auto max-w-5xl">
        
        <div className="mb-8 rounded-[34px] border border-black/10 bg-[#11110f] p-8 text-white md:p-10">
          <p className="mb-4 w-fit rounded-full bg-yellow-300 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#11110f]">
            Account
          </p>

          <h1 className="text-5xl font-black tracking-tight md:text-6xl">
            My Profile
          </h1>
        </div>

        <div className="brand-card relative overflow-hidden rounded-[34px]">
          
          <div className="halftone-panel relative h-40" />

          <div className="relative px-8 pb-8">
            
            <div className="-mt-16 mb-6 flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between">
              
              <div className="flex items-end gap-5">
                {session.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-white object-cover shadow-xl"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-[#11110f] text-4xl font-black text-white shadow-xl">
                    {session.user?.name?.[0]}
                  </div>
                )}                
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              
              <div className="rounded-3xl border border-black/10 bg-white/70 p-6">
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-zinc-400">
                  Full Name
                </p>

                <h3 className="text-xl font-black text-zinc-900">
                  {session.user?.name}
                </h3>
              </div>

              <div className="rounded-3xl border border-black/10 bg-white/70 p-6">
                <p className="mb-2 text-sm font-bold uppercase tracking-wide text-zinc-400">
                  Email Address
                </p>

                <h3 className="text-xl font-black text-zinc-900 break-all">
                  {session.user?.email}
                </h3>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          
          <Link
            href="/cart"
            className="group rounded-[28px] border border-black/10 bg-white/80 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700 transition group-hover:bg-yellow-400 group-hover:text-black">
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386a.75.75 0 0 1 .737.602l.64 3.199m0 0L6.75 15.75A2.25 2.25 0 0 0 9 18h7.5a2.25 2.25 0 0 0 2.25-2.25V8.25H5.013m0-1.449h14.237"
                />
              </svg>
            </div>

            <h3 className="mb-2 text-2xl font-black text-zinc-900">
              My Cart
            </h3>

            <p className="text-zinc-500">
              View and manage your shopping cart items.
            </p>
          </Link>

          <Link
            href="/favorites"
            className="group rounded-[28px] border border-black/10 bg-white/80 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10"
          >
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-500 transition group-hover:bg-red-500 group-hover:text-white">
              
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>

            <h3 className="mb-2 text-2xl font-black text-zinc-900">
              Favorites
            </h3>

            <p className="text-zinc-500">
              Access all products you saved for later.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
