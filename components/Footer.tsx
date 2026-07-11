import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-page px-4 py-10">
      <div className="mx-auto max-w-[1120px]">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <p className="font-semibold text-fg">At Ease Learning</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Free, curriculum-aligned learning for Western Australian students
              in Years 7–12.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <div className="flex flex-col gap-3">
              <span className="font-medium text-fg">Platform</span>
              <Link
                href="/pricing/"
                className="text-muted transition-colors hover:text-fg"
              >
                Pricing
              </Link>
              <Link
                href="/about/"
                className="text-muted transition-colors hover:text-fg"
              >
                About
              </Link>
              <Link
                href="/contact/"
                className="text-muted transition-colors hover:text-fg"
              >
                Contact
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-medium text-fg">Account</span>
              <a
                href={APP_URL}
                className="text-muted transition-colors hover:text-fg"
              >
                Log in
              </a>
              <a
                href={`${APP_URL}/signup`}
                className="text-muted transition-colors hover:text-fg"
              >
                Sign up free
              </a>
              <a
                href={`${APP_URL}/browse`}
                className="text-muted transition-colors hover:text-fg"
              >
                Browse subjects
              </a>
            </div>
          </nav>
        </div>
        <p className="mt-10 text-center text-xs text-muted">
          © {new Date().getFullYear()} At Ease Learning. All rights reserved.
          WACE and SCSA aligned content.
        </p>
      </div>
    </footer>
  );
}
