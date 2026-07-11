import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { APP_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Pricing",
  description: `${SITE_NAME} is free for all students. See what's included and what we plan to offer for families who want additional support.`,
  openGraph: {
    title: `Pricing — ${SITE_NAME}`,
    description: `${SITE_NAME} is free for all students in Years 7–12.`,
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
  "1-on-1 tutoring sessions with registered WA tutors",
  "Tutor-assigned progress tracking",
  "Priority email support",
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-[1120px]">
          <div className="mb-14 text-center">
            <h1 className="text-4xl font-semibold text-fg">Pricing</h1>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
              The core platform is free — not a trial, not a freemium hook. Every
              student in WA gets access to every subject, every year level, at no
              cost.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
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
                className="mt-8 block w-full rounded-lg bg-accent py-3 text-center text-sm font-medium text-white transition-colors hover:bg-[#235240]"
              >
                Get started free
              </a>
            </div>

            {/* Coming soon */}
            <div className="rounded-2xl border border-border bg-card p-8 opacity-80">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium uppercase tracking-widest text-muted">
                    Tutoring
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold text-fg">TBA</h2>
                  <p className="mt-1 text-muted">per session</p>
                </div>
                <span className="rounded-full border border-border bg-page px-3 py-1 text-sm font-medium text-muted">
                  Coming soon
                </span>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-muted">
                We&apos;re building a tutoring feature that connects students with
                registered Western Australian tutors. Pricing will reflect the
                real cost of the tutor&apos;s time — no platform markup beyond
                what keeps the service running.
              </p>

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

              <div className="mt-8 rounded-lg bg-page px-4 py-3 text-sm text-muted">
                Interested in tutoring? Email us and we&apos;ll let you know when
                it launches.{" "}
                <a
                  href="/contact/"
                  className="font-medium text-accent hover:underline"
                >
                  Get in touch
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
              {[
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
                  q: "Can parents use it?",
                  a: "Yes. Create a parent account and link it to your child's account to see their progress — topics attempted, scores, last session.",
                },
              ].map(({ q, a }) => (
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
