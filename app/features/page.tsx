import type { Metadata } from "next";
import {
  Video,
  ClipboardCheck,
  Clock,
  BookOpen,
  GraduationCap,
  CircleOff,
  Lock,
  TrendingUp,
  Users,
  Gift,
  Smartphone,
  RefreshCw,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { APP_URL, SITE_NAME, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Features",
  description: `Everything ${SITE_NAME} offers students and parents — free lectures, auto-graded worksheets, progress tracking, and a parent dashboard.`,
  alternates: {
    canonical: "/features/",
  },
  openGraph: {
    title: `Features — ${SITE_NAME}`,
    description: `Everything ${SITE_NAME} offers students and parents — free lectures, worksheets, progress tracking, and a parent dashboard.`,
    images: [OG_IMAGE],
  },
};

const groups = [
  {
    title: "For learning",
    description: "The core of the platform — how a student actually studies a topic.",
    features: [
      {
        icon: Video,
        title: "Video & Text Lectures",
        description: "Curriculum-aligned content for every topic — watch a video or read through at your own pace.",
      },
      {
        icon: ClipboardCheck,
        title: "Auto-Graded Worksheets",
        description: "Attempt a worksheet after each lecture and get instant, question-by-question feedback the moment you submit.",
      },
      {
        icon: Clock,
        title: "Learn at Your Own Pace",
        description: "No schedules, no live classes to attend. Come back to a topic as many times as you need.",
      },
      {
        icon: BookOpen,
        title: "All Years, All Subjects",
        description: "Mathematics, Sciences, English, and Humanities — from Year 7 through to Year 12, all in one place.",
      },
    ],
  },
  {
    title: "For trust and safety",
    description: "What makes this safe to hand to your child, and credible enough to actually study from.",
    features: [
      {
        icon: GraduationCap,
        title: "WACE & SCSA Aligned",
        description: "Content is written against SCSA learning area descriptions and, where applicable, ATAR course outlines.",
      },
      {
        icon: CircleOff,
        title: "No Ads, Ever",
        description: "No ad breaks, no sponsored content, no distractions competing for a student's attention.",
      },
      {
        icon: Lock,
        title: "No Data Sold",
        description: "No tracking pixels, no data sold to third parties. The platform is free without the usual trade-off.",
      },
    ],
  },
  {
    title: "For visibility",
    description: "Knowing where things stand — for the student doing the work, and the parent keeping an eye on it.",
    features: [
      {
        icon: TrendingUp,
        title: "Progress Tracking",
        description: "Every attempt and best score is saved automatically, so a student can see exactly how they're improving over time.",
      },
      {
        icon: Users,
        title: "Parent Dashboard",
        description: "Link your child's account to see their progress — topics attempted, scores, and their last session — without needing to ask.",
      },
    ],
  },
  {
    title: "For access",
    description: "No cost, no barrier, no catch.",
    features: [
      {
        icon: Gift,
        title: "Free Forever",
        description: "No credit card required, no premium tier. Every feature is available to every student at no cost.",
      },
      {
        icon: Smartphone,
        title: "Works on Any Device",
        description: "Fully responsive across desktop, tablet, and mobile in any modern browser. No app to download.",
      },
      {
        icon: RefreshCw,
        title: "New Content Added Regularly",
        description: "The library keeps growing — if there's a topic you need that isn't there yet, let us know.",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-page">
          <div className="mb-16 text-center">
            <h1 className="text-hero text-fg mb-6">Built for students. Visible to parents.</h1>
            <p className="mx-auto max-w-xl text-body text-muted">
              A student gets free lectures, instant feedback, and a pace that's theirs to set. A parent gets a clear window into how it's going — without either of you paying for it.
            </p>
          </div>

          <div className="flex flex-col gap-16">
            {groups.map((group) => (
              <section key={group.title}>
                <div className="mb-8">
                  <h2 className="text-section-title text-fg mb-2">{group.title}</h2>
                  <p className="text-body text-muted">{group.description}</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {group.features.map((f) => (
                    <Card key={f.title}>
                      <div className="text-accent mb-4">
                        <f.icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <h3 className="text-subsection-title text-fg mb-2">{f.title}</h3>
                      <p className="text-small text-muted leading-relaxed">{f.description}</p>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 rounded-2xl border-2 border-accent bg-card p-10 text-center">
            <p className="text-section-title text-fg mb-3">Ready to try it?</p>
            <p className="text-body text-muted mb-8 max-w-md mx-auto">
              Create a free account as a student, or link a parent account once your child is set up — no credit card, no trial that expires.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg" href={`${APP_URL}/signup`}>
                Start learning for free
              </Button>
              <Button variant="secondary" size="lg" href="/pricing/">
                See pricing
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
