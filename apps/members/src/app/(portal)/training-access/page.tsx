import { SectionCard } from "@/components/section-card";
import { shopInstructions } from "@/lib/demo-data";

const statusText = {
  ready: "Ready",
  training_required: "Training required",
  ask_lead: "Ask shop lead",
};

export default function TrainingAccessPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">
          Training & Access
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Shop instructions first, authorization records later.
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-neutral-600">
          Shop leads can publish guidance in the MVP. Member authorization management
          should stay limited to admins and explicitly permissioned shop leads.
        </p>
      </div>

      <SectionCard title="Shop Guidance" eyebrow="Current instructions">
        <div className="grid gap-3 md:grid-cols-2">
          {shopInstructions.map((item) => (
            <article key={item.shop} className="rounded-md border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-semibold text-neutral-950">{item.shop}</h2>
                <span className="rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-xs font-semibold text-neutral-700">
                  {statusText[item.status]}
                </span>
              </div>
              <p className="mt-3 text-sm text-neutral-600">{item.summary}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500">
                {item.owner}
              </p>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
