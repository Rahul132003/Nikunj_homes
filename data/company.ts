/**
 * NIKUNJ HOMES — single source of truth for company details.
 *
 * Rule: nothing is invented. Anything the client has not supplied is a clearly
 * labelled placeholder made with `tbp()` → "[Label – to be provided]".
 * Search the codebase for "to be provided" to list every outstanding item.
 */

/** Build a labelled placeholder, e.g. tbp("RERA No.") → "[RERA No. – to be provided]" */
export const tbp = (label: string) => `[${label} – to be provided]`;

/* ------------------------------------------------------------------ */
/* 1. PGS GREENS relationship — CHANGE IN ONE PLACE after confirmation */
/* ------------------------------------------------------------------ */

export type PgsRelationship = "unconfirmed" | "channel-partner" | "marketing-partner";

/**
 * ▶ THE SWITCH. Until the client confirms how Nikunj Homes relates to PGS GREENS,
 *   keep this as "unconfirmed". Every label, disclaimer and developer-contact
 *   rule on the site reads from `pgsRelationshipConfig[PGS_RELATIONSHIP]`.
 */
export const PGS_RELATIONSHIP: PgsRelationship = "unconfirmed";

interface RelationshipConfig {
  /** Short label used on cards, hero badge, breadcrumbs, footer. */
  label: string;
  /** Paragraph shown on the PGS GREENS page and in the footer. */
  disclaimer: string;
  /** Intro line above the developer-contact toggle. */
  developerContactIntro: string;
  /** Whether enquiries are described as handled by Nikunj Homes. */
  nikunjHandlesEnquiries: boolean;
}

export const pgsRelationshipConfig: Record<PgsRelationship, RelationshipConfig> = {
  unconfirmed: {
    label: "Featured project by PGS Group",
    disclaimer:
      "PGS GREENS is a project by PGS Group, featured here for information. Project details, images and specifications are taken from the developer’s catalogue and are subject to change.",
    developerContactIntro:
      "These are the developer’s own contact details, shown for reference. They are not Nikunj Homes’ contact details.",
    nikunjHandlesEnquiries: false,
  },
  "channel-partner": {
    label: tbp("Relationship label – e.g. authorised channel partner, wording to be confirmed"),
    disclaimer: tbp("Channel-partner disclaimer wording"),
    developerContactIntro:
      "These are the developer’s own contact details, shown for reference. They are not Nikunj Homes’ contact details.",
    nikunjHandlesEnquiries: true,
  },
  "marketing-partner": {
    label: tbp("Relationship label – e.g. marketing partner, wording to be confirmed"),
    disclaimer: tbp("Marketing-partner disclaimer wording"),
    developerContactIntro:
      "These are the developer’s own contact details, shown for reference. They are not Nikunj Homes’ contact details.",
    nikunjHandlesEnquiries: true,
  },
};

export const pgsRelationship = pgsRelationshipConfig[PGS_RELATIONSHIP];

/* ------------------------------------------------------------------ */
/* 2. Developer contact block (PGS Infracon) — PGS GREENS page ONLY   */
/* ------------------------------------------------------------------ */

export const developerContact = {
  /** Labelled everywhere as the developer's, never Nikunj Homes'. */
  heading: "Developer’s contact details",
  name: "PGS Infracon Pvt. Ltd.",
  address: "Ganesh Nagar, New Delhi-110018",
  phone: "+91 93124 44491",
  phoneHref: "tel:+919312444491",
  /**
   * The phone number was read from the catalogue image (page 14), printed as
   * "+919312444491". ▶ VERIFY against the original before launch, then set true.
   */
  phoneVerified: false,
  website: "www.pgsgroup.co.in",
  websiteHref: "https://www.pgsgroup.co.in",
  email: "info@pgsgroup.co.in",
  emailHref: "mailto:info@pgsgroup.co.in",
} as const;

/* ------------------------------------------------------------------ */
/* 3. Nikunj Homes                                                    */
/* ------------------------------------------------------------------ */

export const company = {
  name: "Nikunj Homes",
  /** Confirmed by the client. Not a developer or builder — do not describe it as one. */
  descriptor: "Real estate firm · Faridabad, Delhi-NCR",
  description:
    "Nikunj Homes is a Faridabad-based real estate firm that deals in buying and selling residential, commercial, industrial and farm house properties.",
  shortDescription:
    "Buying and selling residential, commercial, industrial and farm house properties from Faridabad, Delhi-NCR.",

  address: {
    line1: "A3, BPTP, Sector-81",
    city: "Faridabad",
    state: "Haryana",
    postalCode: "121001",
    country: "IN",
    /** Single line for footers and contact blocks. */
    full: "A3, BPTP, Sector-81, Faridabad, Haryana-121001",
  },

  /** Nothing below was supplied. Placeholders only. */
  contact: {
    phone: tbp("Nikunj Homes phone"),
    phoneHref: null as string | null,
    email: tbp("Nikunj Homes email"),
    emailHref: null as string | null,
    hours: tbp("Office hours"),
  },

  /**
   * WhatsApp click-to-chat. Put digits only, with country code, e.g. "919XXXXXXXXX".
   * While empty, the floating button shows the placeholder instead of opening a chat.
   */
  whatsapp: {
    number: "",
    placeholder: tbp("WhatsApp number"),
    defaultMessage: "Hello Nikunj Homes, I would like to enquire about a property.",
  },

  registration: {
    rera: tbp("RERA agent registration No."),
    gst: tbp("GSTIN"),
    legalName: tbp("Registered legal name"),
  },

  social: {
    instagram: null as string | null,
    facebook: null as string | null,
    linkedin: null as string | null,
    youtube: null as string | null,
  },

  /** Replace with a real photo/render path under /public/images/nikunj/ when available. */
  heroImage: null as string | null,

  /** Logo: no artwork supplied. A typographic wordmark is used as a temporary stand-in. */
  logo: { status: "temporary-wordmark" as "temporary-wordmark" | "supplied" },
} as const;

/** Site-wide URL. Set NEXT_PUBLIC_SITE_URL in production. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/* ------------------------------------------------------------------ */
/* 4. Legal wording (pending client confirmation of final text)       */
/* ------------------------------------------------------------------ */

export const legal = {
  /** Short line shown beside every enquiry form. ▶ Final wording to be confirmed. */
  formDisclaimer:
    "As per developer’s catalogue; subject to change; not a legal offer.",
  formDisclaimerStatus: "pending-client-confirmation",
  /** Used on forms that are not about a developer project. */
  generalFormNote:
    "We will use your details only to respond to this enquiry. [Privacy policy wording – to be provided]",
  cataloguePhotographyNote:
    "Representative image from the developer’s catalogue. Not an actual site photograph.",
} as const;
