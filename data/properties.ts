/**
 * PROPERTIES — categories and listing templates.
 *
 * No real Nikunj Homes listings were supplied, so every category shows clearly
 * labelled SAMPLE listings (illustrative details, stand-in photographs borrowed
 * from the PGS GREENS catalogue) plus, for Farm Houses, the featured PGS GREENS
 * project. Replace `listings` with confirmed stock; nothing here describes real
 * inventory. Sample pages are noindex. Category cover photos in public/images/samples are free-to-use\n * Unsplash stock images, stand-ins until real photographs are supplied.
 */
const IMG = "/images/pgs-greens";

export type CategorySlug = "residential" | "commercial" | "industrial" | "farm-houses";

export interface PropertyCategory {
  slug: CategorySlug;
  title: string;
  short: string;
  intro: string;
  /** What a client can do in this category — no claims about stock. */
  helps: string[];
  imagePlaceholder: string;
  /** Sample cover image for the category (stand-in). */
  image: ListingImage;
}

export interface ListingImage { src: string; alt: string; /** CSS object-position for tall crops */ position?: string }

export const categories: PropertyCategory[] = [
  {
    slug: "residential",
    title: "Residential",
    short: "Homes and residential plots",
    intro:
      "Buy or sell residential property in Faridabad and across Delhi-NCR with a firm that handles the conversation from first enquiry to closing.",
    helps: ["Buying a residential property", "Selling a residential property", "Investing in residential property"],
    imagePlaceholder: "Residential – property image",
    image: { src: "/images/samples/residential.webp", alt: "Sample image: a modern apartment building with balconies and greenery", position: "50% 40%" },
  },
  {
    slug: "commercial",
    title: "Commercial",
    short: "Shops, offices and showrooms",
    intro:
      "Commercial property for businesses and investors, bought and sold through Nikunj Homes.",
    helps: ["Buying commercial property", "Selling commercial property", "Investing in commercial property"],
    imagePlaceholder: "Commercial – property image",
    image: { src: "/images/samples/commercial.webp", alt: "Sample image: glass office towers seen from below", position: "50% 50%" },
  },
  {
    slug: "industrial",
    title: "Industrial",
    short: "Industrial plots and premises",
    intro:
      "Industrial property for manufacturers, warehousing and investors, bought and sold through Nikunj Homes.",
    helps: ["Buying industrial property", "Selling industrial property", "Investing in industrial property"],
    imagePlaceholder: "Industrial – property image",
    image: { src: "/images/samples/industrial.webp", alt: "Sample image: a steel-clad warehouse with a roller door", position: "40% 50%" },
  },
  {
    slug: "farm-houses",
    title: "Farm Houses",
    short: "Farmhouse land and farm properties",
    intro:
      "Farm house properties and farmhouse land for those who want space, greenery and a life beyond the city.",
    helps: ["Buying farm house property", "Selling farm house property", "Investing in farmhouse land"],
    imagePlaceholder: "Farm house – property image",
    image: { src: "/images/samples/farm-houses.webp", alt: "Sample image: a white farmhouse on a wide lawn", position: "45% 50%" },
  },
];

export interface Listing {
  slug: string;
  category: CategorySlug;
  /** True for sample / placeholder entries (not real stock). Their pages are noindex. */
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
  /** Stand-in photographs — replace with the property's own photos. */
  images: ListingImage[];
}

const img = (path: string, alt: string): ListingImage => ({ src: `${IMG}/${path}`, alt: `Sample image: ${alt}` });
const sample = (name: string, alt: string): ListingImage => ({ src: `/images/samples/${name}.webp`, alt: `Sample image: ${alt}` });
const SAMPLE_NOTE = "Sample listing — illustrative only, not a real property.";

