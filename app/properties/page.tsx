import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { categories } from "@/data/properties";
import { pgsRelationship } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Properties",
  description: "Residential, commercial, industrial and farm house properties bought and sold through Nikunj Homes, Faridabad.",
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

      {/* alternating editorial rows — each category gets room */}
      <div>
        {categories.map((c, i) => {
          const flip = i % 2 === 1;
          return (
            <section key={c.slug} aria-labelledby={`${c.slug}-h`} className={`section-y-sm ${flip ? "bg-ivory-200" : ""}`}>
              <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-20">
                <Reveal className={`lg:col-span-6 ${flip ? "lg:order-2" : ""}`}>
                  {/* decorative duplicate of the button link below — kept out of the tab order */}
                  <Link href={`/properties/${c.slug}`} tabIndex={-1} aria-hidden="true" className="group block overflow-hidden">
                    <span className="relative block aspect-[5/4] overflow-hidden"><Image src={c.image.src} alt={c.image.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.03]" /></span>
                  </Link>
                </Reveal>
                <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                  <Reveal><Eyebrow>0{i + 1}</Eyebrow></Reveal>
                  <Reveal delay={0.06}><h2 id={`${c.slug}-h`} className="text-h2 mt-5 text-forest-900">{c.title}</h2></Reveal>
                  <Reveal delay={0.12}><p className="text-lead mt-6 text-muted">{c.intro}</p></Reveal>
                  <Reveal delay={0.18}>
                    <ul className="mt-7 space-y-2 text-[0.9375rem]">
                      {c.helps.map((h) => (
                        <li key={h} className="flex items-center gap-3"><span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-bronze" />{h}</li>
                      ))}
                    </ul>
                  </Reveal>
                  <Reveal delay={0.24}>
                    <div className="mt-9 flex flex-wrap items-center gap-4">
                      <LinkButton href={`/properties/${c.slug}`} arrow>View {c.title.toLowerCase()}</LinkButton>
                      {c.slug === "farm-houses" && (
                        <Link href="/projects/pgs-greens" className="link-underline text-small font-semibold text-forest-900">
                          {pgsRelationship.label}: PGS GREENS →
                        </Link>
                      )}
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
