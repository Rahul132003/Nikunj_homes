/**
 * HERO IMAGES — one place to set the background photo for every page's hero.
 *
 * No Nikunj Homes photography has been supplied yet, so each page uses the closest
 * match from the PGS GREENS developer's catalogue and says so on the page
 * ("Representative image from the developer's catalogue"). To use your own photo,
 * drop it in /public/images/nikunj/ and change `src` (and set `representative: false`
 * to hide the caption). Nothing else needs to change.
 */

const IMG = "/images/pgs-greens";

export type HeroKey =
  | "home" | "about" | "properties" | "residential" | "commercial" | "industrial"
  | "farm-houses" | "gallery" | "sell" | "buy-invest" | "contact";

export interface HeroImage {
  src: string;
  alt: string;
  /** CSS object-position, to keep the interesting part of the photo in frame. */
  position?: string;
  /** Source resolution in px — lower-resolution images get a heavier overlay. */
  width: number;
  /** Shows the "representative image" caption. Set false once it is a real Nikunj Homes photo. */
  representative: boolean;
  /** Overlay strength (0–1) for text legibility. */
  overlay?: number;
}

export const heroCaption = "Representative image from the developer’s catalogue";

export const heroes: Record<HeroKey, HeroImage> = {
  home: { src: `${IMG}/clubhouse/pool-pavilion.webp`, alt: "A pool in front of a tiled-roof pavilion surrounded by palms", position: "50% 62%", width: 1509, representative: true, overlay: 0.62 },
  about: { src: `${IMG}/hero/mood-farmstead.webp`, alt: "A red barn and silo among trees under a blue sky", position: "50% 70%", width: 2231, representative: true, overlay: 0.66 },
  properties: { src: `${IMG}/hero/connect-with-nature-cabin.webp`, alt: "A timber lodge glowing at dusk among tall trees", position: "50% 55%", width: 2247, representative: true, overlay: 0.66 },
  residential: { src: `${IMG}/hero/connect-with-nature-cabin.webp`, alt: "A timber home glowing warmly at dusk among tall trees", position: "78% 50%", width: 2247, representative: true, overlay: 0.7 },
  commercial: { src: `${IMG}/clubhouse/dine-in.webp`, alt: "A plant-filled restaurant interior with teal and yellow chairs", position: "50% 45%", width: 807, representative: true, overlay: 0.78 },
  industrial: { src: `${IMG}/features/solar-power.webp`, alt: "Solar panels against a bright sky over a green field", position: "50% 40%", width: 880, representative: true, overlay: 0.78 },
  "farm-houses": { src: `${IMG}/hero/cover-farmland.webp`, alt: "A lone tree and red farm buildings on rolling green farmland", position: "50% 65%", width: 2029, representative: true, overlay: 0.64 },
  gallery: { src: `${IMG}/features/flowering-streets.webp`, alt: "A dirt lane lined with red flowering shrubs and tall trees", position: "50% 55%", width: 945, representative: true, overlay: 0.76 },
  sell: { src: `${IMG}/features/orchard-lanes.webp`, alt: "An orchard lane with ripe fruit hanging from the trees", position: "50% 45%", width: 958, representative: true, overlay: 0.78 },
  "buy-invest": { src: `${IMG}/hero/mood-farmstead.webp`, alt: "A red barn and silo among trees under a blue sky", position: "20% 60%", width: 2231, representative: true, overlay: 0.7 },
  contact: { src: `${IMG}/hero/cover-farmland.webp`, alt: "A lone tree and red farm buildings on rolling green farmland", position: "30% 60%", width: 2029, representative: true, overlay: 0.7 },
};

/** Sources under ~1,200 px wide are soft-focused so upscaling to a full-width hero looks intentional. */
export const isLowRes = (h: HeroImage) => h.width < 1200;

export function isHeroKey(k: string): k is HeroKey {
  return k in heroes;
}
