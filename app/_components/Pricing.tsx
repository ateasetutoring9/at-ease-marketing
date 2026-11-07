import { Check, Circle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { APP_URL } from "@/lib/constants";

const tiers = [
  {
    label: "Private tutoring",
    price: "$80–120",
    unit: "per hour",
    note: "Commonly, in Perth",
    features: [
      "One-on-one attention",
      "Flexible scheduling",
      "Adds up fast over a school year",
    ],
    highlighted: false,
    cta: null as null | { href: string; label: string },
  },
  {
    label: "At Ease Tutoring",
    price: "Free",
    unit: "and staying free",
    note: "No credit card. Nothing held back behind a paid tier.",
    features: [
      "All lectures & worksheets",
      "Instant worksheet feedback",
      "Progress tracking",
      "New content added regularly",
    ],
    highlighted: true,
    cta: { href: `${APP_URL}/signup`, label: "Get started free" },
  },
  {
    label: "Online tutoring platforms",
    price: "Monthly",
    unit: "subscription",
    note: "Content behind a paywall",
    features: [
      "Large content libraries",
      "Practice questions",
      "Usually not written for WA's SCSA courses",
    ],
    highlighted: false,
    cta: null as null | { href: string; label: string },
  },
];

export function Pricing() {
  return (
    <section className="py-16 md:py-24 px-4 bg-card border-y border-border">
      <div className="max-w-page mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-section-title text-fg mb-4">The honest comparison</h2>
          <p className="text-body text-muted max-w-xl mx-auto">
            Quality education doesn&apos;t have to cost anything. Here&apos;s how we stack up.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {tiers.map((t) => (
            <div
              key={t.label}
              className={`rounded-md border p-6 flex flex-col gap-4 ${
                t.highlighted
                  ? "border-accent bg-card ring-2 ring-accent shadow-hover"
                  : "border-border bg-panel"
              }`}
            >
              {t.highlighted && (
                <span className="inline-flex self-start text-small font-bold text-[var(--accent-text-on)] bg-accent rounded-full px-3 py-1">
                  Recommended
                </span>
              )}
              <div>
                <p className="text-small font-semibold text-muted mb-1">{t.label}</p>
                <p className="font-display text-3xl font-medium text-fg">
                  {t.price}
                  <span className="text-base font-normal text-muted ml-1.5">{t.unit}</span>
                </p>
                <p className="text-small text-muted mt-1">{t.note}</p>
              </div>
              <ul className="space-y-2 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-small text-muted">
                    {t.highlighted ? (
                      <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" aria-hidden="true" />
                    ) : (
                      <Circle className="w-1.5 h-1.5 mt-2 mx-[5px] fill-current text-muted flex-shrink-0" aria-hidden="true" />
                    )}
                    {f}
                  </li>
                ))}
              </ul>
              {t.cta && (
                <div className="mt-2">
                  <Button variant="primary" size="lg" href={t.cta.href}>
                    {t.cta.label}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
