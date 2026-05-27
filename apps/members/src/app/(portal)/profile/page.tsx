import { SectionCard } from "@/components/section-card";
import { getPortalSession } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getPortalSession();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">
          Profile
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Basic account and household information.
        </h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Account">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-semibold text-neutral-950">Name</dt>
              <dd className="mt-1 text-neutral-600">{session.user.name}</dd>
            </div>
            <div>
              <dt className="font-semibold text-neutral-950">Email</dt>
              <dd className="mt-1 text-neutral-600">{session.user.email}</dd>
            </div>
            <div>
              <dt className="font-semibold text-neutral-950">Roles</dt>
              <dd className="mt-1 text-neutral-600">{session.roles.join(", ")}</dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="Household Access">
          <p className="text-sm text-neutral-600">{session.member.householdAccess}</p>
          <div className="mt-4 rounded-md border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
            Keep household data minimal until the operations team confirms what needs to be tracked.
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
