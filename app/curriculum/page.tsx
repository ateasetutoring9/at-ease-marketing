import type { Metadata } from "next";
import Link from "next/link";

import { Breadcrumb } from "@/components/Breadcrumb";
import { BrowseGuidesLink } from "@/components/BrowseGuidesLink";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbItems, breadcrumbJsonLd } from "@/lib/breadcrumb";
import { OG_IMAGE } from "@/lib/constants";
import { curriculumByStage, curriculumCardLabel, curriculumHref } from "@/lib/curriculum";

const breadcrumbTrail = [
  { name: "Home", href: "/" },
  { name: "Curriculum", href: "/curriculum/" },
];

const TITLE = "WA Curriculum: English, Maths and Science, Years 7–12";
const DESCRIPTION =
  "What Western Australian students cover in English, Maths and Science at each year level, in plain English — every topic explained, and where students most often get stuck.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/curriculum/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/curriculum/",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function CurriculumIndexPage() {
  const stages = curriculumByStage().filter((s) => s.entries.length > 0);

  return (
    <div>
      <JsonLd data={breadcrumbJsonLd(breadcrumbTrail)} />
      <Breadcrumb items={breadcrumbItems(breadcrumbTrail)} />

      <header className="mt-6">
        <h1 className="text-fg text-3xl font-semibold sm:text-4xl">
          What WA students study, year by year
        </h1>
        <p className="text-muted mt-4 text-lg leading-relaxed">
          A plain-English breakdown of the English, Maths and Science topics covered at each year
          level in Western Australia — what each topic actually means, and where students most
          often get stuck. Years 7–10 follow the Western Australian Curriculum — Maths and Science
          were revised for 2026, English for 2025; Years 11 and 12 follow WACE courses set by SCSA.
        </p>
      </header>

      {stages.map((stage) => (
        <section key={stage.stage} className="mt-12">
          <h2 className="text-fg text-2xl font-semibold">{stage.label}</h2>
          <ul className="mt-6 space-y-3">
            {stage.entries.map((entry) => (
              <li key={entry.slug}>
                <Link
                  href={curriculumHref(entry.slug)}
                  className="bg-card border-border hover:border-accent block rounded-lg border p-5 transition-colors"
                >
                  <span className="text-fg font-medium">{curriculumCardLabel(entry)}</span>
                  <span className="text-muted mt-1 block text-sm">{entry.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="mt-12">
        <BrowseGuidesLink />
      </div>
    </div>
  );
}
