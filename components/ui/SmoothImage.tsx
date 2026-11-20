"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * next/image with a quiet loading state: a soft skeleton shows until the photograph has loaded,
 * then the photograph fades in (opacity only). Use inside a `relative` parent, like any `fill` image.
 *  - Images marked `priority` (above the fold / LCP) skip the fade so they are never held back.
 *  - Images that were already loaded before hydration are detected, so they never stay invisible.
 *  - Reduced motion: no fade, no shimmer (see .skeleton in globals.css).
 */
export function SmoothImage({ className, priority, onLoad, ...props }: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  // Callback ref: an SSR'd image may finish loading before React attaches onLoad.
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img && img.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  if (priority) return <Image {...props} priority className={className} onLoad={onLoad} />;

  return (
    <>
      {!loaded && <span aria-hidden className="skeleton absolute inset-0" />}
      <Image
        {...props}
        ref={ref}
        onLoad={(e) => {
          setLoaded(true);
          onLoad?.(e);
        }}
        className={cn("transition-opacity duration-700 ease-out motion-reduce:transition-none", loaded ? "opacity-100" : "opacity-0", className)}
      />
    </>
  );
}
