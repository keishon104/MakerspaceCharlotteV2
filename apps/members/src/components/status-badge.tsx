import type { MembershipStatus } from "@/lib/demo-data";

const statusLabels: Record<MembershipStatus, string> = {
  active: "Active",
  pending: "Pending review",
  past_due: "Past due",
  inactive: "Inactive",
};

const statusClasses: Record<MembershipStatus, string> = {
  active: "border-teal-200 bg-teal-50 text-teal-800",
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  past_due: "border-red-200 bg-red-50 text-red-800",
  inactive: "border-neutral-200 bg-neutral-100 text-neutral-700",
};

export function StatusBadge({ status }: { status: MembershipStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusClasses[status]}`}>
      {statusLabels[status]}
    </span>
  );
}
