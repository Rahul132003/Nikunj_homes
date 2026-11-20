import { SmoothImage } from "@/components/ui/SmoothImage";
import type { Metadata } from "next";
import Link from "next/link";
import { categories, listings } from "@/data/properties";
import { PropertyBrowser } from "@/components/properties/PropertyBrowser";
import { pgsRelationship } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Properties in Faridabad, Delhi-NCR",
  description:
    "Browse residential, commercial, industrial and farm house properties in Faridabad, Delhi-NCR. Search by type and location, or tell Nikunj Homes what you need.",
  path: "/properties",
});

export default function PropertiesPage() {
  return (
    <>
      <PageHero heroKey="properties"
        eyebrow="Properties"
        title="Four kinds of property, one place to start."
        intro="Browse by type. Current listings will appear here as they are confirmed — until then, tell us what you’re looking for."
        crumbs={[{ label: "Home", href: "/" }, { label: "Properties" }]}
      />

      <section id="listings" aria-labelledby="browse-h" className="section-y-sm">
        <div className="container-x">
          <Reveal><Eyebrow>Browse listings</Eyebrow></Reveal>
          <Reveal delay={0.06}><h2 id="browse-h" className="text-h2 mt-5 text-forest-900">Find a property.</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl border-l-2 border-bronze bg-ivory-200 px-5 py-4 text-small text-charcoal">
              <strong>Sample listings.</strong> No live listings have been supplied yet. The cards below are illustrations — details and photographs are samples, not real inventory.
            </p>
          </Reveal>
          <div className="mt-8">
            <PropertyBrowser listings={listings} categories={categories.map((c) => ({ slug: c.slug, title: c.title }))} />
          </div>
        </div>
      </section>

      {/* four editorial rows, one per property type */}
      <div>
        {categories.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <section key={c.slug} aria-labelledby={`${c.slug}-h`} className={`group/row section-y border-t border-hairline ${flip ? "bg-ivory-200" : ""}`}>
              <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
                <Reveal className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
                  {/* decorative duplicate of the button link below — kept out of the tab order */}
                  <Link href={`/properties/${c.slug}`} tabIndex={-1} aria-hidden="true" className="relative block">
                    {/* offset gold frame: drifts a little on hover (transform only) */}
                    <span aria-hidden className="absolute inset-0 hidden translate-x-3 translate-y-3 border border-gold-500/70 transition-transform duration-700 ease-out group-hover/row:translate-x-5 group-hover/row:translate-y-5 motion-reduce:transition-none sm:block" />
                    <span className="relative block aspect-[5/4] overflow-hidden bg-forest-900/10">
                      <SmoothImage src={c.image.src} alt={c.image.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1600ms] ease-out group-hover/row:scale-[1.05] motion-reduce:transition-none" />
                      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-950/45 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover/row:opacity-100" />
                      {/* corner arrow: rises in and straightens on hover */}
                      <span aria-hidden className="absolute bottom-5 right-5 grid h-14 w-14 translate-y-3 place-items-center rounded-full bg-gold-400 text-forest-950 opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover/row:translate-y-0 group-hover/row:opacity-100 motion-reduce:transition-none">
                        <svg viewBox="0 0 20 10" className="h-2.5 w-5 -rotate-45 transition-transform duration-500 ease-out group-hover/row:rotate-0" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
                      </span>
                    </span>
                  </Link>
                </Reveal>

                <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                  <Reveal>
                    <div className="flex items-center gap-5">
                      <span aria-hidden className="font-display text-[3.25rem] font-medium leading-none text-bronze [font-variant-numeric:lining-nums]">0{i + 1}</span>
                      <span aria-hidden className="h-px w-16 origin-left bg-gold-500 transition-transform duration-700 ease-out group-hover/row:scale-x-[1.6] motion-reduce:transition-none" />
                    </div>
                  </Reveal>
                  <Reveal delay={0.06}><h2 id={`${c.slug}-h`} className="text-h2 mt-6 text-balance text-forest-900">{c.title}</h2></Reveal>
                  <Reveal delay={0.12}><p className="text-lead mt-5 max-w-[34rem] text-muted">{c.intro}</p></Reveal>
                  <Reveal delay={0.18}>
                    <ul className="mt-8 max-w-[34rem] divide-y divide-hairline border-y border-hairline text-[0.9375rem]">
                      {c.helps.map((h, k) => (
                        <li key={h} className="flex items-center justify-between gap-4 py-3.5 text-charcoal">
                          {h}
                          <svg aria-hidden viewBox="0 0 20 10" className="h-2.5 w-5 shrink-0 text-bronze opacity-40 transition-[transform,opacity] duration-500 ease-out group-hover/row:translate-x-1.5 group-hover/row:opacity-100 motion-reduce:transition-none" style={{ transitionDelay: `${k * 70}ms` }} fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.24}>
                    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                      <LinkButton href={`/properties/${c.slug}`} size="lg" arrow>View {c.title.toLowerCase()}</LinkButton>
                      {c.slug === "farm-houses" && (
                        <Link href="/projects/pgs-greens" className="group/pgs inline-flex items-center gap-2 text-small font-semibold text-forest-900">
                          <span className="link-underline">{pgsRelationship.label}: PGS GREENS</span>
                          <svg aria-hidden viewBox="0 0 20 10" className="h-2.5 w-5 transition-transform duration-500 group-hover/pgs:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
                        </Link>
                      )}
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>    </>
  );
}
