import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { APP_URL } from "@/lib/constants";

export function Header() {
  return (
    <header className="px-4 py-4 bg-page border-b border-border">
      <div className="max-w-page mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.png"
            alt="At Ease Tutoring"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-medium text-fg text-base">At Ease Tutoring</span>
        </Link>
        <nav className="flex items-center gap-3">
          <Button variant="ghost" size="sm" href="/pricing/">
            Pricing
          </Button>
          <Button variant="ghost" size="sm" href="/guides/">
            Guides
          </Button>
          <Button variant="ghost" size="sm" href="/about/">
            About
          </Button>
          <Button variant="ghost" size="sm" href="/contact/">
            Contact
          </Button>
          <Button variant="ghost" size="sm" href={`${APP_URL}/login`}>
            Log in
          </Button>
          <Button variant="primary" size="sm" href={`${APP_URL}/signup`}>
            Sign up free
          </Button>
        </nav>
      </div>
    </header>
  );
}
