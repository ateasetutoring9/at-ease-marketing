import Link from "next/link";
import { guides } from "@/lib/guides";

export function RelatedGuides({ currentHref }: { currentHref: string }) {
  const current = guides.find((g) => g.href === currentHref);
  if (!current) return null;

  const related = guides.filter(
    (g) => g.subject === current.subject && g.href !== currentHref
  );
  if (related.length === 0) return null;

  return (
    <div className="mt-12 border-t border-border pt-8">
      <p className="text-eyebrow mb-4">More {current.subject} guides</p>
      <ul className="space-y-4">
        {related.map((g) => (
          <li key={g.href}>
            <Link
              href={g.href}
              className="text-fg font-medium hover:text-accent transition-colors"
            >
              {g.title}
            </Link>
            <p className="mt-1 text-small text-muted">{g.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
