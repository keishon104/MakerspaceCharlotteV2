"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { SectionCard } from "@/components/section-card";
import { onboardingStorageKey } from "@/lib/onboarding-storage";

type ProfileDraft = {
  fullName: string;
  preferredName: string;
  phone: string;
  discordUsername: string;
  contactPreference: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  householdMembers: string;
  businessName: string;
  projectInterests: string;
  shopInterests: string[];
};

const storageKey = "makerspace-member-profile";

const shopOptions = [
  "Woodworking",
  "Digital Fabrication",
  "Pottery & Ceramics",
  "Metal, Welding & Blacksmithing",
  "Textiles & Cosplay",
  "Bike Shop",
  "Photography Studio",
  "Classes & Teaching",
];

const inputClass =
  "mt-1 w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-950 shadow-sm focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-100";

const labelClass = "text-sm font-semibold text-neutral-950";

function getSavedProfile(defaultProfile: ProfileDraft): ProfileDraft {
  if (typeof window === "undefined") {
    return defaultProfile;
  }

  const saved = window.localStorage.getItem(storageKey);
  if (!saved) {
    return defaultProfile;
  }

  try {
    const parsed = JSON.parse(saved);
    return {
      ...defaultProfile,
      ...parsed,
      shopInterests: Array.isArray(parsed.shopInterests)
        ? parsed.shopInterests.filter((item: unknown) => typeof item === "string")
        : defaultProfile.shopInterests,
    };
  } catch {
    window.localStorage.removeItem(storageKey);
    return defaultProfile;
  }
}

