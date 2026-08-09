// Resolve hook registered by register-alias.mjs. Maps "@/foo" the same way
// tsconfig.json's paths do ("@/*": ["./*"]) so scripts can import repo
// modules without duplicating tsconfig resolution logic.
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = pathToFileURL(path.resolve(import.meta.dirname, "../..") + "/");

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/")) {
    const targetPath = fileURLToPath(new URL(specifier.slice(2), ROOT));
    // Node's resolver, unlike tsc/bundlers, doesn't append extensions for
    // bare specifiers — try .ts/.tsx the same way tsconfig paths implicitly do.
    const resolved = ["", ".ts", ".tsx"]
      .map((ext) => targetPath + ext)
      .find((p) => existsSync(p));
    return nextResolve(pathToFileURL(resolved ?? targetPath).href, context);
  }
  return nextResolve(specifier, context);
}
