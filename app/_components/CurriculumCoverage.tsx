import Link from "next/link";

const yearLevels = [
  "Year 7",
  "Year 8",
  "Year 9",
  "Year 10",
  "Year 11 (WACE)",
  "Year 12 (WACE)",
];

export function CurriculumCoverage() {
  return (
    <section className="py-16 md:py-24 px-4 bg-card border-y border-border">
      <div className="max-w-page mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-section-title text-fg mb-4">Built for the WA curriculum, not adapted to it</h2>
          <p className="text-body text-muted max-w-xl mx-auto">
            Years 7 to 10 follow the Western Australian Curriculum (ACARA v9). Years 11 and 12 are organised by the exact SCSA course and unit structure — the same structure as the syllabus document your child&apos;s school teaches from.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {yearLevels.map((year) => (
            <span
              key={year}
              className="inline-flex items-center px-3 py-1 rounded-sm bg-panel text-muted text-small font-medium border border-border"
            >
              {year}
            </span>
          ))}
        </div>
        <p className="mt-8 text-center text-small text-muted">
          The library is still being written, subject by subject.{" "}
          <Link href="/about/" className="text-accent underline hover:no-underline">
            See what&apos;s live right now
          </Link>
        </p>
      </div>
    </section>
  );
}
