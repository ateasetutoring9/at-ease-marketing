import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { PARENT_VIDEO_ID, PARENT_VIDEO_TITLE } from "@/lib/constants";

export function ParentVideo() {
  return (
    <section className="py-16 md:py-24 px-4 bg-panel border-y border-border">
      <div className="max-w-page mx-auto text-center">
        <h2 className="text-section-title text-fg mb-4">See it for real</h2>
        <p className="text-body text-muted max-w-lg mx-auto mb-10">
          A parent linking to their child's account, and what they see once they do.
        </p>
        <YouTubeEmbed videoId={PARENT_VIDEO_ID} title={PARENT_VIDEO_TITLE} />
      </div>
    </section>
  );
}
