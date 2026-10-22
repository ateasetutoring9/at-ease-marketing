import { YouTubeEmbed } from "@/components/YouTubeEmbed";
import { ONBOARDING_VIDEO_ID, ONBOARDING_VIDEO_TITLE } from "@/lib/constants";

export function OnboardingVideo() {
  return (
    <section className="py-16 md:py-24 px-4">
      <div className="max-w-page mx-auto text-center">
        <h2 className="text-section-title text-fg mb-4">See it for yourself</h2>
        <p className="text-body text-muted max-w-lg mx-auto mb-10">
          A minute-long look at creating an account, from signup to your first dashboard.
        </p>
        <YouTubeEmbed videoId={ONBOARDING_VIDEO_ID} title={ONBOARDING_VIDEO_TITLE} />
      </div>
    </section>
  );
}
