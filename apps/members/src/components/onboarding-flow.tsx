"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { OnboardingStep } from "@/lib/demo-data";
import { onboardingStorageKey } from "@/lib/onboarding-storage";

function getSavedCompletedSteps() {
  if (typeof window === "undefined") {
    return [];
  }

  const saved = window.localStorage.getItem(onboardingStorageKey);
  if (!saved) {
    return [];
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed)
      ? parsed.filter((id) => typeof id === "string")
      : [];
  } catch {
    window.localStorage.removeItem(onboardingStorageKey);
    return [];
  }
}

export function OnboardingFlow({ steps }: { steps: OnboardingStep[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<string[]>(getSavedCompletedSteps);

  useEffect(() => {
    window.localStorage.setItem(onboardingStorageKey, JSON.stringify(completed));
  }, [completed]);

  const currentStep = steps[currentIndex];
  const completedSet = useMemo(() => new Set(completed), [completed]);
  const completedStepCount = steps.filter((step) => completedSet.has(step.id)).length;
  const progress = Math.round((completedStepCount / steps.length) * 100);
  const isCurrentComplete = completedSet.has(currentStep.id);
  const isOnboardingComplete = completedStepCount === steps.length;

  function toggleStep(id: string) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function move(delta: number) {
    setCurrentIndex((current) =>
      Math.min(Math.max(current + delta, 0), steps.length - 1),
    );
  }

  if (isOnboardingComplete) {
    return null;
  }

  return (
    <section className="overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm">
      <div className="grid gap-6 border-b border-neutral-200 bg-neutral-950 p-5 text-white lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-300">
            New Member Onboarding
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">
            Finish the first steps before you dive into the space.
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-neutral-300">
            Track account setup, family access, Discord, resources, training, and
            instructor interest from the dashboard.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div
            aria-label={`${completedStepCount} of ${steps.length} onboarding steps complete`}
            className="grid size-24 place-items-center rounded-full"
            style={{
              background: `conic-gradient(#5eead4 ${progress * 3.6}deg, #27272a 0deg)`,
            }}
          >
            <div className="grid size-20 place-items-center rounded-full bg-neutral-950">
              <span className="text-2xl font-semibold">{completedStepCount}</span>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-teal-200">
              {completedStepCount} of {steps.length} complete
            </p>
            <p className="mt-1 text-sm text-neutral-300">{progress}% done</p>
          </div>
        </div>
      </div>

      <div className="border-b border-neutral-200 p-4">
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-6">
          {steps.map((step, index) => {
            const isActive = index === currentIndex;
            const isComplete = completedSet.has(step.id);

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`flex min-h-24 flex-col justify-between rounded-md border p-3 text-left transition ${
                  isActive
                    ? "border-teal-300 bg-teal-50"
                    : "border-neutral-200 bg-neutral-50 hover:border-neutral-300"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                      isComplete
                        ? "bg-teal-700 text-white"
                        : isActive
                          ? "bg-white text-teal-800 ring-1 ring-teal-300"
                          : "bg-white text-neutral-500 ring-1 ring-neutral-200"
                    }`}
                  >
                    {isComplete ? "✓" : index + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-teal-700">
                    {step.eyebrow}
                  </span>
                </span>
                <span className="mt-3 text-sm font-semibold leading-5 text-neutral-950">
                  {step.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">
            {currentStep.eyebrow}
          </p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
            {currentStep.title}
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600">
            {currentStep.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {currentStep.actions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noreferrer" : undefined}
                className="rounded-md bg-neutral-950 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
              >
                {action.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => toggleStep(currentStep.id)}
              className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
            >
              {isCurrentComplete ? "Mark incomplete" : "Mark complete"}
            </button>
          </div>
        </div>

        <div className="border-t border-neutral-200 pt-5 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          <h4 className="font-semibold text-neutral-950">Checklist</h4>
          <ul className="mt-3 space-y-3">
            {currentStep.checklist.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-neutral-700">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-50 text-xs font-semibold text-teal-800 ring-1 ring-teal-200">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-neutral-200 px-5 py-4">
        <button
          type="button"
          onClick={() => move(-1)}
          disabled={currentIndex === 0}
          className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        <div className="hidden items-center gap-1 sm:flex">
          {steps.map((step, index) => (
            <span
              key={step.id}
              className={`h-2 rounded-full ${
                completedSet.has(step.id)
                  ? "w-7 bg-teal-700"
                  : index === currentIndex
                    ? "w-7 bg-neutral-950"
                    : "w-2 bg-neutral-300"
              }`}
            />
          ))}
        </div>
        <p className="text-sm text-neutral-500 sm:hidden">
          {currentIndex + 1} of {steps.length}
        </p>
        <button
          type="button"
          onClick={() => move(1)}
          disabled={currentIndex === steps.length - 1}
          className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  );
}
