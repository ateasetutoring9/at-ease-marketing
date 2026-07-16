import { APP_URL, SITE_NAME } from "@/lib/constants";

export function GuideCTA() {
  return (
    <div className="mt-12 rounded-2xl border-2 border-accent bg-card p-8 text-center">
      <p className="text-subsection-title text-fg mb-3">Want the full interactive lecture?</p>
      <p className="text-body text-muted mb-6 max-w-md mx-auto">
        This topic is one of hundreds covered free on {SITE_NAME} — video and text lectures, plus an auto-graded practice worksheet with instant feedback.
      </p>
      <a
        href={`${APP_URL}/signup`}
        className="inline-block rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#235240]"
      >
        Start learning for free
      </a>
    </div>
  );
}
