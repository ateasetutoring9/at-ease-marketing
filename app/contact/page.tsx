import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ContactRoutes from "@/components/ContactRoutes";
import { SITE_NAME, OG_IMAGE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${SITE_NAME} team.`,
  alternates: {
    canonical: "/contact/",
  },
  openGraph: {
    title: `Contact — ${SITE_NAME}`,
    description: `Get in touch with the ${SITE_NAME} team.`,
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <ContactRoutes />
      </main>
      <Footer />
    </>
  );
}
