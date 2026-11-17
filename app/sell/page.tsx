import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { SellForm } from "@/components/forms/SellForm";
import { Eyebrow } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Sell Your Property",
  description: "Share details of your residential, commercial, industrial or farm house property with Nikunj Homes, Faridabad.",
  path: "/sell",
});

const include = [
  ["Property type", "Residential, commercial, industrial or farm house."],
  ["Location", "Sector or area, and city."],
  ["Size", "Plot or built-up area, with the unit."],
  ["Your expectation", "An expected price, if you have one in mind."],
  ["Anything notable", "Anything you think a buyer should know."],
];

export default function SellPage() {
  return (
    <>
      <PageHero heroKey="sell"
        eyebrow="Sell your property"
        title="Tell us about the property you’d like to sell."
        intro="Residential, commercial, industrial or farm house — share the basics and Nikunj Homes will get in touch."
        crumbs={[{ label: "Home", href: "/" }, { label: "Sell Your Property" }]}
      />
      <section className="section-y-sm">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal><Eyebrow>What to include</Eyebrow></Reveal>
              <Reveal delay={0.06}><h2 className="text-h3 mt-5 text-forest-900">A few details go a long way.</h2></Reveal>
              <ol className="mt-8 divide-y divide-hairline border-y border-hairline">
                {include.map(([t, d], i) => (
                  <li key={t} className="grid grid-cols-[2.5rem_1fr] gap-3 py-5">
                    <span aria-hidden className="font-display text-[1.5rem] leading-none text-bronze">0{i + 1}</span>
                    <div><p className="font-semibold text-forest-900">{t}</p><p className="mt-1 text-small text-muted">{d}</p></div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <Reveal className="lg:col-span-7">
            <div className="border border-forest-900/10 bg-white p-6 sm:p-10"><SellForm /></div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
