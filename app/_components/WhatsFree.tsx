import { FileText, ClipboardCheck, BarChart2, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/Card";

const features = [
  {
    title: "Text Lectures",
    description:
      "Curriculum-aligned lectures covering every major topic — read through at your own pace, and come back to any section as many times as you need.",
    icon: <FileText className="w-6 h-6" aria-hidden="true" />,
  },
  {
    title: "Auto-Graded Worksheets",
    description:
      "Attempt a worksheet after each lecture. Get instant, question-by-question feedback the moment you submit.",
    icon: <ClipboardCheck className="w-6 h-6" aria-hidden="true" />,
  },
  {
    title: "Progress Tracking",
    description:
      "Your attempt history and best scores are saved automatically so you can see exactly how you're improving.",
    icon: <BarChart2 className="w-6 h-6" aria-hidden="true" />,
  },
  {
    title: "Years 7 to 12",
    description:
      "Mathematics, Science, English and Humanities across Years 7 to 10, plus a growing library of WACE courses for Years 11 and 12.",
    icon: <BookOpen className="w-6 h-6" aria-hidden="true" />,
  },
];

export function WhatsFree() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-page mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-section-title text-fg mb-4">Everything&apos;s free. No catch.</h2>
          <p className="text-body text-muted max-w-xl mx-auto">
            Every feature on At Ease Tutoring is available to every student at no cost. Always.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <Card key={f.title}>
              <div className="text-accent mb-4">{f.icon}</div>
              <h3 className="text-subsection-title text-fg mb-2">{f.title}</h3>
              <p className="text-small text-muted leading-relaxed">{f.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
