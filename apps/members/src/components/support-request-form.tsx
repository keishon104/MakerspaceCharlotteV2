"use client";

import type { FormEvent } from "react";
import { useEffect, useState } from "react";

type SupportRequest = {
  topic: string;
  summary: string;
  details: string;
  priority: string;
  followUp: string;
};

const storageKey = "makerspace-support-request";

const defaultRequest: SupportRequest = {
  topic: "Account or membership",
  summary: "",
  details: "",
  priority: "Normal",
  followUp: "Email",
};

const inputClass =
  "mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-950 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-100";

function getSavedRequest() {
  if (typeof window === "undefined") {
    return defaultRequest;
  }

  const saved = window.localStorage.getItem(storageKey);
  if (!saved) {
    return defaultRequest;
  }

  try {
    return { ...defaultRequest, ...JSON.parse(saved) };
  } catch {
    window.localStorage.removeItem(storageKey);
    return defaultRequest;
  }
}

export function SupportRequestForm() {
  const [request, setRequest] = useState<SupportRequest>(getSavedRequest);
  const [status, setStatus] = useState("No request submitted");

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(request));
  }, [request]);

  function updateField<K extends keyof SupportRequest>(
    field: K,
    value: SupportRequest[K],
  ) {
    setRequest((current) => ({ ...current, [field]: value }));
    setStatus("Draft saved in this browser");
  }

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Support request saved for admin review");
  }

  function clearRequest() {
    window.localStorage.removeItem(storageKey);
    setRequest(defaultRequest);
    setStatus("Support request cleared");
  }

  return (
    <form id="support-request" className="space-y-4" onSubmit={submitRequest}>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="text-sm font-semibold text-neutral-950">
          Topic
          <select
            className={inputClass}
            value={request.topic}
            onChange={(event) => updateField("topic", event.target.value)}
          >
            <option>Account or membership</option>
            <option>Billing or renewal</option>
            <option>Training or shop access</option>
            <option>Resource or policy question</option>
            <option>Website or app issue</option>
            <option>Other</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-neutral-950">
          Priority
          <select
            className={inputClass}
            value={request.priority}
            onChange={(event) => updateField("priority", event.target.value)}
          >
            <option>Normal</option>
            <option>Time sensitive</option>
            <option>Blocking access</option>
          </select>
        </label>
        <label className="text-sm font-semibold text-neutral-950">
          Follow-up
          <select
            className={inputClass}
            value={request.followUp}
            onChange={(event) => updateField("followUp", event.target.value)}
          >
            <option>Email</option>
            <option>Phone</option>
            <option>Discord</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-semibold text-neutral-950">
        Short summary
        <input
          className={inputClass}
          value={request.summary}
          onChange={(event) => updateField("summary", event.target.value)}
          placeholder="Example: My membership status looks incorrect"
        />
      </label>

      <label className="block text-sm font-semibold text-neutral-950">
        Details
        <textarea
          className={`${inputClass} min-h-32`}
          value={request.details}
          onChange={(event) => updateField("details", event.target.value)}
          placeholder="Share what happened, what you expected, and any relevant dates or classes."
        />
      </label>

      <div className="flex flex-col gap-3 border-t border-neutral-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-neutral-700">{status}</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={clearRequest}
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
          >
            Clear
          </button>
          <button
            type="submit"
            className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Submit request
          </button>
        </div>
      </div>

      <p className="text-xs leading-5 text-neutral-500">
        MVP note: this saves a request locally for the prototype. When Supabase is
        connected, this should write to the support_requests table.
      </p>
    </form>
  );
}
