import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border bg-page">
      <div className="max-w-page mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        <div className="flex flex-col items-center md:items-start gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.png"
              alt="At Ease Learning"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-display font-medium text-fg">At Ease Learning</span>
          </Link>
          <p className="text-small text-muted max-w-xs text-center md:text-left">
            Free, high-quality education for Year 7–12 Australian students.
          </p>
        </div>
        <nav className="flex flex-wrap justify-center md:justify-end gap-x-8 gap-y-3">
          <Link href="/pricing/" className="text-small text-muted hover:text-fg transition-colors">
            Pricing
          </Link>
          <Link href="/about/" className="text-small text-muted hover:text-fg transition-colors">
            About
          </Link>
          <Link href="/contact/" className="text-small text-muted hover:text-fg transition-colors">
            Contact
          </Link>
          <a href={`${APP_URL}/browse`} className="text-small text-muted hover:text-fg transition-colors">
            Browse subjects
          </a>
          <a href={`${APP_URL}/login`} className="text-small text-muted hover:text-fg transition-colors">
            Log in
          </a>
          <a href={`${APP_URL}/signup`} className="text-small text-muted hover:text-fg transition-colors">
            Sign up
          </a>
        </nav>
      </div>
      <p className="mt-10 text-center text-small text-muted">
        © {new Date().getFullYear()} At Ease Learning. All rights reserved.
      </p>
    </footer>
  );
}
