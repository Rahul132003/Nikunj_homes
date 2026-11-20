import Image from "next/image";
import { pgsGreens } from "@/data/projects";
import { Eyebrow, Heading, Tbp } from "@/components/ui/Typography";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Project story — the forest-path photograph runs full width *behind* the text,
 * under a dark overlay so the copy stays comfortably readable.
 */
export function PgsStory() {
  const f = pgsGreens;
  const glance: [string, React.ReactNode][] = [
    ["Project by", "PGS Group"],
    ["Area", `${f.area.value} ${f.area.unit}`],
    ["Location", f.locationLine],
    ["Type", f.type],
    ["Plot sizes", <Tbp key="s">{f.missing.plotSizes}</Tbp>],
    ["Price", "Price on request"],
    ["Possession", <Tbp key="d">{f.missing.possession}</Tbp>],
    ["RERA / approvals", <Tbp key="r">{f.missing.rera}</Tbp>],
  ];

  return (
    <section id="story" aria-labelledby="story-heading" className="surface-dark section-y relative isolate overflow-hidden">
      {/* background photograph (full bleed) + readability overlays */}
      <Parallax className="absolute inset-0 -z-20" amount={4}>
        <Image
          src={f.hero.forest.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 60%" }}
        />
      </Parallax>
      <div aria-hidden className="absolute inset-0 -z-10 bg-forest-950/70" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/60 via-transparent to-forest-950/40" />

      <div className="container-x grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* heading + pull quote */}
        <div className="lg:col-span-5">
          <Reveal><Eyebrow>Project story</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <Heading id="story-heading" className="mt-6">{f.moodHeading}</Heading>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl font-display text-[1.625rem] italic leading-snug text-pgs-wash sm:text-[1.875rem]">{f.moodText}</p>
          </Reveal>
        </div>

        {/* story + at-a-glance */}
        <div className="lg:col-span-7">
          <div className="space-y-5 text-[1.0625rem] leading-[1.8] text-ivory/95">
            {f.story.map((p, i) => (
              <Reveal key={i} delay={0.05 * i}><p>{p}</p></Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12">
              <h3 className="text-eyebrow mb-4 text-label">Project at a glance</h3>
              <dl className="grid border-t border-white/25 sm:grid-cols-2 sm:gap-x-10">
                {glance.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 border-b border-white/25 py-3.5 text-[0.9375rem]">
                    <dt className="text-sage">{k}</dt>
                    <dd className="font-medium text-ivory">{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-small text-sage">As per developer’s catalogue. Items in brackets were not provided.</p>
            </div>
          </Reveal>
        </div>
      </div>

      <p className="container-x relative mt-12 text-small text-sage">Representative image, as per developer’s catalogue.</p>
    </section>
  );
}
