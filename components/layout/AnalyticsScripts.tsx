import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

/**
 * Privacy-friendly analytics: cookieless, no personal data.
 *  - Vercel Web Analytics reports page views on Vercel deployments (switch it on in the Vercel dashboard).
 *  - Plausible loads only when NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set (e.g. "nikunjhomes.in").
 * Custom events (form submissions, shortlist) are sent through lib/analytics.ts.
 */
export function AnalyticsScripts() {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <>
      {/* /_vercel/insights only exists on Vercel; locally it would 404 and log a console error */}
      {process.env.VERCEL ? <Analytics /> : null}
      {plausibleDomain && <Script defer data-domain={plausibleDomain} src="https://plausible.io/js/script.js" strategy="afterInteractive" />}
    </>
  );
}
