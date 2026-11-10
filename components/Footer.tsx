import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-page">
      <div className="max-w-page mx-auto flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="At Ease Tutoring"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-display font-medium text-fg">At Ease Tutoring</span>
          </Link>
          <p className="text-small text-muted max-w-xs text-center">
            Free, high-quality education for Year 7–12 Australian students.
          </p>
        </div>
        <nav
          aria-label="Footer"
          className="grid grid-cols-2 sm:grid-cols-5 justify-items-center gap-x-8 gap-y-3 text-center"
        >
          <Link href="/features/" className="text-small text-muted hover:text-fg transition-colors">
            Features
          </Link>
          <Link href="/curriculum/" className="text-small text-muted hover:text-fg transition-colors">
            Curriculum
          </Link>
          <Link href="/guides/" className="text-small text-muted hover:text-fg transition-colors">
            Guides
          </Link>
          <Link href="/distance-education/" className="text-small text-muted hover:text-fg transition-colors">
            Distance education
          </Link>
          <Link href="/pricing/" className="text-small text-muted hover:text-fg transition-colors">
            Pricing
          </Link>
          <Link href="/about/" className="text-small text-muted hover:text-fg transition-colors">
            About
          </Link>
          <Link href="/contact/" className="text-small text-muted hover:text-fg transition-colors">
            Contact
          </Link>
          <a href={`${APP_URL}/login`} className="text-small text-muted hover:text-fg transition-colors">
            Log in
          </a>
          <a href={`${APP_URL}/signup`} className="text-small text-muted hover:text-fg transition-colors">
            Sign up
          </a>
          <a href={`${APP_URL}/privacy`} className="text-small text-muted hover:text-fg transition-colors">
            Privacy
          </a>
        </nav>
      </div>
      <p className="mt-10 text-center text-small text-muted">
        © {new Date().getFullYear()} At Ease Tutoring. All rights reserved.
      </p>
    </footer>
  );
}
