import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CONTACT_EMAIL, SITE_NAME, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE_NAME} team.`,
  alternates: {
    canonical: "/contact/",
  },
  openGraph: {
    title: `Contact — ${SITE_NAME}`,
    description: `Get in touch with the ${SITE_NAME} team.`,
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-4xl font-semibold text-fg">Get in touch</h1>
          <p className="mx-auto mt-6 max-w-sm text-lg leading-relaxed text-muted">
            A real person reads every email — usually within one school day.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-10 inline-flex items-center gap-2 rounded-lg bg-accent px-8 py-4 text-base font-medium text-white transition-colors hover:bg-[#235240]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <rect
                x="1.5"
                y="3.5"
                width="15"
                height="11"
                rx="1.5"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M1.5 5.5L9 10.5L16.5 5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            {CONTACT_EMAIL}
          </a>

          <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
            {[
              {
                heading: "Curriculum questions",
                body: "Something in a lecture or worksheet is unclear or incorrect — we want to know.",
              },
              {
                heading: "Tutor enquiries",
                body: "Interested in becoming a tutor on the platform once tutoring launches.",
              },
              {
                heading: "Everything else",
                body: "Accounts, parent linking, school partnerships, press — all welcome.",
              },
            ].map(({ heading, body }) => (
              <div
                key={heading}
                className="rounded-xl border border-border bg-card p-5"
              >
                <p className="font-medium text-fg">{heading}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
