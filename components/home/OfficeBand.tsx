import { company } from "@/data/company";
import { LinkButton } from "@/components/ui/Button";
import { ContactValue } from "@/components/ui/ContactValue";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address.full)}`;

export function OfficeBand() {
  return (
    <section aria-labelledby="office-heading" className="section-y">
      <div className="container-x grid items-end gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal><Eyebrow>Our office</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <Heading id="office-heading" className="mt-6 text-forest-900">
              Visit us in Sector&nbsp;81, Faridabad.
            </Heading>
          </Reveal>
          <Reveal delay={0.16}>
            <address className="text-lead mt-8 not-italic text-muted">{company.address.full}</address>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap gap-4">
              <LinkButton href="/contact" arrow>Contact us</LinkButton>
              <LinkButton href={mapsUrl} external variant="outline">Get directions</LinkButton>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-5">
          <dl className="grid gap-px border border-hairline bg-hairline text-small">
            {([
              ["Phone", company.contact.phone, company.contact.phoneHref],
              ["Email", company.contact.email, company.contact.emailHref],
              ["Hours", company.contact.hours, null],
            ] as const).map(([k, v, href]) => (
              <div key={k} className="grid grid-cols-[6rem_1fr] gap-4 bg-ivory px-6 py-5">
                <dt className="text-eyebrow text-bronze">{k}</dt>
                <dd className="break-words"><ContactValue text={v} href={href} /></dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
