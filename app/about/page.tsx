import type { Metadata } from "next";
import Link from "next/link";
import { company, tbp } from "@/data/company";
import { categories } from "@/data/properties";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Eyebrow, Tbp } from "@/components/ui/Typography";
import { Reveal, RuleReveal } from "@/components/motion/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "About Nikunj Homes",
  description: company.description,
  path: "/about",
});

const details: [string, string][] = [
  ["Registered name", company.registration.legalName],
  ["Year established", tbp("Year established")],
  ["RERA agent registration", company.registration.rera],
  ["GSTIN", company.registration.gst],
  ["Team", tbp("Team details")],
  ["Areas served", tbp("Areas served")],
];

export default function AboutPage() {
  return (
    <>
      <PageHero heroKey="about"
        eyebrow="About Nikunj Homes"
        title="A Faridabad real estate firm."
        intro={company.descriptor}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {/* 1 — statement: oversized serif, narrow side column */}
      <section className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-8">
            <p className="font-display text-[clamp(1.875rem,1.2rem+2.8vw,3.5rem)] font-medium leading-[1.15] text-forest-900 text-balance">
              Nikunj Homes deals in <em className="italic text-bronze">buying and selling</em> residential, commercial, industrial and farm house properties.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-4 lg:pt-4">
            <Eyebrow>Our story</Eyebrow>
            <p className="mt-5"><Tbp>{tbp("Company story and values")}</Tbp></p>
            <p className="mt-4 text-small text-muted">Nothing is stated here beyond what the firm has confirmed.</p>
          </Reveal>
        </div>
      </section>

      {/* 2 — what we deal in: a ruled strip, not cards */}
      <section aria-labelledby="deal-h" className="bg-ivory-200 section-y-sm">
        <div className="container-x">
          <Reveal><h2 id="deal-h" className="text-eyebrow text-label">What we deal in</h2></Reveal>
          <ul className="mt-8 grid border-t border-forest-900/20 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <li key={c.slug} className="border-b border-forest-900/20 lg:border-b-0 lg:border-r lg:last:border-r-0">
                <Reveal delay={i * 0.06}>
                  <Link href={`/properties/${c.slug}`} className="group block px-0 py-8 lg:px-8 lg:first:pl-0">
                    <span aria-hidden className="font-display text-[1.25rem] text-bronze">0{i + 1}</span>
                    <span className="mt-3 block font-display text-[2rem] leading-none text-forest-900 transition-transform duration-500 group-hover:translate-x-2">{c.title}</span>
                    <span className="mt-3 block text-small text-muted">{c.short}</span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 — office + registry */}
      <section aria-labelledby="office-h" className="section-y">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <Reveal><Eyebrow>The office</Eyebrow></Reveal>
            <Reveal delay={0.06}><h2 id="office-h" className="text-h3 mt-5 text-forest-900">{company.address.line1}, {company.address.city}</h2></Reveal>
            <Reveal delay={0.1}><address className="mt-4 not-italic text-muted">{company.address.full}</address></Reveal>
            <Reveal delay={0.14} className="mt-8"><ImagePlaceholder label="Nikunj Homes office photo – to be provided" ratio="4 / 3" className="text-forest-700" /></Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>Company details</Eyebrow></Reveal>
            <RuleReveal className="mt-6 opacity-50" />
            <dl>
              {details.map(([k, v], i) => (
                <Reveal key={k} delay={i * 0.04} className="grid grid-cols-[11rem_1fr] gap-4 border-b border-hairline py-5 text-[0.9375rem] sm:grid-cols-[15rem_1fr]">
                  <dt className="text-muted">{k}</dt><dd><Tbp>{v}</Tbp></dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
