import type { Metadata } from "next";

import CurriculumHub from "@/components/CurriculumHub";
import { OG_IMAGE } from "@/lib/constants";
import { curriculumBySlug, curriculumHref } from "@/lib/curriculum";

const SLUG = "year-8-science";
const entry = curriculumBySlug(SLUG)!;
const href = curriculumHref(SLUG);

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
  alternates: { canonical: href },
  openGraph: {
    title: entry.title,
    description: entry.description,
    url: href,
    type: "article",
    // Child openGraph REPLACES the parent's rather than merging — this can't
    // be inherited from app/layout.tsx.
    images: [OG_IMAGE],
  },
};

export default function Page() {
  return <CurriculumHub slug={SLUG} />;
}
