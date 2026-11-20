"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { submitEnquiry, type SubmitResult } from "@/lib/submit";
import { track } from "@/lib/analytics";
import { schemas, type EnquiryKind } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { legal } from "@/data/company";

type Values = Record<string, string | boolean>;
type Errors = Record<string, string>;
type Status = "idle" | "submitting" | "success" | "error";

/* ------------------------------ state hook ------------------------------- */

export function useEnquiryForm(kind: EnquiryKind, initial: Values) {
  const [values, setValues] = useState<Values>({ website: "", consent: false, ...initial });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<SubmitResult | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = useCallback(
    (v: Values): Errors => {
      const r = schemas[kind].safeParse(v);
      if (r.success) return {};
      const out: Errors = {};
      for (const issue of r.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !out[key]) out[key] = issue.message;
      }
      return out;
    },
    [kind],
  );

  const allErrors = validate(values);
  const visible = (name: string) => ((submitted || touched[name]) && allErrors[name]) || undefined;

  const set = useCallback((name: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const bind = (name: string) => ({
    name,
    value: (values[name] as string) ?? "",
    error: visible(name),
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => set(name, e.target.value),
    // Only flag a field on blur once the user has typed something: showing an "empty" error
    // while they click Submit shifts the layout under the pointer and swallows the click.
    onBlur: () => { if (String(values[name] ?? "").length > 0) setTouched((t) => ({ ...t, [name]: true })); },
  });

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validate(values);
    const first = Object.keys(errs)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus("submitting");
    const res = await submitEnquiry(kind, values);
    // Only the form name is sent to analytics - never what the visitor typed.
    track(res.ok ? "Enquiry submitted" : "Enquiry failed", { form: kind });
    setResult(res);
    setStatus(res.ok ? "success" : "error");
  };

  const reset = () => {
    setValues({ website: "", consent: false, ...initial });
    setTouched({});
    setSubmitted(false);
    setStatus("idle");
    setResult(null);
  };

  return { values, set, bind, status, result, onSubmit, reset, formRef, errorCount: Object.keys(allErrors).length, submitted };
}

/* ------------------------------- primitives ------------------------------ */

const control =
  "w-full rounded-[2px] border bg-white px-4 text-[1.0625rem] text-charcoal placeholder:text-muted/70 " +
  "shadow-[0_1px_0_rgb(0_0_0/0.03)] transition-[border-color,box-shadow,background-color] duration-300 " +
  "hover:border-forest-900/45 focus-visible:border-forest-900 focus-visible:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-gold-400)_35%,transparent)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

interface FieldShellProps {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: (a: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
}

export function Field({ label, name, error, hint, required, className, children }: FieldShellProps) {
  const uid = useId();
  const id = `${uid}-${name}`;
  const hintId = hint ? `${id}-hint` : undefined;
  const errId = error ? `${id}-err` : undefined;
  const describedBy = [hintId, errId].filter(Boolean).join(" ") || undefined;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2.5 block text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-forest-900">
        {label}
        {required ? <span aria-hidden className="text-error"> *</span> : <span className="ml-2 font-normal normal-case tracking-normal text-muted">Optional</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children({ id, describedBy, invalid: !!error })}
      {hint && !error && <p id={hintId} className="mt-1.5 text-small text-muted">{hint}</p>}
      {error && (
        <p id={errId} role="alert" className="mt-1.5 flex items-start gap-1.5 text-small font-medium text-error">
          <svg aria-hidden viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0" fill="currentColor"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.5h1.5v4.5h-1.5V4.5Zm0 6h1.5V12h-1.5v-1.5Z" /></svg>
          {error}
        </p>
      )}
    </div>
  );
}

interface BoundProps {
  name: string;
  value: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
}

