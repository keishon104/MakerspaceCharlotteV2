import Link from "next/link";
import { SectionCard } from "@/components/section-card";

export default function ClassesLearningPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">
          Classes & Learning
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Class links, discount guidance, and learning paths.
        </h1>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <SectionCard title="Public Classes">
          <p className="text-sm text-neutral-600">
            Keep registration in Eventbrite or the current booking system until
            there is a clear reason to rebuild it.
          </p>
          <Link
            href="https://www.eventbrite.com/o/makerspace-charlotte-6594736471"
            className="mt-4 inline-flex text-sm font-semibold text-teal-800"
          >
            Open Eventbrite
          </Link>
        </SectionCard>
        <SectionCard title="Member Discounts">
          <p className="text-sm text-neutral-600">
            Place member discount instructions here once the current process is confirmed.
          </p>
        </SectionCard>
        <SectionCard title="Reservations">
          <p className="text-sm text-neutral-600">
            Tool, room, and shop reservations are intentionally skipped in the MVP.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
