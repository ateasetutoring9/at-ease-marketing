# At Ease Tutoring — Marketing Site

Static marketing site for At Ease Tutoring, a free tutoring platform for
Western Australian Year 7–12 students. Built with Next.js (App Router) and
exported as static HTML — see [CLAUDE.md](./CLAUDE.md) for the hard
constraints this repo runs under (no database, no secrets, no server, no
coupling to the main app).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
```

Emits a fully static site to `out/`, deployed on Cloudflare Pages.

## Structure

| Path | What it is |
|---|---|
| `app/page.tsx` | Homepage |
| `app/features/`, `app/pricing/`, `app/about/`, `app/contact/` | Core pages |
| `app/guides/` | MDX study-guide content library — see below |
| `app/_components/` | Homepage-only sections |
| `components/` | Shared components (Header, Footer, UI primitives) |
| `lib/constants.ts` | Site-wide constants (URLs, site name/description, OG image) |
| `lib/guides.ts` | Guide index data — add new guides here |
| `app/sitemap.ts`, `app/robots.ts` | Static-exported sitemap/robots |
| `scripts/generate-og-image.mjs` | Regenerates `public/og-image.png` |

## Adding a guide

1. Create `app/guides/<slug>/page.mdx`. Copy the structure of an existing
   guide (metadata export, `Article` JSON-LD, `<GuideCTA />` +
   `<BrowseGuidesLink />` at the bottom).
2. Add an entry to `lib/guides.ts`.
3. Add the route to `app/sitemap.ts`.

Guides should be original writing fact-checked against real curriculum
content — not a republish of the app's own lecture/worksheet material. See
CLAUDE.md for the WACE-vs-general-curriculum accuracy note (WACE only
applies to Year 11–12 courses).

## Regenerating the OG image

```bash
node scripts/generate-og-image.mjs
```

Re-run after changing the logo, brand colors (`app/globals.css`), or
`SITE_NAME`/`SITE_DESCRIPTION` in `lib/constants.ts`.

## Deployment

Cloudflare Pages, git-connected — pushing to the tracked branch triggers a
build. Build settings (build command `npm run build`, output directory
`out`) live in the Cloudflare dashboard, not in this repo. The canonical
domain is `www.ateasetutoring.com`; if that specific hostname 522s while the
apex domain works, it's a DNS/custom-domain issue in the Pages dashboard,
not a build failure.

## For AI agents

Read [CLAUDE.md](./CLAUDE.md) first — it documents hard constraints
(no server, no database, no secrets) that are easy to violate silently.
