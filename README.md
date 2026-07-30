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
| `components/` | Shared components (Header, Footer, UI primitives, FounderLetter*, FounderAvatar, Signature, TestimonialCarousel, ParentDashboardGallery, DashboardMock, ContactRoutes) |
| `lib/constants.ts` | Site-wide constants (URLs, site name/description, OG image) |
| `lib/guides.ts` | Guide index data — add new guides here |
| `lib/founder-letter.ts` | Single source of truth for all founder-letter prose — see below |
| `data/reviews.json`, `data/reviews.dev.json` | Real vs. dev-fixture testimonial data — see below |
| `app/sitemap.ts`, `app/robots.ts` | Static-exported sitemap/robots |
| `scripts/generate-og-image.mjs` | Regenerates `public/og-image.png` |
| `components/ThemeToggle.tsx` | Light/dark mode switch — see below |
| `components/Breadcrumb.tsx`, `components/RelatedGuides.tsx`, `lib/breadcrumb.ts` | Guide breadcrumb trail + "more guides" cross-linking — see below |

## Adding a guide

1. Create `app/guides/<slug>/page.mdx`. Copy the structure of an existing
   guide (metadata export, `Article` JSON-LD, `<Breadcrumb />` +
   `<RelatedGuides />`, then `<GuideCTA />` + `<BrowseGuidesLink />` at the
   bottom).
2. Add an entry to `lib/guides.ts` (title, description, href, subject —
   "Maths" or "Science"; drives the index, sitemap, and `RelatedGuides`).
3. Add a `{path, lastModified}` entry to `app/sitemap.ts` with a real date.

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
- `founder.photo` is `''` — there's no photo yet, and `components/FounderAvatar.tsx`
  shows a green "HM" initials monogram instead of a placeholder image. Set
  `founder.photo` to a real path under `public/` when the photo exists; no
  other code changes needed. `FounderAvatar` is the only place this branches —
  `Signature.tsx` and `FounderLetterHome.tsx` both use it rather than
  reimplementing the photo/monogram choice.

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

## Light/dark mode

`components/ThemeToggle.tsx` (in the header, desktop + mobile) flips a
`dark` class on `<html>` and persists the choice to `localStorage`. All
theming is driven by CSS variables in `app/globals.css` — a light `@theme`
block plus one `.dark { ... }` override block redefining the same
variables — so components never branch on theme directly; they just use the
existing `bg-*`/`text-*`/`border-*` color utilities. See CLAUDE.md for the
hydration-flash script in `app/layout.tsx` and the cascade-ordering note on
why the `.dark` block is unlayered.

## Static images

`next.config.ts` sets `images: { unoptimized: true }` (required under
`output: 'export'`), so nothing resizes or recompresses images at build
time — a committed PNG ships exactly as committed. Before adding or
replacing a static image, check its actual max rendered size in the JSX and
size the file to match (2–3x for retina is plenty). `sharp` is present in
`node_modules` as a transitive Next.js dependency and works fine for a
one-off resize/recompress script even though it's unused at runtime.

## Regenerating the OG image

```bash
node scripts/generate-og-image.mjs           # public/og-image.png
```

Uses `next/og`'s `ImageResponse` run standalone via Node (import as
`next/og.js`, not `next/og`, outside the Next build) — the same technique
works for any future static placeholder/social image. Re-run after changing
the logo, brand colors, or `SITE_NAME`/`SITE_DESCRIPTION`.

(There used to be an equivalent script generating a placeholder founder
photo — deleted in favor of the "HM" initials monogram in
`components/FounderAvatar.tsx`, which needs no generated asset at all.)

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
