// Diffs out/sitemap.xml against the actual built out/**/index.html files —
// checks the deployed artifact, not the code that's supposed to produce it.
// Run after `npm run build`. Exits non-zero on any mismatch so this can gate
// a build later.
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { SITE_URL } from "../lib/constants.ts";

const OUT_DIR = path.resolve(import.meta.dirname, "../out");

// Next.js emits these alongside real content; neither belongs in a sitemap.
const EXCLUDED_TOP_LEVEL = new Set(["404", "_not-found"]);

function sitemapPaths() {
  const xml = readFileSync(path.join(OUT_DIR, "sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  return new Set(
    locs.map((url) => {
      if (!url.startsWith(SITE_URL)) {
        throw new Error(`sitemap URL doesn't start with SITE_URL (${SITE_URL}): ${url}`);
      }
      return url.slice(SITE_URL.length) || "/";
    })
  );
}

function builtPaths() {
  const found = new Set();

  function walk(dir, segments) {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (segments.length === 0 && EXCLUDED_TOP_LEVEL.has(entry.name)) continue;
        if (entry.name.startsWith("_")) continue; // _next, etc.
        walk(path.join(dir, entry.name), [...segments, entry.name]);
      } else if (entry.name === "index.html") {
        found.add(segments.length === 0 ? "/" : `/${segments.join("/")}/`);
      }
    }
  }

  walk(OUT_DIR, []);
  return found;
}

const sitemap = sitemapPaths();
const built = builtPaths();

const missingFiles = [...sitemap].filter((p) => !built.has(p)).sort();
const orphanPages = [...built].filter((p) => !sitemap.has(p)).sort();

console.log(`Sitemap: ${sitemap.size} URLs. Built pages: ${built.size}.\n`);

let ok = true;

if (missingFiles.length > 0) {
  ok = false;
  console.log(`In sitemap.xml but no matching built page (${missingFiles.length}):`);
  for (const p of missingFiles) console.log(`  ${p}`);
  console.log("");
}

if (orphanPages.length > 0) {
  ok = false;
  console.log(`Built but not in sitemap.xml (${orphanPages.length}):`);
  for (const p of orphanPages) console.log(`  ${p}`);
  console.log("");
}

if (ok) {
  console.log("OK — sitemap and built output match exactly.");
} else {
  console.log("FAILED — see above.");
  process.exit(1);
}
