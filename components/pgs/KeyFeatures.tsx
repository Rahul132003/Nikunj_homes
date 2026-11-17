import { pgsGreens } from "@/data/projects";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";
import { featureIcons } from "./Icons";

/** Catalogue idiom — an icon in a lime-wash circle on an olive card — rebuilt on forest. */
export function KeyFeatures() {
  return (
    <section id="features" aria-labelledby="features-heading" className="surface-dark grain relative isolate section-y overflow-hidden">
      <div aria-hidden className="anim-drift absolute -right-32 top-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-pgs-olive/20 blur-[100px]" />
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>Key features</Eyebrow></Reveal>
            <Reveal delay={0.08}><Heading id="features-heading" className="mt-6">A farm community, thoughtfully held together.</Heading></Reveal>
          </div>
        </div>

        <ul className="mt-16 grid border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {pgsGreens.keyFeatures.map((k, i) => {
            const Icon = featureIcons[k.icon as keyof typeof featureIcons];
            return (
              <li key={k.id} className="border-b border-white/10 last:border-b-0 sm:odd:border-r lg:border-b-0 lg:border-r lg:last:border-r-0">
                <Reveal delay={i * 0.08} className="group flex h-full flex-col items-center px-8 py-14 text-center transition-colors duration-500 hover:bg-forest-800/70">
                  <span className="flex h-28 w-28 items-center justify-center rounded-full bg-pgs-wash text-pgs-olive-deep transition-transform duration-700 ease-out group-hover:scale-105">
                    <Icon className="h-16 w-16" />
                  </span>
                  <h3 className="mt-8 font-display text-[1.875rem] leading-tight">{k.title}</h3>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
