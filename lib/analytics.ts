"use client";

import { track as vercelTrack } from "@vercel/analytics";

/**
 * Privacy-friendly event tracking (no cookies, no personal data, nothing stored in the browser).
 *
 * Events go to whichever providers are switched on:
 *   - Vercel Web Analytics: enable it in the Vercel dashboard (Project -> Analytics). Custom events need a Vercel plan that includes them.
 *   - Plausible: set NEXT_PUBLIC_PLAUSIBLE_DOMAIN (see components/layout/AnalyticsScripts.tsx).
 * With neither switched on this does nothing. "Do Not Track" is respected.
 *
 * Never pass names, phone numbers, emails or message text as properties - only coarse labels (e.g. which form).
 */
type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Props }) => void;
  }
}

export function track(event: string, props?: Props) {
  if (typeof window === "undefined") return;
  if (navigator.doNotTrack === "1") return;
  try {
    vercelTrack(event, props);
  } catch {
    /* analytics must never break the site */
  }
  try {
    window.plausible?.(event, props ? { props } : undefined);
  } catch {
    /* ignore */
  }
}
