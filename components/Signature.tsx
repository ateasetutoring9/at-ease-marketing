// at-ease-marketing — components/Signature.tsx
//
// The block under the founder letter. The "no photo yet" case is handled by
// FounderAvatar's monogram fallback, not a generic silhouette here.
//
// Set founder.photo in lib/founder-letter.ts to enable the photo. Leave it
// empty and FounderAvatar shows a monogram; set `variant="type"` for the
// no-graphic version.

import { founder } from '@/lib/founder-letter';
import FounderAvatar from '@/components/FounderAvatar';

type Props = {
  /** 'auto' shows the avatar (photo or monogram). 'type' shows neither. */
  variant?: 'auto' | 'type';
  size?: number;
};

export default function Signature({ variant = 'auto', size = 64 }: Props) {
  return (
    <div className="mt-12 flex items-center gap-4 border-t border-border pt-8">
      {variant === 'auto' && <FounderAvatar size={size} />}
      <div>
        <p className="text-small font-semibold text-fg">{founder.name}</p>
        <p className="mt-0.5 text-small text-muted">
          {founder.role} · {founder.location} · {founder.credit}
        </p>
      </div>
    </div>
  );
}
