import Link from "next/link";
import { pgsGreens } from "@/data/projects";
import { SmoothImage } from "@/components/ui/SmoothImage";
import { Eyebrow } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "Nearby landmark" band for the farm house catalogue: shows Kamakhya Devi Temple, which the developer
 * places within walking distance of PGS GREENS, so visitors can picture where the property is.
 */
export function LandmarkFeature() {
  const f = pgsGreens;
  const l = f.landmark;
  return (
    <section aria-labelledby="landmark-h" className="section-y-sm">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <figure>
              <div className="relative overflow-hidden border border-hairline bg-pgs-wash" style={{ aspectRatio: `${l.image.width} / ${l.image.height}` }}>
                <SmoothImage src={l.image.src} alt={l.image.alt} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-3 text-small text-muted">{l.attribution}</figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal><Eyebrow>Nearby landmark</Eyebrow></Reveal>
            <Reveal delay={0.06}>
              <h2 id="landmark-h" className="text-h2 mt-5 text-forest-900">{l.name}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-4 inline-flex items-center gap-2 border-l-2 border-gold-500 bg-ivory-200 py-2 pl-4 pr-5 text-small font-semibold text-forest-900">
                <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" /><circle cx="12" cy="10" r="2.3" /></svg>
                {l.distance} of {f.name}
                <span className="font-normal text-muted">· as per developer</span>
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="text-lead mt-6 text-muted">
                {f.name} sits at {f.locationLine}, beside the {l.name}. On the developer’s map the temple, SRS Farm and Village Bhupani are its immediate neighbours, which makes the temple an easy way to place the property on the ground.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <Link href="/projects/pgs-greens#location" className="group mt-8 inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-forest-900">
                <span className="link-underline">See the full location map</span>
                <svg aria-hidden viewBox="0 0 20 10" className="h-2.5 w-5 transition-transform duration-500 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
