"use client";

import { useEffect, useState } from "react";

const storageKey = "makerspace-room-waitlist-interest";

function getSavedInterest() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.localStorage.getItem(storageKey) === "true";
}

export function RoomWaitlistCard() {
  const [joined, setJoined] = useState(getSavedInterest);

  useEffect(() => {
    window.localStorage.setItem(storageKey, String(joined));
  }, [joined]);

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end">
      <div>
        <p className="text-sm leading-6 text-neutral-600">
          MakerSpace Charlotte is planning rental rooms for members who want to
          operate a small business out of the space. Join the waitlist to flag
          interest while pricing, availability, and room policies are finalized.
        </p>
        <div className="mt-4 grid gap-3 text-sm text-neutral-700 sm:grid-cols-3">
          <div className="border-l-2 border-teal-600 pl-3">
            <p className="font-semibold text-neutral-950">Private room access</p>
            <p className="mt-1 text-neutral-600">For member businesses.</p>
          </div>
          <div className="border-l-2 border-teal-600 pl-3">
            <p className="font-semibold text-neutral-950">Early interest list</p>
            <p className="mt-1 text-neutral-600">Helps admins size demand.</p>
          </div>
          <div className="border-l-2 border-teal-600 pl-3">
            <p className="font-semibold text-neutral-950">Manual follow-up</p>
            <p className="mt-1 text-neutral-600">Admins can review before launch.</p>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-teal-700">
          Waitlist status
        </p>
        <p className="mt-2 text-lg font-semibold text-neutral-950">
          {joined ? "Interest saved" : "Not joined yet"}
        </p>
        <button
          type="button"
          onClick={() => setJoined((current) => !current)}
          className={`mt-4 w-full rounded-md px-4 py-2 text-sm font-semibold ${
            joined
              ? "border border-neutral-300 text-neutral-800 hover:bg-white"
              : "bg-teal-700 text-white hover:bg-teal-800"
          }`}
        >
          {joined ? "Remove interest" : "Join waitlist"}
        </button>
        <p className="mt-3 text-xs leading-5 text-neutral-500">
          Prototype status is saved in this browser until a member database
          field is connected.
        </p>
      </div>
    </div>
  );
}
