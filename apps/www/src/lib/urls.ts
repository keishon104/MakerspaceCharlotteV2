const defaultMembersAppUrl = import.meta.env.DEV
  ? "http://localhost:4322"
  : "https://mcv2members.vercel.app";

export const membersAppUrl = (
  import.meta.env.PUBLIC_MEMBERS_APP_URL ?? defaultMembersAppUrl
).replace(/\/+$/, "");

export const memberLoginUrl = `${membersAppUrl}/dashboard`;
