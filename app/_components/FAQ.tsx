import { ChevronDown } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";

const faqs = [
  {
    question: "Is it really free?",
    answer:
      "Yes — completely free. No credit card required, no premium tier, no ads. Every lecture, worksheet, and feature is available to every student at no cost. We're committed to keeping it that way.",
  },
  {
    question: "Which year levels and subjects are covered?",
    answer:
      "Mathematics, Science, English and Humanities across Years 7 to 10, plus a growing library of WACE courses for Years 11 and 12. We're adding new topics regularly — if there's something you need that isn't there yet, let us know.",
  },
  {
    question: "Which curriculum does the content follow?",
    answer:
      "Years 7 to 10 follow the Western Australian Curriculum (ACARA v9). Years 11 and 12 follow the SCSA syllabus for each WACE course, unit by unit — the same structure your child's school teaches from.",
  },
  {
    question: "Can I use it on my phone or tablet?",
    answer:
      "Yes. The platform is fully responsive and works on all modern browsers across desktop, tablet, and mobile. No app to download.",
  },
  {
    question: "How do the worksheets and feedback work?",
    answer:
      "After reading a lecture, you attempt the corresponding worksheet. Most questions are auto-graded — once you submit, you see your score and per-question feedback immediately. Essay questions are marked as practice and not auto-graded.",
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

export function FAQ() {
  return (
    <section className="py-16 md:py-24 px-4">
      <JsonLd data={faqJsonLd} />
      <div className="max-w-reading mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-section-title text-fg mb-4">Frequently asked questions</h2>
        </div>
        <div className="divide-y divide-border">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-5">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-body font-semibold text-fg">
                {faq.question}
                <ChevronDown
                  className="w-5 h-5 text-muted flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                />
              </summary>
              <p className="mt-3 text-body text-muted leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
