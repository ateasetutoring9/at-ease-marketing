import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ContactRoutes from "@/components/ContactRoutes";
import { SITE_NAME, OG_IMAGE } from "@/lib/constants";

const DESCRIPTION =
  "Contact At Ease Tutoring: report a lesson error, ask about private tutoring in Perth or online (Years 7-12) or anything else. Replies within a school day.";

export const metadata: Metadata = {
  title: "Contact",
  description: DESCRIPTION,
  alternates: {
    canonical: "/contact/",
  },
  openGraph: {
    title: `Contact — ${SITE_NAME}`,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <ContactRoutes />
      </main>
      <Footer />
    </>
  );
}
