/*
 * Intentional duplication of the app's Button — do NOT extract to a shared
 * package. This site is zero-dependency on the app repo. See CLAUDE.md.
 */
import Link from "next/link";
import { clsx } from "clsx";
import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
  href: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-accent text-[var(--accent-text-on)] hover:bg-accent-hover " +
    "border border-transparent",
  secondary:
    "bg-transparent text-fg border border-border-strong hover:bg-panel",
  ghost:
    "bg-transparent text-accent border border-transparent hover:underline",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm min-h-[32px]",
  md: "px-5 py-2.5 text-sm min-h-[40px]",
  lg: "px-7 py-3.5 text-base min-h-[52px]",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center rounded-md font-medium",
    "transition-colors duration-150 cursor-pointer select-none",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  // External URLs (app links) use a plain <a>; internal paths use Next.js Link
  if (href.startsWith("http")) {
    return (
      <a href={href} {...rest} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
