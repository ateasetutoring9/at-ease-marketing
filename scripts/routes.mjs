// Human-readable listing of every route this site produces, for eyeballing —
// not JSON. Also the local maintenance tool for lastModified staleness:
// warns when a route's stored date is older than its backing file's real
// last commit, i.e. the page changed but the sitemap date wasn't updated.
// Never run this at Next.js build time — Cloudflare Pages clones shallowly,
// so `git log` per file can come back empty or wrong in CI. Local only.
import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

import { routes } from "../app/sitemap.ts";
import { curriculum } from "../lib/curriculum.ts";

const ROOT = path.resolve(import.meta.dirname, "..");

function gitDate(relFile) {
  if (!existsSync(path.join(ROOT, relFile))) return null;
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%ad", "--date=short", "--", relFile], {
      cwd: ROOT,
      encoding: "utf8",
    }).trim();
    return out || null;
  } catch {
    return null;
  }
}

// path -> backing file, for the routes that live in app/sitemap.ts's own list.
function staticBackingFile(routePath) {
  if (routePath === "") return "app/page.tsx";
  if (routePath === "/guides") return "app/guides/page.tsx";
  if (routePath === "/curriculum") return "app/curriculum/page.tsx";
  if (routePath.startsWith("/guides/")) return `app/guides/${routePath.slice("/guides/".length)}/page.mdx`;
  return `app${routePath}/page.tsx`;
}

const rows = [];

for (const r of routes) {
  const source = r.path.startsWith("/guides/") ? "guide" : r.path === "/guides" ? "guide" : r.path === "/curriculum" ? "curriculum" : "static";
  rows.push({
    source,
    path: r.path === "" ? "/" : `${r.path}/`,
    published: true,
    lastModified: r.lastModified,
    file: staticBackingFile(r.path),
  });
}

for (const c of curriculum) {
  rows.push({
    source: "curriculum",
    path: `/curriculum/${c.slug}/`,
    published: c.published,
    lastModified: c.lastModified,
    file: `app/curriculum/${c.slug}/page.tsx`,
  });
}

rows.sort((a, b) => a.path.localeCompare(b.path));

const widths = {
  source: Math.max(...rows.map((r) => r.source.length), "SOURCE".length),
  path: Math.max(...rows.map((r) => r.path.length), "ROUTE".length),
  published: "PUBLISHED".length,
  lastModified: "LAST MODIFIED".length,
};

function pad(s, w) {
  return String(s).padEnd(w);
}

console.log(
  `${pad("SOURCE", widths.source)}  ${pad("ROUTE", widths.path)}  ${pad("PUBLISHED", widths.published)}  ${pad("LAST MODIFIED", widths.lastModified)}`
);
console.log("-".repeat(widths.source + widths.path + widths.published + widths.lastModified + 6));

const staleWarnings = [];

for (const r of rows) {
  console.log(
    `${pad(r.source, widths.source)}  ${pad(r.path, widths.path)}  ${pad(r.published ? "yes" : "no (stub)", widths.published)}  ${pad(r.lastModified, widths.lastModified)}`
  );

  if (r.published) {
    const real = gitDate(r.file);
    if (real && real > r.lastModified) {
      staleWarnings.push({ path: r.path, stored: r.lastModified, real, file: r.file });
    }
  }
}

console.log(`\n${rows.length} routes (${rows.filter((r) => r.published).length} published, ${rows.filter((r) => !r.published).length} stub).`);

if (staleWarnings.length > 0) {
  console.log(`\nSTALE — stored lastModified is older than the file's real last commit (${staleWarnings.length}):`);
  for (const w of staleWarnings) {
    console.log(`  ${w.path}  stored=${w.stored}  git=${w.real}  (${w.file})`);
  }
  console.log("\nUpdate lastModified in lib/curriculum.ts or app/sitemap.ts for these routes.");
} else {
  console.log("\nNo stale dates — every published route's lastModified matches or postdates its file's last commit.");
}
