import Link from "next/link";
import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { dashboardNotices, shopInstructions } from "@/lib/demo-data";
import { getPortalSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getPortalSession();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-lg bg-neutral-950 p-6 text-white sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-300">
            Member Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Welcome back, {session.user.name}.
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-neutral-300">
            This MVP keeps account status, immediate family access notes, benefits,
            Discord links, and shop guidance in one place.
          </p>
        </div>
        <StatusBadge status={session.member.status} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Membership" eyebrow="Status">
          <p className="text-2xl font-semibold text-neutral-950">{session.member.type}</p>
          <p className="mt-2 text-sm text-neutral-600">{session.member.renewalLabel}</p>
          <Link href="/membership" className="mt-4 inline-flex text-sm font-semibold text-teal-800">
            View membership
          </Link>
        </SectionCard>

        <SectionCard title="Training" eyebrow="Access">
          <p className="text-sm text-neutral-600">
            Shop instructions are available now. Authorization records stay manual
            until owners and permissions are confirmed.
          </p>
          <Link href="/training-access" className="mt-4 inline-flex text-sm font-semibold text-teal-800">
            View access guidance
          </Link>
        </SectionCard>

        <SectionCard title="Discord" eyebrow="Community">
          <p className="text-sm text-neutral-600">
            Discord remains the live community layer for questions, project help,
            events, and announcements.
          </p>
          <Link href="/community" className="mt-4 inline-flex text-sm font-semibold text-teal-800">
            Open channel guide
          </Link>
        </SectionCard>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Operating Notes" eyebrow="MVP">
          <div className="space-y-3">
            {dashboardNotices.map((notice) => (
              <div key={notice.title} className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
                <h3 className="font-semibold text-neutral-950">{notice.title}</h3>
                <p className="mt-1 text-sm text-neutral-600">{notice.body}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Shop Guidance" eyebrow="Instructions">
          <div className="space-y-3">
            {shopInstructions.slice(0, 3).map((item) => (
              <div key={item.shop} className="flex items-start justify-between gap-3 border-b border-neutral-100 pb-3 last:border-b-0 last:pb-0">
                <div>
                  <h3 className="font-semibold text-neutral-950">{item.shop}</h3>
                  <p className="mt-1 text-sm text-neutral-600">{item.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
