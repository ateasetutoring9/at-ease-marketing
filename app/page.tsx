import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { APP_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Free learning for WA students`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: `${SITE_NAME} — Free learning for WA students`,
    description: SITE_DESCRIPTION,
    url: "https://www.ateaselearning.com",
  },
};

const subjects = [
  { name: "Mathematics", years: "Years 7–12" },
  { name: "English", years: "Years 7–12" },
  { name: "Science", years: "Years 7–12" },
  { name: "Humanities & Social Sciences", years: "Years 7–10" },
];

const features = [
  {
    title: "Aligned to SCSA and WACE",
    body: "Every topic, lecture, and worksheet is written against the Western Australian curriculum. No guesswork about what's in scope.",
  },
  {
    title: "Lectures and practice worksheets",
    body: "Read or watch a clear explanation, then work through graded questions. Auto-marked — you get instant feedback, not a form to submit.",
  },
  {
    title: "Progress you can actually see",
    body: "Your attempt history shows exactly which topics you've covered and how scores have moved over time.",
  },
  {
    title: "For parents too",
    body: "Link your parent account and see your child's progress at a glance — scores, topics attempted, time since last session.",
  },
  {
    title: "No ads, no tracking, no upsell",
    body: "The core platform is free. That's not a trial. There is no countdown, no credit card required, and nothing locked behind a paywall.",
  },
  {
    title: "Works on any connection",
    body: "Built to load fast on slow regional internet. Plain HTML, minimal JavaScript — the content comes first.",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-accent-soft border-b border-border px-4 py-20 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
              Western Australia · Years 7–12 · WACE aligned
            </p>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight text-fg sm:text-5xl">
              Learn at your own pace.
              <br />
              <span className="text-accent">No cost. No catch.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">
              At Ease Learning gives Western Australian students free access to
              curriculum-aligned lectures and practice worksheets across every
              subject in Years 7–12.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href={`${APP_URL}/signup`}
                className="rounded-lg bg-accent px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-[#235240]"
              >
                Get started free
              </a>
              <a
                href={`${APP_URL}/browse`}
                className="rounded-lg border border-border bg-card px-8 py-3.5 text-base font-medium text-fg transition-colors hover:bg-accent-soft"
              >
                Browse subjects
              </a>
            </div>
          </div>
        </section>

        {/* Subjects */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-[1120px]">
            <h2 className="mb-2 text-center text-2xl font-semibold text-fg">
              What&apos;s covered
            </h2>
            <p className="mb-10 text-center text-muted">
              All four SCSA learning areas, from Year 7 through to ATAR.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {subjects.map((s) => (
                <div
                  key={s.name}
                  className="rounded-xl border border-border bg-card p-5"
                >
                  <p className="font-medium text-fg">{s.name}</p>
                  <p className="mt-1 text-sm text-muted">{s.years}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-border bg-accent-soft px-4 py-16">
          <div className="mx-auto max-w-[1120px]">
            <h2 className="mb-10 text-center text-2xl font-semibold text-fg">
              How it works
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-border bg-card p-6"
                >
                  <h3 className="font-semibold text-fg">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {f.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-20 text-center">
          <div className="mx-auto max-w-lg">
            <h2 className="text-3xl font-semibold text-fg">
              Ready when you are.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              No subscription. No trial period. Create a free account and start
              learning today.
            </p>
            <a
              href={`${APP_URL}/signup`}
              className="mt-8 inline-block rounded-lg bg-accent px-8 py-3.5 text-base font-medium text-white transition-colors hover:bg-[#235240]"
            >
              Get started free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
