# MakerSpace Charlotte

Astro prototype for the public MakerSpace Charlotte website.

## Stack

- Astro 6
- TypeScript
- Tailwind CSS 4
- Astro content collections
- Markdown/YAML-style frontmatter content

## Commands

```bash
npm install
npm run dev
npm run check
npm run build
```

## How This Maps From Next.js

- `src/pages` works like file-based routing.
- `.astro` files are server-rendered/static by default.
- Components render to HTML unless you intentionally add client-side JavaScript.
- Content collections give typed access to Markdown/MDX content.
- Dynamic routes use `getStaticPaths()` instead of `generateStaticParams()`.

## Content

Starter content lives in:

- `src/content/shops`
- `src/content/classes`
- `src/content/faqs`
- `src/content/support`

These collections are defined in `src/content.config.ts`.
