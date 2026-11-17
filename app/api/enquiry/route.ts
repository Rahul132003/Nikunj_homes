import { NextResponse } from "next/server";
import { schemas, type EnquiryKind } from "@/lib/validation";

/**
 * MOCK enquiry endpoint.
 *
 * ▶ To go live, replace the marked block with a real integration — e.g. send an
 *   email (Resend / SES / SMTP) or POST to your CRM (HubSpot, Zoho, LeadSquared).
 *   Validation, honeypot handling and the response shape can stay as they are.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const { kind, values } = (body ?? {}) as { kind?: string; values?: unknown };
  if (!kind || !(kind in schemas)) {
    return NextResponse.json({ ok: false, error: "Unknown form" }, { status: 400 });
  }

  const parsed = schemas[kind as EnquiryKind].safeParse(values);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields" }, { status: 422 });
  }

  /* ───────────── CONNECT EMAIL / CRM HERE ───────────── */
  const reference = `NH-${Date.now().toString(36).toUpperCase()}`;
  if (process.env.NODE_ENV !== "production") {
    // Never log personal data in production.
    console.info(`[mock enquiry] ${kind} → ${reference}`, Object.keys(parsed.data));
  }
  /* ──────────────────────────────────────────────────── */

  // `mock: true` makes the form tell visitors the enquiry was NOT actually sent.
  // ▶ Remove it (or set false) once email / CRM delivery is connected above.
  return NextResponse.json({ ok: true, reference, mock: true });
}
