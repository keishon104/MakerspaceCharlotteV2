import Image from "next/image";
import Link from "next/link";
import { signInWithEmail } from "./actions";
import { hasSupabaseConfig } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const params = await searchParams;
  const isConfigured = hasSupabaseConfig();

  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-10 text-white">
      <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="space-y-8">
          <Link href="/dashboard" className="inline-block">
            <Image
              src="/makerspace-charlotte-logo-white.png"
              alt="MakerSpace Charlotte"
              width={280}
              height={52}
              priority
            />
          </Link>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-300">
              Member Portal MVP
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Account status, benefits, resources, and shop guidance in one place.
            </h1>
          </div>
          <div className="grid gap-3 text-sm text-neutral-300 sm:grid-cols-2">
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
              Admin-matched accounts
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
              Immediate family access notes
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
              Discord stays the community layer
            </div>
            <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
              Reservations intentionally deferred
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-neutral-800 bg-white p-6 text-neutral-950 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Sign in</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Email login is wired for Supabase. Local review uses demo data until credentials are added.
            </p>
          </div>

          {params.message ? (
            <div className="mb-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {params.message}
            </div>
          ) : null}

          {!isConfigured ? (
            <div className="mb-5 rounded-md border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900">
              Demo mode is active. Use the portal without auth while Supabase is not configured.
            </div>
          ) : null}

          <form action={signInWithEmail} className="space-y-4">
            <div>
              <label htmlFor="email" className="text-sm font-semibold text-neutral-800">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="mt-2 w-full rounded-md border border-neutral-300 px-3 py-3 text-base outline-none focus:border-teal-600 focus:ring-2 focus:ring-teal-100"
              />
            </div>
            <button className="w-full rounded-md bg-teal-700 px-4 py-3 text-sm font-semibold text-white hover:bg-teal-800">
              Send login link
            </button>
          </form>

          <div className="mt-5 flex flex-col gap-3 border-t border-neutral-200 pt-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <Link href="/dashboard" className="font-semibold text-teal-800 hover:text-teal-900">
              Open demo dashboard
            </Link>
            <Link href="https://www.makerspacecharlotte.org" className="text-neutral-600 hover:text-neutral-950">
              Public website
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
