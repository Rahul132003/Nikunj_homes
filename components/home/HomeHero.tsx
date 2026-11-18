import Image from "next/image";
import Link from "next/link";
import { company, pgsRelationship } from "@/data/company";
import { heroes } from "@/data/heroes";
import { pgsGreens } from "@/data/projects";
import { LinkButton } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Typography";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/**
 * Home hero. No Nikunj Homes photography has been supplied, so the cinematic
 * effect is built from light and depth over a stand-in photograph
 * (data/heroes.ts). A real photo in `company.heroImage` takes over automatically.
 */
export function HomeHero() {
  return (
    <section className="surface-dark grain relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* depth layers */}
      {/* a real Nikunj Homes photo in company.heroImage wins; otherwise the stand-in from data/heroes.ts */}
      <Image
        src={company.heroImage ?? heroes.home.src}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover"
        style={{ objectPosition: heroes.home.position }}
      />
      <div aria-hidden className="absolute inset-0 -z-20" style={{ background: "linear-gradient(90deg, color-mix(in srgb, var(--color-forest-950) 90%, transparent) 0%, color-mix(in srgb, var(--color-forest-950) 68%, transparent) 48%, color-mix(in srgb, var(--color-forest-950) 35%, transparent) 100%)" }} />
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(120%_80%_at_85%_10%,var(--color-forest-700)_0%,transparent_55%),radial-gradient(90%_70%_at_0%_100%,var(--color-forest-800)_0%,transparent_60%)] opacity-50 mix-blend-multiply" />
      <div aria-hidden className="anim-drift absolute -left-[15%] top-[8%] -z-10 h-[75vmin] w-[75vmin] rounded-full bg-forest-600/25 blur-[110px]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/80 via-transparent to-forest-950/30" />

      <div className="container-x relative flex flex-1 flex-col justify-center pb-10 pt-[calc(var(--header-h)+3rem)]">
        <div className="anim-rise" style={d(150)}>
          <Eyebrow>Faridabad · Delhi-NCR</Eyebrow>
        </div>

        <h1 className="text-display anim-rise mt-7 max-w-[15ch] text-balance sm:max-w-[13ch] lg:max-w-[12ch]" style={d(300)}>
          Property, <em className="font-medium italic text-gold-400">considered.</em>
        </h1>

        <p className="text-lead anim-rise mt-9 max-w-xl text-sage" style={d(520)}>
          {company.description}
        </p>

        <div className="anim-rise mt-11 flex flex-wrap gap-4" style={d(680)}>
          <LinkButton href="/buy-invest" variant="gold" size="lg" arrow>Buy / Invest</LinkButton>
          <LinkButton href="/sell" variant="outline-light" size="lg">Sell your property</LinkButton>
        </div>
      </div>

      {/* bottom rail: scroll cue + featured project */}
      <div className="container-x relative pb-24 sm:pb-8 lg:pb-10">
        <div aria-hidden className="anim-line-x mb-6 h-px bg-gold-500/40" style={d(900)} />
        <div className="anim-fade flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" style={d(1100)}>
          <div className="hidden items-center gap-4 text-eyebrow text-sage sm:flex">
            <span aria-hidden className="relative block h-12 w-px overflow-hidden bg-gold-500/30">
              <span className="anim-cue absolute inset-0 bg-gold-400" />
            </span>
            Scroll
          </div>

          <Link
            href="/projects/pgs-greens"
            className="group flex max-w-md items-center gap-5 border border-gold-500/30 bg-forest-950/40 p-3 pr-6 backdrop-blur-sm transition-colors duration-500 hover:border-gold-500"
          >
            <span className="relative block h-16 w-20 shrink-0 overflow-hidden">
              <Image src={pgsGreens.hero.photo.src} alt="" fill sizes="80px" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
            </span>
            <span className="min-w-0">
              <span className="text-eyebrow block text-gold-400">{pgsRelationship.label}</span>
              <span className="mt-1 block font-display text-[1.625rem] leading-none text-ivory">PGS GREENS</span>
            </span>
            <svg aria-hidden viewBox="0 0 20 10" className="ml-auto h-2.5 w-5 shrink-0 text-gold-400 transition-transform duration-500 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
