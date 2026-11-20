/**
 * Single place to configure enquiry delivery. Server-only: never import this from a client component.
 *
 * Destination email — change it in ONE place: the ENQUIRY_TO_EMAIL environment variable
 * (.env.local locally, Project → Settings → Environment Variables on Vercel).
 * Several recipients: comma-separate them.
 */
export const enquiryConfig = {
  /** Where enquiries are delivered. */
  get to(): string[] {
    return (process.env.ENQUIRY_TO_EMAIL ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  },
  /** Sender. Resend's test sender only delivers to your own Resend account email until a domain is verified. */
  get from(): string {
    return process.env.ENQUIRY_FROM_EMAIL || "Nikunj Homes <onboarding@resend.dev>";
  },
  /** Secret — read on the server only, never sent to the browser. */
  get resendApiKey(): string | undefined {
    return process.env.RESEND_API_KEY || undefined;
  },
  /** Spam protection: at most `max` submissions per IP per `windowMs`. */
  rateLimit: { max: 5, windowMs: 10 * 60 * 1000 },
  /** Timezone used for the timestamp in the notification email. */
  timeZone: "Asia/Kolkata",
} as const;
