"use client";

import { listingKey, useShortlist } from "@/lib/shortlist";
import { cn } from "@/lib/cn";

/** Heart toggle that saves a property to this browser's shortlist. */
export function ShortlistButton({ category, slug, title, className, withLabel }: { category: string; slug: string; title: string; className?: string; withLabel?: boolean }) {
  const { has, toggle } = useShortlist();
  const key = listingKey(category, slug);
  const saved = has(key);
  return (
    <button
      type="button"
      onClick={() => toggle(key)}
      aria-pressed={saved}
      // the accessible name starts with the visible text ("Save" / "Saved") so voice-control users can say what they see
      aria-label={saved ? `Saved: remove ${title} from shortlist` : `Save ${title} to shortlist`}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border text-small font-semibold backdrop-blur transition-colors duration-300",
        saved ? "border-gold-500 bg-gold-400 text-forest-950" : "border-forest-900/25 bg-ivory/90 text-forest-900 hover:border-forest-900 hover:bg-forest-900 hover:text-ivory",
        withLabel ? "px-5" : "w-11",
        className,
      )}
    >
      <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z" />
      </svg>
      {withLabel && <span>{saved ? "Saved" : "Save"}</span>}
    </button>
  );
}
