import { TrendingUp, Users, CircleOff } from "lucide-react";
import { Button } from "@/components/ui/Button";

const highlights = [
  {
    icon: TrendingUp,
    title: "Progress tracking",
    description: "Every attempt and best score saved automatically, for the student.",
  },
  {
    icon: Users,
    title: "Parent dashboard",
    description: "Link your child's account to see their progress, for the parent.",
  },
  {
    icon: CircleOff,
    title: "No ads, no data sold",
    description: "Free doesn't mean you're the product here.",
  },
];

export function FeaturesTeaser() {
  return (
    <section className="py-16 md:py-24 px-4 bg-panel border-y border-border">
      <div className="max-w-page mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-section-title text-fg mb-4">Built for students. Visible to parents.</h2>
          <p className="text-body text-muted max-w-xl mx-auto">
            A student gets free lectures and instant feedback at their own pace. A parent gets a clear window into how it's going — all in the same free account.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {highlights.map((h) => (
            <div key={h.title} className="flex flex-col items-center text-center gap-2">
              <div className="text-accent mb-1">
                <h.icon className="w-6 h-6" aria-hidden="true" />
              </div>
              <p className="text-subsection-title text-fg">{h.title}</p>
              <p className="text-small text-muted leading-relaxed">{h.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Button variant="secondary" size="md" href="/features/">
            See all features
          </Button>
        </div>
      </div>
    </section>
  );
}
