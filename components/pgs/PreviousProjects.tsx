import Image from "next/image";
import { pgsGreens } from "@/data/projects";
import { Eyebrow, Heading, Tbp } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

export function PreviousProjects() {
  const f = pgsGreens;
  return (
    <section id="previous" aria-labelledby="previous-heading" className="section-y bg-ivory-200">
      <div className="container-x">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>PGS Group</Eyebrow></Reveal>
            <Reveal delay={0.08}><Heading id="previous-heading" className="mt-6 text-forest-900">Previous projects by PGS Group</Heading></Reveal>
          </div>
          <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9"><p className="text-small text-muted">{f.previousProjectsNote}</p></Reveal>
        </div>

        <ul className="mt-14 grid gap-px bg-hairline md:grid-cols-3">
          {f.previousProjects.map((p, i) => (
            <li key={p.id} className="bg-ivory-200">
              <Reveal delay={i * 0.08} className="group flex h-full flex-col p-6 sm:p-8">
                <div className="relative mx-auto aspect-[4/3] w-full max-w-[22rem] overflow-hidden bg-forest-900/10">
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width:768px) 28vw, 90vw" className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                </div>
                <p className="text-eyebrow mt-7 text-label">{p.kind}</p>
                <h3 className="mt-2 font-display text-[2rem] leading-tight text-forest-900">{p.name}</h3>
                <p className="mt-1 text-small font-semibold text-muted">{p.place}</p>
                <p className="mt-4 flex-1 text-[0.9375rem] leading-[1.75] text-charcoal">{p.text}</p>
                <p className="mt-5 border-t border-hairline pt-4 text-small text-muted">Status: <Tbp>{p.status}</Tbp></p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
