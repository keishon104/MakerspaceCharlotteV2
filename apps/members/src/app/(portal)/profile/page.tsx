import { ProfileEditor } from "@/components/profile-editor";
import { getPortalSession } from "@/lib/auth";

export default async function ProfilePage() {
  const session = await getPortalSession();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-teal-700">
          Profile
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
          Basic account and household information.
        </h1>
      </div>

      <ProfileEditor
        email={session.user.email}
        householdAccess={session.member.householdAccess}
        initialName={session.user.name}
        roles={session.roles}
      />
    </div>
  );
}
