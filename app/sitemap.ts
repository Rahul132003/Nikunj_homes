import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/company";
import { categories, listings } from "@/data/properties";

// Fixed at build time: the date this version of the site was generated.
const lastModified = new Date();

const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly"): MetadataRoute.Sitemap[number] => ({
  url: `${siteUrl}${path}`,
  lastModified,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    entry("", 1, "weekly"),
    entry("/properties", 0.9, "weekly"),
    ...categories.map((c) => entry(`/properties/${c.slug}`, 0.8, "weekly")),
    entry("/projects/pgs-greens", 0.8, "monthly"),
    entry("/buy-invest", 0.7, "monthly"),
    entry("/sell", 0.7, "monthly"),
    entry("/about", 0.6, "monthly"),
    entry("/contact", 0.6, "monthly"),
    entry("/gallery", 0.5, "monthly"),
    // Real listings only: sample listings are noindex and must not be in the sitemap.
    ...listings.filter((l) => !l.isTemplate).map((l) => entry(`/properties/${l.category}/${l.slug}`, 0.7, "weekly")),
    entry("/privacy", 0.2, "yearly"),
    entry("/disclaimer", 0.2, "yearly"),
  ];
}
