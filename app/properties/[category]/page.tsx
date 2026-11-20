import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categories, getCategory, listingsFor, type CategorySlug } from "@/data/properties";
import { pgsRelationship } from "@/data/company";
import { pgsGreens } from "@/data/projects";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import type { HeroKey } from "@/data/heroes";
import { PageHero } from "@/components/layout/PageHero";
import { ListingCard } from "@/components/properties/ListingCard";
import { LandmarkFeature } from "@/components/properties/LandmarkFeature";
import { LinkButton } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Eyebrow } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return buildMetadata({ title: `${c.title} properties in Faridabad`, description: `${c.intro} Enquire with Nikunj Homes, Faridabad.`, path: `/properties/${c.slug}` });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const items = listingsFor(c.slug as CategorySlug);
  const isFarm = c.slug === "farm-houses";
  const f = pgsGreens;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Properties", path: "/properties" }, { name: c.title, path: `/properties/${c.slug}` }])} />
      <PageHero heroKey={c.slug as HeroKey}
        eyebrow="Properties"
        title={c.title}
        intro={c.intro}
        crumbs={[{ label: "Home", href: "/" }, { label: "Properties", href: "/properties" }, { label: c.title }]}
      />

      {isFarm && (
        <section aria-labelledby="featured-h" className="section-y-sm">
          <div className="container-x">
            <Reveal><Eyebrow>{pgsRelationship.label}</Eyebrow></Reveal>
            <Reveal delay={0.06}>
              <Link href="/projects/pgs-greens" data-theme="pgs" className="group mt-8 grid overflow-hidden border border-hairline bg-white transition-colors duration-500 hover:border-forest-900 lg:grid-cols-12">
                <div className="relative aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[24rem]">
                  <Image src={f.hero.photo.src} alt="" fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-8 sm:p-12 lg:col-span-5">
                  <p className="text-eyebrow text-label">{f.descriptor}</p>
                  <h2 id="featured-h" className="text-h2 mt-4 text-forest-900">{f.name}</h2>
                  <p className="mt-2 font-display text-[1.5rem] italic text-pgs-green">{f.tagline}</p>
                  <p className="mt-5 text-muted">{f.type} of {f.area.value} {f.area.unit} in {f.locationLine}.</p>
                  <p className="mt-3 inline-flex items-center gap-2 text-small font-semibold text-forest-900">
                    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 text-bronze" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></svg>
                    {f.landmark.distance} of {f.landmark.name}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-forest-900">
                    <span className="link-underline">View the project</span>
                    <svg aria-hidden viewBox="0 0 20 10" className="h-2.5 w-5 transition-transform duration-500 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {isFarm && <LandmarkFeature />}

      <section aria-labelledby="listings-h" className="section-y-sm">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Reveal><Eyebrow>Listings</Eyebrow></Reveal>
              <Reveal delay={0.06}><h2 id="listings-h" className="text-h2 mt-5 text-forest-900">Available {c.title.toLowerCase()} properties</h2></Reveal>
            </div>
          </div>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl border-l-2 border-bronze bg-ivory-200 px-5 py-4 text-small text-charcoal">
              <strong>Sample listings.</strong> No live {c.title.toLowerCase()} listings have been supplied yet. The cards below are illustrations — details and photographs are samples, not real inventory.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((l, i) => (
              <li key={l.slug}><Reveal delay={i * 0.08}><ListingCard listing={l} /></Reveal></li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-label="Enquire" className="surface-dark grain section-y-sm">
        <div className="container-x flex flex-wrap items-center justify-between gap-8">
          <div>
            <h2 className="text-h3 max-w-xl">Looking for something specific in {c.title.toLowerCase()} property?</h2>
            <p className="mt-3 max-w-xl text-sage">Tell us what you need, or share a property you’d like to sell.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <LinkButton href="/buy-invest" variant="gold" arrow>Buy / Invest</LinkButton>
            <LinkButton href="/sell" variant="outline-light">Sell your property</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
