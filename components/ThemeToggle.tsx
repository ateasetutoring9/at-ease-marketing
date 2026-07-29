"use client";

// Light/dark toggle. The actual theme is just a `dark` class on <html> (see
// app/globals.css for the color overrides and app/layout.tsx for the
// flash-prevention inline script) — this component only flips that class
// and remembers the choice in localStorage.
//
// `mounted` starts false so the very first client render matches the
// server-rendered placeholder exactly (the server can't know the theme —
// static export, no cookies). It flips true in an effect right after mount,
// swapping in the real icon. Avoids a hydration mismatch at the cost of the
// icon appearing a frame late, which is unnoticeable in practice.

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setDark(next);
  }

  if (!mounted) {
    return <div className="w-[88px] h-6" aria-hidden="true" />;
  }

  return (
    <div className="flex items-center gap-1.5">
      <Sun
        aria-hidden="true"
        className={`h-4 w-4 transition-colors ${dark ? "text-muted" : "text-fg"}`}
      />
      <button
        type="button"
        role="switch"
        aria-checked={dark}
        onClick={toggle}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          dark ? "bg-accent" : "bg-border-strong"
        }`}
      >
        <span
          aria-hidden="true"
          className={`inline-block h-4 w-4 transform rounded-full bg-card shadow-hover transition-transform ${
            dark ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
      <Moon
        aria-hidden="true"
        className={`h-4 w-4 transition-colors ${dark ? "text-fg" : "text-muted"}`}
      />
    </div>
  );
}
