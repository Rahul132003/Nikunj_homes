import Link from "next/link";
import { categories } from "@/data/properties";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { Reveal, RuleReveal } from "@/components/motion/Reveal";

/**
 * An editorial index rather than a card grid: big serif numerals, hairline
 * rules that draw in, and a restrained hover (the title steps right, a gold
 * line extends). Left column stays pinned on desktop while the list scrolls.
 */
export function CategoryIndex() {
  return (
    <section aria-labelledby="categories-heading" className="section-y">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal><Eyebrow>Properties</Eyebrow></Reveal>
            <Reveal delay={0.08}>
              <Heading id="categories-heading" className="mt-6 text-forest-900">
                Four kinds of property. One conversation.
              </Heading>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-lead mt-7 max-w-md text-muted">
                Residential, commercial, industrial and farm house properties — bought and sold through Nikunj Homes.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="lg:col-span-8">
          {categories.map((c, i) => (
            <li key={c.slug}>
              <RuleReveal className="opacity-60" delay={i * 0.05} />
              <Reveal delay={i * 0.06}>
                <Link href={`/properties/${c.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-6 py-8 sm:gap-x-10 sm:py-10">
                  <span aria-hidden className="font-display text-[1.375rem] text-bronze sm:text-[1.75rem]">0{i + 1}</span>
                  <span className="block">
                    <span className="block font-display text-[2.125rem] leading-[1.05] text-forest-900 transition-transform duration-700 ease-out group-hover:translate-x-3 sm:text-[3rem]">
                      {c.title}
                    </span>
                    <span className="mt-2 block text-muted transition-transform duration-700 ease-out group-hover:translate-x-3">{c.short}</span>
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-forest-900/25 text-forest-900 transition-colors duration-500 group-hover:border-forest-900 group-hover:bg-forest-900 group-hover:text-ivory sm:h-14 sm:w-14">
                    <svg aria-hidden viewBox="0 0 20 10" className="h-2.5 w-5" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
                    <span className="sr-only">View {c.title} properties</span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
          <li aria-hidden><RuleReveal className="opacity-60" /></li>
        </ol>
      </div>
    </section>
  );
}
