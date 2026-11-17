/**
 * PGS GREENS — plot hotspots for the interactive layout plan.
 *
 * Source: layout plan on page 12 of the developer's catalogue (PGS GREENS.pdf).
 * Plot numbers and hotspot positions were read from the plan image. The plan
 * shows plots numbered 1–148 (there is no plot "43" on it) plus 43A and 43B.
 * No total plot count is stated anywhere on the site.
 *
 * x / y are percentages of the plan image (3105 × 2188 px) so hotspots
 * stay locked to the artwork at any zoom level.
 *
 * Size, price and availability were NOT provided in the catalogue. They are
 * labelled placeholders until PGS supplies them — fill them in via
 * `plotDetailsById` below (only the plots you have data for need an entry).
 */

export const PLAN_IMAGE = {
  src: "/images/pgs-greens/plan/layout-plan.webp",
  width: 3105,
  height: 2188,
  alt: "Layout plan of PGS GREENS showing numbered plots, internal roads and the clubhouse area, as per developer's catalogue",
} as const;

export type PlotStatus = "available" | "booked" | "sold" | "hold";

export interface PlotHotspot {
  id: string;
  /** percent of plan width */
  x: number;
  /** percent of plan height */
  y: number;
}

export interface PlotDetails {
  size: string;
  price: string;
  status: string;
}

export const PLOT_PLACEHOLDERS: PlotDetails = {
  size: "[Size – to be provided]",
  price: "[Price – to be provided]",
  status: "[Availability – to be provided]",
};

/** Real data goes here once supplied by PGS, keyed by plot id e.g. "17" or "43A". */
export const plotDetailsById: Record<string, Partial<PlotDetails>> = {};

