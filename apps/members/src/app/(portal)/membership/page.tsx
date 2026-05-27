import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import { benefits } from "@/lib/demo-data";
import { getPortalSession } from "@/lib/auth";

export default async function MembershipPage() {
  const session = await getPortalSession();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">
          My Membership
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Status, plan details, and family access.
        </h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Current Status" action={<StatusBadge status={session.member.status} />}>
          <dl className="grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-neutral-950">Membership type</dt>
              <dd className="mt-1 text-neutral-600">{session.member.type}</dd>
            </div>
            <div>
              <dt className="font-semibold text-neutral-950">Renewal source</dt>
              <dd className="mt-1 text-neutral-600">{session.member.renewalLabel}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="font-semibold text-neutral-950">Immediate family access</dt>
              <dd className="mt-1 text-neutral-600">{session.member.householdAccess}</dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="Benefits" eyebrow="Included">
          <ul className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="rounded-md border border-neutral-200 bg-neutral-50 p-3 text-sm text-neutral-700">
                {benefit}
              </li>
            ))}
          </ul>
        </SectionCard>
      </div>
    </div>
  );
}
