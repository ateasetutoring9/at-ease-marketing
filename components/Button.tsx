/*
 * Intentional duplication of the app's Button — do NOT extract to a shared
 * package. This site is zero-dependency on the app repo. See CLAUDE.md.
 */
import type { AnchorHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-hover",
  secondary:
    "bg-card text-fg border border-border hover:bg-accent-soft",
  ghost:
    "text-muted hover:text-fg hover:bg-accent-soft",
};

const sizeClass: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      {...props}
      className={[
        "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
        variantClass[variant],
        sizeClass[size],
        className,
      ].join(" ")}
    >
      {children}
    </a>
  );
}
