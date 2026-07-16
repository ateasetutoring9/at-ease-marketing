import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME, OG_IMAGE } from "@/lib/constants";
import { guides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description: `Free, curriculum-aligned study guides from ${SITE_NAME} — clear explanations of WA Year 7–12 topics.`,
  alternates: {
    canonical: "/guides/",
  },
  openGraph: {
    title: `Guides — ${SITE_NAME}`,
    description: `Free, curriculum-aligned study guides from ${SITE_NAME} — clear explanations of WA Year 7–12 topics.`,
    images: [OG_IMAGE],
  },
};

export default function GuidesPage() {
  return (
    <>
      <h1 className="text-hero text-fg mb-6">Guides</h1>
      <p className="text-body text-muted mb-10">
        Free, in-depth explanations of WA curriculum topics — read one on its own, or sign up to get the full interactive lecture and worksheet.
      </p>
      <div className="divide-y divide-border">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.href}
            className="block py-6 group"
          >
            <h2 className="text-subsection-title text-fg group-hover:text-accent transition-colors">
              {guide.title}
            </h2>
            <p className="mt-2 text-body text-muted">{guide.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
