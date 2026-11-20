import type { Metadata } from "next";
import { company, siteUrl } from "@/data/company";

interface MetaInput {
  /** A string gets the site template ("Title | Nikunj Homes"); { absolute } is used exactly as written. */
  title: string | { absolute: string };
  description: string;
  path: string;
  /** Absolute or root-relative OG image. Defaults to the generated brand card. */
  image?: string;
  noindex?: boolean;
}

/** Consistent metadata + Open Graph + Twitter for every route. */
export function buildMetadata({ title, description, path, image, noindex }: MetaInput): Metadata {
  const url = new URL(path, siteUrl).toString();
  const shown = typeof title === "string" ? `${title} | ${company.name}` : title.absolute;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      siteName: company.name,
      locale: "en_IN",
      title: shown,
      description,
      url,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: shown,
      description,
      images: image ? [image] : undefined,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data — only facts the client has confirmed.              */
/* No price, rating, review, award, opening-hours or offer data. */
/* ------------------------------------------------------------------ */

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: company.name,
  description: company.description,
  url: siteUrl,
  telephone: company.contact.phone,
  email: company.contact.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.line1,
    addressLocality: company.address.city,
    addressRegion: company.address.state,
    postalCode: company.address.postalCode,
    addressCountry: company.address.country,
  },
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: company.name,
  url: siteUrl,
  inLanguage: "en-IN",
};

/**
 * Listing structured data. Only for REAL listings (never samples). Price is deliberately not published
 * ("Price on request"), so no offer/price is emitted.
 */
export function listingJsonLd(l: { title: string; summary: string; location: string; category: string; slug: string; images: { src: string }[] }) {
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: l.title,
    description: l.summary,
    url: new URL(`/properties/${l.category}/${l.slug}`, siteUrl).toString(),
    image: l.images.map((i) => new URL(i.src, siteUrl).toString()),
    contentLocation: { "@type": "Place", name: l.location },
    provider: { "@type": "RealEstateAgent", name: company.name, url: siteUrl },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: new URL(it.path, siteUrl).toString(),
    })),
  };
}
