import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/properties";
import { pgsRelationship } from "@/data/company";
import { pgsGreens } from "@/data/projects";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { BuyInvestForm } from "@/components/forms/BuyInvestForm";
import { Eyebrow } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Buy / Invest",
  description: "Enquire about buying or investing in residential, commercial, industrial or farm house property with Nikunj Homes, Faridabad.",
  path: "/buy-invest",
});

export default function BuyInvestPage() {
  const f = pgsGreens;
  return (
    <>
      <PageHero heroKey="buy-invest"
        eyebrow="Buy / Invest"
        title="Looking to buy or invest? Start here."
        intro="Tell us the type of property, your budget and where you’d like to be."
        crumbs={[{ label: "Home", href: "/" }, { label: "Buy / Invest" }]}
      />
      <section className="section-y-sm">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* form leads here (it follows the content on Sell) */}
          <Reveal className="lg:col-span-7">
            <div className="border border-forest-900/10 bg-white p-6 sm:p-10"><BuyInvestForm /></div>
          </Reveal>

          <aside className="space-y-10 lg:col-span-5" aria-label="Browse while you enquire">
            <Reveal>
              <Eyebrow>Browse by type</Eyebrow>
              <ul className="mt-5 divide-y divide-hairline border-y border-hairline">
                {categories.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/properties/${c.slug}`} className="group flex items-center justify-between py-4">
                      <span className="font-display text-[1.75rem] leading-none text-forest-900 transition-transform duration-500 group-hover:translate-x-2">{c.title}</span>
                      <svg aria-hidden viewBox="0 0 20 10" className="h-2.5 w-5 text-forest-900" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <Link href="/projects/pgs-greens" data-theme="pgs" className="group relative block overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image src={f.hero.photo.src} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                  <p className="text-eyebrow text-pgs-wash">{pgsRelationship.label}</p>
                  <p className="mt-2 font-display text-[2rem] leading-none">{f.name}</p>
                  <p className="mt-2 text-small text-sage">{f.type}, {f.locationLine}</p>
                </div>
              </Link>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
