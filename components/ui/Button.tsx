import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "gold" | "outline" | "outline-light" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-[2px] font-semibold tracking-[0.04em] " +
  "transition-[background-color,color,border-color] duration-500 ease-out " +
  "disabled:pointer-events-none disabled:opacity-50 select-none";

const sizes: Record<Size, string> = {
  md: "min-h-12 px-7 text-[0.9375rem]",
  lg: "min-h-14 px-9 text-base",
};

const variants: Record<Variant, string> = {
  /* forest on ivory: 13.8:1 */
  primary: "bg-forest-900 text-ivory hover:bg-forest-700 border border-forest-900 hover:border-forest-700",
  /* gold block, forest text: 6.8:1 — for use on dark sections */
  gold: "bg-gold-500 text-forest-950 hover:bg-gold-300 border border-gold-500 hover:border-gold-300",
  outline: "border border-forest-900 text-forest-900 hover:bg-forest-900 hover:text-ivory",
  "outline-light": "border border-gold-500/70 text-ivory hover:bg-gold-500 hover:text-forest-950 hover:border-gold-500",
  ghost: "text-forest-900 hover:text-forest-700 px-0 min-h-11",
};

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 10"
      className="h-2.5 w-5 shrink-0 transition-transform duration-500 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M0 5h18M14 1l4 4-4 4" />
    </svg>
  );
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

export function buttonClasses({ variant = "primary", size = "md", className }: Pick<CommonProps, "variant" | "size" | "className">) {
  return cn(base, variant === "ghost" ? "" : sizes[size], variants[variant], className);
}

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}

export function LinkButton({
  href,
  variant,
  size,
  arrow,
  className,
  children,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const cls = buttonClasses({ variant, size, className });
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        {arrow && <Arrow />}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}
