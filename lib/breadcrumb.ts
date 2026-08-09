import { SITE_URL } from "@/lib/constants";

type Crumb = { name: string; href: string };

function breadcrumbJsonLd(trail: Crumb[]) {
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
