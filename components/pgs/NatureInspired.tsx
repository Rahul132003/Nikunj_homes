import Image from "next/image";
import { pgsGreens } from "@/data/projects";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

/** Three circular plates, deliberately staggered — the catalogue's trio, given rhythm. */
export function NatureInspired() {
  return (
    <section id="nature" aria-labelledby="nature-heading" className="section-y">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal><Eyebrow className="justify-center">Nature inspired</Eyebrow></Reveal>
          <Reveal delay={0.08}><Heading id="nature-heading" className="mt-6 text-forest-900">Streets, lanes and light — drawn from the land.</Heading></Reveal>
        </div>

        <ul className="mt-20 grid gap-16 md:grid-cols-3 md:gap-8 lg:gap-14">
          {pgsGreens.natureInspired.map((n, i) => (
            <li key={n.id} className={i === 1 ? "md:mt-20" : i === 2 ? "md:mt-6" : ""}>
              <Reveal delay={i * 0.1}>
                <figure className="group">
                  <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-full ring-1 ring-pgs-lime/70 ring-offset-8 ring-offset-ivory">
                    <Image src={n.image.src} alt={n.image.alt} fill sizes="(min-width: 768px) 30vw, 80vw" className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-110" />
                  </div>
                  <figcaption className="mt-10 text-center">
                    <h3 className="font-display text-[2.125rem] leading-none text-forest-900">{n.title}</h3>
                    <p className="mx-auto mt-5 max-w-sm text-[0.9375rem] leading-[1.75] text-muted">{n.body}</p>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
