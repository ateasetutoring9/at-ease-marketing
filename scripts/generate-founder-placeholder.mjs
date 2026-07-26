// Generates public/images/founder.jpg — a temporary neutral placeholder
// silhouette, standing in until the real founder photo is supplied. Delete
// this script once the real photo lands (and delete itself, not just the
// output file).
import { writeFileSync } from "node:fs";
import path from "node:path";
import React from "react";
import { ImageResponse } from "next/og.js";

const element = React.createElement(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#F1EFE8",
      overflow: "hidden",
    },
  },
  React.createElement(
    "div",
    { style: { display: "flex", flexDirection: "column", alignItems: "center" } },
    React.createElement("div", {
      style: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#D4D1C7",
        marginBottom: -20,
      },
    }),
    React.createElement("div", {
      style: {
        width: 170,
        height: 170,
        borderRadius: 85,
        backgroundColor: "#D4D1C7",
      },
    })
  )
);

const response = new ImageResponse(element, { width: 256, height: 256 });
const buffer = Buffer.from(await response.arrayBuffer());
const outPath = path.join(process.cwd(), "public/images/founder.jpg");
writeFileSync(outPath, buffer);
console.log(`Wrote ${outPath} (${buffer.length} bytes)`);
