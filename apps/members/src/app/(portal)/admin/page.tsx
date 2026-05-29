import { SectionCard } from "@/components/section-card";
import { StatusBadge } from "@/components/status-badge";
import {
  adminMemberLookupPreview,
  adminQueue,
  adminTriageQueue,
  adminWorkflowColumns,
} from "@/lib/demo-data";
import type { MembershipStatus } from "@/lib/demo-data";

const queueStatusClasses: Record<string, string> = {
  Open: "border-teal-200 bg-teal-50 text-teal-800",
  "Needs review": "border-amber-200 bg-amber-50 text-amber-800",
  Queued: "border-neutral-200 bg-neutral-50 text-neutral-700",
  "Needs shop lead": "border-purple-200 bg-purple-50 text-purple-800",
};

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">
          Admin Console
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Review member requests, account status, and shop access.
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-600">
          This prototype groups the work admins will need before Supabase is
          connected: support triage, member matching, pause/cancel review, room
          waitlist review, and training authorization.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {adminQueue.map((item) => (
          <SectionCard key={item.label} title={item.label}>
            <p className="text-3xl font-semibold text-neutral-950">{item.count}</p>
            <p className="mt-2 text-sm text-neutral-600">{item.note}</p>
          </SectionCard>
        ))}
      </div>

      <SectionCard title="Request Triage" eyebrow="Needs admin attention">
        <div className="space-y-3">
          {adminTriageQueue.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 rounded-md border border-neutral-200 bg-neutral-50 p-4 lg:grid-cols-[1fr_auto]"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-teal-700">
                    {item.type}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      queueStatusClasses[item.status] ??
                      "border-neutral-200 bg-white text-neutral-700"
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="text-xs font-semibold text-neutral-500">
                    {item.submitted}
                  </span>
                </div>
                <h2 className="mt-2 font-semibold text-neutral-950">{item.title}</h2>
                <p className="mt-1 text-sm text-neutral-600">
                  {item.member} · {item.priority}
                </p>
                <p className="mt-3 text-sm text-neutral-700">{item.nextStep}</p>
              </div>
              <div className="min-w-44 border-t border-neutral-200 pt-3 lg:border-l lg:border-t-0 lg:pl-4 lg:pt-0">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
                  Owner
                </p>
                <p className="mt-1 text-sm font-semibold text-neutral-950">
                  {item.owner}
                </p>
                <button
                  type="button"
                  className="mt-4 w-full rounded-md border border-neutral-300 px-3 py-2 text-sm font-semibold text-neutral-800 hover:bg-white"
                >
                  Review
                </button>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Member Lookup" eyebrow="Preview">
          <div className="space-y-3">
            {adminMemberLookupPreview.map((member) => (
              <article
                key={member.email}
                className="rounded-md border border-neutral-200 bg-neutral-50 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-neutral-950">{member.name}</h2>
                    <p className="mt-1 text-sm text-neutral-600">{member.email}</p>
                  </div>
                  <StatusBadge status={member.status as MembershipStatus} />
                </div>
                <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
                      Renewal
                    </p>
                    <p className="mt-1 text-neutral-700">{member.renewal}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
                      Roles
                    </p>
                    <p className="mt-1 text-neutral-700">{member.roles.join(", ")}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Admin Workflows" eyebrow="Operating model">
          <div className="grid gap-3">
            {adminWorkflowColumns.map((column) => (
              <article
                key={column.title}
                className="rounded-md border border-neutral-200 bg-neutral-50 p-4"
              >
                <h2 className="font-semibold text-neutral-950">{column.title}</h2>
                <ul className="mt-3 space-y-2">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-neutral-700">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-teal-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Permission Model" eyebrow="MVP">
        <div className="grid gap-3 text-sm md:grid-cols-3">
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
            <h2 className="font-semibold text-neutral-950">Admins</h2>
            <p className="mt-1 text-neutral-600">
              Resolve account mismatches, update member status, review billing
              requests, and manage official support queues.
            </p>
          </div>
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
            <h2 className="font-semibold text-neutral-950">Shop leads</h2>
            <p className="mt-1 text-neutral-600">
              Draft and publish shop instructions, curriculum notes, and
              member-facing guidance.
            </p>
          </div>
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
            <h2 className="font-semibold text-neutral-950">
              Authorized shop leads
            </h2>
            <p className="mt-1 text-neutral-600">
              Manage training/access records only when explicitly permitted by
              admins.
            </p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
