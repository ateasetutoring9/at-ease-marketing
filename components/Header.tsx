"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { APP_URL } from "@/lib/constants";

const navLinks = [
  { href: "/features/", label: "Features" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/curriculum/", label: "Curriculum" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="px-4 py-4 bg-page border-b border-border">
      <div className="max-w-page mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
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

        <nav className="hidden lg:flex items-center gap-3">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" size="sm" href={link.href}>
              {link.label}
            </Button>
          ))}
          <ThemeToggle />
          <Button variant="ghost" size="sm" href={`${APP_URL}/login`}>
            Log in
          </Button>
          <Button variant="primary" size="sm" href={`${APP_URL}/signup`}>
            Sign up free
          </Button>
        </nav>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="p-2 -mr-2 text-fg"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden mt-4 max-w-page mx-auto flex flex-col gap-1 pt-4 border-t border-border">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-2 py-3 text-fg font-medium rounded-md hover:bg-panel transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`${APP_URL}/login`}
            className="px-2 py-3 text-fg font-medium rounded-md hover:bg-panel transition-colors"
          >
            Log in
          </a>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              href={`${APP_URL}/signup`}
              className="w-full"
            >
              Sign up free
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
