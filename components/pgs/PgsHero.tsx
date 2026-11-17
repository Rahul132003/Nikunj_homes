import Image from "next/image";
import { pgsRelationship } from "@/data/company";
import { pgsGreens } from "@/data/projects";
import { LinkButton } from "@/components/ui/Button";
import { CoverScene } from "./CoverScene";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * PGS GREENS hero — recreates the catalogue cover in motion: the logo, the lone
 * tree standing in the field, "Farmland by PGS Group" beneath. Light and open,
 * unlike the forest-dark Nikunj Homes pages, so the project reads as its own place.
 */
export function PgsHero() {
  const f = pgsGreens;
  return (
    <section aria-label="PGS GREENS" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-forest-900 text-ivory">
      <CoverScene priority className="-z-20" sizes="(min-width: 1600px) 2000px, 100vw" />
      {/* header scrim + bottom legibility gradient */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-forest-950/75 to-transparent" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-[65%] bg-gradient-to-t from-forest-950/90 via-forest-950/55 to-transparent" />

      <div className="container-x relative flex flex-1 flex-col items-center pt-[calc(var(--header-h)+1.5rem)] text-center">
        {/* logo plate — the catalogue's own mark, on its lime wash */}
        <div className="anim-rise bg-pgs-wash px-6 pb-4 pt-4 text-center shadow-[0_20px_50px_-20px_rgb(0_0_0/0.5)] sm:px-9 sm:pt-5" style={d(200)}>
          <h1>
            <Image src={f.logo.src} alt={f.logo.alt} width={f.logo.width} height={f.logo.height} priority sizes="(min-width: 640px) 360px, 260px" className="h-auto w-[15rem] sm:w-[22rem]" />
          </h1>
          <p className="text-eyebrow mt-3 border-t border-pgs-olive/40 pt-3 text-forest-900">{pgsRelationship.label}</p>
        </div>

        <div className="mt-auto w-full pb-24 pt-24 sm:pb-10 lg:pb-14">
          <p className="anim-rise font-display text-[clamp(2.25rem,1.2rem+4vw,4.75rem)] font-medium leading-none tracking-[0.01em]" style={d(500)}>
            {f.heroKicker}
          </p>
          <ul className="anim-rise mx-auto mt-7 flex max-w-3xl flex-wrap justify-center gap-x-10 gap-y-3 text-[0.9375rem] text-ivory/90" style={d(700)}>
            <li><strong className="font-display text-[1.75rem] font-medium text-pgs-wash">{f.area.value}</strong> {f.area.unit}</li>
            <li className="flex items-center">{f.locationLine}</li>
            <li className="flex items-center">{f.type}</li>
          </ul>
          <div className="anim-rise mt-9 flex flex-wrap justify-center gap-4" style={d(900)}>
            <LinkButton href="#layout" variant="gold" size="lg" arrow>Explore the layout plan</LinkButton>
            <LinkButton href="#enquire" variant="outline-light" size="lg">Enquire</LinkButton>
          </div>
          <p className="anim-fade mt-8 text-small text-sage" style={d(1200)}>Representative imagery from the developer’s catalogue.</p>
        </div>
      </div>
    </section>
  );
}
