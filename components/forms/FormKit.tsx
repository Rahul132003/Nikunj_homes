"use client";

import { useCallback, useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { submitEnquiry, type SubmitResult } from "@/lib/submit";
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
  "w-full rounded-[2px] border bg-white px-4 text-base text-charcoal placeholder:text-muted/80 transition-colors duration-300 " +
  "focus-visible:border-forest-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus";

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
      <label htmlFor={id} className="mb-2 block text-small font-semibold text-forest-900">
        {label}
        {required ? <span aria-hidden className="text-error"> *</span> : <span className="ml-1.5 font-normal text-muted">(optional)</span>}
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
          className={cn(control, "min-h-12", invalid ? "border-error" : "border-field-border")}
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
            className={cn(control, "min-h-12 appearance-none pr-11", invalid ? "border-error" : "border-field-border", !value && "text-muted")}
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
    <div>
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

export function SubmitRow({ status, label = "Send enquiry" }: { status: Status; label?: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Button type="submit" size="lg" arrow disabled={status === "submitting"} aria-busy={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending…" : label}
      </Button>
      <div aria-live="polite" className="min-h-5 text-small font-medium text-error">
        {status === "error" && "We couldn’t send your enquiry. Please try again."}
      </div>
    </div>
  );
}

export function SuccessPanel({ result, onReset, title = "Thank you — your enquiry is in." }: { result: SubmitResult | null; onReset: () => void; title?: string }) {
  return (
    <div role="status" className="border border-forest-700/30 bg-white p-8 sm:p-10">
      <svg aria-hidden viewBox="0 0 40 40" className="h-10 w-10 text-forest-700" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="20" cy="20" r="18" /><path d="M12 20.5l5.5 5.5L28 14.5" /></svg>
      <h3 className="text-h3 mt-5 text-forest-900">{title}</h3>
      {result?.reference && <p className="mt-3 text-small text-muted">Reference: <span className="font-semibold text-charcoal">{result.reference}</span></p>}
      {result?.mock && (
        <p className="mt-5 border-l-2 border-bronze bg-ivory-200 px-4 py-3 text-small text-charcoal">
          <strong>Demo mode:</strong> this enquiry was validated but <strong>not sent</strong>. Email / CRM delivery has not been connected yet.
        </p>
      )}
      <button type="button" onClick={onReset} className="link-underline mt-7 text-small font-semibold text-forest-900">Send another enquiry</button>
    </div>
  );
}
