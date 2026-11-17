import { pgsRelationship } from "@/data/company";
import { CoverScene } from "@/components/pgs/CoverScene";
import { pgsGreens } from "@/data/projects";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

/** Full-bleed, image-led feature — a deliberate change of pace from the list above. */
export function FeaturedProject() {
  const f = pgsGreens;
  return (
    <section data-theme="pgs" aria-labelledby="featured-heading" className="surface-dark relative isolate overflow-hidden">
      <CoverScene className="-z-20" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-forest-950/45 lg:bg-transparent" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/90 via-forest-950/60 to-forest-950/10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />

      <div className="container-x section-y relative flex min-h-[85svh] items-center">
        <div className="max-w-xl">
          <Reveal><Eyebrow>{pgsRelationship.label}</Eyebrow></Reveal>
          <Reveal delay={0.08}>
            <h2 id="featured-heading" className="text-h1 mt-6">
              {f.name}
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-3 font-display text-[1.75rem] italic text-pgs-wash">{f.tagline}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lead mt-8 text-ivory/90">
              {f.type} of {f.area.value} {f.area.unit} in {f.locationLine}.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-small text-sage">
              {f.keyFeatures.map((k) => (
                <li key={k.id} className="flex items-center gap-2.5">
                  <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-pgs-lime" />
                  {k.title}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.32}>
            <div className="mt-11 flex flex-wrap items-center gap-5">
              <LinkButton href="/projects/pgs-greens" variant="gold" size="lg" arrow>Explore the project</LinkButton>
              <span className="text-small text-sage">Images as per developer’s catalogue.</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
