import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL, OG_IMAGE } from "@/lib/constants";
import { FoundingBanner } from "./_components/FoundingBanner";
import { Hero } from "./_components/Hero";
import { WhatsFree } from "./_components/WhatsFree";
import { HowItWorks } from "./_components/HowItWorks";
import { CurriculumCoverage } from "./_components/CurriculumCoverage";
import { SampleQuestion } from "./_components/SampleQuestion";
import { MeetTutors } from "./_components/MeetTutors";
import { Pricing } from "./_components/Pricing";
import { Testimonials } from "./_components/Testimonials";
import { TrustStrip } from "./_components/TrustStrip";
import { FounderNote } from "./_components/FounderNote";
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
  },
};

export default function Home() {
  return (
    <main>
      <Header />
      <FoundingBanner />
      <Hero />
      <WhatsFree />
      <HowItWorks />
      <CurriculumCoverage />
      <SampleQuestion />
      <MeetTutors />
      <Pricing />
      <Testimonials />
      <TrustStrip />
      <FounderNote />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
