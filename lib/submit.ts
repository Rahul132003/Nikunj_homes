import type { EnquiryKind } from "./validation";

export interface SubmitResult {
  ok: boolean;
  reference?: string;
  /** True while the endpoint is a mock — the UI then says nothing was sent. */
  mock?: boolean;
  error?: string;
}

/**
 * Client-side submit handler used by every form. It posts to /api/enquiry,
 * which is currently a mock. Swap the route's body (app/api/enquiry/route.ts)
 * to connect email or a CRM — the forms need no changes.
 */
export async function submitEnquiry(kind: EnquiryKind, values: unknown): Promise<SubmitResult> {
  try {
    const res = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, values }),
    });
    const data = (await res.json()) as SubmitResult;
    if (!res.ok || !data.ok) return { ok: false, error: data.error ?? "Something went wrong. Please try again." };
    return data;
  } catch {
    return { ok: false, error: "Network error. Please check your connection and try again." };
  }
}
