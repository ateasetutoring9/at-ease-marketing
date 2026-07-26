// at-ease-marketing — components/FounderLetter.tsx
//
// Body of the merged /about page. Order is deliberate:
//   1. The letter        — the hook has to land cold, so nothing precedes it
//   2. Signature         — a named person, which is what makes the letter work
//   3. What this is      — facts, not a restatement of the argument
//   4. What isn't done   — the most persuasive paragraph on the page
//   5. Questions         — the objections a free product raises
//
// All prose comes from lib/founder-letter.ts.

import {
  founder,
  hook,
  letter,
  progress,
  questions,
  whatThisIs,
} from '@/lib/founder-letter';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: founder.name,
  alternateName: founder.signOff,
  jobTitle: founder.role,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Perth',
    addressRegion: 'WA',
    addressCountry: 'AU',
  },
  ...(founder.sameAs.length ? { sameAs: founder.sameAs } : {}),
};

export default function FounderLetter() {
  return (
    <article className="bg-card py-16 md:py-24 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="mx-auto max-w-reading">
        <h1 className="text-hero text-fg">{hook}</h1>

        <div className="mt-8 space-y-6 text-body text-muted leading-relaxed">
          {letter.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <p>{progress.text}</p>
          <p className="text-fg">&mdash; {founder.signOff}</p>
        </div>

        {/* Signature */}
        <div className="mt-12 flex items-center gap-4 border-t border-border pt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={founder.photo}
            alt={`${founder.name}, who ${founder.credit}`}
            width={256}
            height={256}
            loading="lazy"
            decoding="async"
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <p className="text-small font-semibold text-fg">
              {founder.name}
            </p>
            <p className="mt-0.5 text-small text-muted">
              {founder.role} · {founder.location} · {founder.credit}
            </p>
          </div>
        </div>

        {/* Facts, not a second run at the argument */}
        <section className="mt-16">
          <h2 className="text-section-title text-fg">{whatThisIs.heading}</h2>

          <ul className="mt-6 space-y-3">
            {whatThisIs.lines.map((line) => (
              <li
                key={line}
                className="border-l-2 border-border pl-4 text-body text-muted leading-relaxed"
              >
                {line}
              </li>
            ))}
          </ul>

          <p className="mt-8 rounded-lg bg-panel p-5 text-body text-muted leading-relaxed">
            {whatThisIs.unfinished}
          </p>
        </section>

        {/* Objections */}
        <section className="mt-16">
          <h2 className="text-section-title text-fg">The questions I get asked</h2>

          <dl className="mt-8 divide-y divide-border border-y border-border">
            {questions.map((item) => (
              <div key={item.q} className="py-6">
                <dt className="text-body font-semibold text-fg">
                  {item.q}
                </dt>
                <dd className="mt-2 text-body text-muted leading-relaxed">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </article>
  );
}
