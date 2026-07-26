// at-ease-marketing — lib/founder-letter.ts
//
// SINGLE SOURCE OF TRUTH for the /about page and the homepage block.
// Imported by:
//   - components/FounderLetterHome.tsx  (squeezed, homepage)
//   - components/FounderLetter.tsx      (full, /about)
//
// Never copy this prose into a component. The progress line below is the point
// of the whole page — a checkable claim living in four places becomes four
// wrong claims within a term.
//
// WHEN YOU FINISH A COURSE, UPDATE `progress` AND `whatThisIs.unfinished`.

export const founder = {
  /** Full name, for the credential block. Searchable — this is the verification. */
  name: 'Harshit (Harry) Malhotra',
  /** How the letter signs off, in the voice it was written in. */
  signOff: 'Harry',
  role: 'Tutor',
  location: 'Perth, WA',
  credit: 'writes every lesson on this site',
  photo: '', // TODO: real photo — monogram shows until this is set
  /** Optional. Add any profile that corroborates the name, or leave empty. */
  sameAs: [] as readonly string[],
} as const;

/**
 * The volatile paragraph. It's what makes the letter trustworthy, so it's also
 * what does damage when it goes stale. Check at the start of each term.
 */
export const progress = {
  text:
    'I’m still writing. Year 11 Chemistry is done and Year 12 is about a ' +
    'third of the way through. Physics is next — Year 11 first, then ' +
    'Year 12. Founding members tell me what to write first, and I write it.',
  verified: '2026-07-26',
} as const;

export const hook =
  'I’m a tutor, and I built the thing that competes with me';

/** Full letter body. `progress` is appended by the component. */
export const letter: readonly string[] = [
  'Most of what I actually do in a session isn’t teaching. It’s being ' +
    'there at the moment a student decides whether to keep going or shut the ' +
    'book. That moment doesn’t happen at four on a Wednesday when I’m ' +
    'booked. It happens at nine at night, alone, on question fourteen.',

  'Getting someone into the room for that moment costs about eighty dollars an ' +
    'hour, which quietly decides which kids get to keep trying. Two hours a ' +
    'week across a school year is six thousand dollars — per child, per ' +
    'subject. Further out than Northam it doesn’t buy you anything at all, ' +
    'because there’s nobody to hire at any price.',

  'So I wrote the syllabus out instead. Years 7 to 12, matched to the SCSA ' +
    'course your child is actually enrolled in rather than adapted from ' +
    'something American. Free, and staying free — no ads, no upgrade, ' +
    'nothing held back behind a paid tier.',
];

/** Squeezed version, homepage. One paragraph, then the link to /about/. */
export const letterShort =
  'Most of what I do in a session isn’t teaching. It’s being there at ' +
  'the moment a student decides whether to keep going or shut the book — ' +
  'and that moment doesn’t happen at four on a Wednesday when I’m ' +
  'booked. It happens at nine at night, alone, on question fourteen. So I ' +
  'wrote the syllabus out instead.';

/**
 * Replaces the old /about mission copy. Deliberately FACTUAL, not persuasive —
 * the letter above has already made the argument, and restating it here in
 * third person reads as padding. Facts add; repetition subtracts.
 */
export const whatThisIs = {
  heading: 'What this is',
  lines: [
    'Free lessons and worksheets for Western Australian students in Years 7 to 12.',
    'Years 7 to 10 follow the ACARA v9 curriculum. Years 11 and 12 are organised by SCSA course and unit — the same structure as the syllabus document.',
    'No ads, no tracking pixels, and nothing about a student sold to anyone.',
    'Written and run from Perth.',
  ],
  /** Keep this current. It is the most persuasive paragraph on the page. */
  unfinished:
    'Not finished yet: senior Humanities hasn’t been started, Physics ' +
    'hasn’t been started, and Chemistry is partway through Year 12. ' +
    'Everything else — all of Years 7 to 10, all senior Maths, all senior ' +
    'English, Biology and Human Biology — is written and live.',
} as const;

/**
 * The questions anyone asks about a free thing.
 * TODO: the funding answer must match what you actually decide. Don't publish
 * a version you might have to walk back.
 */
export const questions: readonly { q: string; a: string }[] = [
  {
    q: 'How is it free?',
    a:
      'I tutor privately, and that pays for my time. The lessons and worksheets ' +
      'cost nothing to serve once they’re written, so there’s no ' +
      'per-student cost to recover. If that changes I’ll say so here ' +
      'before it changes anywhere else.',
  },
  {
    q: 'What’s the catch?',
    a:
      'There are no ads and I don’t sell anything about your child to ' +
      'anyone. The trade is that this is new and unfinished, and you’re ' +
      'using it while it’s still being written.',
  },
  {
    q: 'Who writes it?',
    a:
      'I do. Every lesson and every worksheet on this site, against the SCSA ' +
      'syllabus documents, one topic at a time. Not scraped, not licensed, not ' +
      'reused from another state.',
  },
];
