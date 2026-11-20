import { SmoothImage } from "@/components/ui/SmoothImage";
import Link from "next/link";
import { categories } from "@/data/properties";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

/**
 * Four tall, image-led panels.
 *  - lg+ : one row. The hovered / keyboard-focused panel widens (flex-grow) while the others narrow;
 *          its image zooms slowly and the description + link fade up (opacity + transform only).
 *  - md  : 2 × 2 grid.   - mobile : four stacked full-width cards.
 *  Below lg the description and link are always visible (no hover on touch).
 * The name always sits at the bottom of the panel on a dark scrim, so it stays readable when collapsed.
 * Reduced motion: transitions and zoom are switched off; the state still changes, just instantly.
 */
export function CategoryIndex() {
  return (
    <section aria-labelledby="categories-heading" className="section-y">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>Properties</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <Heading id="categories-heading" className="mt-6 text-forest-900">
                Four kinds of property. One conversation.
              </Heading>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-5">
            <p className="text-lead max-w-md text-muted lg:ml-auto">
              Residential, commercial, industrial and farm house properties — bought and sold through Nikunj Homes.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:mt-16 lg:flex lg:h-[36rem] lg:gap-3">
            {categories.map((c) => (
              <li
                key={c.slug}
                className="group/panel relative min-w-0 overflow-hidden bg-forest-900 lg:flex-1 lg:basis-0 lg:transition-[flex-grow] lg:duration-[900ms] lg:ease-[cubic-bezier(0.22,0.8,0.3,1)] lg:hover:grow-[2.8] lg:has-[:focus-visible]:grow-[2.8] motion-reduce:transition-none"
              >
                <Link
                  href={`/properties/${c.slug}`}
                  className="relative flex h-[26rem] w-full flex-col justify-end focus-visible:outline-4! focus-visible:outline-offset-[-4px]! focus-visible:outline-gold-400! md:h-[30rem] lg:h-full"
                >
                  {/* photograph — slow zoom on hover / focus */}
                  <SmoothImage
                    src={c.image.src}
                    alt={c.image.alt}
                    fill
                    sizes="(min-width:1024px) 45vw, (min-width:768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out group-hover/panel:scale-[1.08] group-has-[:focus-visible]/panel:scale-[1.08] motion-reduce:transform-none motion-reduce:transition-none"
                    style={{ objectPosition: c.image.position }}
                  />

                  {/* dark scrim: keeps the name, description and link above AA contrast on any photo */}
                  <span
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, color-mix(in srgb, var(--color-forest-950) 96%, transparent) 0%, color-mix(in srgb, var(--color-forest-950) 88%, transparent) 38%, color-mix(in srgb, var(--color-forest-950) 35%, transparent) 70%, color-mix(in srgb, var(--color-forest-950) 12%, transparent) 100%)",
                    }}
                  />

                  {/* desktop: the group is parked ~one description-height lower while collapsed, so the name sits at the panel's bottom edge */}
                  <span className="relative z-10 block p-6 text-ivory transition-transform duration-700 ease-out sm:p-7 motion-reduce:transition-none lg:translate-y-[4.8rem] lg:p-4 lg:pb-6 lg:group-hover/panel:translate-y-0 lg:group-has-[:focus-visible]/panel:translate-y-0 xl:p-6">
                    <span className="block h-px w-10 bg-gold-500" aria-hidden />
                    <span className="mt-4 block font-display text-[2rem] leading-[1.05] sm:text-[2.25rem] lg:text-[1.25rem] xl:text-[1.5rem]">
                      {c.title}
                    </span>

                    <span className="block transition-opacity duration-700 ease-out motion-reduce:transition-none lg:opacity-0 lg:group-hover/panel:opacity-100 lg:group-has-[:focus-visible]/panel:opacity-100">
                      <span className="mt-3 block text-[0.9375rem] leading-relaxed text-ivory lg:whitespace-nowrap">{c.short}</span>
                      <span className="mt-5 inline-flex items-center gap-3 text-[0.875rem] font-semibold text-gold-400">
                        View properties
                        <svg aria-hidden viewBox="0 0 20 10" className="h-2.5 w-5" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
