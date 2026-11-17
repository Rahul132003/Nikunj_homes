import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/company";
import { categories } from "@/data/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "", "/about", "/properties", ...categories.map((c) => `/properties/${c.slug}`),
    "/projects/pgs-greens", "/gallery", "/sell", "/buy-invest", "/contact", "/privacy", "/disclaimer",
  ];
  return paths.map((p) => ({ url: `${siteUrl}${p}`, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 }));
}
