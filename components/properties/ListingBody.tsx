import type { ReactNode } from "react";
import type { Listing } from "@/data/properties";
import { ListingGallery } from "./ListingGallery";
import { Eyebrow } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Category-specific property detail layouts. Every category shares the same frame (hero, gallery, enquiry
 * panel, form) and the same design tokens, but reads differently:
 *   residential - a home: at-a-glance figures, then room-by-room features
 *   commercial  - a business space: dark "business profile" panel, then numbered location advantages
 *   industrial  - a facility: technical specification table first, then site & infrastructure checklist
 *   farm houses - land: editorial overview, a three-figure "land" band, then surroundings
 */

export const detailConfig = {
  residential: { noun: "home", label: "Residential home", cta: "Enquire about this home" },
  commercial: { noun: "space", label: "Commercial space", cta: "Enquire about this space" },
  industrial: { noun: "facility", label: "Industrial property", cta: "Request site details" },
  "farm-houses": { noun: "land", label: "Farm house property", cta: "Enquire about this land" },
} as const;

const h2 = "text-h3 text-forest-900";

/** "Residential — apartment" -> "Apartment" */
const subtype = (s: string) => {
  const v = s.replace(/^[^—]*—\s*/, "");
  return v.charAt(0).toUpperCase() + v.slice(1);
};

