import type { Metadata } from "next";
import Link from "next/link";
import { ChevronDown, Search, BookOpen, ClipboardCheck } from "lucide-react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { JsonLd } from "@/components/JsonLd";
import { APP_URL, SITE_NAME, OG_IMAGE } from "@/lib/constants";
import { founder, pullQuoteAccess, whatThisIs } from "@/lib/founder-letter";

const TITLE = "WACE Subject Not Offered at Your School?";
const DESCRIPTION =
  "If your school doesn't run the WACE subject you need — or you're enrolled in distance education — free, SCSA-aligned lessons and worksheets for Years 11–12. No sign-up required to browse.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/distance-education/",
  },
  openGraph: {
    title: `${TITLE} — ${SITE_NAME}`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const steps = [
  {
    icon: Search,
    title: "Find your course",
    description:
      "Search the curriculum library for your exact WACE course and unit — not just the subject name.",
    href: "/curriculum/",
    linkLabel: "Browse the curriculum",
  },
  {
    icon: BookOpen,
    title: "Read the lesson",
    description:
      "Work through the written lecture at your own pace. No login needed, no schedule to keep.",
  },
  {
    icon: ClipboardCheck,
    title: "Check your understanding",
    description:
      "Create a free account to attempt the matching worksheet and get instant, question-by-question feedback.",
  },
];

const faqs = [
  {
    question: "Does this count as enrolment in a WACE course?",
    answer:
      "No. There's no enrolment process here, and nothing on this site reports results to SCSA. Your real enrolment — a mainstream school, SIDE, or another distance education provider — stays the one that registers you for the course and submits your marks. This is free study material to use alongside that enrolment, not instead of it.",
  },
  {
    question: "Is this the same as SIDE?",
    answer:
      "No. SIDE (the School of Isolated and Distance Education) is a real WA public school that enrols students and reports their results. At Ease Tutoring isn't affiliated with SIDE and isn't a school — it's a free library of lessons and worksheets written against the same SCSA syllabus documents, for anyone who wants a second way into the content, SIDE students included.",
  },
  {
    question: "What if my subject isn't written yet?",
    answer:
      "Tell us. Founding students are the ones who decide what gets written next, so a message through the contact page moves a subject up the list rather than into a queue nobody can see.",
  },
  {
    question: "Do I need to sign up to browse?",
    answer:
      "No. Every page in the curriculum library is public — no account needed to find your course or read what's covered. Create a free account only when you want to save your progress or attempt a worksheet.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function DistanceEducationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <JsonLd data={faqJsonLd} />

        {/* Hero */}
        <section className="px-4 py-20 text-center md:py-28">
          <div className="mx-auto max-w-reading">
            <Eyebrow className="mb-5">100% free · SCSA-aligned · No sign-up to browse</Eyebrow>
            <h1 className="text-hero text-fg mb-6">
              Your school doesn&apos;t have to be the reason you can&apos;t do the subject you
              need.
            </h1>
            <p className="text-body text-muted mx-auto mb-10 max-w-xl">
              Small subject cohorts get cut. Some schools never had the enrolment to run a
              subject in the first place. And if you&apos;re enrolled through distance
              education, the subject list in front of you isn&apos;t always the one you
              actually need. Whatever the reason, the syllabus content doesn&apos;t stop being
              real — and it&apos;s free here, written against the same SCSA course document
              your assessment is based on.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="primary" size="lg" href={`${APP_URL}/signup`}>
                Start learning for free
              </Button>
              <Button variant="secondary" size="lg" href="/curriculum/">
                Browse the curriculum first
              </Button>
            </div>
            <p className="text-small text-muted mt-4">
              No sign-up required to browse. Create an account to save your progress.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-page px-4">
          {/* Staffing problem, not a you problem */}
          <section className="mt-4 md:mt-8">
            <div className="mx-auto max-w-reading">
              <h2 className="text-section-title text-fg mb-5">
                This is a staffing problem, not a you problem
              </h2>
              <div className="text-body text-muted space-y-4 leading-relaxed">
                <p>
                  A Western Australian school can only timetable a WACE course if two
                  separate things are both true in the same year: enough students choose it
                  to form a viable class, and a teacher qualified to teach that specific
                  syllabus is rostered to run it. Neither condition has anything to do with
                  how good you are at the subject or how much you want to take it.
                </p>
                <p>
                  A school with a smaller enrolment, or a subject that&apos;s harder to
                  staff, can lose a course one year and not get it back the next — not
                  because the content disappeared, but because the roster didn&apos;t clear
                  both bars at once. Further from Perth, that staffing gap only gets wider.
                  None of that is a reflection on you.
                </p>
              </div>
            </div>
          </section>

          {/* Distance education acknowledgement */}
          <section className="mt-16">
            <div className="mx-auto max-w-reading">
              <h2 className="text-section-title text-fg mb-5">
                If you&apos;re already enrolled in distance education
              </h2>
              <div className="text-body text-muted space-y-4 leading-relaxed">
                <p>
                  If you&apos;re enrolled through SIDE or another distance education
                  provider, you&apos;ve already done the hard part — enrolling, getting
                  access to materials, and staying accountable without a classroom around
                  you. That enrolment is real, and nothing here replaces it.
                </p>
                <p>
                  What this is: a free second source of lessons and worksheets, organised by
                  the same SCSA course and unit structure, for the days the explanation
                  you&apos;ve been given isn&apos;t landing and you want another way into the
                  same content.
                </p>
              </div>
            </div>
          </section>

          {/* What's actually written */}
          <section className="mt-16">
            <div className="mx-auto max-w-reading">
              <h2 className="text-section-title text-fg mb-5">
                What&apos;s actually written, right now
              </h2>
              <p className="text-body text-muted mb-6 leading-relaxed">
                A free site with nothing to browse isn&apos;t much good to you, so here&apos;s
                the real state of the library today — not a roadmap:
              </p>
              <p className="bg-panel text-body text-muted rounded-lg p-5 leading-relaxed">
                {whatThisIs.unfinished}
              </p>
              <p className="text-body text-muted mt-6 leading-relaxed">
                Check{" "}
                <Link href="/curriculum/" className="text-accent hover:underline">
                  the curriculum library
                </Link>{" "}
                for your specific course and unit before assuming it isn&apos;t there.
              </p>
            </div>
          </section>

          {/* How to use it */}
          <section className="mt-16">
            <div className="mb-10 text-center">
              <h2 className="text-section-title text-fg mb-3">How to use it</h2>
              <p className="text-body text-muted mx-auto max-w-xl">
                Three steps, no schedule to keep and nothing to install.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {steps.map((step, i) => (
                <Card key={step.title}>
                  <div className="text-accent mb-4 flex items-center gap-3">
                    <step.icon className="h-6 w-6" aria-hidden="true" />
                    <span className="text-small text-muted font-medium">Step {i + 1}</span>
                  </div>
                  <h3 className="text-subsection-title text-fg mb-2">{step.title}</h3>
                  <p className="text-small text-muted leading-relaxed">{step.description}</p>
                  {step.href && (
                    <Link
                      href={step.href}
                      className="text-small text-accent mt-3 inline-block hover:underline"
                    >
                      {step.linkLabel}
                    </Link>
                  )}
                </Card>
              ))}
            </div>
          </section>

          {/* Founder pull-quote */}
          <section className="mt-16">
            <blockquote className="border-accent mx-auto max-w-reading border-l-4 py-2 pl-6">
              <p className="text-subsection-title text-fg italic">&ldquo;{pullQuoteAccess}&rdquo;</p>
              <p className="text-small text-muted mt-4">
                &mdash; {founder.name}, {founder.role}, {founder.location}
              </p>
            </blockquote>
          </section>

          {/* FAQ */}
          <section className="mt-16">
            <div className="mx-auto max-w-reading">
              <h2 className="text-section-title text-fg mb-8 text-center">
                Common questions
              </h2>
              <div className="divide-border divide-y">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group py-5">
                    <summary className="text-body text-fg flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                      {faq.question}
                      <ChevronDown
                        className="text-muted h-5 w-5 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="text-body text-muted mt-3 leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="my-20">
            <div className="border-accent bg-card mx-auto max-w-reading rounded-2xl border-2 p-8 text-center sm:p-10">
              <p className="text-section-title text-fg mb-3">Ready to see your course?</p>
              <p className="text-body text-muted mx-auto mb-8 max-w-md">
                No credit card, no trial that expires, and no obligation to keep using it if
                it isn&apos;t a fit.
              </p>
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button variant="primary" size="lg" href={`${APP_URL}/signup`}>
                  Start learning for free
                </Button>
                <Button variant="secondary" size="lg" href="/curriculum/">
                  Browse the curriculum first
                </Button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
