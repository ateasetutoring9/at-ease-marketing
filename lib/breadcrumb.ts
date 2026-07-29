import { SITE_URL } from "@/lib/constants";

export function guideBreadcrumbJsonLd(title: string, href: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides/` },
      { "@type": "ListItem", position: 3, name: title, item: `${SITE_URL}${href}` },
    ],
  };
}
