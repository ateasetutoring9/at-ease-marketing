# CLAUDE.md

## First rule — and the most important one

**This repo has no database, no secrets, no runtime, and never fetches the app.**

- `output: 'export'` — every page is a static HTML file. There is no server.
- No Supabase, no Prisma, no database of any kind.
- No `.env` files with secrets. No API keys. Nothing that requires a secret.
- No `app/api/**` route handlers. No `server actions`. No `cookies()`, `headers()`, `redirect()`.
- Never call `fetch()` against the app (`https://app.ateaselearning.com`) — not at build time, not at runtime.
- If the app is offline, this site must render identically.

Break this rule and the site breaks silently in ways that are hard to diagnose on CF Pages.

## Project

At Ease Learning — static marketing site.

- **Framework:** Next.js (App Router), TypeScript, Tailwind v4
- **Build:** `npm run build` → emits `out/`
- **Deploy:** Cloudflare Pages, serving the `out/` directory
- **App URL constant:** `lib/constants.ts` → `APP_URL`

## Pages

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Landing — hero + value props + CTA |
| `/pricing/` | `app/pricing/page.tsx` | Pricing |
| `/about/` | `app/about/page.tsx` | About |
| `/contact/` | `app/contact/page.tsx` | mailto: link only — no form, no JS, no API |
| 404 | `app/not-found.tsx` | |

## Intentional duplication

`components/Button.tsx` and the brand tokens in `app/globals.css` deliberately
duplicate things that also exist in the main app repo. Do NOT extract them to a
shared npm package. The whole point of this repo is zero coupling — a shared
package would create a dependency that defeats the hard constraint above.

## Content conventions

- Copy targets Western Australian students and parents: WACE, SCSA, ATAR, Years 7–12.
- Never write "K-12" (American usage).
- Calm, Socratic tone. No gamification, no countdown timers, no fake scarcity.
- "Log in" link always goes to `APP_URL`. Never detect auth state — this is a static file.

## Do NOT add

- Any API route handler (`app/api/**`)
- Supabase client or any database library
- Any environment variable (not even `NEXT_PUBLIC_*`)
- A contact form or any form that submits data
- Sentry or any analytics that blocks render
- `cookies()`, `headers()`, `redirect()` in server components
- `'use client'` data fetching
