import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { APP_URL, SITE_NAME, OG_IMAGE, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description: `${SITE_NAME} is free for all students. See what's included and what we plan to offer for families who want additional support.`,
  alternates: {
    canonical: "/pricing/",
  },
  openGraph: {
    title: `Pricing — ${SITE_NAME}`,
    description: `${SITE_NAME} is free for all students in Years 7–12.`,
    images: [OG_IMAGE],
  },
};

const freeFeatures = [
  "All subjects, all year levels (7–12)",
  "SCSA and WACE-aligned lectures and worksheets",
  "Auto-marked practice questions with instant feedback",
  "Attempt history and score tracking",
  "Parent dashboard (link your child's account)",
  "No ads, no tracking pixels, no data sold",
];

const comingFeatures = [
  "1-on-1 online tutoring, open to students anywhere in Australia",
  "Tutor-assigned progress tracking",
  "Priority email support",
];

const tutoringRates = [
  { years: "Years 7–8", rate: "$55+/hr" },
  { years: "Years 9–10", rate: "$65+/hr" },
  { years: "Years 11–12", rate: "$73+/hr", note: "by subject" },
];

const groupFeatures = [
  "Small groups, same subject and year level",
  "Lower cost per student than 1-on-1",
  "Format and size still being decided",
];

const faqs = [
  {
    q: "Is it really free?",
    a: "Yes. Every subject, every year level, every lecture and worksheet. No credit card, no trial, no expiry date.",
  },
  {
    q: "Will it stay free?",
    a: "The core platform — the lectures, worksheets, and progress tracking — is permanently free. A paid tutoring tier is coming, but it won't gate any of the existing content.",
  },
  {
    q: "Is this aligned to the WA curriculum?",
    a: "Yes. Content is written against SCSA learning area descriptions and, where applicable, ATAR course outlines. If you spot something out of scope, please let us know.",
  },
  {
    q: "Do I need to live in WA to use this?",
    a: "No. Both the free platform and 1-on-1 tutoring are available online to students anywhere in Australia. The content itself is written against the WA curriculum — the strongest fit if you're following WA Years 7–10 or WACE, wherever you're based.",
  },
  {
    q: "Can parents use it?",
    a: "Yes. Create a parent account and link it to your child's account to see their progress — topics attempted, scores, last session.",
  },
  {
    q: "How much will tutoring cost?",
    a: "Rates are set: $55+/hr for Years 7–8, $65+/hr for Years 9–10, and $73+/hr for Years 11–12, varying by subject. Booking isn't open yet — see the Tutoring card above for how to hear when it is.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: {
      "@type": "Answer",
      text: a,
    },
  })),
};

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-16">
        <JsonLd data={faqJsonLd} />
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-14 text-center">
            <h1 className="text-4xl font-semibold text-fg">Pricing</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
              The core platform is free — not a trial, not a freemium hook. Every
              student in Australia gets access to every subject, every year level,
              at no cost.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Free tier */}
            <div className="rounded-2xl border-2 border-accent bg-card p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-widest text-accent">
                    Always free
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-fg">$0</h2>
                  <p className="mt-1 text-muted">per student, forever</p>
                </div>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent">
                  Available now
                </span>
              </div>

              <ul className="mt-8 space-y-3">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8l3.5 3.5L13 4.5"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-fg">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={`${APP_URL}/signup`}
                className="mt-8 block w-full rounded-lg bg-accent py-3 text-center text-sm font-medium text-[var(--accent-text-on)] transition-colors hover:bg-accent-hover"
              >
                Get started free
              </a>
            </div>

            {/* Coming soon */}
            <div className="rounded-2xl border-2 border-accent bg-card p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-widest text-accent">
                    Tutoring
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-fg">From $55</h2>
                  <p className="mt-1 text-muted">per hour, by year level</p>
                </div>
                <span className="rounded-full bg-accent-soft px-3 py-1 text-sm font-medium text-accent text-center">
                  Taking early interest
                </span>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted">
                We&apos;re building a tutoring feature to bring 1-on-1 sessions
                online — open to students anywhere in Australia, taught
                against the WA curriculum. Rates below are what a session
                will cost once it launches — no platform markup beyond what
                keeps the service running.
              </p>

              <ul className="mt-6 space-y-2">
                {tutoringRates.map((r) => (
                  <li
                    key={r.years}
                    className="flex items-baseline justify-between gap-4 rounded-lg bg-page px-4 py-2.5 text-sm"
                  >
                    <span className="text-fg">
                      {r.years}
                      {r.note && <span className="text-muted"> ({r.note})</span>}
                    </span>
                    <span className="font-medium text-fg">{r.rate}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 space-y-3">
                {comingFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="5.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="text-muted">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-lg bg-accent-soft px-4 py-4">
                <p className="text-sm font-medium text-fg">
                  Interested in tutoring? I&apos;ll let you know the moment
                  it opens.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    "Private tutoring enquiry"
                  )}`}
                  className="mt-3 block w-full rounded-lg bg-accent py-3 text-center text-sm font-medium text-[var(--accent-text-on)] transition-colors hover:bg-accent-hover"
                >
                  Email me about tutoring
                </a>
              </div>
            </div>

            {/* Group classes */}
            <div className="rounded-2xl border border-border bg-card p-8 opacity-80">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-widest text-muted">
                    Group classes
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-fg">TBD</h2>
                  <p className="mt-1 text-muted">per student, per session</p>
                </div>
                <span className="rounded-full border border-border bg-page px-3 py-1 text-sm font-medium text-muted text-center">
                  Coming soon
                </span>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted">
                An idea we&apos;re exploring for small-group sessions —
                same subject, same year level, lower cost per student than
                1-on-1. Format, size, and pricing aren&apos;t decided yet.
              </p>

              <ul className="mt-6 space-y-3">
                {groupFeatures.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <svg
                      className="mt-0.5 h-4 w-4 shrink-0 text-muted"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="5.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    <span className="text-muted">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 rounded-lg bg-page px-4 py-3 text-sm text-muted">
                Interested in group classes? Email me and I&apos;ll let you
                know if this goes ahead.{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                    "Group classes enquiry"
                  )}`}
                  className="font-medium text-accent hover:underline"
                >
                  Email me
                </a>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mx-auto mt-20 max-w-2xl">
            <h2 className="mb-8 text-center text-2xl font-semibold text-fg">
              Common questions
            </h2>
            <div className="space-y-6">
              {faqs.map(({ q, a }) => (
                <div key={q} className="border-b border-border pb-6">
                  <p className="font-medium text-fg">{q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
