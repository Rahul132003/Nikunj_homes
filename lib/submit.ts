import type { EnquiryKind } from "./validation";

export interface SubmitResult {
  ok: boolean;
  reference?: string;
  /** True while delivery is not configured — the UI then says nothing was sent. */
  mock?: boolean;
  /** True when a confirmation email was sent to the visitor. */
  confirmationSent?: boolean;
  error?: string;
}

/**
 * Client-side submit handler used by every form. It posts to /api/enquiry (server route; the API key
 * never reaches the browser) together with the page the form was submitted from.
 */
export async function submitEnquiry(kind: EnquiryKind, values: unknown): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, values, source: window.location.pathname }),
    });
    const data = (await res.json().catch(() => ({}))) as SubmitResult;
    if (!res.ok || !data.ok) return { ok: false, error: data.error ?? "Something went wrong. Please try again." };
    return data;
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}
