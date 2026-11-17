"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/cn";

/**
 * Property-detail gallery: large stage + thumbnail rail, arrow keys when focused.
 * Slots are named placeholders; pass real image objects here when photos arrive.
 */
export function ListingGallery({ slots }: { slots: string[] }) {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((v) => (v + d + slots.length) % slots.length);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Property images"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
      }}
    >
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            aria-live="polite"
          >
            <ImagePlaceholder label={slots[i]} ratio="16 / 10" className="text-forest-700" />
          </motion.div>
        </AnimatePresence>
        {(["prev", "next"] as const).map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => go(d === "next" ? 1 : -1)}
            aria-label={d === "next" ? "Next image" : "Previous image"}
            className={cn(
              "absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-forest-900/30 bg-ivory/90 text-forest-900 backdrop-blur transition-colors hover:bg-forest-900 hover:text-ivory",
              d === "next" ? "right-4" : "left-4",
            )}
          >
            <svg aria-hidden viewBox="0 0 20 10" className={cn("h-2.5 w-5", d === "prev" && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
          </button>
        ))}
        <p className="absolute bottom-3 right-4 rounded-[2px] bg-forest-950/85 px-2.5 py-1 text-[0.75rem] font-semibold text-ivory">{i + 1} / {slots.length}</p>
      </div>
      <ul className="mt-3 grid grid-cols-4 gap-3">
        {slots.map((s, idx) => (
          <li key={s}>
            <button
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show image ${idx + 1}`}
              aria-current={idx === i}
              className={cn("block w-full border-2 transition-colors", idx === i ? "border-forest-900" : "border-transparent opacity-70 hover:opacity-100")}
            >
              <ImagePlaceholder label={`Image ${idx + 1}`} ratio="4 / 3" className="text-forest-700 [&_span]:text-[0.6875rem] [&_svg]:h-5 [&_svg]:w-5" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
