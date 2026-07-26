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
| `app/features/`, `app/pricing/`, `app/about/`, `app/contact/` | Core pages — `/about` is the founder letter, not a mission statement |
| `app/guides/` | MDX study-guide content library — see below |
| `app/_components/` | Homepage-only sections |
| `components/` | Shared components (Header, Footer, UI primitives, FounderLetter*, TestimonialCarousel, ParentDashboardGallery, DashboardMock, ContactRoutes) |
| `lib/constants.ts` | Site-wide constants (URLs, site name/description, OG image) |
| `lib/guides.ts` | Guide index data — add new guides here |
| `lib/founder-letter.ts` | Single source of truth for all founder-letter prose — see below |
| `data/reviews.json`, `data/reviews.dev.json` | Real vs. dev-fixture testimonial data — see below |
| `app/sitemap.ts`, `app/robots.ts` | Static-exported sitemap/robots |
| `scripts/generate-og-image.mjs` | Regenerates `public/og-image.png` |
| `scripts/generate-founder-placeholder.mjs` | Regenerates the temporary `public/images/founder.jpg` |

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

## Founder letter (`/about/`)

All prose for both the homepage block (`components/FounderLetterHome.tsx`)
and the full `/about` page (`components/FounderLetter.tsx`) lives in
`lib/founder-letter.ts`. Never inline letter text into a component — add a
new export to the lib file instead.

- `progress` and `whatThisIs.unfinished` are the checkable claims about what's
  actually written on the platform. Update these (and only these) whenever a
  course is finished.
- `founder.name` vs `founder.signOff` are intentionally different names doing
  different jobs (credential vs. sign-off voice) — not a bug.
- `/why` was merged into `/about` and no longer exists as a route.

## Testimonials data (`data/`)

`components/TestimonialCarousel.tsx` reads `data/reviews.json` (real reviews)
in production and `data/reviews.dev.json` (fixtures) in every other
environment, switched by `process.env.NODE_ENV`. `reviews.json` starts as
`[]` — the carousel renders nothing until real reviews are added there.
Because this is a static export, adding real reviews requires committing the
updated `reviews.json` to this repo and triggering a new build; there's no
live/runtime update path.

After editing this component, confirm fixtures can't leak into a real build:

```bash
npm run build
grep -ri "Wheatbelt\|Mandurah\|FIXTURE" out/   # must print nothing
```

## Contact routing (`/contact/`)

`components/ContactRoutes.tsx` renders several `mailto:` links (not a form),
each with a different pre-filled subject so enquiries arrive pre-sorted.
`CONTACT_EMAIL` in `lib/constants.ts` is the single source of truth for the
address — import it rather than hardcoding the email anywhere. The trust
strip's ABN/WWCC lines are intentionally commented out until real values
exist; don't invent placeholder numbers.

## Regenerating placeholder images

```bash
node scripts/generate-og-image.mjs           # public/og-image.png
node scripts/generate-founder-placeholder.mjs # public/images/founder.jpg
```

Both use `next/og`'s `ImageResponse` run standalone via Node (import as
`next/og.js`, not `next/og`, outside the Next build) — the same technique
works for any future static placeholder/social image. Re-run the OG image
script after changing the logo, brand colors, or `SITE_NAME`/
`SITE_DESCRIPTION`. Re-run (or just delete) the founder placeholder script
once a real photo replaces `public/images/founder.jpg`.

## Deployment

Cloudflare Pages, git-connected — pushing to the tracked branch triggers a
build. Build settings (build command `npm run build`, output directory
`out`) live in the Cloudflare dashboard, not in this repo. The canonical
domain is currently the apex, `ateasetutoring.com` (see `SITE_URL` in
`lib/constants.ts`) — this was changed from `www.ateasetutoring.com` after
`www` was found to 522 on Cloudflare. If either hostname 522s while the other
works, that's a DNS/custom-domain issue in the Pages dashboard, not a build
failure.

## For AI agents

Read [CLAUDE.md](./CLAUDE.md) first — it documents hard constraints
(no server, no database, no secrets) that are easy to violate silently.
