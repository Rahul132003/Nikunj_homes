/**
 * PROJECTS — typed content. PGS GREENS text is taken from the developer’s
 * catalogue (PGS GREENS.pdf, 14 pp.) with only the typo corrections listed in
 * `typoCorrections`. Anything not in the catalogue is a labelled placeholder.
 */
import { tbp, pgsRelationship } from "./company";

const IMG = "/images/pgs-greens";

/** Typos fixed from the catalogue — kept here so the changes are auditable. */
export const typoCorrections = [
  ["greates", "greatest"],
  ["fragnances", "fragrances"],
  ["MAINTAINANCE", "MAINTENANCE"],
  ["fron proposed Film City", "from proposed Film City"],
  ["We leisure experience at the Clubhouse", "The leisure experience at the Clubhouse"],
  ["PGS Green (singular)", "PGS Greens"],
  ["Gautambudh University", "Gautam Buddha University"],
  ["cater the needs", "cater to the needs"],
  ["Expresscity", "Express City"],
] as const;

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Shown as a small caption wherever the image appears. */
  caption?: string;
}

export interface LocationHighlight {
  id: string;
  place: string;
  minutes: number;
  mode: "drive" | "unspecified";
  /** "proposed" items MUST keep this flag and be labelled so in the UI. */
  status: "existing" | "proposed";
  note?: string;
}

