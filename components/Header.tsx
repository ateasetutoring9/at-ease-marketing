import Link from "next/link";
import { APP_URL } from "@/lib/constants";

export function Header() {
  return (
    <header className="border-b border-border bg-page px-4 py-4">
      <div className="mx-auto flex max-w-[1120px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          {/* Inline SVG — no external asset dependency */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <rect width="32" height="32" rx="8" fill="#2D5F4C" />
            <path
              d="M16 7C16 7 9 11 9 18c0 3.87 3.13 7 7 7s7-3.13 7-7c0-7-7-11-7-11Z"
              fill="white"
              opacity="0.9"
            />
            <path
              d="M16 14v8"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <span className="font-semibold text-fg">At Ease Learning</span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1">
          <Link
            href="/pricing/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-fg"
          >
            Pricing
          </Link>
          <Link
            href="/about/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-fg"
          >
            About
          </Link>
          <Link
            href="/contact/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-accent-soft hover:text-fg"
          >
            Contact
          </Link>
          <a
            href={APP_URL}
            className="ml-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#235240]"
          >
            Log in
          </a>
        </nav>
      </div>
    </header>
  );
}
