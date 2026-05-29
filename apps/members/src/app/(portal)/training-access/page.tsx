import { SectionCard } from "@/components/section-card";
import { ShopCurriculum } from "@/components/shop-curriculum";
import {
  eventbriteClassesUrl,
  shopInstructions,
  woodworkingCurriculum,
} from "@/lib/demo-data";

const statusText = {
  ready: "Ready",
  training_required: "Training required",
  ask_lead: "Ask shop lead",
};

const statusStyles = {
  ready: "border-emerald-200 bg-emerald-50 text-emerald-800",
  training_required: "border-amber-200 bg-amber-50 text-amber-800",
  ask_lead: "border-sky-200 bg-sky-50 text-sky-800",
};

const availableXp = woodworkingCurriculum.steps.reduce(
  (sum, step) => sum + step.xp,
  0,
);

const learningStats = [
  ["Active path", "Woodworking"],
  ["Course XP", `${availableXp} available`],
  ["Class links", "Eventbrite aligned"],
];

export default function TrainingAccessPage() {
  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-lg border border-neutral-900 bg-neutral-950 text-white shadow-sm">
        <div className="grid gap-6 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-teal-300">
              Training & Access
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl font-semibold sm:text-4xl">
              Build shop confidence one skill path at a time.
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-300">
              Use this space to choose a shop, follow the recommended training
              path, and keep momentum between classes. Official tool access still
              needs admin or shop lead approval when the database is connected.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {learningStats.map(([label, value]) => (
              <div
                key={label}
                className="rounded-md border border-neutral-800 bg-neutral-900 p-4"
              >
                <p className="text-xs font-semibold uppercase text-neutral-400">
                  {label}
                </p>
                <p className="mt-1 text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="grid border-t border-neutral-800 bg-neutral-900/70 sm:grid-cols-3">
          <div className="border-b border-neutral-800 p-4 sm:border-b-0 sm:border-r">
            <p className="text-sm font-semibold text-teal-200">Pick a path</p>
            <p className="mt-1 text-xs leading-5 text-neutral-400">
              Start with the shop that matches your next project.
            </p>
          </div>
          <div className="border-b border-neutral-800 p-4 sm:border-b-0 sm:border-r">
            <p className="text-sm font-semibold text-amber-200">Stack skills</p>
            <p className="mt-1 text-xs leading-5 text-neutral-400">
              Earn prototype XP as you finish milestones.
            </p>
          </div>
          <div className="p-4">
            <p className="text-sm font-semibold text-sky-200">Confirm access</p>
            <p className="mt-1 text-xs leading-5 text-neutral-400">
              Shop leads approve real tool authorization.
            </p>
          </div>
        </div>
      </section>

      <SectionCard title="Shop Skill Paths" eyebrow="Choose your route">
        <div className="grid gap-4 md:grid-cols-2">
          {shopInstructions.map((item, index) => {
            const hasCurriculum = item.shop === woodworkingCurriculum.shop;

            return (
              <article
                key={item.shop}
                className="flex min-h-48 flex-col justify-between rounded-md border border-neutral-200 bg-neutral-50 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-neutral-500">
                      Path {index + 1}
                    </p>
                    <h2 className="mt-1 font-semibold text-neutral-950">
                      {item.shop}
                    </h2>
                  </div>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[item.status]}`}
                  >
                    {statusText[item.status]}
                  </span>
                </div>
                <p className="mt-3 text-sm text-neutral-600">
                  {item.summary}
                </p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4">
                  <p className="text-xs font-semibold uppercase text-neutral-500">
                    {item.owner}
                  </p>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      hasCurriculum
                        ? "border-teal-200 bg-white text-teal-800"
                        : "border-neutral-200 bg-white text-neutral-500"
                    }`}
                  >
                    {hasCurriculum ? "Interactive path" : "Guidance only"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </SectionCard>

      <SectionCard title="Upcoming Classes & Workshops" eyebrow="Eventbrite">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="max-w-3xl text-sm leading-6 text-neutral-600">
              Public classes remain in Eventbrite for registration. Required
              training classes appear inside skill paths when they unlock shop
              confidence or tool access.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {["Wood Shop", "Machine skills", "Project classes"].map((label) => (
                <div
                  key={label}
                  className="rounded-md border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm font-semibold text-neutral-800"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
          <a
            href={eventbriteClassesUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-teal-700 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-teal-800"
          >
            Open Eventbrite
          </a>
        </div>
      </SectionCard>

      <ShopCurriculum curriculum={woodworkingCurriculum} />
    </div>
  );
}
