import { SITE_URL } from "@/lib/constants";
import { founder } from "@/lib/founder-letter";

/**
 * The founder as a schema.org Person, for the `author` field of guide
 * `Article` and curriculum `Course` JSON-LD. Points at /about/, where the
 * full Person entity lives (FounderLetter.tsx).
 */
export const founderAuthorJsonLd = {
  "@type": "Person",
  name: founder.name,
  jobTitle: founder.role,
  url: `${SITE_URL}/about/`,
};
