export const publicSiteUrl =
  process.env.NEXT_PUBLIC_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:4321"
    : "https://mcv2public.vercel.app");