function Check({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className={`h-5 w-5 shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8.5" />
      <path d="M6.2 10.4l2.5 2.5 5-5.4" />
    </svg>
  );
}

function Overview({ l, title, lead }: { l: Listing; title: string; lead?: boolean }) {
  return (
    <section aria-labelledby="overview-h">
      <Reveal><Eyebrow>Overview</Eyebrow></Reveal>
      <Reveal delay={0.05}><h2 id="overview-h" className={`${h2} mt-4`}>{title}</h2></Reveal>
      <Reveal delay={0.1}>
        <p className={lead ? "mt-6 font-display text-[1.5rem] leading-snug text-forest-900 sm:text-[1.75rem]" : "text-lead mt-5 text-muted"}>{l.summary}</p>
      </Reveal>
    </section>
  );
}

/* --------------------------------- Residential -------------------------------- */

function Residential({ l }: { l: Listing }) {
  const glance: [string, string][] = [
    ["Property type", subtype(l.propertyType)],
    ["Area", l.area],
    ["Availability", l.status],
    ["Location", l.location],
  ];
  return (
    <>
      <ListingGallery slots={l.images} />
      <section aria-label="At a glance" className="mt-12 grid grid-cols-2 gap-px border border-hairline bg-hairline lg:grid-cols-4">
        {glance.map(([k, v]) => (
          <div key={k} className="bg-white p-5 sm:p-6">
            <p className="text-eyebrow text-label">{k}</p>
            <p className="mt-3 font-display text-[1.25rem] leading-snug text-forest-900 [font-variant-numeric:lining-nums] sm:text-[1.375rem]">{v}</p>
          </div>
        ))}
      </section>
      <div className="mt-14"><Overview l={l} title="About this home" /></div>
      <section aria-labelledby="features-h" className="mt-14">
        <h2 id="features-h" className={h2}>Home features</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {l.features.map((f) => (
            <li key={f} className="flex items-center gap-4 border border-hairline bg-white px-5 py-4 text-[0.9375rem] text-charcoal"><Check className="text-bronze" />{f}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

/* --------------------------------- Commercial --------------------------------- */

function Commercial({ l }: { l: Listing }) {
  const profile: [string, string][] = [
    ["Space", subtype(l.propertyType)],
    ["Area", l.area],
    ["Location", l.location],
    ["Availability", l.status],
  ];
  return (
    <>
      <ListingGallery slots={l.images} />
      <section aria-labelledby="profile-h" className="surface-dark grain relative isolate mt-12 overflow-hidden p-7 sm:p-10">
        <h2 id="profile-h" className="text-h3">Business profile</h2>
        <span aria-hidden className="mt-4 block h-px w-14 bg-gold-500" />
        <dl className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
          {profile.map(([k, v]) => (
            <div key={k}>
              <dt className="text-eyebrow text-gold-400">{k}</dt>
              <dd className="mt-2 font-display text-[1.375rem] leading-snug text-ivory [font-variant-numeric:lining-nums]">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="mt-14"><Overview l={l} title="About this space" /></div>
      <section aria-labelledby="features-h" className="mt-14">
        <h2 id="features-h" className={h2}>Why this location</h2>
        <ol className="mt-6 divide-y divide-hairline border-y border-hairline">
          {l.features.map((f, i) => (
            <li key={f} className="flex items-baseline gap-6 py-5">
              <span aria-hidden className="w-9 shrink-0 font-display text-[1.75rem] leading-none text-bronze [font-variant-numeric:lining-nums]">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[1rem] text-charcoal">{f}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

/* --------------------------------- Industrial --------------------------------- */

function Industrial({ l }: { l: Listing }) {
  const rows: [string, string][] = [
    ["Property type", l.propertyType],
    ["Plot / built-up area", l.area],
    ["Location", l.location],
    ["Availability", l.status],
    ["Listing reference", l.reference],
  ];
  return (
    <>
      <ListingGallery slots={l.images} />
      <section aria-labelledby="tech-h" className="mt-12">
        <Reveal><Eyebrow>Specifications</Eyebrow></Reveal>
        <h2 id="tech-h" className={`${h2} mt-4`}>Technical specifications</h2>
        <dl className="mt-6 border border-hairline bg-white">
          {rows.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[9.5rem_1fr] border-b border-hairline last:border-b-0 sm:grid-cols-[14rem_1fr]">
              <dt className="bg-ivory-200 px-5 py-4 text-eyebrow text-label">{k}</dt>
              <dd className="px-5 py-4 text-[0.9375rem] font-medium text-forest-900">{v}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="mt-14"><Overview l={l} title="About this property" /></div>
      <section aria-labelledby="features-h" className="mt-14">
        <h2 id="features-h" className={h2}>Site &amp; infrastructure</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {l.features.map((f) => (
            <li key={f} className="flex items-center gap-4 border-l-2 border-gold-500 bg-ivory-200 px-5 py-4 text-[0.9375rem] text-charcoal">
              <span aria-hidden className="h-2.5 w-2.5 shrink-0 bg-forest-900" />{f}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

/* ------------------------------------ Farm ------------------------------------ */

function Leaf() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-bronze" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 16C4 8 9 4 16 4c0 7-4 12-12 12Z" /><path d="M4 16 11 9" />
    </svg>
  );
}

function Farm({ l }: { l: Listing }) {
  const land: [string, string][] = [
    ["The land", l.area],
    ["Where", l.location],
    ["Availability", l.status],
  ];
  return (
    <>
      <ListingGallery slots={l.images} />
      <div className="mt-14"><Overview l={l} title="Space, greenery and quiet" lead /></div>
      <section aria-label="The land" className="mt-12 grid border-y border-forest-900/20 sm:grid-cols-3">
        {land.map(([k, v], i) => (
          <div key={k} className={`py-6 sm:px-7 ${i > 0 ? "border-t border-hairline sm:border-l sm:border-t-0" : "sm:pl-0"}`}>
            <p className="text-eyebrow text-label">{k}</p>
            <p className="mt-3 font-display text-[1.5rem] leading-snug text-forest-900 [font-variant-numeric:lining-nums]">{v}</p>
          </div>
        ))}
      </section>
      <section aria-labelledby="features-h" className="mt-14">
        <h2 id="features-h" className={h2}>Land &amp; surroundings</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {l.features.map((f) => (
            <li key={f} className="inline-flex items-center gap-2.5 rounded-full border border-forest-900/20 bg-white px-5 py-3 text-[0.9375rem] text-charcoal"><Leaf />{f}</li>
          ))}
        </ul>
      </section>
    </>
  );
}

export function ListingBody({ listing }: { listing: Listing }): ReactNode {
  switch (listing.category) {
    case "residential": return <Residential l={listing} />;
    case "commercial": return <Commercial l={listing} />;
    case "industrial": return <Industrial l={listing} />;
    case "farm-houses": return <Farm l={listing} />;
  }
}
