'use client';

// at-ease-marketing — components/TestimonialCarousel.tsx
//
// 'use client' is justified here: local UI state only (slide index, timers).
// No fetching, no env vars — reads a committed JSON file, static export safe.
//
// Behaviour:
//   - 3 cards visible on desktop, 2 on tablet, 1 on mobile; advances by one
//   - 8s auto-advance (see note in chat: 5s is shorter than these take to read)
//   - pauses on hover, pauses on keyboard focus
//   - stops permanently once the user clicks an arrow or a dot
//   - does not auto-advance at all under prefers-reduced-motion

import { useEffect, useMemo, useRef, useState } from 'react';
import realReviews from '@/data/reviews.json';
import devReviews from '@/data/reviews.dev.json';

type Review = {
  id: string;
  rating: number;
  body: string;
  yearLevel: number | null;
  region: string | null;
};

// Production builds take the real file and nothing else. `next build` sets
// NODE_ENV=production, so the fixtures cannot reach the static export.
const SOURCE = (
  process.env.NODE_ENV === 'production' ? realReviews : devReviews
) as Review[];

const INTERVAL_MS = 8000;

export default function TestimonialCarousel() {
  const reviews = SOURCE;
  // Defaults to the mobile value (1) rather than desktop (3): the static
  // export is prerendered with no knowledge of viewport width, and this
  // avoids a flash of squished cards on the majority-mobile case. Desktop/
  // tablet instead get a brief single-card view that widens once mounted —
  // a much milder mismatch than 3 cards rendering too narrow on a phone.
  const [perView, setPerView] = useState(1);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [userTookOver, setUserTookOver] = useState(false);
  const reducedMotion = useRef(false);

  const maxIndex = Math.max(0, reviews.length - perView);

  // Overall rating is computed, never hardcoded — so it stays true when the
  // fixtures are swapped for real submissions.
  const overall = useMemo(() => {
    if (reviews.length === 0) return null;
    const mean =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    return { mean: Math.round(mean * 10) / 10, count: reviews.length };
  }, [reviews]);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion.current = mqMotion.matches;

    const mqLarge = window.matchMedia('(min-width: 1024px)');
    const mqMedium = window.matchMedia('(min-width: 640px)');

    const sync = () => {
      const next = mqLarge.matches ? 3 : mqMedium.matches ? 2 : 1;
      setPerView(next);
      setIndex((i) => Math.min(i, Math.max(0, reviews.length - next)));
    };

    sync();
    mqLarge.addEventListener('change', sync);
    mqMedium.addEventListener('change', sync);
    return () => {
      mqLarge.removeEventListener('change', sync);
      mqMedium.removeEventListener('change', sync);
    };
  }, [reviews.length]);

  useEffect(() => {
    if (paused || userTookOver || reducedMotion.current) return;
    if (maxIndex === 0) return;

    const timer = window.setInterval(() => {
      setIndex((i) => (i >= maxIndex ? 0 : i + 1));
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, userTookOver, maxIndex]);

  function goTo(next: number) {
    setUserTookOver(true);
    setIndex(Math.max(0, Math.min(next, maxIndex)));
  }

  if (reviews.length === 0) return null;

  const trackStyle = {
    width: `${(reviews.length / perView) * 100}%`,
    transform: `translateX(-${index * (100 / reviews.length)}%)`,
  };

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-page mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-section-title text-fg mb-4">What parents say</h2>

          {overall && (
            <p className="text-body text-muted">
              <span className="font-medium text-fg">
                {overall.mean.toFixed(1)} out of 5
              </span>{' '}
              · from {overall.count} {overall.count === 1 ? 'parent' : 'parents'}
            </p>
          )}
        </div>

        <div
          className="relative"
          role="group"
          aria-roledescription="carousel"
          aria-label="Reviews from parents"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="overflow-hidden">
            <ul
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={trackStyle}
            >
              {reviews.map((review, i) => {
                const visible = i >= index && i < index + perView;
                return (
                  <li
                    key={review.id}
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${reviews.length}`}
                    aria-hidden={!visible}
                    className="shrink-0 px-2.5"
                    style={{ width: `${100 / reviews.length}%` }}
                  >
                    <figure className="flex h-full flex-col rounded-lg border border-border bg-card p-6">
                      <blockquote className="flex-1 text-small text-muted leading-relaxed">
                        {review.body}
                      </blockquote>
                      <figcaption className="mt-6 border-t border-border pt-4 text-small text-muted">
                        Parent of a Year {review.yearLevel} student
                        {review.region ? ` · ${review.region}` : ''}
                      </figcaption>
                    </figure>
                  </li>
                );
              })}
            </ul>
          </div>

          {maxIndex > 0 && (
            <div className="mt-8 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={() => goTo(index === 0 ? maxIndex : index - 1)}
                aria-label="Previous reviews"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-fg transition-colors hover:border-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M10 3L5 8l5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="flex gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`Go to review ${i + 1}`}
                    aria-current={i === index}
                    className={`h-2 rounded-full transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                      i === index
                        ? 'w-6 bg-accent'
                        : 'w-2 bg-border-strong hover:bg-accent/60'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(index >= maxIndex ? 0 : index + 1)}
                aria-label="Next reviews"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-fg transition-colors hover:border-accent focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden="true">
                  <path
                    d="M6 3l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        <p className="mt-10 text-center text-small text-muted">
          Every review is from a signed-in parent account, published with
          permission.
        </p>
      </div>
    </section>
  );
}
