import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { DashboardMock } from "@/components/DashboardMock";

const previews = [
  {
    view: "week" as const,
    caption: "This week, at a glance",
  },
  {
    view: "topic" as const,
    caption: "One topic, in detail",
  },
  {
    view: "subjects" as const,
    caption: "Progress across every subject",
  },
];

export function ParentDashboardGallery() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-page mx-auto">
        <div className="text-center mb-12">
          <Eyebrow className="mb-3 justify-center flex">Early access</Eyebrow>
          <h2 className="text-section-title text-fg mb-4">A window into how it&apos;s going</h2>
          <p className="text-body text-muted max-w-xl mx-auto">
            The parent dashboard is still in early access. Here&apos;s what it looks like — a weekly
            view, a single topic in detail, and progress across every subject.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {previews.map((p, i) => (
            <figure key={p.view} className="m-0">
              <Card
                className="animate-fade-up motion-reduce:animate-none"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <DashboardMock view={p.view} />
              </Card>
              <figcaption className="mt-3 text-small text-muted text-center">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
