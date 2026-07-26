import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FounderLetter from "@/components/FounderLetter";
import { SITE_NAME, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description:
    "A Perth tutor on why every lesson and worksheet on this site is free, what is written so far, and what is not finished yet.",
  alternates: {
    canonical: "/about/",
  },
  openGraph: {
    title: `About — ${SITE_NAME}`,
    description:
      "A Perth tutor on why every lesson and worksheet on this site is free.",
    type: "article",
    images: [OG_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <FounderLetter />
      </main>
      <Footer />
    </>
  );
}
