// at-ease-marketing — components/FounderAvatar.tsx
//
// Single implementation of the founder's avatar: the real photo once
// founder.photo is set, a green initials monogram until then. No generic
// grey-silhouette fallback — an unfinished-looking profile undercuts a
// first-person letter more than showing nothing.

import { founder } from '@/lib/founder-letter';

function initials(name: string) {
  // "Harshit (Harry) Malhotra" -> "HM". Bracketed nicknames are ignored.
  const parts = name
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  const first = parts[0]?.[0] ?? '';
  const last = parts.length > 1 ? parts[parts.length - 1][0] : '';
  return (first + last).toUpperCase();
}

type Props = {
  size: number;
};

export default function FounderAvatar({ size }: Props) {
  if (founder.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={founder.photo}
        alt={`${founder.name}, who ${founder.credit}`}
        width={size * 2}
        height={size * 2}
        loading="lazy"
        decoding="async"
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center justify-center rounded-full bg-accent font-display text-[var(--accent-text-on)]"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {initials(founder.name)}
    </div>
  );
}
