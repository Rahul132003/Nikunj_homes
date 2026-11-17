import { categories } from "./properties";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export const primaryNav: NavItem[] = [
  {
    label: "Properties",
    href: "/properties",
    children: categories.map((c) => ({
      label: c.title,
      href: `/properties/${c.slug}`,
      description: c.short,
    })),
  },
  { label: "PGS GREENS", href: "/projects/pgs-greens" },
  { label: "Buy / Invest", href: "/buy-invest" },
  { label: "Sell Your Property", href: "/sell" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
];

export const ctaNav = { label: "Contact", href: "/contact" };

export const footerNav = {
  explore: [
    { label: "Home", href: "/" },
    { label: "About Nikunj Homes", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],
  properties: [
    ...categories.map((c) => ({ label: c.title, href: `/properties/${c.slug}` })),
    { label: "PGS GREENS", href: "/projects/pgs-greens" },
  ],
  clients: [
    { label: "Buy / Invest", href: "/buy-invest" },
    { label: "Sell Your Property", href: "/sell" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};