export function ProfileEditor({
  email,
  householdAccess,
  initialName,
  roles,
}: {
  email: string;
  householdAccess: string;
  initialName: string;
  roles: string[];
}) {
  const defaultProfile = useMemo<ProfileDraft>(
    () => ({
      fullName: initialName,
      preferredName: "",
      phone: "",
      discordUsername: "",
      contactPreference: "Email",
      emergencyContactName: "",
      emergencyContactPhone: "",
      householdMembers: "",
      businessName: "",
      projectInterests: "",
      shopInterests: ["Woodworking", "Digital Fabrication"],
    }),
    [initialName],
  );

  const [savedProfile, setSavedProfile] = useState<ProfileDraft>(() =>
    getSavedProfile(defaultProfile),
  );
  const [draft, setDraft] = useState<ProfileDraft>(() =>
    getSavedProfile(defaultProfile),
  );
  const [status, setStatus] = useState("No unsaved changes");
  const [onboardingResetStatus, setOnboardingResetStatus] = useState(
    "Onboarding stays hidden after all steps are completed.",
  );

  function updateField<K extends keyof ProfileDraft>(
    field: K,
    value: ProfileDraft[K],
  ) {
    setDraft((current) => ({ ...current, [field]: value }));
    setStatus("Unsaved changes");
  }

  function toggleShopInterest(shop: string) {
    setDraft((current) => {
      const shopInterests = current.shopInterests.includes(shop)
        ? current.shopInterests.filter((item) => item !== shop)
        : [...current.shopInterests, shop];

      return { ...current, shopInterests };
    });
    setStatus("Unsaved changes");
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavedProfile(draft);
    window.localStorage.setItem(storageKey, JSON.stringify(draft));
    setStatus("Profile saved");
  }

  function resetProfile() {
    setDraft(savedProfile);
    setStatus("No unsaved changes");
  }

  function clearProfile() {
    window.localStorage.removeItem(storageKey);
    setSavedProfile(defaultProfile);
    setDraft(defaultProfile);
    setStatus("Demo profile restored");
  }

  function resetOnboarding() {
    window.localStorage.removeItem(onboardingStorageKey);
    setOnboardingResetStatus(
      "Onboarding reset. It will reappear on the Dashboard.",
    );
  }

  return (
    <form className="space-y-6" onSubmit={saveProfile}>
      <SectionCard title="Account Details" eyebrow="Editable profile">
        <div className="grid gap-4 md:grid-cols-2">
          <label className={labelClass}>
            Full name
            <input
              className={inputClass}
              value={draft.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
            />
          </label>
          <label className={labelClass}>
            Preferred name
            <input
              className={inputClass}
              value={draft.preferredName}
              onChange={(event) =>
                updateField("preferredName", event.target.value)
              }
              placeholder="Optional"
            />
          </label>
          <label className={labelClass}>
            Account email
            <input className={inputClass} value={email} readOnly />
          </label>
          <label className={labelClass}>
            Phone
            <input
              className={inputClass}
              value={draft.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              placeholder="Optional"
            />
          </label>
          <label className={labelClass}>
            Discord username
            <input
              className={inputClass}
              value={draft.discordUsername}
              onChange={(event) =>
                updateField("discordUsername", event.target.value)
              }
              placeholder="Optional"
            />
          </label>
          <label className={labelClass}>
            Preferred contact
            <select
              className={inputClass}
              value={draft.contactPreference}
              onChange={(event) =>
                updateField("contactPreference", event.target.value)
              }
            >
              <option>Email</option>
              <option>Phone or SMS</option>
              <option>Discord</option>
            </select>
          </label>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 border-t border-neutral-200 pt-4">
          {roles.map((role) => (
            <span
              key={role}
              className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold text-neutral-700"
            >
              {role}
            </span>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Household & Safety" eyebrow="Access support">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.85fr]">
          <label className={labelClass}>
            Household members
            <textarea
              className={`${inputClass} min-h-32`}
              value={draft.householdMembers}
              onChange={(event) =>
                updateField("householdMembers", event.target.value)
              }
              placeholder="One name per line, if household access needs to be tracked"
            />
          </label>
          <div className="space-y-4">
            <label className={labelClass}>
              Emergency contact name
              <input
                className={inputClass}
                value={draft.emergencyContactName}
                onChange={(event) =>
                  updateField("emergencyContactName", event.target.value)
                }
                placeholder="Optional"
              />
            </label>
            <label className={labelClass}>
              Emergency contact phone
              <input
                className={inputClass}
                value={draft.emergencyContactPhone}
                onChange={(event) =>
                  updateField("emergencyContactPhone", event.target.value)
                }
                placeholder="Optional"
              />
            </label>
          </div>
        </div>
        <p className="mt-4 border-t border-neutral-200 pt-4 text-sm leading-6 text-neutral-600">
          {householdAccess}
        </p>
      </SectionCard>

      <SectionCard title="Interests & Member Business" eyebrow="Personalization">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className={labelClass}>Shop interests</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {shopOptions.map((shop) => {
                const isChecked = draft.shopInterests.includes(shop);

                return (
                  <label
                    key={shop}
                    className="flex items-center gap-2 text-sm font-semibold text-neutral-800"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleShopInterest(shop)}
                      className="size-4 rounded border-neutral-300 text-teal-700"
                    />
                    {shop}
                  </label>
                );
              })}
            </div>
          </div>
          <div className="space-y-4">
            <label className={labelClass}>
              Business or project name
              <input
                className={inputClass}
                value={draft.businessName}
                onChange={(event) =>
                  updateField("businessName", event.target.value)
                }
                placeholder="Optional"
              />
            </label>
            <label className={labelClass}>
              Project interests or skills to share
              <textarea
                className={`${inputClass} min-h-28`}
                value={draft.projectInterests}
                onChange={(event) =>
                  updateField("projectInterests", event.target.value)
                }
                placeholder="Examples: CNC, ceramics, repairs, classes I might teach"
              />
            </label>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Onboarding Settings" eyebrow="Dashboard">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm leading-6 text-neutral-600">
              Once every onboarding step is marked complete, the dashboard
              onboarding panel is dismissed. Reset it here if you want to review
              the steps again.
            </p>
            <p className="mt-2 text-sm font-semibold text-neutral-700">
              {onboardingResetStatus}
            </p>
          </div>
          <button
            type="button"
            onClick={resetOnboarding}
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
          >
            Reset onboarding
          </button>
        </div>
      </SectionCard>

      <div className="flex flex-col gap-3 rounded-lg border border-neutral-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-neutral-700">{status}</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={clearProfile}
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
          >
            Restore demo
          </button>
          <button
            type="button"
            onClick={resetProfile}
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-50"
          >
            Discard changes
          </button>
          <button
            type="submit"
            className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
          >
            Save profile
          </button>
        </div>
      </div>
    </form>
  );
}
