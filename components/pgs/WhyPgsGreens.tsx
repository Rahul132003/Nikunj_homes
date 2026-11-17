import Image from "next/image";
import { pgsGreens } from "@/data/projects";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

/** The one place the catalogue's lime wash is used as a full surface — as an accent band. */
export function WhyPgsGreens() {
  return (
    <section id="why" aria-labelledby="why-heading" className="relative overflow-hidden bg-pgs-wash section-y text-forest-900">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><Eyebrow className="justify-center text-pgs-green">The essentials</Eyebrow></Reveal>
          <Reveal delay={0.08}><Heading id="why-heading" className="mt-6">Why PGS GREENS?</Heading></Reveal>
        </div>

        <div className="relative mt-16">
          {/* connecting hairline behind the plates */}
          <div aria-hidden className="absolute inset-x-[10%] top-[5.5rem] hidden h-px bg-pgs-olive/50 lg:block" />
          <ul className="relative grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            {pgsGreens.why.map((w, i) => (
              <li key={w.id} className={i === 4 ? "col-span-2 sm:col-span-1" : ""}>
                <Reveal delay={i * 0.07} className="group flex flex-col items-center text-center">
                  <span className="relative block h-44 w-44 overflow-hidden rounded-full ring-2 ring-pgs-olive ring-offset-4 ring-offset-pgs-wash sm:h-48 sm:w-48">
                    <Image src={w.image.src} alt={w.image.alt} fill sizes="200px" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
                  </span>
                  <h3 className="mt-6 text-h4 text-forest-900">{w.title}</h3>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
