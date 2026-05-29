"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { ShopCurriculum } from "@/lib/demo-data";

const storageKey = "makerspace-woodworking-curriculum";

function getSavedCompletedSteps() {
  if (typeof window === "undefined") {
    return [];
  }

  const saved = window.localStorage.getItem(storageKey);
  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed)
      ? parsed.filter((id) => typeof id === "string")
      : [];
  } catch {
    window.localStorage.removeItem(storageKey);
    return [];
  }
}

export function ShopCurriculum({ curriculum }: { curriculum: ShopCurriculum }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>(getSavedCompletedSteps);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(completed));
  }, [completed]);

  const activeStep = curriculum.steps[activeIndex];
  const completedSet = useMemo(() => new Set(completed), [completed]);
  const completedCount = curriculum.steps.filter((step) =>
    completedSet.has(step.id),
  ).length;
  const progress = Math.round((completedCount / curriculum.steps.length) * 100);
  const totalXp = curriculum.steps.reduce((sum, step) => sum + step.xp, 0);
  const earnedXp = curriculum.steps.reduce(
    (sum, step) => (completedSet.has(step.id) ? sum + step.xp : sum),
    0,
  );
  const nextStep =
    curriculum.steps.find((step) => !completedSet.has(step.id)) ??
    curriculum.steps[curriculum.steps.length - 1];
  const isActiveComplete = completedSet.has(activeStep.id);
  const pathComplete = completedCount === curriculum.steps.length;

  function toggleStep(id: string) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  return (
    <section className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="grid gap-6 border-b border-neutral-200 bg-stone-950 p-6 text-white lg:grid-cols-[1fr_22rem] lg:items-stretch">
        <div>
          <p className="text-sm font-semibold uppercase text-teal-300">
            {curriculum.shop}
          </p>
          <h2 className="mt-2 text-3xl font-semibold">{curriculum.title}</h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-300">
            {curriculum.summary}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-stone-800 bg-stone-900 p-3">
              <p className="text-xs font-semibold uppercase text-stone-400">
                Level
              </p>
              <p className="mt-1 font-semibold text-white">
                {pathComplete ? "Path complete" : `Level ${completedCount + 1}`}
              </p>
            </div>
            <div className="rounded-md border border-stone-800 bg-stone-900 p-3">
              <p className="text-xs font-semibold uppercase text-stone-400">
                XP earned
              </p>
              <p className="mt-1 font-semibold text-white">
                {earnedXp} / {totalXp}
              </p>
            </div>
            <div className="rounded-md border border-stone-800 bg-stone-900 p-3">
              <p className="text-xs font-semibold uppercase text-stone-400">
                Next unlock
              </p>
              <p className="mt-1 font-semibold text-white">
                {pathComplete ? "Shop lead record" : nextStep.reward}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-md border border-stone-800 bg-stone-900 p-5">
          <div>
            <p className="text-xs font-semibold uppercase text-teal-300">
              Path progress
            </p>
            <p className="mt-2 text-4xl font-semibold">{progress}%</p>
            <p className="mt-1 text-sm text-stone-400">
              {completedCount} of {curriculum.steps.length} milestones complete
            </p>
          </div>
          <div className="mt-5">
            <div className="h-3 rounded-full bg-stone-800">
              <div
                className="h-3 rounded-full bg-teal-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-stone-400">
              Prototype progress saves in this browser. Official access should
              still be recorded by an admin or permissioned shop lead.
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-neutral-200 bg-stone-50 px-5 py-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {curriculum.steps.map((step) => {
            const isComplete = completedSet.has(step.id);

            return (
              <div
                key={step.reward}
                className={`rounded-md border p-3 ${
                  isComplete
                    ? "border-teal-200 bg-white text-teal-900"
                    : "border-neutral-200 bg-white text-neutral-500"
                }`}
              >
                <p className="text-xs font-semibold uppercase">
                  {isComplete ? "Earned" : "Available"}
                </p>
                <p className="mt-1 text-sm font-semibold">{step.reward}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-2">
          {curriculum.steps.map((step, index) => {
            const isActive = index === activeIndex;
            const isComplete = completedSet.has(step.id);

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`w-full rounded-md border p-4 text-left transition ${
                  isActive
                    ? "border-teal-400 bg-teal-50"
                    : "border-neutral-200 bg-neutral-50 hover:border-neutral-300 hover:bg-white"
                }`}
              >
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="text-xs font-semibold uppercase text-teal-700">
                      {step.phase}
                    </span>
                    <span className="mt-1 block font-semibold text-neutral-950">
                      {step.title}
                    </span>
                    <span className="mt-2 block text-xs font-semibold text-neutral-500">
                      {step.xp} XP - {step.reward}
                    </span>
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${
                      isComplete
                        ? "border-teal-200 bg-white text-teal-800"
                        : "border-neutral-200 bg-white text-neutral-500"
                    }`}
                  >
                    {isComplete ? "Done" : `${index + 1}`}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-md border border-neutral-200 bg-neutral-50">
          <div className="border-b border-neutral-200 bg-white p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase text-teal-700">
                {activeStep.phase}
              </p>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                {activeStep.xp} XP
              </span>
            </div>
            <h3 className="mt-2 text-2xl font-semibold text-neutral-950">
              {activeStep.title}
            </h3>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              {activeStep.summary}
            </p>
          </div>

          <div className="p-5">
            <div className="grid gap-5 lg:grid-cols-2">
              <div>
                <h4 className="font-semibold text-neutral-950">Outcomes</h4>
                <ul className="mt-3 space-y-2">
                  {activeStep.outcomes.map((outcome) => (
                    <li
                      key={outcome}
                      className="flex gap-3 text-sm text-neutral-700"
                    >
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-teal-700" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-neutral-950">Tools covered</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {activeStep.tools.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-semibold text-neutral-700"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-md border border-teal-200 bg-white p-4">
              <p className="text-xs font-semibold uppercase text-teal-700">
                Mission reward
              </p>
              <p className="mt-1 font-semibold text-neutral-950">
                {activeStep.reward}
              </p>
              <p className="mt-1 text-sm leading-6 text-neutral-600">
                This reward is a member-facing milestone. It becomes official
                only when the appropriate shop lead or admin confirms access.
              </p>
            </div>

            {activeStep.classLinks.length > 0 ? (
              <div className="mt-6 border-t border-neutral-200 pt-5">
                <h4 className="font-semibold text-neutral-950">
                  Eventbrite class alignment
                </h4>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {activeStep.classLinks.map((classLink) => (
                    <Link
                      key={classLink.href}
                      href={classLink.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md border border-neutral-200 bg-white p-4 hover:border-teal-300 hover:bg-teal-50"
                    >
                      <span className="text-xs font-semibold uppercase text-teal-700">
                        {classLink.tag}
                      </span>
                      <span className="mt-2 block font-semibold text-neutral-950">
                        {classLink.title}
                      </span>
                      <span className="mt-1 block text-sm leading-5 text-neutral-600">
                        {classLink.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-5">
              <p className="max-w-xl text-xs leading-5 text-neutral-500">
                {curriculum.accessNote}
              </p>
              <button
                type="button"
                onClick={() => toggleStep(activeStep.id)}
                className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
              >
                {isActiveComplete ? "Mark incomplete" : "Mark complete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
