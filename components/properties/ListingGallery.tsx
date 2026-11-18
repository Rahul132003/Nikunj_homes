"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import type { ListingImage } from "@/data/properties";
import { cn } from "@/lib/cn";

/**
 * Property-detail gallery: large stage + thumbnail rail, arrow keys when focused.
 * Pass the listing's image objects; sample listings use stand-in photographs.
 */
export function ListingGallery({ slots }: { slots: ListingImage[] }) {
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
            <div className="relative aspect-[16/10] overflow-hidden bg-ivory-200"><Image src={slots[i].src} alt={slots[i].alt} fill priority={i === 0} sizes="(min-width:1024px) 66vw, 100vw" className="object-cover" /></div>
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
          <li key={s.src}>
            <button
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Show image ${idx + 1}`}
              aria-current={idx === i}
              className={cn("block w-full border-2 transition-colors", idx === i ? "border-forest-900" : "border-transparent opacity-70 hover:opacity-100")}
            >
              <span className="relative block aspect-[4/3] overflow-hidden"><Image src={s.src} alt="" fill sizes="20vw" className="object-cover" /></span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
