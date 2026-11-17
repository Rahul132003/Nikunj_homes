import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small uppercase label with a leading hairline. Colour follows the surface/theme. */
export function Eyebrow({ children, className, line = true }: { children: ReactNode; className?: string; line?: boolean }) {
  return (
    <p className={cn("text-eyebrow inline-flex items-center gap-4 text-label", className)}>
      {line && <span aria-hidden className="h-px w-10 bg-rule" />}
      {children}
    </p>
  );
}

interface HeadingProps {
  as?: ElementType;
  level?: "display" | "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Heading({ as: Tag = "h2", level = "h2", children, className, id }: HeadingProps) {
  const map = { display: "text-display", h1: "text-h1", h2: "text-h2", h3: "text-h3" } as const;
  return (
    <Tag id={id} className={cn(map[level], "text-balance", className)}>
      {children}
    </Tag>
  );
}

/** Inline marker for any content the client still has to supply. */
export function Tbp({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "rounded-[2px] border border-dashed border-current/40 px-1.5 py-0.5 font-medium italic",
        className,
      )}
      data-placeholder
    >
      {children}
    </span>
  );
}
