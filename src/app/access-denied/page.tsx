"use client";

import { signIn } from "next-auth/react";

export default function AccessDenied() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-zinc-950">
      <div className="brand-card rounded-[34px] p-10 text-center">
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-24 w-24 text-[#006b63]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
            />
          </svg>
        </div>
        <h1 className="text-4xl font-black mb-3">Access Denied</h1>
        <p className="text-zinc-600 mb-8">
          You need to sign in to access this page.
        </p>
        <button
          onClick={() => signIn("facebook", { callbackUrl: "/cart" })}
          className="rounded-full bg-yellow-300 px-8 py-3 font-black text-black transition hover:bg-[#006b63] hover:text-white"
        >
          Sign In with Facebook
        </button>
      </div>
    </div>
  );
}
