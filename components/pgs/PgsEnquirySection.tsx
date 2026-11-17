import Image from "next/image";
import { pgsRelationship } from "@/data/company";
import { pgsGreens } from "@/data/projects";
import { LazyPgsEnquiryForm } from "./LazyPgsEnquiryForm";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { DeveloperContact } from "./DeveloperContact";

export function PgsEnquirySection() {
  const f = pgsGreens;
  return (
    <section id="enquire" aria-labelledby="enquire-heading" className="surface-dark grain relative isolate overflow-hidden section-y">
      <Image src={f.hero.cabin.src} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-forest-900 via-forest-900/85 to-forest-950" />
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal><Eyebrow>Enquire</Eyebrow></Reveal>
          <Reveal delay={0.08}><Heading id="enquire-heading" className="mt-6">Connect with nature.</Heading></Reveal>
          <Reveal delay={0.14}>
            <p className="text-lead mt-7 text-sage">Tell us which plot or what you’d like to know about PGS GREENS, and we’ll get back to you.</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 border-l-2 border-pgs-lime pl-5 text-small leading-relaxed text-sage">
              <strong className="text-ivory">{pgsRelationship.label}.</strong> {pgsRelationship.disclaimer}
            </p>
          </Reveal>
        </div>

        <div className="space-y-8 lg:col-span-7">
          <Reveal delay={0.1}>
            <div className="bg-ivory p-6 text-charcoal sm:p-10" style={{ ["--focus" as string]: "var(--color-forest-700)", ["--label" as string]: "var(--color-pgs-green)" }}>
              <LazyPgsEnquiryForm />
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="text-charcoal"><DeveloperContact /></div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
