import { NextResponse } from "next/server";
import { schemas, type EnquiryKind } from "@/lib/validation";
import { enquiryConfig } from "@/lib/enquiry-config";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Enquiry endpoint (server only — the Resend API key and destination email are read from environment
 * variables via lib/enquiry-config.ts and never reach client code).
 *
 * Per submission it: rate-limits by IP → drops honeypot hits silently → validates → emails the enquiry
 * (with source page + timestamp) to the destination → sends the visitor a short confirmation if they gave an email.
 */

export const runtime = "nodejs";

const FORM_LABEL: Record<EnquiryKind, string> = {
  contact: "Contact",
  "buy-invest": "Buy / Invest",
  sell: "Sell your property",
  "pgs-greens": "PGS GREENS",
};

const FIELD_LABEL: Record<string, string> = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  subject: "Subject",
  intent: "Looking to",
  category: "Property type",
  budget: "Budget",
  location: "Location",
  timeline: "Timeline",
  size: "Size",
  expectedPrice: "Expected price",
  plot: "Plot",
  interest: "Interested in",
  message: "Message",
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Single-line, control-character-free text for use in email headers (subject). */
const oneLine = (s: string) => s.replace(/[\u0000-\u001f\u007f]+/g, " ").trim().slice(0, 80);

const FAIL = { ok: false, error: "We couldn’t send your enquiry. Please try again." };

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0].trim() : request.headers.get("x-real-ip")) || "unknown";
}

async function sendEmail(payload: Record<string, unknown>, label: string): Promise<boolean> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${enquiryConfig.resendApiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: enquiryConfig.from, ...payload }),
    });
    if (!res.ok) {
      // Provider reason is logged server-side only; never echoed to the visitor.
      console.error(`[enquiry] Resend rejected ${label}: ${res.status} ${await res.text().catch(() => "")}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`[enquiry] Resend request failed for ${label}:`, err);
    return false;
  }
}

function notification(kind: EnquiryKind, reference: string, source: string, when: string, data: Record<string, unknown>) {
  const rows: (readonly [string, string])[] = Object.entries(data)
    .filter(([k, v]) => k in FIELD_LABEL && typeof v === "string" && v.trim() !== "")
    .map(([k, v]) => [FIELD_LABEL[k], String(v).trim()] as const);
  const meta: (readonly [string, string])[] = [
    ["Form", FORM_LABEL[kind]],
    ["Submitted from", source],
    ["Submitted at", when],
    ["Reference", reference],
  ];

  const text = [
    `New ${FORM_LABEL[kind]} enquiry`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "—",
    ...meta.map(([k, v]) => `${k}: ${v}`),
  ].join("\n");

  const table = (r: (readonly [string, string])[], color: string) =>
    `<table style="font-family:Arial,sans-serif;border-collapse:collapse">` +
    r
      .map(
        ([k, v]) =>
          `<tr><td style="padding:5px 16px 5px 0;color:${color};vertical-align:top">${esc(k)}</td>` +
          `<td style="padding:5px 0;white-space:pre-wrap">${esc(v)}</td></tr>`,
      )
      .join("") +
    `</table>`;

  const html =
    `<h2 style="font-family:Arial,sans-serif">New ${esc(FORM_LABEL[kind])} enquiry</h2>` +
    table(rows, "#555") +
    `<hr style="border:none;border-top:1px solid #ddd;margin:18px 0">` +
    table(meta, "#888");
  return { text, html };
}

function confirmation(name: string, kind: EnquiryKind, reference: string) {
  const first = oneLine(name).split(" ")[0] || "there";
  const text =
    `Hi ${first},\n\nThank you for contacting Nikunj Homes. We have received your ${FORM_LABEL[kind]} enquiry ` +
    `(reference ${reference}) and will get back to you using the details you shared.\n\n` +
    `If you did not make this enquiry, you can ignore this email.\n\n— Nikunj Homes`;
  const html =
    `<div style="font-family:Arial,sans-serif;line-height:1.6;color:#222">` +
    `<p>Hi ${esc(first)},</p>` +
    `<p>Thank you for contacting <strong>Nikunj Homes</strong>. We have received your ${esc(FORM_LABEL[kind])} enquiry ` +
    `(reference <strong>${esc(reference)}</strong>) and will get back to you using the details you shared.</p>` +
    `<p style="color:#666;font-size:13px">If you did not make this enquiry, you can ignore this email.</p>` +
    `<p>— Nikunj Homes</p></div>`;
  return { text, html };
}

export async function POST(request: Request) {
  // 1 — rate limit (before any parsing or sending)
  const limit = rateLimit(clientIp(request), enquiryConfig.rateLimit.max, enquiryConfig.rateLimit.windowMs);
  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries from your connection. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const { kind, values, source } = (body ?? {}) as { kind?: string; values?: Record<string, unknown>; source?: unknown };
  if (!kind || !(kind in schemas)) {
    return NextResponse.json({ ok: false, error: "Unknown form" }, { status: 400 });
  }

  const reference = `NH-${Date.now().toString(36).toUpperCase()}`;

  // 2 — honeypot: real visitors never fill it. Pretend it worked so bots learn nothing; send nothing.
  if (typeof values?.website === "string" && values.website.trim() !== "") {
    return NextResponse.json({ ok: true, reference });
  }

  // 3 — validate
  const parsed = schemas[kind as EnquiryKind].safeParse(values);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Please check the highlighted fields" }, { status: 422 });
  }

  // Not configured yet: stay in demo mode so the form tells the visitor nothing was sent.
  const to = enquiryConfig.to;
  if (!enquiryConfig.resendApiKey || to.length === 0) {
    console.warn("[enquiry] RESEND_API_KEY / ENQUIRY_TO_EMAIL not set — enquiry validated but NOT delivered.");
    return NextResponse.json({ ok: true, reference, mock: true });
  }

  const data = parsed.data as Record<string, unknown>;
  const page = typeof source === "string" && /^\/[\w\-./]{0,199}$/.test(source) ? source : "unknown";
  const when = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "medium", timeZone: enquiryConfig.timeZone }).format(new Date()) +
    ` (${enquiryConfig.timeZone}) · ${new Date().toISOString()}`;
  const visitorEmail = typeof data.email === "string" && data.email.trim() ? data.email.trim() : undefined;

  // 4 — notify the destination
  const n = notification(kind as EnquiryKind, reference, page, when, data);
  const delivered = await sendEmail(
    {
      to,
      subject: `[${reference}] New ${FORM_LABEL[kind as EnquiryKind]} enquiry — ${oneLine(String(data.name ?? ""))}`,
      text: n.text,
      html: n.html,
      ...(visitorEmail ? { reply_to: visitorEmail } : {}),
    },
    reference,
  );
  if (!delivered) return NextResponse.json(FAIL, { status: 502 });

  // 5 — short confirmation to the visitor. Best-effort: a failure here must not fail an enquiry that was delivered.
  let confirmationSent = false;
  if (visitorEmail) {
    const c = confirmation(String(data.name ?? ""), kind as EnquiryKind, reference);
    confirmationSent = await sendEmail(
      { to: [visitorEmail], subject: `We received your enquiry (${reference})`, text: c.text, html: c.html, reply_to: to[0] },
      `${reference} confirmation`,
    );
  }

  return NextResponse.json({ ok: true, reference, confirmationSent });
}
