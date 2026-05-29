"use client";

import { useEffect, useState } from "react";

type RequestType = "pause" | "cancel" | null;

const storageKey = "makerspace-membership-change-request";
const pauseDurationStorageKey = "makerspace-membership-pause-duration";
const pauseDurations = ["1 month", "2 months", "3 months", "Custom"] as const;

type PauseDuration = (typeof pauseDurations)[number];

function getSavedRequest(): RequestType {
  if (typeof window === "undefined") {
    return null;
  }

  const saved = window.localStorage.getItem(storageKey);
  return saved === "pause" || saved === "cancel" ? saved : null;
}

function getSavedPauseDuration(): PauseDuration {
  if (typeof window === "undefined") {
    return "1 month";
  }

  const saved = window.localStorage.getItem(pauseDurationStorageKey);
  return pauseDurations.includes(saved as PauseDuration)
    ? (saved as PauseDuration)
    : "1 month";
}

export function MembershipActionsCard() {
  const [requestType, setRequestType] = useState<RequestType>(getSavedRequest);
  const [pauseDuration, setPauseDuration] =
    useState<PauseDuration>(getSavedPauseDuration);

  useEffect(() => {
    if (requestType) {
      window.localStorage.setItem(storageKey, requestType);
      return;
    }

    window.localStorage.removeItem(storageKey);
  }, [requestType]);

  useEffect(() => {
    window.localStorage.setItem(pauseDurationStorageKey, pauseDuration);
  }, [pauseDuration]);

  const statusLabel =
    requestType === "pause"
      ? `Pause request saved for ${pauseDuration.toLowerCase()}`
      : requestType === "cancel"
        ? "Cancellation request saved"
        : "No pending request";

  function requestPause() {
    setRequestType("pause");
  }

  function requestCancellation() {
    setRequestType("cancel");
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <div>
        <p className="text-sm leading-6 text-neutral-600">
          Members should be able to pause or cancel without hunting through
          Discord or email. For this MVP, these actions save a request that can
          later route to Supabase, Stripe, Airtable, or an admin review queue.
        </p>
        <div className="mt-4 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
          <div className="border-l-2 border-teal-600 pl-3">
            <p className="font-semibold text-neutral-950">Pause membership</p>
            <p className="mt-1 text-neutral-600">
              For temporary holds before the next renewal.
            </p>
          </div>
          <div className="border-l-2 border-teal-600 pl-3">
            <p className="font-semibold text-neutral-950">Cancel membership</p>
            <p className="mt-1 text-neutral-600">
              For ending membership after admin confirmation.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-teal-700">
          Request status
        </p>
        <p className="mt-2 text-lg font-semibold text-neutral-950">{statusLabel}</p>
        <div className="mt-4 grid gap-2">
          {requestType === "pause" ? (
            <label
              htmlFor="pause-duration"
              className="text-sm font-semibold text-neutral-950"
            >
              Pause duration
              <select
                id="pause-duration"
                value={pauseDuration}
                onChange={(event) =>
                  setPauseDuration(event.target.value as PauseDuration)
                }
                className="mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-950"
              >
                {pauseDurations.map((duration) => (
                  <option key={duration}>{duration}</option>
                ))}
              </select>
            </label>
          ) : null}
          <button
            type="button"
            onClick={requestPause}
            className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Request pause
          </button>
          <button
            type="button"
            onClick={requestCancellation}
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
          >
            Request cancellation
          </button>
          {requestType ? (
            <button
              type="button"
              onClick={() => setRequestType(null)}
              className="text-sm font-semibold text-neutral-500 hover:text-neutral-900"
            >
              Clear request
            </button>
          ) : null}
        </div>
        <p className="mt-3 text-xs leading-5 text-neutral-500">
          This does not change billing yet. It marks the intent for admin
          follow-up.
        </p>
      </div>
    </div>
  );
}
