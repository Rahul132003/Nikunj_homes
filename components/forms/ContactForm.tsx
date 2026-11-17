"use client";

import { ConsentField, FormDisclaimer, Honeypot, SelectField, SubmitRow, SuccessPanel, TextAreaField, TextField, useEnquiryForm } from "./FormKit";

export function ContactForm() {
  const f = useEnquiryForm("contact", { name: "", phone: "", email: "", subject: "", message: "" });
  if (f.status === "success") return <SuccessPanel result={f.result} onReset={f.reset} title="Thank you — we’ll be in touch." />;

  return (
    <form ref={f.formRef} onSubmit={f.onSubmit} noValidate className="relative space-y-6" aria-label="Contact Nikunj Homes">
      <Honeypot bound={f.bind("website")} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Full name" required autoComplete="name" bound={f.bind("name")} />
        <TextField label="Mobile number" required type="tel" inputMode="tel" autoComplete="tel" bound={f.bind("phone")} />
      </div>
      <TextField label="Email" required type="email" inputMode="email" autoComplete="email" bound={f.bind("email")} />
      <SelectField label="Subject" required options={["General enquiry", "Buying or investing", "Selling a property", "PGS GREENS"]} bound={f.bind("subject")} />
      <TextAreaField label="Message" required rows={5} bound={f.bind("message")} />
      <ConsentField checked={f.values.consent === true} onChange={(v) => f.set("consent", v)} error={f.submitted && f.values.consent !== true ? "Please confirm so we can respond to your enquiry" : undefined}>
        I agree to Nikunj Homes contacting me about this enquiry.
      </ConsentField>
      <FormDisclaimer variant="general" />
      <SubmitRow status={f.status} label="Send message" />
    </form>
  );
}
