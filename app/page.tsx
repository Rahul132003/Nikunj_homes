import type { Metadata } from "next";
import { company } from "@/data/company";
import { buildMetadata, websiteJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { HomeHero } from "@/components/home/HomeHero";
import { CategoryIndex } from "@/components/home/CategoryIndex";
import { BuySellPanels } from "@/components/home/BuySellPanels";
import { OfficeBand } from "@/components/home/OfficeBand";

export const metadata: Metadata = buildMetadata({
  title: { absolute: `${company.name} | Real estate in Faridabad, Delhi-NCR` },
  description:
    "Buy and sell residential, commercial, industrial and farm house properties in Faridabad with Nikunj Homes. Browse listings or tell us what you need.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <HomeHero />
      <CategoryIndex />
      <BuySellPanels />
      <OfficeBand />
    </>
  );
}
