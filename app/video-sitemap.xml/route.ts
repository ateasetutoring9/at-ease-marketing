import {
  SITE_URL,
  ONBOARDING_VIDEO_ID,
  ONBOARDING_VIDEO_TITLE,
  ONBOARDING_VIDEO_DESCRIPTION,
  TOUR_VIDEO_ID,
  TOUR_VIDEO_TITLE,
  TOUR_VIDEO_DESCRIPTION,
} from "@/lib/constants";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

interface VideoEntry {
  id: string;
  title: string;
  description: string;
}

function videoTag({ id, title, description }: VideoEntry): string {
  return `    <video:video>
      <video:thumbnail_loc>https://i.ytimg.com/vi/${id}/hqdefault.jpg</video:thumbnail_loc>
      <video:title>${escapeXml(title)}</video:title>
      <video:description>${escapeXml(description)}</video:description>
      <video:player_loc allow_embed="yes">https://www.youtube.com/embed/${id}</video:player_loc>
    </video:video>`;
}

const onboardingVideo: VideoEntry = {
  id: ONBOARDING_VIDEO_ID,
  title: ONBOARDING_VIDEO_TITLE,
  description: ONBOARDING_VIDEO_DESCRIPTION,
};

const tourVideo: VideoEntry = {
  id: TOUR_VIDEO_ID,
  title: TOUR_VIDEO_TITLE,
  description: TOUR_VIDEO_DESCRIPTION,
};

// Add a page's URL and the video(s) it embeds here whenever a video is
// placed on (or removed from) a page — one <url> block per page, with one
// <video:video> per video on that page.
const pagesWithVideos: { pageUrl: string; videos: VideoEntry[] }[] = [
  { pageUrl: `${SITE_URL}/`, videos: [onboardingVideo] },
  { pageUrl: `${SITE_URL}/features/`, videos: [onboardingVideo, tourVideo] },
];

export function GET() {
  const urls = pagesWithVideos
    .map(
      ({ pageUrl, videos }) => `  <url>
    <loc>${pageUrl}</loc>
${videos.map(videoTag).join("\n")}
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
