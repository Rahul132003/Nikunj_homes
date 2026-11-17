import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Eyebrow } from "@/components/ui/Typography";

function Panel({
  href, eyebrow, title, text, cta, dark,
}: { href: string; eyebrow: string; title: string; text: string; cta: string; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative isolate flex min-h-[26rem] flex-col justify-between overflow-hidden p-8 sm:p-12 lg:min-h-[32rem] lg:p-16 ${dark ? "surface-dark grain" : "bg-ivory-200 text-forest-900"}`}
    >
      <span
        aria-hidden
        className={`absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border transition-transform duration-[1400ms] ease-out group-hover:scale-125 ${dark ? "border-gold-500/25" : "border-bronze/25"}`}
      />
      <span
        aria-hidden
        className={`absolute -right-12 -top-12 -z-10 h-56 w-56 rounded-full border transition-transform duration-[1400ms] ease-out group-hover:scale-125 ${dark ? "border-gold-500/25" : "border-bronze/25"}`}
      />
      <div>
        <Eyebrow className={dark ? "" : "text-bronze"}>{eyebrow}</Eyebrow>
        <h3 className="text-h2 mt-6 max-w-[14ch] text-balance">{title}</h3>
      </div>
      <div>
        <p className={`max-w-md text-lead ${dark ? "text-sage" : "text-muted"}`}>{text}</p>
        <span className={`mt-8 inline-flex items-center gap-3 text-[0.9375rem] font-semibold tracking-[0.04em] ${dark ? "text-gold-400" : "text-forest-900"}`}>
          <span className="link-underline">{cta}</span>
          <svg aria-hidden viewBox="0 0 20 10" className="h-2.5 w-5 transition-transform duration-500 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
        </span>
      </div>
    </Link>
  );
}

export function BuySellPanels() {
  return (
    <section aria-label="Buy, invest or sell" className="grid lg:grid-cols-2">
      <Reveal>
        <Panel
          href="/buy-invest"
          eyebrow="Buy / Invest"
          title="Looking to buy or invest?"
          text="Tell us what you’re looking for — property type, budget and location — and we’ll take it from there."
          cta="Make an enquiry"
        />
      </Reveal>
      <Reveal delay={0.1}>
        <Panel
          dark
          href="/sell"
          eyebrow="Sell your property"
          title="Have a property to sell?"
          text="Share a few details about your residential, commercial, industrial or farm house property."
          cta="List your property"
        />
      </Reveal>
    </section>
  );
}