export function TextField({
  label, hint, required, type = "text", autoComplete, inputMode, placeholder, className, bound,
}: {
  label: string; hint?: string; required?: boolean; type?: string; autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric"; placeholder?: string; className?: string; bound: BoundProps;
}) {
  const { name, value, error, onChange, onBlur } = bound;
  return (
    <Field label={label} name={name} error={error} hint={hint} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <input
          id={id} name={name} type={type} value={value} onChange={onChange} onBlur={onBlur}
          autoComplete={autoComplete} inputMode={inputMode} placeholder={placeholder}
          aria-invalid={invalid || undefined} aria-describedby={describedBy} aria-required={required || undefined}
          className={cn(control, "min-h-[3.5rem]", invalid ? "border-error" : "border-field-border")}
        />
      )}
    </Field>
  );
}

export function TextAreaField({
  label, hint, required, rows = 4, placeholder, className, bound,
}: { label: string; hint?: string; required?: boolean; rows?: number; placeholder?: string; className?: string; bound: BoundProps }) {
  const { name, value, error, onChange, onBlur } = bound;
  return (
    <Field label={label} name={name} error={error} hint={hint} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <textarea
          id={id} name={name} rows={rows} value={value} onChange={onChange} onBlur={onBlur} placeholder={placeholder}
          aria-invalid={invalid || undefined} aria-describedby={describedBy} aria-required={required || undefined}
          className={cn(control, "resize-y py-3 leading-relaxed", invalid ? "border-error" : "border-field-border")}
        />
      )}
    </Field>
  );
}

export function SelectField({
  label, hint, required, options, placeholder = "Select…", className, bound,
}: { label: string; hint?: string; required?: boolean; options: readonly string[]; placeholder?: string; className?: string; bound: BoundProps }) {
  const { name, value, error, onChange, onBlur } = bound;
  return (
    <Field label={label} name={name} error={error} hint={hint} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <div className="relative">
          <select
            id={id} name={name} value={value} onChange={onChange} onBlur={onBlur}
            aria-invalid={invalid || undefined} aria-describedby={describedBy} aria-required={required || undefined}
            className={cn(control, "min-h-[3.5rem] appearance-none pr-11", invalid ? "border-error" : "border-field-border", !value && "text-muted")}
          >
            <option value="">{placeholder}</option>
            {options.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <svg aria-hidden viewBox="0 0 10 6" className="pointer-events-none absolute right-4 top-1/2 h-1.5 w-2.5 -translate-y-1/2 text-forest-900" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 1l4 4 4-4" /></svg>
        </div>
      )}
    </Field>
  );
}

/**
 * A numbered group of fields ("01 Your details"). Renders a real <fieldset>/<legend> so assistive tech
 * announces the group, with a quiet gold-ringed step number and a hairline that closes the heading.
 */
export function FormSection({ step, title, hint, children }: { step: string; title: string; hint?: string; children: ReactNode }) {
  return (
    <fieldset className="min-w-0 border-0 p-0">
      <legend className="mb-7 flex w-full items-center gap-4 p-0">
        <span aria-hidden className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold-500 font-display text-[1rem] text-forest-900 [font-variant-numeric:lining-nums]">{step}</span>
        <span className="min-w-0">
          <span className="block font-display text-[1.375rem] leading-tight text-forest-900">{title}</span>
          {hint && <span className="mt-0.5 block text-small font-normal text-muted">{hint}</span>}
        </span>
      </legend>
      <div className="space-y-6">{children}</div>
    </fieldset>
  );
}

/** Hidden from people, tempting to bots. */
export function Honeypot({ bound }: { bound: BoundProps }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={bound.value} onChange={bound.onChange} />
      </label>
    </div>
  );
}

export function ConsentField({
  checked, onChange, error, children,
}: { checked: boolean; onChange: (v: boolean) => void; error?: string; children: ReactNode }) {
  const id = useId();
  return (
    <div className="border border-hairline bg-ivory-200 p-5">
      <div className="flex items-start gap-3">
        <input
          id={id} name="consent" type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error || undefined} aria-describedby={error ? `${id}-err` : undefined}
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer appearance-none rounded-[2px] border border-field-border bg-white transition-colors checked:border-forest-900 checked:bg-forest-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
          style={checked ? { backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='%23f7f3ea' stroke-width='2'><path d='M5 10.5l3.5 3.5L15 6.5'/></svg>\")", backgroundSize: "100%" } : undefined}
        />
        <label htmlFor={id} className="cursor-pointer text-small leading-relaxed text-charcoal">{children}</label>
      </div>
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-small font-medium text-error">{error}</p>}
    </div>
  );
}

