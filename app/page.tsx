import type { Metadata } from "next";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { CategoryIndex } from "@/components/home/CategoryIndex";
import { BuySellPanels } from "@/components/home/BuySellPanels";
import { OfficeBand } from "@/components/home/OfficeBand";

export const metadata: Metadata = buildMetadata({
  title: `${company.name} | Real estate in Faridabad, Delhi-NCR`,
  description: company.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <CategoryIndex />
      <BuySellPanels />
      <OfficeBand />
    </>
  );
}
