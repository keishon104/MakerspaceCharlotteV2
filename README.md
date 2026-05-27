# MakerSpace Charlotte V2

Monorepo prototype for the public MakerSpace Charlotte website and member portal MVP.

## Stack

- Public website: Astro 6
- Member app: Next.js 16
- TypeScript
- Tailwind CSS 4
- Astro content collections
- Markdown/YAML-style frontmatter content
- Supabase-ready auth/data layer for the member app

## Commands

```bash
npm install
npm run dev:www
npm run dev:members
npm run check
npm run build
```

Local URLs:

- Public site: `http://127.0.0.1:4321`
- Member app: `http://localhost:4322`

## Apps

```text
apps/
  www/       # Astro public static site
  members/   # Next.js authenticated member portal MVP
docs/
supabase/
```

## How This Maps From Next.js

- `apps/www/src/pages` works like Astro file-based routing.
- `.astro` files are server-rendered/static by default.
- Components render to HTML unless you intentionally add client-side JavaScript.
- Content collections give typed access to Markdown/MDX content.
- Dynamic routes use `getStaticPaths()` instead of `generateStaticParams()`.

## Content

Starter content lives in:

- `apps/www/src/content/shops`
- `apps/www/src/content/classes`
- `apps/www/src/content/faqs`
- `apps/www/src/content/support`

These collections are defined in `apps/www/src/content.config.ts`.

## Member App

The member app runs in demo mode until Supabase environment variables are configured.

- `apps/members/.env.example` lists required env vars.
- `supabase/member-app-schema.sql` contains the first database schema sketch.
- `apps/members/README.md` covers app-specific setup notes.

## Vercel App Links

Current deployments:

- Public site: `https://mcv2public.vercel.app`
- Member app: `https://mcv2members.vercel.app`

Recommended environment variables:

- Public site Vercel project: `PUBLIC_MEMBERS_APP_URL=https://mcv2members.vercel.app`
- Member app Vercel project: `NEXT_PUBLIC_PUBLIC_SITE_URL=https://mcv2public.vercel.app`

Local defaults are already wired:

- Public site links to `http://localhost:4322`
- Member app links back to `http://127.0.0.1:4321`

## Planning Docs

- `makerspace-charlotte-ia.md` covers the public static website IA.
- `docs/member-app-ia.md` covers the authenticated member app IA.
