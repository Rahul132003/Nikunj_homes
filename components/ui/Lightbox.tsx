"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import type { ProjectImage } from "@/data/projects";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Accessible lightbox: focus trap, Esc to close, ← → to navigate, scroll lock,
 * focus returns to the thumbnail that opened it.
 */
export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
  note,
}: {
  images: ProjectImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
  note?: string;
}) {
  const open = index !== null;
  const ref = useRef<HTMLDivElement>(null);
  const count = images.length;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndex((index + dir + count) % count);
    },
    [index, count, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const focusables = () => Array.from(ref.current?.querySelectorAll<HTMLElement>("button") ?? []);
    focusables().find((b) => b.dataset.close)?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key === "ArrowRight") return go(1);
      if (e.key === "ArrowLeft") return go(-1);
      if (e.key === "Tab") {
        const f = focusables();
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [open, onClose, go]);

  const img = index !== null ? images[index] : null;

  return (
    <AnimatePresence>
      {open && img && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          data-lenis-prevent
          className="fixed inset-0 z-[70] flex flex-col bg-forest-950/95 text-ivory backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8">
            <p aria-live="polite" className="text-small text-sage">{index! + 1} / {count}</p>
            <button data-close type="button" onClick={onClose} aria-label="Close image viewer" className="flex h-12 w-12 items-center justify-center text-ivory">
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 5l14 14M19 5L5 19" /></svg>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
            <button type="button" onClick={() => go(-1)} aria-label="Previous image" className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/50 text-ivory transition-colors hover:bg-gold-500 hover:text-forest-950 sm:left-6">
              <svg aria-hidden viewBox="0 0 20 10" className="h-2.5 w-5 rotate-180" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
            </button>
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease }}
              className="flex max-h-full max-w-full flex-col items-center"
            >
              <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="90vw" className="max-h-[68svh] w-auto max-w-full object-contain" />
            </motion.div>
            <button type="button" onClick={() => go(1)} aria-label="Next image" className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold-500/50 text-ivory transition-colors hover:bg-gold-500 hover:text-forest-950 sm:right-6">
              <svg aria-hidden viewBox="0 0 20 10" className="h-2.5 w-5" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
            </button>
          </div>

          <div className="px-5 pb-6 pt-4 text-center sm:px-8">
            {img.caption && <p className="font-display text-[1.75rem] leading-none">{img.caption}</p>}
            {note && <p className="mx-auto mt-3 max-w-xl text-small text-sage">{note}</p>}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
