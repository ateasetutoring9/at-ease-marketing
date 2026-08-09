import Link from "next/link";

import { Breadcrumb } from "@/components/Breadcrumb";
import { BrowseGuidesLink } from "@/components/BrowseGuidesLink";
import { GuideCTA } from "@/components/GuideCTA";
import { JsonLd } from "@/components/JsonLd";
import { curriculumBreadcrumbJsonLd } from "@/lib/breadcrumb";
import {
  curriculumBySlug,
  curriculumCardLabel,
  curriculumCourseJsonLd,
  curriculumHref,
  curriculumSyllabusUrl,
  relatedCurriculum,
} from "@/lib/curriculum";
import { guides } from "@/lib/guides";

/**
 * Renders one year-level hub. Every app/curriculum/<year-subject>/page.tsx is
 * a thin file that exports metadata and returns <CurriculumHub slug="..." />,
 * matching the repo's existing one-file-per-route convention rather than
 * introducing a dynamic [slug] segment alongside the static MDX guide dirs.
 */
export default function CurriculumHub({ slug }: { slug: string }) {
  const entry = curriculumBySlug(slug);
  if (!entry) return null;

  const href = curriculumHref(entry.slug);
  const related = relatedCurriculum(entry);
  const label = curriculumCardLabel(entry);

  return (
    <article>
      <JsonLd data={curriculumBreadcrumbJsonLd(label, href)} />
      <JsonLd data={curriculumCourseJsonLd(entry, href)} />

      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Curriculum", href: "/curriculum/" },
          { label },
        ]}
      />

      <header className="mt-6">
        <p className="text-eyebrow">
          {entry.unitLabel ? `${entry.yearLabel} · ${entry.unitLabel}` : `${entry.yearLabel} · ${entry.subject}`}
        </p>
        <h1 className="text-fg mt-2 text-3xl font-semibold sm:text-4xl">
          {entry.heading}
        </h1>
        <p className="text-muted mt-4 text-lg leading-relaxed">{entry.intro}</p>
      </header>

      <nav aria-label="On this page" className="border-border mt-10 border-t pt-6">
        <h2 className="text-fg text-sm font-semibold">On this page</h2>
        <ul className="mt-3 space-y-1">
          {entry.strands.map((s) => (
            <li key={s.name}>
              <Link href={`#${slugify(s.name)}`} className="text-accent text-sm hover:underline">
                {s.name}
              </Link>
            </li>
          ))}
          <li>
            <Link href="#assessment" className="text-accent text-sm hover:underline">
              How it is assessed
            </Link>
          </li>
        </ul>
      </nav>

      {entry.strands.map((strand) => (
        <section key={strand.name} id={slugify(strand.name)} className="mt-12">
          <h2 className="text-fg text-2xl font-semibold">{strand.name}</h2>
          <p className="text-muted mt-2">{strand.blurb}</p>

          <div className="mt-6 space-y-6">
            {strand.topics.map((topic) => {
              const guide = topic.guide
                ? guides.find((g) => g.href === `/guides/${topic.guide}/`)
                : undefined;

              return (
                <div key={topic.name} className="bg-card border-border rounded-lg border p-5">
                  <h3 className="text-fg text-lg font-medium">{topic.name}</h3>
                  <p className="text-muted mt-2">{topic.plain}</p>

                  {topic.sticking && (
                    <p className="text-muted mt-3 text-sm">
                      <span className="text-fg font-medium">Where students get stuck: </span>
                      {topic.sticking}
                    </p>
                  )}

                  {guide && (
                    <p className="mt-3 text-sm">
                      <Link href={guide.href} className="text-accent hover:underline">
                        Full guide: {guide.title}
                      </Link>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <section id="assessment" className="mt-12">
        <h2 className="text-fg text-2xl font-semibold">How it is assessed</h2>
        <ul className="text-muted mt-4 space-y-2">
          {entry.assessment.map((a) => (
            <li key={a} className="flex gap-2">
              <span aria-hidden="true">·</span>
              <span>{a}</span>
            </li>
          ))}
        </ul>
      </section>

      {entry.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-fg text-2xl font-semibold">Common questions</h2>
          <dl className="mt-4 space-y-5">
            {entry.faqs.map((f) => (
              <div key={f.q}>
                <dt className="text-fg font-medium">{f.q}</dt>
                <dd className="text-muted mt-1">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-fg text-xl font-semibold">Related year levels</h2>
          <ul className="mt-4 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={curriculumHref(r.slug)} className="text-accent hover:underline">
                  {curriculumCardLabel(r)}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-12">
        <GuideCTA />
      </div>

      <div className="mt-8">
        <BrowseGuidesLink />
      </div>

      <p className="text-muted mt-10 text-sm">
        Written from the current {entry.stage === "upper" ? "WACE course syllabus" : "Western Australian Curriculum"}
        . Requirements change — check{" "}
        <a href={curriculumSyllabusUrl(entry)} className="text-accent hover:underline" rel="noopener">
          SCSA
        </a>{" "}
        for the official syllabus.
      </p>
    </article>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
