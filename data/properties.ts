/**
 * PROPERTIES — categories and listing templates.
 *
 * No real Nikunj Homes listings were supplied, so every category shows a
 * clearly labelled template listing (all values are placeholders) plus, for Farm
 * Houses, the featured PGS GREENS project. Replace `listings` entries as stock
 * is confirmed. Nothing here is a statement about real inventory.
 */
import { tbp } from "./company";

export type CategorySlug = "residential" | "commercial" | "industrial" | "farm-houses";

export interface PropertyCategory {
  slug: CategorySlug;
  title: string;
  short: string;
  intro: string;
  /** What a client can do in this category — no claims about stock. */
  helps: string[];
  imagePlaceholder: string;
}

export const categories: PropertyCategory[] = [
  {
    slug: "residential",
    title: "Residential",
    short: "Homes and residential plots",
    intro:
      "Buy or sell residential property in Faridabad and across Delhi-NCR with a firm that handles the conversation from first enquiry to closing.",
    helps: ["Buying a residential property", "Selling a residential property", "Investing in residential property"],
    imagePlaceholder: "Residential – property image",
  },
  {
    slug: "commercial",
    title: "Commercial",
    short: "Shops, offices and showrooms",
    intro:
      "Commercial property for businesses and investors, bought and sold through Nikunj Homes.",
    helps: ["Buying commercial property", "Selling commercial property", "Investing in commercial property"],
    imagePlaceholder: "Commercial – property image",
  },
  {
    slug: "industrial",
    title: "Industrial",
    short: "Industrial plots and premises",
    intro:
      "Industrial property for manufacturers, warehousing and investors, bought and sold through Nikunj Homes.",
    helps: ["Buying industrial property", "Selling industrial property", "Investing in industrial property"],
    imagePlaceholder: "Industrial – property image",
  },
  {
    slug: "farm-houses",
    title: "Farm Houses",
    short: "Farmhouse land and farm properties",
    intro:
      "Farm house properties and farmhouse land for those who want space, greenery and a life beyond the city.",
    helps: ["Buying farm house property", "Selling farm house property", "Investing in farmhouse land"],
    imagePlaceholder: "Farm house – property image",
  },
];

export interface Listing {
  slug: string;
  category: CategorySlug;
  /** True for placeholder template entries. The page is rendered noindex. */
  isTemplate: boolean;
  title: string;
  location: string;
  price: string;
  area: string;
  propertyType: string;
  status: string;
  reference: string;
  summary: string;
  features: string[];
  /** Named image placeholders — never unrelated stock photos. */
  imageSlots: string[];
}

const template = (category: CategorySlug, label: string): Listing => ({
  slug: "listing-template",
  category,
  isTemplate: true,
  title: tbp("Property title"),
  location: tbp("Location"),
  price: tbp("Price"),
  area: tbp("Area"),
  propertyType: label,
  status: tbp("Availability"),
  reference: tbp("Listing reference"),
  summary: tbp("Property description"),
  features: [tbp("Feature 1"), tbp("Feature 2"), tbp("Feature 3")],
  imageSlots: [
    `${label} – main photo – to be provided`,
    `${label} – interior / site photo – to be provided`,
    `${label} – exterior photo – to be provided`,
    `${label} – floor plan / site plan – to be provided`,
  ],
});

export const listings: Listing[] = [
  template("residential", "Residential"),
  template("commercial", "Commercial"),
  template("industrial", "Industrial"),
  template("farm-houses", "Farm house"),
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getListing = (category: string, slug: string) =>
  listings.find((l) => l.category === category && l.slug === slug);
export const listingsFor = (category: CategorySlug) => listings.filter((l) => l.category === category);