/* --------------------------------- shells -------------------------------- */

export function FormDisclaimer({ variant = "developer", className }: { variant?: "developer" | "general"; className?: string }) {
  return (
    <p className={cn("flex gap-2.5 text-small leading-relaxed text-muted", className)}>
      <svg aria-hidden viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0 text-label" fill="none" stroke="currentColor" strokeWidth="1.3"><circle cx="8" cy="8" r="6.5" /><path d="M8 7v4M8 4.8v.4" /></svg>
      <span>{variant === "developer" ? legal.formDisclaimer : legal.generalFormNote}</span>
    </p>
  );
}

export function SubmitRow({ status, label = "Send enquiry", error }: { status: Status; label?: string; error?: string }) {
  return (
    <div className="flex flex-col gap-4 border-t border-hairline pt-8">
      <Button type="submit" size="lg" arrow disabled={status === "submitting"} aria-busy={status === "submitting"} className="w-full sm:w-auto sm:min-w-[16rem]">
        {status === "submitting" ? "Sending…" : label}
      </Button>
      <div aria-live="polite" className="min-h-5">
        {status === "error" && (
          <p role="alert" className="flex items-start gap-2 border-l-2 border-error bg-ivory-200 px-4 py-3 text-small font-medium text-error">
            <svg aria-hidden viewBox="0 0 16 16" className="mt-1 h-3.5 w-3.5 shrink-0" fill="currentColor"><path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.5h1.5v4.5h-1.5V4.5Zm0 6h1.5V12h-1.5v-1.5Z" /></svg>
            {error || "We couldn’t send your enquiry. Please try again."}
          </p>
        )}
      </div>
    </div>
  );
}

export function SuccessPanel({ result, onReset, title = "Thank you — your enquiry is in." }: { result: SubmitResult | null; onReset: () => void; title?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // The form just unmounted, so move focus here: keyboard and screen-reader users land on the confirmation.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    el.scrollIntoView({ block: "center", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, []);

  return (
    <div ref={ref} role="status" tabIndex={-1} className="outline-none">
      <div className="flex items-center gap-4">
        <span aria-hidden className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-gold-400 text-forest-950">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <span className="text-eyebrow text-label">Enquiry received</span>
      </div>

      <h3 className="text-h3 mt-7 text-forest-900 text-balance">{title}</h3>
      <p className="mt-4 max-w-md text-muted">
        A member of the Nikunj Homes team will get back to you using the details you shared.
      </p>

      {result?.reference && (
        <dl className="mt-8 inline-grid gap-1 border-l-2 border-gold-500 bg-ivory-200 py-3 pl-5 pr-8">
          <dt className="text-small text-muted">Your reference</dt>
          <dd className="font-display text-[1.375rem] tracking-wide text-forest-900">{result.reference}</dd>
        </dl>
      )}
      {result?.reference && <p className="mt-3 text-small text-muted">Quote this reference if you contact us about this enquiry.</p>}
      {result?.confirmationSent && <p className="mt-3 text-small text-muted">A short confirmation has been sent to your email.</p>}

      {result?.mock && (
        <p className="mt-6 border-l-2 border-bronze bg-ivory-200 px-4 py-3 text-small text-charcoal">
          <strong>Demo mode:</strong> this enquiry was validated but <strong>not sent</strong>. Email / CRM delivery has not been connected yet.
        </p>
      )}

      <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-hairline pt-7">
        <Link href="/" className="link-underline text-small font-semibold text-forest-900">Back to home</Link>
        <button type="button" onClick={onReset} className="link-underline text-small font-semibold text-forest-900">Send another enquiry</button>
      </div>
    </div>
  );
}
