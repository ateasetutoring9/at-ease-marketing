import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/pricing",
    "/about",
    "/contact",
    "/guides",
    "/guides/the-quadratic-formula",
    "/guides/states-of-matter",
    "/guides/pythagoras-theorem",
    "/guides/trigonometry-finding-a-side",
    "/guides/newtons-laws-of-motion",
    "/guides/what-is-a-derivative",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}/`,
  }));
}
