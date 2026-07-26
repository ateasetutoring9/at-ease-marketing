// at-ease-marketing — components/FounderLetterHome.tsx
//
// Squeezed version for the homepage. Hook + one paragraph + link.
// All prose comes from lib/founder-letter.ts — don't inline it here.

import Link from 'next/link';
import { founder, hook, letterShort } from '@/lib/founder-letter';
import FounderAvatar from '@/components/FounderAvatar';

export default function FounderLetterHome() {
  return (
    <section className="py-16 md:py-24 px-4 bg-card border-y border-border">
      <div className="mx-auto max-w-reading">
        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="flex-shrink-0">
            <FounderAvatar size={112} />
          </div>

          <div>
            <h2 className="text-subsection-title text-fg mb-4">{hook}</h2>

            <p className="text-body text-muted leading-relaxed">
              {letterShort}
            </p>

            <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-small font-semibold text-fg">
                {founder.name}
              </span>
              <span className="text-small text-muted">
                {founder.role} · {founder.location}
              </span>
            </div>

            <Link
              href="/about/"
              className="mt-4 inline-flex items-center gap-1.5 text-small font-medium text-accent underline-offset-4 hover:underline"
            >
              Read the rest
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
                <path
                  d="M3 8h9M8.5 4l4 4-4 4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
