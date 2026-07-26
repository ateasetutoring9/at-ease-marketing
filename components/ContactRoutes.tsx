// at-ease-marketing — components/ContactRoutes.tsx
//
// Replaces the centred heading + floating button + three narrow cards.
//
// Two structural changes:
//   1. Rows, not columns. The old cards were ~150px wide, so every line broke
//      after two or three words. Rows give the copy room and read faster for
//      a "which one am I?" decision.
//   2. Each route is a real mailto: with a pre-filled subject, so the
//      categories actually do something and your inbox arrives pre-sorted.
//
// Static, no client JS, no form — consistent with the no-tracking claim on
// /about.

import { Eyebrow } from "@/components/ui/Eyebrow";
import { CONTACT_EMAIL } from "@/lib/constants";

type Route = {
  title: string;
  body: string;
  subject: string;
};

const ROUTES: Route[] = [
  {
    title: "Something in a lesson looks wrong",
    body: "A worked example that doesn't follow, an answer that's off, a topic that contradicts the syllabus. Tell me which lesson and I'll fix it.",
    subject: "Lesson correction",
  },
  {
    title: "Private tutoring",
    body: "One-on-one sessions with me, in person around Perth or online. Years 7 to 12.",
    subject: "Private tutoring enquiry",
  },
  {
    title: "Tutoring on the platform",
    body: "If you teach or tutor a WA course and want to work on this when it opens up.",
    subject: "Tutor application",
  },
  {
    title: "Everything else",
    body: "Accounts, parent linking, schools, press, or anything that doesn't fit above.",
    subject: "General enquiry",
  },
];

function mailto(subject: string) {
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;
}

export default function ContactRoutes() {
  return (
    <section className="bg-panel px-4 py-16 md:py-24">
      <div className="mx-auto max-w-reading">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-hero text-fg">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-md text-body text-muted leading-relaxed">
            There's no support team — it's me. I answer within one school day,
            usually sooner.
          </p>
        </div>

        {/* One panel, so the address and the routes read as a single object
            rather than four things floating on a background. */}
        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card">
          <div className="border-b border-border px-6 py-8 text-center sm:px-10">
            <Eyebrow>Email</Eyebrow>
            <a
              href={mailto("Hello")}
              className="mt-3 inline-block font-display text-2xl text-accent underline-offset-[6px] hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <ul>
            {ROUTES.map((route, i) => (
              <li key={route.title}>
                <a
                  href={mailto(route.subject)}
                  className={`group flex items-start gap-5 px-6 py-6 transition-colors hover:bg-panel sm:px-10 ${
                    i > 0 ? "border-t border-border" : ""
                  }`}
                >
                  <div className="flex-1">
                    <h2 className="text-body font-medium text-fg">
                      {route.title}
                    </h2>
                    <p className="mt-1.5 text-small text-muted leading-relaxed">
                      {route.body}
                    </p>
                  </div>

                  <svg
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    className="mt-1 h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent"
                  >
                    <path
                      d="M3 8h9M8.5 4l4 4-4 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quiet trust strip. Fill in the real values or drop the line —
            an empty ABN is worse than none. */}
        <div className="mt-8 space-y-3 text-center">
          <p className="text-small text-muted">
            Perth, Western Australia
            {/* · ABN 00 000 000 000 */}
            {/* · Working With Children Check current */}
          </p>
          <p className="mx-auto max-w-md text-small text-muted leading-relaxed">
            If you're under 18 and asking about tutoring, please have a parent
            or guardian email me, or copy them in.
          </p>
        </div>
      </div>
    </section>
  );
}
