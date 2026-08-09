// Lets standalone scripts (run via `node --import`) import "@/..." the same
// way the Next.js app does, so scripts/check-routes.mjs and scripts/routes.mjs
// can read lib/curriculum.ts and lib/guides.ts directly instead of
// hand-duplicating their data (which is how scripts/generate-og-image.mjs
// has to work around lib/constants.ts, and is fine for a handful of strings
// but not for a 3000-line data file).
import { register } from "node:module";

register("./alias-loader.mjs", import.meta.url);
