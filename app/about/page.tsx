import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { APP_URL, SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `Why we built ${SITE_NAME} and what we believe about how students learn.`,
  openGraph: {
    title: `About — ${SITE_NAME}`,
    description: `Why we built ${SITE_NAME} and what we believe about how students learn.`,
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-4xl font-semibold text-fg">About</h1>

          <div className="mt-10 space-y-8 text-base leading-relaxed text-muted">
            <p>
              At Ease Learning started from a straightforward observation: quality
              exam preparation in Western Australia is expensive, and that cost
              falls unevenly. A student in a well-resourced school with access to
              tutors and revision materials has a structural advantage over one
              who doesn&apos;t — not because of ability, but because of access.
            </p>

            <p>
              We think that&apos;s fixable. The content students need to understand
              Years 7–12 mathematics, English, science, and humanities is not
              secret or scarce. It can be written clearly, structured sensibly,
              and made available to anyone with an internet connection.
            </p>

            <h2 className="pt-4 text-2xl font-semibold text-fg">
              What we&apos;ve built
            </h2>

            <p>
              Every topic on the platform follows the same pattern: a lecture that
              explains the concept from first principles, then a worksheet with
              auto-marked practice questions. The lecture is there to build
              understanding; the worksheet is there to test it. Feedback is
              immediate — you don&apos;t submit and wait.
            </p>

            <p>
              Content is aligned to{" "}
              <abbr title="School Curriculum and Standards Authority">SCSA</abbr>{" "}
              learning area descriptions for Years 7–10 and to ATAR course outlines
              for Years 11–12. We cover Mathematics, English, Science, and
              Humanities &amp; Social Sciences. More subjects and year levels are
              added regularly.
            </p>

            <h2 className="pt-4 text-2xl font-semibold text-fg">
              Why it&apos;s free
            </h2>

            <p>
              The core platform — every lecture, every worksheet, every piece of
              feedback — is free and will stay free. This is not a freemium model.
              There is no premium tier that unlocks the &ldquo;real&rdquo; content.
            </p>

            <p>
              We plan to offer optional 1-on-1 tutoring sessions with registered WA
              tutors. That will be paid — it reflects the cost of a human&apos;s
              time. But it will be an addition to what already exists, not a gate
              in front of it.
            </p>

            <h2 className="pt-4 text-2xl font-semibold text-fg">
              Our approach to learning
            </h2>

            <p>
              We don&apos;t use streaks, badges, or leaderboards. We don&apos;t
              think the goal is to spend more time on the platform — the goal is to
              understand the material well enough that you don&apos;t need to.
            </p>

            <p>
              The questions are designed to surface gaps in understanding, not to
              rack up points. If you get something wrong, the feedback tells you
              what the correct answer was and why. That&apos;s the loop: explain,
              practise, correct.
            </p>

            <h2 className="pt-4 text-2xl font-semibold text-fg">
              Who this is for
            </h2>

            <p>
              Primarily students in Western Australian government and independent
              schools working through Years 7–12. Also parents who want to
              understand what their child is studying and whether they&apos;re
              keeping up. And tutors who want to track the progress of students
              they&apos;re already working with.
            </p>

            <div className="mt-8 rounded-xl border border-border bg-accent-soft p-6">
              <p className="font-medium text-fg">Questions or feedback?</p>
              <p className="mt-2 text-sm text-muted">
                We&apos;d genuinely like to hear from you — especially if you
                think a topic explanation is unclear or a question is wrong.
              </p>
              <a
                href="/contact/"
                className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
              >
                Get in touch →
              </a>
            </div>

            <div className="mt-4 text-center">
              <a
                href={`${APP_URL}/signup`}
                className="inline-block rounded-lg bg-accent px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#235240]"
              >
                Start learning free
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
