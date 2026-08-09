import { SITE_URL } from "@/lib/constants";

type Crumb = { name: string; href: string };

// Exported so index pages (e.g. /guides/, /curriculum/) can build their own
// short trail without a dedicated wrapper — guideBreadcrumbJsonLd and
// curriculumBreadcrumbJsonLd below exist for the deeper, repeated trails.
export function breadcrumbJsonLd(trail: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.href}`,
    })),
  };
}

export function guideBreadcrumbJsonLd(title: string, href: string) {
  return breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Guides", href: "/guides/" },
    { name: title, href },
  ]);
}

export function curriculumBreadcrumbJsonLd(label: string, href: string) {
  return breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Curriculum", href: "/curriculum/" },
    { name: label, href },
  ]);
}

/**
 * Converts a trail into <Breadcrumb />'s item shape (label/href, no href on
 * the current page) so the visible trail and breadcrumbJsonLd(trail) always
 * come from the same array — used on /guides/ and /curriculum/, which are
 * short enough not to need their own guideBreadcrumbJsonLd-style wrapper.
 */
export function breadcrumbItems(trail: Crumb[]) {
  return trail.map((crumb, i) => ({
    label: crumb.name,
    href: i < trail.length - 1 ? crumb.href : undefined,
  }));
}
