import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, getListing, listings } from "@/data/properties";
import { buildMetadata } from "@/lib/seo";
import type { HeroKey } from "@/data/heroes";
import { PageHero } from "@/components/layout/PageHero";
import { ListingGallery } from "@/components/properties/ListingGallery";
import { BuyInvestForm } from "@/components/forms/BuyInvestForm";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

export function generateStaticParams() {
  return listings.map((l) => ({ category: l.category, slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category, slug } = await params;
  const l = getListing(category, slug);
  const c = getCategory(category);
  if (!l || !c) return {};
  // Template pages are noindex until real listings replace them.
  return buildMetadata({ title: `Sample ${c.title.toLowerCase()} listing`, description: `A sample ${c.title.toLowerCase()} property listing — illustrative only.`, path: `/properties/${category}/${slug}`, noindex: l.isTemplate });
}

export default async function ListingPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const l = getListing(category, slug);
  const c = getCategory(category);
  if (!l || !c) notFound();

  const specs: [string, string][] = [
    ["Property type", l.propertyType],
    ["Location", l.location],
    ["Area", l.area],
    ["Price", l.price],
    ["Availability", l.status],
    ["Listing reference", l.reference],
  ];

  return (
    <>
      <PageHero heroKey={c.slug as HeroKey}
        eyebrow={`${c.title} property`}
        title={l.title}
        crumbs={[{ label: "Home", href: "/" }, { label: "Properties", href: "/properties" }, { label: c.title, href: `/properties/${c.slug}` }, { label: "Listing" }]}
      />

      {l.isTemplate && (
        <div role="note" className="border-b border-bronze/40 bg-ivory-200">
          <p className="container-x py-3 text-small text-charcoal"><strong>Sample listing.</strong> The details and photographs on this page are illustrative stand-ins, not a real property or an offer.</p>
        </div>
      )}

      <div className="container-x section-y-sm grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <ListingGallery slots={l.images} />

          <section aria-labelledby="overview-h" className="mt-14">
            <Eyebrow>Overview</Eyebrow>
            <h2 id="overview-h" className="text-h3 mt-4 text-forest-900">About this property</h2>
            <p className="mt-5 text-lead text-muted">{l.summary}</p>
          </section>

          <section aria-labelledby="specs-h" className="mt-14">
            <h2 id="specs-h" className="text-h3 text-forest-900">Specifications</h2>
            <dl className="mt-6 border-t border-hairline">
              {specs.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[10rem_1fr] gap-4 border-b border-hairline py-4 text-[0.9375rem] sm:grid-cols-[14rem_1fr]">
                  <dt className="text-muted">{k}</dt>
                  <dd className="font-medium text-forest-900">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="features-h" className="mt-14">
            <h2 id="features-h" className="text-h3 text-forest-900">Features</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {l.features.map((f) => (
                <li key={f} className="flex items-center gap-3 border border-hairline bg-white px-5 py-4 text-[0.9375rem]"><span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-bronze" />{f}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside aria-label="Enquiry summary" className="lg:col-span-4">
          <div className="border border-forest-900/15 bg-white p-7 lg:sticky lg:top-28">
            <p className="text-eyebrow text-label">{c.title}</p>
            <p className="mt-3 font-display text-[2.5rem] leading-none text-forest-900">{l.price}</p>
            <p className="mt-3 text-small text-muted">Ref: {l.reference}</p>
            <div className="mt-7 grid gap-3">
              <LinkButton href="#enquire" arrow>Enquire about this property</LinkButton>
              <LinkButton href="/sell" variant="outline">Sell a similar property</LinkButton>
            </div>
          </div>
        </aside>
      </div>

      <section id="enquire" aria-labelledby="enq-h" className="bg-ivory-200 section-y-sm">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Eyebrow>Enquire</Eyebrow>
            <h2 id="enq-h" className="text-h2 mt-5 text-forest-900">Interested?</h2>
            <p className="mt-5 text-muted">Share your details and what you’re looking for.</p>
          </div>
          <div className="bg-white p-6 sm:p-10 lg:col-span-8"><BuyInvestForm /></div>
        </div>
      </section>
    </>
  );
}
