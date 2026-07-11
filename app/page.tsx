import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
  title: "At Ease Learning — Free Education for Year 7–12",
  description:
    "Free, high-quality education for Year 7–12 Australian students — lectures, worksheets, and instant feedback, all in one place.",
  openGraph: {
    title: "At Ease Learning — Free Education for Year 7–12",
    description:
      "Free, high-quality education for Year 7–12 Australian students — lectures, worksheets, and instant feedback, all in one place.",
    url: "https://www.ateaselearning.com",
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
