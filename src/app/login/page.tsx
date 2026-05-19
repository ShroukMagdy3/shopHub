import { signIn } from "@/auth";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-zinc-950">
      <div className="brand-card w-full max-w-md rounded-[34px] p-10 text-center">
        <div className="halftone-panel mx-auto mb-6 grid h-16 w-16 place-items-center rounded-2xl border border-black/10 text-xl font-black">
          SH
        </div>
        
        <h1 className="mb-2 text-3xl font-black">Welcome Back</h1>
        <p className="mb-8 font-bold text-zinc-600">Sign in to continue</p>

        <form
          action={async () => {
            "use server";
            await signIn("facebook", { redirectTo: "/" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-full bg-[#11110f] py-3 font-black text-white transition hover:bg-yellow-300 hover:text-black"
          >
            Continue with Facebook
          </button>
        </form>

      </div>
    </div>
  );
}
