import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="text-7xl font-semibold text-accent">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-fg">
          Page not found
        </h1>
        <p className="mt-3 max-w-sm leading-relaxed text-muted">
          That page doesn&apos;t exist. Try going back to the home page.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#235240]"
        >
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
