import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { curriculumSitemapEntries } from "@/lib/curriculum";

export const dynamic = "force-static";

// lastModified per route is deliberately a real date pulled from git history
// for the file(s) backing that page, not "today" on every route — Google
// discounts the lastmod signal on sitemaps where every entry has the same
// (usually build-time) date, since that pattern means the date isn't
// actually tracking real content changes. Update a route's date here when
// you meaningfully change that page's content, not on every unrelated edit.
// Exported so scripts/routes.mjs can read it without duplicating the list.
export const routes: { path: string; lastModified: string }[] = [
  { path: "", lastModified: "2026-07-26" },
  { path: "/features", lastModified: "2026-07-26" },
  { path: "/pricing", lastModified: "2026-07-16" },
  { path: "/about", lastModified: "2026-07-26" },
  { path: "/contact", lastModified: "2026-07-26" },
  { path: "/guides", lastModified: "2026-07-16" },
  { path: "/guides/the-quadratic-formula", lastModified: "2026-07-29" },
  { path: "/guides/states-of-matter", lastModified: "2026-07-29" },
  { path: "/guides/pythagoras-theorem", lastModified: "2026-07-29" },
  { path: "/guides/trigonometry-finding-a-side", lastModified: "2026-07-29" },
  { path: "/guides/newtons-laws-of-motion", lastModified: "2026-07-29" },
  { path: "/guides/what-is-a-derivative", lastModified: "2026-07-29" },
  { path: "/curriculum", lastModified: "2026-08-09" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...routes, ...curriculumSitemapEntries()].map((route) => ({
    url: `${SITE_URL}${route.path}/`,
    lastModified: route.lastModified,
  }));
}
