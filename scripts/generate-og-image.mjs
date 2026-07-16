// Generates public/og-image.png. Re-run after changing brand colors,
// the logo, or the site name/description in lib/constants.ts.
import { writeFileSync, readFileSync } from "node:fs";
import path from "node:path";
import React from "react";
import { ImageResponse } from "next/og.js";

// Kept in sync with lib/constants.ts by hand (this script runs outside
// the Next.js/TypeScript build, so it can't import that file directly).
const SITE_NAME = "At Ease Tutoring";
const SITE_DESCRIPTION =
  "Free, curriculum-aligned learning for Western Australian students in Years 7–12. WACE and SCSA aligned.";

const logoData = readFileSync(path.join(process.cwd(), "public/logo.png"));
const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

const element = React.createElement(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#2D5F4C",
    },
  },
  React.createElement("img", {
    src: logoSrc,
    width: 140,
    height: 140,
    style: { borderRadius: "9999px", marginBottom: 40 },
  }),
  React.createElement(
    "div",
    { style: { fontSize: 68, fontWeight: 600, color: "#FAFAF7", marginBottom: 20 } },
    SITE_NAME
  ),
  React.createElement(
    "div",
    { style: { fontSize: 32, color: "#E8EFEB", maxWidth: 820, textAlign: "center" } },
    SITE_DESCRIPTION
  )
);

const response = new ImageResponse(element, { width: 1200, height: 630 });
const buffer = Buffer.from(await response.arrayBuffer());
const outPath = path.join(process.cwd(), "public/og-image.png");
writeFileSync(outPath, buffer);
console.log(`Wrote ${outPath} (${buffer.length} bytes)`);
