"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cartStore";

export default function Navigation() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const totalItems = useCartStore((state) => state.totalItems);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Categories", path: "/categories" },
    { name: "Favorites", path: "/favorites" },
  ];

  const isActive = (path: string) =>
    path === "/" ? pathname === path : pathname.startsWith(path);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-black/10 bg-[#fffef7]/90 backdrop-blur-xl">
      <div className="container mx-auto flex items-center justify-between px-5 py-3">
        <Link href="/" className="group flex items-center gap-3 text-zinc-950">
          <span className="halftone-panel grid h-11 w-11 place-items-center rounded-2xl border border-black/10 text-lg font-black shadow-[0_8px_0_rgba(17,17,15,0.10)] transition group-hover:-translate-y-0.5">
            SH
          </span>
          <span className="text-2xl font-black tracking-tight">
            Shop<span className="text-[#006b63]">Hub</span>
          </span>
        </Link>
        <div className="hidden items-center rounded-full border border-black/10 bg-white/70 p-1 shadow-sm md:flex">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`rounded-full px-4 py-2 text-sm font-black transition duration-300
              ${isActive(link.path)
                ? "bg-[#11110f] text-white shadow-sm"
                : "text-zinc-600 hover:bg-yellow-100 hover:text-zinc-950"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">

          <Link href="/cart" className="relative grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/80 text-zinc-950 transition hover:-translate-y-0.5 hover:bg-yellow-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            {totalItems() > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#f25f4c] text-xs font-black text-white ring-2 ring-[#fffef7]">
                {totalItems()}
              </span>
            )}
          </Link>

          <div className="hidden md:flex items-center gap-3">
            {session ? (
              <>
                <Link
                  href="/profile"
                  className="max-w-[120px] truncate text-sm font-black text-zinc-700 transition hover:text-[#006b63]"
                >
                  {session.user?.name}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="rounded-full border border-black/10 bg-[#11110f] px-4 py-2 text-sm font-black text-white transition hover:bg-[#f25f4c]"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("facebook", { callbackUrl: "/" })}
                className="rounded-full bg-[#11110f] px-5 py-2.5 text-sm font-black text-white transition hover:bg-yellow-300 hover:text-black"
              >
                Login with facebook 
              </button>
            )}
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white/80 text-zinc-950 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col gap-3 border-t border-black/10 bg-[#fffef7] px-6 py-4 shadow-xl md:hidden">
          {links.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className={`rounded-2xl px-4 py-3 text-base font-black transition
              ${isActive(link.path)
                ? "bg-[#11110f] text-white"
                : "text-zinc-700 hover:bg-yellow-100"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="border-t border-black/10 pt-4">
            {session ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="font-black text-zinc-700 transition hover:text-[#006b63]"
                >
                  {session.user?.name}
                </Link>
                <button
                  onClick={() => { signOut({ callbackUrl: "/" }); setMenuOpen(false); }}
                  className="w-fit rounded-full bg-[#f25f4c] px-4 py-2 text-sm font-black text-white transition hover:bg-[#11110f]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => { signIn("facebook", { callbackUrl: "/" }); setMenuOpen(false); }}
                className="rounded-full bg-[#11110f] px-5 py-3 text-sm font-black text-white transition hover:bg-yellow-300 hover:text-black"
              >
                Login with Facebook
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
