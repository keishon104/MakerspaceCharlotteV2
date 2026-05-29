import { redirect } from "next/navigation";
import { createSupabaseServerClient, hasSupabaseConfig } from "@/lib/supabase/server";
import { demoSession, type PortalSession } from "@/lib/demo-data";

export async function getPortalSession(): Promise<PortalSession> {
  if (!hasSupabaseConfig()) {
    return demoSession;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    redirect("/login");
  }

  return {
    mode: "supabase",
    user: {
      email: user.email,
      name: user.user_metadata?.name ?? user.email,
    },
    member: {
      status: "pending",
      type: "Pending account match",
      renewalDate: "Pending account match",
      renewalLabel: "Admins need to match this login to a membership record.",
      householdAccess:
        "Immediate family access appears after membership status is confirmed.",
    },
    roles: ["member"],
  };
}
