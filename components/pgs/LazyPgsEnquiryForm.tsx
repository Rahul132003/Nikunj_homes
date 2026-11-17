"use client";

import dynamic from "next/dynamic";

/**
 * The form (and its validation library) sits at the very bottom of the page, so
 * it loads after the page is interactive instead of competing with the hero for
 * bandwidth. The placeholder reserves its height so nothing jumps.
 */
const Form = dynamic(() => import("@/components/forms/PgsEnquiryForm").then((m) => m.PgsEnquiryForm), {
  ssr: false,
  loading: () => <div aria-busy="true" aria-label="Loading enquiry form" className="min-h-[32rem]" />,
});

export function LazyPgsEnquiryForm() {
  return <Form />;
}
