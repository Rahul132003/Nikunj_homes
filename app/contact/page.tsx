import type { Metadata } from "next";
import { company } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { mapsUrl } from "@/components/home/OfficeBand";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow, Tbp } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Contact Nikunj Homes at ${company.address.full}.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero heroKey="contact"
        eyebrow="Contact"
        title="Get in touch with Nikunj Homes."
        intro="Visit the office, or send a message and we’ll respond."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />
      <section className="section-y-sm">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="space-y-10 lg:col-span-5">
            <Reveal>
              <Eyebrow>Office</Eyebrow>
              <address className="mt-5 font-display text-[2rem] not-italic leading-tight text-forest-900">
                {company.address.line1},<br />{company.address.city}, {company.address.state}-{company.address.postalCode}
              </address>
              <div className="mt-6"><LinkButton href={mapsUrl} external variant="outline" arrow>Get directions</LinkButton></div>
            </Reveal>
            <Reveal delay={0.08}>
              <dl className="divide-y divide-hairline border-y border-hairline text-[0.9375rem]">
                {([["Phone", company.contact.phone], ["Email", company.contact.email], ["Hours", company.contact.hours], ["WhatsApp", company.whatsapp.placeholder]] as const).map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 py-4"><dt className="text-eyebrow text-bronze">{k}</dt><dd><Tbp>{v}</Tbp></dd></div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.14}><ImagePlaceholder label="Embedded map or office photo – to be provided" ratio="16 / 10" className="text-forest-700" /></Reveal>
          </div>
          <Reveal className="lg:col-span-7"><div className="border border-forest-900/10 bg-white p-6 sm:p-10"><ContactForm /></div></Reveal>
        </div>
      </section>
    </>
  );
}