export const listings: Listing[] = [
  {
    slug: "sample-3bhk-apartment", category: "residential", isTemplate: true,
    title: "Sample: 3 BHK apartment", location: "Sector [xx], Faridabad (sample)", price: "Price on request", area: "1,450 sq ft (sample)",
    propertyType: "Residential — apartment", status: "Sample — ready to move", reference: "SAMPLE-RES-01",
    summary: `A bright three-bedroom apartment with a balcony on every floor plate, close to schools and the metro. ${SAMPLE_NOTE}`,
    features: ["3 bedrooms, 3 bathrooms", "Covered parking", "Lift and power backup", "Gated society with 24x7 security"],
    images: [sample("residential", "a modern apartment block with balconies"), img("previous-projects/pgs-florence.webp", "a multi-storey apartment building"), img("why/gated-society.webp", "a gated society entrance"), img("why/security-24x7.webp", "a security cabin")],
  },
  {
    slug: "sample-independent-floor", category: "residential", isTemplate: true,
    title: "Sample: Independent builder floor", location: "Sector [xx], Faridabad (sample)", price: "Price on request", area: "1,800 sq ft (sample)",
    propertyType: "Residential — builder floor", status: "Sample — under construction", reference: "SAMPLE-RES-02",
    summary: `A four-bedroom independent floor on a quiet residential street. ${SAMPLE_NOTE}`,
    features: ["4 bedrooms, 4 bathrooms", "Stilt parking", "Terrace access", "Wide approach road"],
    images: [img("previous-projects/delhi-residential.webp", "a residential block"), img("previous-projects/pgs-florence.webp", "an apartment building"), img("why/wide-roads.webp", "a wide road"), img("features/flowering-streets.webp", "a tree-lined street")],
  },
  {
    slug: "sample-shop-showroom", category: "commercial", isTemplate: true,
    title: "Sample: Ground-floor showroom", location: "Main market, Faridabad (sample)", price: "Price on request", area: "900 sq ft (sample)",
    propertyType: "Commercial — showroom", status: "Sample — available", reference: "SAMPLE-COM-01",
    summary: `A road-facing ground-floor showroom with high footfall, suited to retail or a branded outlet. ${SAMPLE_NOTE}`,
    features: ["Road-facing frontage", "Double-height ceiling", "Dedicated parking", "Power backup"],
    images: [img("clubhouse/dine-in.webp", "a dining space"), img("clubhouse/clubhouse-dusk-pool.webp", "a building at dusk"), img("why/wide-roads.webp", "a wide road"), img("previous-projects/pgs-express-city.webp", "a gated entrance")],
  },
  {
    slug: "sample-office-space", category: "commercial", isTemplate: true,
    title: "Sample: Office space", location: "Business district, Faridabad (sample)", price: "Price on request", area: "1,200 sq ft (sample)",
    propertyType: "Commercial — office", status: "Sample — available", reference: "SAMPLE-COM-02",
    summary: `A ready office floor in a managed commercial building, suited to a small firm or practice. ${SAMPLE_NOTE}`,
    features: ["Open floor plate", "Lift and power backup", "Visitor parking", "Reception area"],
    images: [sample("commercial", "glass office towers"), img("clubhouse/dine-in.webp", "an interior space"), img("clubhouse/gym.webp", "a fitted interior"), img("why/clubhouse.webp", "a clubhouse")],
  },
  {
    slug: "sample-industrial-plot", category: "industrial", isTemplate: true,
    title: "Sample: Industrial plot", location: "Industrial area, Faridabad (sample)", price: "Price on request", area: "1,000 sq yd (sample)",
    propertyType: "Industrial — plot", status: "Sample — available", reference: "SAMPLE-IND-01",
    summary: `A level industrial plot with wide road access, suited to manufacturing or storage. ${SAMPLE_NOTE}`,
    features: ["Wide approach road", "Regular shape", "Utility connections nearby", "Truck access"],
    images: [sample("industrial", "an industrial warehouse"), img("why/wide-roads.webp", "a wide road"), img("features/solar-power.webp", "solar panels"), img("hero/cover-farmland.webp", "open land")],
  },
  {
    slug: "sample-warehouse", category: "industrial", isTemplate: true,
    title: "Sample: Warehouse unit", location: "Logistics belt, Faridabad (sample)", price: "Price on request", area: "12,000 sq ft (sample)",
    propertyType: "Industrial — warehouse", status: "Sample — available", reference: "SAMPLE-IND-02",
    summary: `A covered warehouse with a loading bay and yard, close to the highway. ${SAMPLE_NOTE}`,
    features: ["Loading bay", "High clear height", "Yard for turning", "Highway access"],
    images: [sample("industrial", "a steel-clad warehouse"), img("features/solar-power.webp", "solar panels"), img("why/wide-roads.webp", "a wide road"), img("why/security-24x7.webp", "a security cabin")],
  },
  {
    slug: "sample-farm-house", category: "farm-houses", isTemplate: true,
    title: "Sample: Farm house with orchard", location: "Faridabad outskirts (sample)", price: "Price on request", area: "1 acre (sample)",
    propertyType: "Farm house", status: "Sample — available", reference: "SAMPLE-FARM-01",
    summary: `A farm house on landscaped land with fruit trees and a separate guest cottage. ${SAMPLE_NOTE}`,
    features: ["Orchard and lawn", "Guest cottage", "Borewell", "Boundary wall and gate"],
    images: [img("hero/connect-with-nature-cabin.webp", "a timber lodge among trees"), img("features/orchard-lanes.webp", "an orchard lane"), img("hero/mood-farmstead.webp", "a barn and silo"), img("story/forest-path.webp", "a forest path")],
  },
  {
    slug: "sample-farmland-plot", category: "farm-houses", isTemplate: true,
    title: "Sample: Farmhouse land", location: "Faridabad outskirts (sample)", price: "Price on request", area: "2,000 sq yd (sample)",
    propertyType: "Farmhouse land", status: "Sample — available", reference: "SAMPLE-FARM-02",
    summary: `Open farmhouse land on a tree-lined road, ready for you to build. ${SAMPLE_NOTE}`,
    features: ["Road frontage", "Flat, usable land", "Power connection nearby", "Green surroundings"],
    images: [img("hero/cover-farmland.webp", "open farmland"), img("features/flowering-streets.webp", "a flowering street"), img("story/forest-path.webp", "a forest path"), img("features/orchard-lanes.webp", "an orchard")],
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getListing = (category: string, slug: string) =>
  listings.find((l) => l.category === category && l.slug === slug);
export const listingsFor = (category: CategorySlug) => listings.filter((l) => l.category === category);