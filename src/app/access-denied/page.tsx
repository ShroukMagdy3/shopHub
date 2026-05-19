"use client";

import { signIn } from "next-auth/react";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06L5.84 9.9C6.71 7.3 9.14 5.38 12 5.38Z"
      />
    </svg>
  );
}

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
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => signIn("google", { callbackUrl: "/cart" })}
            className="flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-8 py-3 font-black text-black transition hover:bg-yellow-100"
          >
            <GoogleIcon />
            Google
          </button>
          <button
            onClick={() => signIn("facebook", { callbackUrl: "/cart" })}
            className="rounded-full bg-yellow-300 px-8 py-3 font-black text-black transition hover:bg-[#006b63] hover:text-white"
          >
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
