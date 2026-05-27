import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/app/login/actions";
import type { PortalSession } from "@/lib/demo-data";
import { publicSiteUrl } from "@/lib/urls";

const navItems = [
  ["Dashboard", "/dashboard"],
  ["Membership", "/membership"],
  ["Training & Access", "/training-access"],
  ["Classes & Learning", "/classes-learning"],
  ["Community", "/community"],
  ["Resources", "/resources"],
  ["Profile", "/profile"],
  ["Admin", "/admin"],
] as const;

export function AppShell({
  session,
  children,
}: {
  session: PortalSession;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-neutral-800 bg-neutral-950 p-5 text-white lg:flex lg:flex-col">
        <Link href="/dashboard" className="mb-8 block">
          <Image
            src="/makerspace-charlotte-logo-white.png"
            alt="MakerSpace Charlotte"
            width={220}
            height={41}
            priority
          />
        </Link>
        <nav className="space-y-1">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="block rounded-md px-3 py-2 text-sm font-medium text-neutral-200 hover:bg-neutral-800 hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto rounded-lg border border-neutral-800 bg-neutral-900 p-4">
          <p className="text-sm font-semibold">{session.user.name}</p>
          <p className="mt-1 break-all text-xs text-neutral-400">{session.user.email}</p>
          <p className="mt-3 text-xs text-neutral-500">
            {session.mode === "demo" ? "Demo data mode" : "Supabase session"}
          </p>
          <form action={signOut} className="mt-4">
            <button className="w-full rounded-md border border-neutral-700 px-3 py-2 text-sm font-semibold text-neutral-100 hover:bg-neutral-800">
              Sign out
            </button>
          </form>
          <Link
            href={publicSiteUrl}
            className="mt-3 block text-center text-xs font-semibold text-neutral-400 hover:text-white"
          >
            Public website
          </Link>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-10 border-b border-neutral-200 bg-white/95 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <Link href="/dashboard" className="font-semibold">MakerSpace Members</Link>
            <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800">
              {session.mode === "demo" ? "Demo" : "Live"}
            </span>
          </div>
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="shrink-0 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm font-semibold text-neutral-700"
              >
                {label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
