import { SectionCard } from "@/components/section-card";
import { adminQueue } from "@/lib/demo-data";

export default function AdminPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">
          Admin Console
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Account matching, status review, and controlled publishing.
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-600">
          This MVP keeps admin-only data simple: account matching, manual status
          updates, resources, notices, and shop instructions.
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

      <SectionCard title="Permission Model" eyebrow="MVP">
        <div className="grid gap-3 text-sm md:grid-cols-3">
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
            <h2 className="font-semibold text-neutral-950">Admins</h2>
            <p className="mt-1 text-neutral-600">Resolve account mismatches and update member status.</p>
          </div>
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
            <h2 className="font-semibold text-neutral-950">Shop leads</h2>
            <p className="mt-1 text-neutral-600">Publish shop instructions and member-facing guidance.</p>
          </div>
          <div className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
            <h2 className="font-semibold text-neutral-950">Authorized shop leads</h2>
            <p className="mt-1 text-neutral-600">Manage access records only when explicitly permitted.</p>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
