import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  SITE_URL,
  OG_IMAGE,
  ONBOARDING_VIDEO_ID,
  ONBOARDING_VIDEO_TITLE,
  ONBOARDING_VIDEO_DESCRIPTION,
  PARENT_VIDEO_ID,
  PARENT_VIDEO_TITLE,
  PARENT_VIDEO_DESCRIPTION,
} from "@/lib/constants";

const ONBOARDING_VIDEO_EMBED_URL = `https://www.youtube.com/embed/${ONBOARDING_VIDEO_ID}`;
const PARENT_VIDEO_EMBED_URL = `https://www.youtube.com/embed/${PARENT_VIDEO_ID}`;

// uploadDate matches the dates used for these same videos' JSON-LD on
// /features — keep both in sync if either changes.
const onboardingVideoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: ONBOARDING_VIDEO_TITLE,
  description: ONBOARDING_VIDEO_DESCRIPTION,
  thumbnailUrl: [`https://i.ytimg.com/vi/${ONBOARDING_VIDEO_ID}/hqdefault.jpg`],
  uploadDate: "2026-10-24",
  embedUrl: ONBOARDING_VIDEO_EMBED_URL,
};

const parentVideoJsonLd = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: PARENT_VIDEO_TITLE,
  description: PARENT_VIDEO_DESCRIPTION,
  thumbnailUrl: [`https://i.ytimg.com/vi/${PARENT_VIDEO_ID}/hqdefault.jpg`],
  uploadDate: "2026-10-24",
  embedUrl: PARENT_VIDEO_EMBED_URL,
};
import { FoundingBanner } from "./_components/FoundingBanner";
import { Hero } from "./_components/Hero";
import { WhatsFree } from "./_components/WhatsFree";
import { FeaturesTeaser } from "./_components/FeaturesTeaser";
import { HowItWorks } from "./_components/HowItWorks";
import { OnboardingVideo } from "./_components/OnboardingVideo";
import { CurriculumCoverage } from "./_components/CurriculumCoverage";
import { SampleQuestion } from "./_components/SampleQuestion";
import { ParentDashboardGallery } from "@/components/ParentDashboardGallery";
import { ParentVideo } from "./_components/ParentVideo";
import { Pricing } from "./_components/Pricing";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import { TrustStrip } from "./_components/TrustStrip";
import FounderLetterHome from "@/components/FounderLetterHome";
import { FAQ } from "./_components/FAQ";
import { FinalCTA } from "./_components/FinalCTA";

export const metadata: Metadata = {
  title: "At Ease Tutoring — Free Education for Year 7–12",
  description:
    "Free, high-quality education for Year 7–12 Western Australian students — lectures, worksheets, and instant feedback, all in one place.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "At Ease Tutoring — Free Education for Year 7–12",
    description:
      "Free, high-quality education for Year 7–12 Western Australian students — lectures, worksheets, and instant feedback, all in one place.",
    url: SITE_URL,
    images: [OG_IMAGE],
    videos: [
      { url: ONBOARDING_VIDEO_EMBED_URL, secureUrl: ONBOARDING_VIDEO_EMBED_URL, type: "text/html" },
      { url: PARENT_VIDEO_EMBED_URL, secureUrl: PARENT_VIDEO_EMBED_URL, type: "text/html" },
    ],
  },
};

export default function Home() {
  return (
    <main>
      <JsonLd data={onboardingVideoJsonLd} />
      <JsonLd data={parentVideoJsonLd} />
      <Header />
      <FoundingBanner />
      <Hero />
      <WhatsFree />
      <FeaturesTeaser />
      <HowItWorks />
      <OnboardingVideo />
      <CurriculumCoverage />
      <SampleQuestion />
      <ParentDashboardGallery />
      <ParentVideo />
      <Pricing />
      <TestimonialCarousel />
      <TrustStrip />
      <FounderLetterHome />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
