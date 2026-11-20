"use client";

import { categoryOptions } from "@/lib/validation";
import { ConsentField, FormDisclaimer, Honeypot, SelectField, SubmitRow, SuccessPanel, TextAreaField, TextField, useEnquiryForm } from "./FormKit";

export function BuyInvestForm() {
  const f = useEnquiryForm("buy-invest", { name: "", phone: "", email: "", intent: "", category: "", budget: "", location: "", timeline: "", message: "" });
  if (f.status === "success") return <SuccessPanel result={f.result} onReset={f.reset} />;

  return (
    <form ref={f.formRef} onSubmit={f.onSubmit} noValidate className="relative space-y-6" aria-label="Buy or invest enquiry">
      <Honeypot bound={f.bind("website")} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Full name" required autoComplete="name" bound={f.bind("name")} />
        <TextField label="Mobile number" required type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 98XXXXXXXX" bound={f.bind("phone")} />
      </div>
      <TextField label="Email" type="email" inputMode="email" autoComplete="email" bound={f.bind("email")} />
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField label="I want to" required options={["Buy", "Invest", "Not sure yet"]} bound={f.bind("intent")} />
        <SelectField label="Property type" required options={categoryOptions} bound={f.bind("category")} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Budget" hint="A range is fine" bound={f.bind("budget")} />
        <TextField label="Preferred location" placeholder="Area / city" bound={f.bind("location")} />
      </div>
      <SelectField label="Timeline" options={["Immediately", "Within 3 months", "3â€“6 months", "Just exploring"]} bound={f.bind("timeline")} />
      <TextAreaField label="Tell us what youâ€™re looking for" rows={4} bound={f.bind("message")} />
      <ConsentField checked={f.values.consent === true} onChange={(v) => f.set("consent", v)} error={f.submitted && f.values.consent !== true ? "Please confirm so we can respond to your enquiry" : undefined}>
        I agree to Nikunj Homes contacting me about this enquiry.
      </ConsentField>
      <FormDisclaimer />
      <SubmitRow status={f.status} error={f.result?.error} />
    </form>
  );
}
