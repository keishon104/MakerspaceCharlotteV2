import { AppShell } from "@/components/app-shell";
import { getPortalSession } from "@/lib/auth";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getPortalSession();

  return <AppShell session={session}>{children}</AppShell>;
}
