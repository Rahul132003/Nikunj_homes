import { cn } from "@/lib/cn";

/**
 * TEMPORARY typographic wordmark — no Nikunj Homes logo has been supplied.
 * Swap for the real artwork in one place when it arrives. The visible text is
 * the accessible name ("Nikunj Homes"), so no aria-label is needed.
 */
export function Wordmark({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-display text-[1.75rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500 sm:text-[2rem]",
          tone === "light" ? "text-ivory" : "text-forest-900",
        )}
      >
        Nikunj
      </span>
      <span className="mt-1.5 flex items-center gap-2.5">
        <span aria-hidden className={cn("h-px flex-1 transition-colors duration-500", tone === "light" ? "bg-gold-500" : "bg-bronze")} />
        <span
          className={cn(
            "text-[0.625rem] font-bold uppercase tracking-[0.5em] transition-colors duration-500",
            tone === "light" ? "text-gold-400" : "text-bronze",
          )}
        >
          Homes
        </span>
      </span>
    </span>
  );
}