export const pgsGreens = {
  slug: "pgs-greens",
  name: "PGS GREENS",
  tagline: "Nature’s Paradise",
  relationshipLabel: pgsRelationship.label,
  descriptor: "Farmland by PGS Group",
  type: "Upcoming luxury farmhouse land development",
  /** Contact-page wording from the catalogue; the story page says “near the Noida-Faridabad border”. */
  locationLine: "Motipur, Greater Noida, Uttar Pradesh",
  locationAlt: "Motipur, near the Noida-Faridabad border",
  area: { value: 55, unit: "acres" },

  heroKicker: "Farmland by PGS Group",
  moodHeading: "Inspired by the world’s greatest architect: Nature",
  moodText:
    "A destination with a sense of deep contentment settling into a relaxing rhythm that pleases mind, body and soul.",

  story: [
    "PGS Greens, situated in Motipur, Greater Noida, is an upcoming luxury farmhouse land development project spread across 55 acres.",
    "This project is designed to offer residents an exclusive escape from the city’s hustle-bustle while still being close to all the modern amenities. It provides an incredible opportunity to acquire spacious plots ideal for constructing luxurious villas and farmhouses.",
    "With its prime location and ample space, PGS Greens is a promising destination for those seeking to build their dream homes in a prestigious and well-connected area.",
    "At PGS Greens, every aspect of your living experience has been meticulously planned and executed, from the design of the farmhouses/agricultural land to the layout of the entire project.",
  ],

  keyFeatures: [
    { id: "gated", title: "Gated farm community", icon: "gate" },
    { id: "club", title: "Recreational club", icon: "club" },
    { id: "security", title: "24/7 security", icon: "security" },
    { id: "maintenance", title: "Maintenance facilities", icon: "maintenance" },
  ],

  natureInspired: [
    {
      id: "flowering-streets",
      title: "Flowering streets",
      body: "Streets adorned with lush, flowering trees and plants to enhance the aesthetic appeal, promoting a tranquil and refreshing environment, fostering a deeper connection with nature for the residents and visitors.",
      image: { src: `${IMG}/features/flowering-streets.webp`, alt: "A dirt lane lined with red flowering shrubs and tall trees", width: 945, height: 944 },
    },
    {
      id: "orchard-lanes",
      title: "Orchard lanes",
      body: "Orchard Lanes add a unique and fruitful dimension to the development, offering the residents an opportunity to indulge in fresh and organic produce, promoting a healthy and sustainable lifestyle.",
      image: { src: `${IMG}/features/orchard-lanes.webp`, alt: "An orchard lane with ripe fruit hanging from the trees", width: 958, height: 957 },
    },
    {
      id: "solar",
      title: "Solar powered",
      body: "A sustainable feature harnessing the power of the sun, providing clean and renewable energy, thereby reducing carbon emissions and promoting a greener future.",
      image: { src: `${IMG}/features/solar-power.webp`, alt: "Solar panels against a bright sky over a green field", width: 880, height: 879 },
    },
  ],

  clubhouse: {
    heading: "The leisure experience at the Clubhouse",
    body: [
      "Within our vibrant community, a magnificent clubhouse is offering amenities to enrich your everyday life.",
      "Dive into a refreshing pool, revel in exciting games, indulge in flavours at our dine-ins, and engage in fun-filled activities that ignite joy.",
    ],
    luxuryHeading: "A destination full of nature and luxury",
    luxuryText:
      "A place to live a luxury lifestyle in the lap of nature with comfort, relaxation and subtle fragrances of fruits and flowers.",
    images: [
      { src: `${IMG}/clubhouse/clubhouse-dusk-pool.webp`, alt: "Clubhouse pavilion and pool lit at dusk", width: 1009, height: 956, caption: "Pool" },
      { src: `${IMG}/clubhouse/yoga.webp`, alt: "Person meditating on a lawn at sunrise", width: 782, height: 744, caption: "Yoga" },
      { src: `${IMG}/clubhouse/gym.webp`, alt: "A bright gym with weights and cardio machines", width: 832, height: 770, caption: "Gym" },
      { src: `${IMG}/clubhouse/games-tennis.webp`, alt: "Two tennis players high-fiving at the net", width: 831, height: 769, caption: "Games" },
      { src: `${IMG}/clubhouse/dine-in.webp`, alt: "A plant-filled restaurant interior with teal and yellow chairs", width: 807, height: 770, caption: "Dine-in" },
    ] satisfies ProjectImage[],
    featureImage: { src: `${IMG}/clubhouse/pool-pavilion.webp`, alt: "A pool in front of a tiled-roof pavilion surrounded by palms", width: 1509, height: 1058 },
  },

  why: [
    { id: "roads", title: "30-35 ft. wide roads", image: { src: `${IMG}/why/wide-roads.webp`, alt: "A wide dirt road lined with trees", width: 400, height: 400 } },
    { id: "solar-lights", title: "Solar street lights", image: { src: `${IMG}/why/solar-street-lights.webp`, alt: "A solar-powered street light against the sky", width: 400, height: 400 } },
    { id: "gated", title: "Gated society", image: { src: `${IMG}/why/gated-society.webp`, alt: "A timber entrance gate beside a stone pillar and flowers", width: 400, height: 400 } },
    { id: "security", title: "24x7 security", image: { src: `${IMG}/why/security-24x7.webp`, alt: "A security guard watching a bank of monitors", width: 400, height: 400 } },
    { id: "clubhouse", title: "Clubhouse", image: { src: `${IMG}/why/clubhouse.webp`, alt: "A house with a swimming pool in the garden", width: 400, height: 400 } },
  ],

  /**
   * Drive times are the developer's, read from the catalogue map page. ▶ Always
   * rendered with an "as per developer" label. “proposed” must stay “proposed”.
   * Airport: the catalogue says “Proposed Zewar Airport” (map: “Jewar Airport”).
   * Public reports say Noida International Airport (Jewar) began commercial
   * flights on 15 Jun 2026, so it is named without “proposed”; the 30-minute
   * figure remains the developer's. ▶ Confirm this wording with PGS.
   */
  locationHighlights: [
    { id: "buddh", place: "Buddh International Circuit", minutes: 10, mode: "drive", status: "existing" },
    { id: "gbu", place: "Gautam Buddha University", minutes: 10, mode: "drive", status: "existing" },
    { id: "pari", place: "Pari Chowk", minutes: 20, mode: "drive", status: "existing" },
    { id: "airport", place: "Jewar Airport (Noida International Airport)", minutes: 30, mode: "unspecified", status: "existing", note: "Catalogue wording: “Proposed Zewar Airport”." },
    { id: "film-city", place: "Film City", minutes: 15, mode: "unspecified", status: "proposed" },
    { id: "amrita", place: "Amrita Hospital, Faridabad", minutes: 15, mode: "unspecified", status: "existing" },
    { id: "epe", place: "Eastern Peripheral Highway", minutes: 10, mode: "unspecified", status: "existing" },
  ] satisfies LocationHighlight[],
  locationMap: { src: `${IMG}/location/location-map.webp`, alt: "Schematic location map showing PGS GREENS at Motipur between Mathura Road, the Yamuna River and the Yamuna Expressway", width: 1646, height: 1501 },
  locationAttribution: "As per developer. Schematic map, not to scale.",

  previousProjects: [
    {
      id: "express-city",
      name: "PGS Express City",
      place: "Sector 26A, Yamuna Expressway",
      kind: "Land development",
      text: "A land development venture offering expansive plots for residential construction, in a gated society.",
      image: { src: `${IMG}/previous-projects/pgs-express-city.webp`, alt: "Entrance gateway with PGS Express City signage", width: 551, height: 429 },
      status: tbp("Completion status"),
    },
    {
      id: "florence",
      name: "PGS Florence",
      place: "Noida",
      kind: "Residential apartments",
      text: "A residential project offering a range of apartment configurations.",
      image: { src: `${IMG}/previous-projects/pgs-florence.webp`, alt: "Render of a mid-rise residential building", width: 584, height: 467 },
      status: tbp("Completion status"),
    },
    {
      id: "delhi",
      name: "Residential properties",
      place: "Delhi",
      kind: "Residential",
      text: "A range of residential properties in Delhi (project names not given in the catalogue).",
      image: { src: `${IMG}/previous-projects/delhi-residential.webp`, alt: "Render of a multi-storey residential building in Delhi", width: 238, height: 190 },
      status: tbp("Completion status"),
    },
  ],
  previousProjectsNote: "Previous projects by PGS Group, as per developer’s catalogue. Completion status not provided.",

  logo: { src: `${IMG}/logo/pgs-greens-logo.png`, alt: "PGS GREENS — Nature’s Paradise", width: 1519, height: 475 },
  hero: {
    photo: { src: `${IMG}/hero/cover-farmland.webp`, width: 2029, height: 1426 },
    tree: { src: `${IMG}/hero/cover-tree-cutout.webp`, width: 947, height: 1108 },
    mood: { src: `${IMG}/hero/mood-farmstead.webp`, alt: "A red barn and silo among trees under a blue sky", width: 2231, height: 1569 },
    cabin: { src: `${IMG}/hero/connect-with-nature-cabin.webp`, alt: "A timber lodge lit at dusk among tall trees", width: 2247, height: 1209 },
    forest: { src: `${IMG}/story/forest-path.webp`, alt: "A footpath running through a green forest", width: 1024, height: 1536 },
  },

  /** Every field below is missing from the catalogue. */
  missing: {
    plotSizes: tbp("Plot sizes"),
    prices: tbp("Prices"),
    availability: tbp("Availability"),
    rera: tbp("RERA / approval No."),
    possession: tbp("Possession date"),
    landUse: tbp("Land-use / approval status"),
  },
} as const;

export const projects = [pgsGreens] as const;
export type Project = (typeof projects)[number];

export function formatDriveTime(h: LocationHighlight) {
  const base = `${h.minutes} min`;
  return h.mode === "drive" ? `${base} drive` : base;
}
