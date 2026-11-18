import type { Metadata } from "next";
import { pgsRelationship, siteUrl } from "@/data/company";
import { pgsGreens } from "@/data/projects";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { PgsHero } from "@/components/pgs/PgsHero";
import { PgsSubnav } from "@/components/pgs/PgsSubnav";
import { PgsStory } from "@/components/pgs/PgsStory";
import { KeyFeatures } from "@/components/pgs/KeyFeatures";
import { NatureInspired } from "@/components/pgs/NatureInspired";
import { ClubhouseGallery } from "@/components/pgs/ClubhouseGallery";
import { WhyPgsGreens } from "@/components/pgs/WhyPgsGreens";
import { PgsSiteVideos } from "@/components/pgs/PgsSiteVideos";
import { PlanViewer } from "@/components/pgs/PlanViewer";
import { LocationSection } from "@/components/pgs/LocationSection";
import { PreviousProjects } from "@/components/pgs/PreviousProjects";
import { PgsEnquirySection } from "@/components/pgs/PgsEnquirySection";

const description = `${pgsRelationship.label}: ${pgsGreens.name}, an upcoming luxury farmhouse land development of ${pgsGreens.area.value} ${pgsGreens.area.unit} in ${pgsGreens.locationLine}. Details as per developer’s catalogue.`;

export const metadata: Metadata = buildMetadata({
  title: `${pgsGreens.name} — ${pgsRelationship.label}`,
  description,
  path: "/projects/pgs-greens",
  image: pgsGreens.hero.photo.src,
});

// Only facts from the catalogue: name, place, description. No price, offer, rating, RERA or dates.
const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${pgsGreens.name} — ${pgsGreens.tagline}`,
  description,
  url: `${siteUrl}/projects/pgs-greens`,
  about: {
    "@type": "Place",
    name: pgsGreens.name,
    address: { "@type": "PostalAddress", addressLocality: "Motipur, Greater Noida", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
  },
};

export default function PgsGreensPage() {
  return (
    <div data-theme="pgs">
      <JsonLd data={[pageJsonLd, breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "PGS GREENS", path: "/projects/pgs-greens" }])]} />
      <PgsHero />
      <PgsSubnav />
      <PgsStory />
      <KeyFeatures />
      <NatureInspired />
      <ClubhouseGallery />
      <WhyPgsGreens />
      <PgsSiteVideos />

      <section id="layout" aria-labelledby="layout-heading" className="section-y">
        <div className="container-x">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal><Eyebrow>Layout plan</Eyebrow></Reveal>
              <Reveal delay={0.08}><Heading id="layout-heading" className="mt-6 text-forest-900">Find your plot.</Heading></Reveal>
            </div>
            <Reveal delay={0.12} className="lg:col-span-5">
              <p className="text-muted">The developer’s layout plan, made explorable. Select a plot to see its details — size, price and availability will appear once supplied.</p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-12"><PlanViewer /></Reveal>
        </div>
      </section>

      <LocationSection />
      <PreviousProjects />
      <PgsEnquirySection />
    </div>
  );
}
