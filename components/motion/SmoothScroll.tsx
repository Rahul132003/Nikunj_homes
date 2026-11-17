"use client";

import { useEffect } from "react";

/**
 * Lenis smooth scrolling — only for fine pointers (mouse/trackpad) and never
 * when the user prefers reduced motion. Touch devices keep native momentum.
 * The library is imported on demand so it never competes with first paint.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduce || coarse) return;

    let destroy: (() => void) | undefined;
    let cancelled = false;
    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      const lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => 1 - Math.pow(1 - t, 3.2),
        smoothWheel: true,
        autoRaf: true,
      });
      destroy = () => lenis.destroy();
    };

    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    if (idle) idle(start);
    else window.setTimeout(start, 200);

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return null;
}