export const plotHotspots: readonly PlotHotspot[] = [
  { id: "1", x: 91.27, y: 59.05 },
  { id: "2", x: 89.53, y: 61.84 },
  { id: "3", x: 87.6, y: 64.67 },
  { id: "4", x: 85.7, y: 67.87 },
  { id: "5", x: 83.83, y: 71.07 },
  { id: "6", x: 82, y: 73.72 },
  { id: "7", x: 80.29, y: 76.55 },
  { id: "8", x: 78.33, y: 79.71 },
  { id: "9", x: 76.68, y: 82.45 },
  { id: "10", x: 71.24, y: 77.01 },
  { id: "11", x: 72.5, y: 75 },
  { id: "12", x: 74.01, y: 72.62 },
  { id: "13", x: 75.46, y: 70.29 },
  { id: "14", x: 76.91, y: 67.87 },
  { id: "15", x: 78.33, y: 65.72 },
  { id: "16", x: 79.84, y: 63.3 },
  { id: "17", x: 81.32, y: 61.06 },
  { id: "18", x: 82.54, y: 58.64 },
  { id: "19", x: 84.03, y: 56.35 },
  { id: "20", x: 85.57, y: 54.11 },
  { id: "21", x: 87.57, y: 50.78 },
  { id: "22", x: 87.44, y: 39.4 },
  { id: "23", x: 83.96, y: 44.15 },
  { id: "24", x: 82.64, y: 46.62 },
  { id: "25", x: 81.19, y: 48.81 },
  { id: "26", x: 79.71, y: 51.19 },
  { id: "27", x: 78.39, y: 53.52 },
  { id: "28", x: 76.78, y: 56.03 },
  { id: "29", x: 75.39, y: 58.46 },
  { id: "30", x: 73.98, y: 60.69 },
  { id: "31", x: 72.4, y: 63.16 },
  { id: "32", x: 71.05, y: 65.4 },
  { id: "33", x: 69.6, y: 67.73 },
  { id: "34", x: 68.18, y: 69.97 },
  { id: "35", x: 66.83, y: 72.26 },
  { id: "36", x: 61.26, y: 66.27 },
  { id: "37", x: 62.61, y: 64.08 },
  { id: "38", x: 64.15, y: 61.79 },
  { id: "39", x: 65.54, y: 59.51 },
  { id: "40", x: 67.12, y: 57.08 },
  { id: "41", x: 68.44, y: 54.84 },
  { id: "42", x: 69.89, y: 52.51 },
  { id: "43A", x: 71.82, y: 49.59 },
  { id: "43B", x: 67.5, y: 44.79 },
  { id: "44", x: 76.94, y: 43.74 },
  { id: "45", x: 74.94, y: 41.54 },
  { id: "46", x: 72.85, y: 39.31 },
  { id: "47", x: 65.64, y: 47.99 },
  { id: "48", x: 64.28, y: 50.23 },
  { id: "49", x: 62.74, y: 52.47 },
  { id: "50", x: 61.32, y: 54.84 },
  { id: "51", x: 59.77, y: 57.08 },
  { id: "52", x: 58.42, y: 59.37 },
  { id: "53", x: 57.13, y: 61.38 },
  { id: "54", x: 61.61, y: 38.21 },
  { id: "55", x: 59.65, y: 41 },
  { id: "56", x: 58.16, y: 43.37 },
  { id: "57", x: 56.62, y: 45.7 },
  { id: "58", x: 55.14, y: 48.08 },
  { id: "59", x: 53.62, y: 50.27 },
  { id: "60", x: 52.3, y: 52.56 },
  { id: "61", x: 50.82, y: 54.89 },
  { id: "62", x: 49.28, y: 57.27 },
  { id: "63", x: 47.86, y: 59.6 },
  { id: "64", x: 46.25, y: 62.02 },
  { id: "65", x: 44.7, y: 64.31 },
  { id: "66", x: 43.03, y: 66.73 },
  { id: "67", x: 41.35, y: 69.52 },
  { id: "68", x: 39.58, y: 72.39 },
  { id: "69", x: 37.55, y: 75.18 },
  { id: "70", x: 31.85, y: 70.52 },
  { id: "71", x: 33.78, y: 67.46 },
  { id: "72", x: 35.3, y: 65.13 },
  { id: "73", x: 36.75, y: 62.84 },
  { id: "74", x: 38.2, y: 60.65 },
  { id: "75", x: 39.68, y: 58.41 },
  { id: "76", x: 41.13, y: 56.12 },
  { id: "77", x: 42.67, y: 53.79 },
  { id: "78", x: 44.19, y: 51.46 },
  { id: "79", x: 45.6, y: 49.18 },
  { id: "80", x: 47.09, y: 46.89 },
  { id: "81", x: 48.57, y: 44.52 },
  { id: "82", x: 50.05, y: 42.32 },
  { id: "83", x: 51.53, y: 39.95 },
  { id: "84", x: 53.04, y: 37.61 },
  { id: "85", x: 54.56, y: 35.33 },
  { id: "86", x: 56.3, y: 32.59 },
  { id: "87", x: 52.24, y: 28.11 },
  { id: "88", x: 50.4, y: 30.94 },
  { id: "89", x: 48.89, y: 33.32 },
  { id: "90", x: 47.44, y: 35.56 },
  { id: "91", x: 46.02, y: 37.71 },
  { id: "92", x: 44.51, y: 40.13 },
  { id: "93", x: 42.96, y: 42.37 },
  { id: "94", x: 41.55, y: 44.7 },
  { id: "95", x: 40.19, y: 46.8 },
  { id: "96", x: 38.65, y: 49.18 },
  { id: "97", x: 37.13, y: 51.51 },
  { id: "98", x: 35.68, y: 53.84 },
  { id: "99", x: 34.07, y: 56.26 },
  { id: "100", x: 32.69, y: 58.5 },
  { id: "101", x: 31.27, y: 60.65 },
  { id: "102", x: 29.73, y: 63.03 },
  { id: "103", x: 28.21, y: 65.31 },
  { id: "104", x: 26.41, y: 68.1 },
  { id: "105", x: 22.8, y: 62.29 },
  { id: "106", x: 26.54, y: 54.66 },
  { id: "107", x: 23.96, y: 52.42 },
  { id: "108", x: 21.51, y: 50.23 },
  { id: "109", x: 18.97, y: 47.9 },
  { id: "110", x: 16.52, y: 45.7 },
  { id: "111", x: 13.91, y: 43.37 },
  { id: "112", x: 11.5, y: 41.18 },
  { id: "113", x: 8.86, y: 38.8 },
  { id: "114", x: 6.44, y: 36.61 },
  { id: "115", x: 3.8, y: 34.23 },
  { id: "116", x: 7.92, y: 28.29 },
  { id: "117", x: 10.37, y: 30.39 },
  { id: "118", x: 12.95, y: 32.68 },
  { id: "119", x: 15.49, y: 34.96 },
  { id: "120", x: 17.87, y: 37.11 },
  { id: "121", x: 20.52, y: 39.4 },
  { id: "122", x: 23.03, y: 41.64 },
  { id: "123", x: 25.51, y: 43.88 },
  { id: "124", x: 28.05, y: 46.12 },
  { id: "125", x: 30.56, y: 48.4 },
  { id: "126", x: 30.79, y: 44.06 },
  { id: "127", x: 32.27, y: 41.82 },
  { id: "128", x: 33.82, y: 39.58 },
  { id: "129", x: 35.33, y: 37.29 },
  { id: "130", x: 36.78, y: 35.05 },
  { id: "131", x: 38.33, y: 32.77 },
  { id: "132", x: 39.74, y: 30.62 },
  { id: "133", x: 41.35, y: 28.2 },
  { id: "134", x: 42.74, y: 26.1 },
  { id: "135", x: 44.28, y: 23.72 },
  { id: "136", x: 45.73, y: 21.34 },
  { id: "137", x: 47.44, y: 19.01 },
  { id: "138", x: 49.18, y: 16.41 },
  { id: "139", x: 50.69, y: 14.03 },
  { id: "140", x: 52.4, y: 11.47 },
  { id: "141", x: 54.24, y: 8.78 },
  { id: "142", x: 58.04, y: 16.91 },
  { id: "143", x: 54.62, y: 20.7 },
  { id: "144", x: 56.68, y: 22.85 },
  { id: "145", x: 58.78, y: 25.27 },
  { id: "146", x: 60.64, y: 27.56 },
  { id: "147", x: 63, y: 30.3 },
  { id: "148", x: 64.93, y: 33.04 },
];

export function getPlotDetails(id: string): PlotDetails {
  return { ...PLOT_PLACEHOLDERS, ...plotDetailsById[id] };
}
