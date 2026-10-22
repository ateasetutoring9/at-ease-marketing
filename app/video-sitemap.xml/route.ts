import { SITE_URL, ONBOARDING_VIDEO_ID, ONBOARDING_VIDEO_TITLE, ONBOARDING_VIDEO_DESCRIPTION } from "@/lib/constants";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Pages that embed the onboarding video. Add an entry here whenever the
// video is placed on another page — each <url> needs its own entry even
// though it's the same underlying video.
const pagesWithVideo = [`${SITE_URL}/`, `${SITE_URL}/features/`];

const thumbnailUrl = `https://i.ytimg.com/vi/${ONBOARDING_VIDEO_ID}/hqdefault.jpg`;
const playerLoc = `https://www.youtube.com/embed/${ONBOARDING_VIDEO_ID}`;

export function GET() {
  const urls = pagesWithVideo
    .map(
      (pageUrl) => `  <url>
    <loc>${pageUrl}</loc>
    <video:video>
      <video:thumbnail_loc>${thumbnailUrl}</video:thumbnail_loc>
      <video:title>${escapeXml(ONBOARDING_VIDEO_TITLE)}</video:title>
      <video:description>${escapeXml(ONBOARDING_VIDEO_DESCRIPTION)}</video:description>
      <video:player_loc allow_embed="yes">${playerLoc}</video:player_loc>
    </video:video>
  </url>`
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: { "Content-Type": "application/xml" },
  });
}
