import { cn } from "@/lib/cn";

/**
 * A *named* placeholder — used wherever a real image is missing, instead of an
 * unrelated stock photo. The label says exactly what is to be supplied.
 */
export function ImagePlaceholder({
  label,
  className,
  ratio = "4 / 3",
}: {
  label: string;
  className?: string;
  /** CSS aspect-ratio, e.g. "16 / 9". Pass "" to fill a sized parent. */
  ratio?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Placeholder: ${label}`}
      className={cn("placeholder-fill relative flex w-full items-center justify-center overflow-hidden", className)}
      style={ratio ? { aspectRatio: ratio } : undefined}
      data-placeholder
    >
      <div className="flex max-w-[85%] flex-col items-center gap-3 text-center">
        <svg aria-hidden viewBox="0 0 48 48" className="h-8 w-8 opacity-60" fill="none" stroke="currentColor" strokeWidth="1.25">
          <rect x="5" y="9" width="38" height="30" rx="1" />
          <path d="M5 33l11-11 8 8 6-6 13 13" />
          <circle cx="32" cy="19" r="3" />
        </svg>
        <span className="text-small font-medium italic opacity-80">[{label}]</span>
      </div>
    </div>
  );
}
