import Link from "next/link";
import { SectionCard } from "@/components/section-card";
import { SupportRequestForm } from "@/components/support-request-form";
import { instructorInterestUrl, resources } from "@/lib/demo-data";

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">
          Resources
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Policies, forms, links, and official member help.
        </h1>
      </div>

      <SectionCard title="Resource Library">
        <div className="grid gap-3 md:grid-cols-2">
          {resources.map((resource) => (
            <Link
              key={resource.title}
              href={resource.href}
              target={resource.href.startsWith("http") ? "_blank" : undefined}
              rel={resource.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-md border border-neutral-200 bg-neutral-50 p-4 hover:border-teal-300 hover:bg-teal-50"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-teal-700">
                {resource.category}
              </p>
              <h2 className="mt-2 font-semibold text-neutral-950">{resource.title}</h2>
              <p className="mt-1 text-sm text-neutral-600">{resource.description}</p>
            </Link>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Teach a Class" eyebrow="Instructor form">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <p className="text-sm leading-6 text-neutral-600">
            Members interested in teaching can submit the instructor interest form.
            This keeps teaching requests with official forms instead of mixing them
            into training requirements.
          </p>
          <Link
            href={instructorInterestUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-teal-700 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-teal-800"
          >
            Open instructor form
          </Link>
        </div>
      </SectionCard>

      <SectionCard title="Support Request" eyebrow="Official help">
        <SupportRequestForm />
      </SectionCard>
    </div>
  );
}
