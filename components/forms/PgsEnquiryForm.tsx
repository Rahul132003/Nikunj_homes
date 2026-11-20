"use client";

import { useEffect } from "react";
import { ConsentField, FormDisclaimer, FormSection, Honeypot, SelectField, SubmitRow, SuccessPanel, TextAreaField, TextField, useEnquiryForm } from "./FormKit";

import { PGS_ENQUIRE_EVENT } from "@/lib/events";

/**
 * PGS GREENS enquiry. Listens for the layout plan's "Enquire about plot N"
 * button (a decoupled window event), prefills the plot and scrolls here.
 */
export function PgsEnquiryForm({ sectionId = "enquire" }: { sectionId?: string }) {
  const f = useEnquiryForm("pgs-greens", { name: "", phone: "", email: "", plot: "", interest: "", message: "" });
  const { set } = f;

  useEffect(() => {
    const onEnquire = (e: Event) => {
      const plot = (e as CustomEvent<{ plot: string }>).detail?.plot;
      if (plot) set("plot", plot);
      const el = document.getElementById(sectionId);
      el?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      window.setTimeout(() => el?.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true }), 700);
    };
    window.addEventListener(PGS_ENQUIRE_EVENT, onEnquire);
    return () => window.removeEventListener(PGS_ENQUIRE_EVENT, onEnquire);
  }, [set, sectionId]);

  if (f.status === "success") return <SuccessPanel result={f.result} onReset={f.reset} />;

  return (
    <form ref={f.formRef} onSubmit={f.onSubmit} noValidate className="relative flex flex-col gap-12" aria-label="PGS GREENS enquiry">
      <Honeypot bound={f.bind("website")} />

      <FormSection step="1" title="Your details" hint="So we know who to speak to.">
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField label="Full name" required autoComplete="name" bound={f.bind("name")} />
          <TextField label="Mobile number" required type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 98XXXXXXXX" bound={f.bind("phone")} />
        </div>
        <TextField label="Email" type="email" inputMode="email" autoComplete="email" bound={f.bind("email")} />
      </FormSection>

      <FormSection step="2" title="Your interest in PGS GREENS" hint="Pick a plot from the layout plan, or tell us what you’d like to know.">
        <div className="grid gap-6 sm:grid-cols-2">
          <TextField label="Plot of interest" hint="Select one on the layout plan, or type a number" placeholder="e.g. 17 or 43A" bound={f.bind("plot")} />
          <SelectField label="I’d like to know about" required options={["Site visit", "Plot details", "Pricing", "Something else"]} bound={f.bind("interest")} />
        </div>
        <TextAreaField label="Message" rows={4} bound={f.bind("message")} />
      </FormSection>

      <div className="space-y-6">
        <ConsentField checked={f.values.consent === true} onChange={(v) => f.set("consent", v)} error={f.submitted && f.values.consent !== true ? "Please confirm so we can respond to your enquiry" : undefined}>
          I agree to Nikunj Homes contacting me about PGS GREENS.
        </ConsentField>
        <FormDisclaimer />
        <SubmitRow status={f.status} error={f.result?.error} label="Send enquiry" />
      </div>
    </form>
  );
}
