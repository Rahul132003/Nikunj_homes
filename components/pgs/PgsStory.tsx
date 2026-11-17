import Image from "next/image";
import { pgsGreens } from "@/data/projects";
import { Eyebrow, Heading, Tbp } from "@/components/ui/Typography";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";

export function PgsStory() {
  const f = pgsGreens;
  const glance: [string, React.ReactNode][] = [
    ["Project by", "PGS Group"],
    ["Area", `${f.area.value} ${f.area.unit}`],
    ["Location", f.locationLine],
    ["Type", f.type],
    ["Plot sizes", <Tbp key="s">{f.missing.plotSizes}</Tbp>],
    ["Prices", <Tbp key="p">{f.missing.prices}</Tbp>],
    ["Possession", <Tbp key="d">{f.missing.possession}</Tbp>],
    ["RERA / approvals", <Tbp key="r">{f.missing.rera}</Tbp>],
  ];

  return (
    <section id="story" aria-labelledby="story-heading" className="section-y relative overflow-hidden">
      <div aria-hidden className="absolute -left-40 top-24 -z-10 h-[34rem] w-[34rem] rounded-full bg-pgs-wash/60 blur-3xl" />
      <div className="container-x grid items-start gap-14 lg:grid-cols-12 lg:gap-20">
        {/* arch-framed portrait — echoes the catalogue's rounded panels */}
        <Reveal className="lg:col-span-5">
          <figure>
            <div className="relative mx-auto aspect-[2/3] max-w-md overflow-hidden rounded-t-[999px] bg-forest-800 lg:max-w-none">
              <Parallax className="absolute inset-0" amount={5}>
                <Image src={f.hero.forest.src} alt={f.hero.forest.alt} fill quality={62} sizes="(min-width: 1024px) 40vw, 340px" className="object-cover" />
              </Parallax>
            </div>
            <figcaption className="mt-4 text-small text-muted">Representative image, as per developer’s catalogue.</figcaption>
          </figure>
        </Reveal>

        <div className="lg:col-span-7 lg:pt-10">
          <Reveal><Eyebrow>Project story</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <Heading id="story-heading" className="mt-6 text-forest-900">{f.moodHeading}</Heading>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl font-display text-[1.625rem] italic leading-snug text-pgs-green sm:text-[1.875rem]">{f.moodText}</p>
          </Reveal>

          <div className="mt-10 space-y-5 text-[1.0625rem] leading-[1.8] text-charcoal">
            {f.story.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}><p>{p}</p></Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <h3 className="text-eyebrow mb-4 text-label">Project at a glance</h3>
              <dl className="grid border-t border-hairline sm:grid-cols-2 sm:gap-x-10">
                {glance.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-hairline py-3.5 text-[0.9375rem]">
                    <dt className="text-muted">{k}</dt>
                    <dd className="font-medium text-forest-900">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-small text-muted">As per developer’s catalogue. Items in brackets were not provided.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
