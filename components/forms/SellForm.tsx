"use client";

import { categoryOptions } from "@/lib/validation";
import { ConsentField, FormDisclaimer, Honeypot, SelectField, SubmitRow, SuccessPanel, TextAreaField, TextField, useEnquiryForm } from "./FormKit";

export function SellForm() {
  const f = useEnquiryForm("sell", { name: "", phone: "", email: "", category: "", location: "", size: "", expectedPrice: "", message: "" });
  if (f.status === "success") return <SuccessPanel result={f.result} onReset={f.reset} title="Thank you â€” we have your property details." />;

  return (
    <form ref={f.formRef} onSubmit={f.onSubmit} noValidate className="relative space-y-6" aria-label="Sell your property enquiry">
      <Honeypot bound={f.bind("website")} />
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Full name" required autoComplete="name" bound={f.bind("name")} />
        <TextField label="Mobile number" required type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 98XXXXXXXX" bound={f.bind("phone")} />
      </div>
      <TextField label="Email" type="email" inputMode="email" autoComplete="email" bound={f.bind("email")} />
      <div className="grid gap-6 sm:grid-cols-2">
        <SelectField label="Property type" required options={categoryOptions} bound={f.bind("category")} />
        <TextField label="Location of the property" required placeholder="Sector / area, city" bound={f.bind("location")} />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <TextField label="Approximate size" hint="Area and unit, e.g. 500 sq. yd." bound={f.bind("size")} />
        <TextField label="Expected price" hint="Only if you have one in mind" bound={f.bind("expectedPrice")} />
      </div>
      <TextAreaField label="Anything else we should know" rows={4} bound={f.bind("message")} />
      <ConsentField checked={f.values.consent === true} onChange={(v) => f.set("consent", v)} error={f.submitted && f.values.consent !== true ? "Please confirm so we can respond to your enquiry" : undefined}>
        I agree to Nikunj Homes contacting me about this enquiry.
      </ConsentField>
      <FormDisclaimer variant="general" />
      <SubmitRow status={f.status} error={f.result?.error} label="Submit property details" />
    </form>
  );
}
