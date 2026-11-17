"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { developerContact as dc, pgsRelationship } from "@/data/company";

/**
 * The DEVELOPER's contact details (PGS Infracon Pvt. Ltd.). Shown only on the
 * PGS GREENS page, behind a toggle, and labelled as the developer's — never as
 * Nikunj Homes'. Content and wording live in data/company.ts.
 */
export function DeveloperContact() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const showVerifyFlag = process.env.NODE_ENV !== "production" && !dc.phoneVerified;

  return (
    <div className="border border-forest-900/15 bg-white">
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
        >
          <span>
            <span className="text-eyebrow block text-label">Developer</span>
            <span className="mt-1 block font-display text-[1.75rem] leading-none text-forest-900">
              {open ? "Hide" : "Show"} the developer’s contact details
            </span>
          </span>
          <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-forest-900/25 text-forest-900">
            <svg viewBox="0 0 16 16" className={`h-4 w-4 transition-transform duration-500 ${open ? "rotate-45" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 2v12M2 8h12" /></svg>
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={id}
            role="region"
            aria-label="Developer’s contact details"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-t border-hairline px-6 pb-7 pt-6 sm:px-8">
              <p className="border-l-2 border-pgs-olive bg-pgs-wash/50 px-4 py-3 text-small text-forest-900">
                <strong>{dc.heading}.</strong> {pgsRelationship.developerContactIntro}
              </p>
              <dl className="mt-6 grid gap-5 text-[0.9375rem] sm:grid-cols-2">
                <div><dt className="text-eyebrow text-muted">Company</dt><dd className="mt-1 font-semibold text-forest-900">{dc.name}</dd></div>
                <div><dt className="text-eyebrow text-muted">Address</dt><dd className="mt-1 text-charcoal">{dc.address}</dd></div>
                <div>
                  <dt className="text-eyebrow text-muted">Phone</dt>
                  <dd className="mt-1"><a href={dc.phoneHref} className="link-underline font-semibold text-forest-900">{dc.phone}</a>
                    {showVerifyFlag && <span className="ml-2 rounded-[2px] bg-error px-1.5 py-0.5 text-[0.6875rem] font-bold uppercase text-white">dev: verify</span>}
                  </dd>
                </div>
                <div><dt className="text-eyebrow text-muted">Website</dt><dd className="mt-1"><a href={dc.websiteHref} target="_blank" rel="noopener noreferrer" className="link-underline font-semibold text-forest-900">{dc.website}</a></dd></div>
                <div className="sm:col-span-2"><dt className="text-eyebrow text-muted">Email</dt><dd className="mt-1"><a href={dc.emailHref} className="link-underline font-semibold text-forest-900">{dc.email}</a></dd></div>
              </dl>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
