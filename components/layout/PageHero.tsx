import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { heroes, isLowRes, type HeroKey } from "@/data/heroes";
import { Eyebrow } from "@/components/ui/Typography";

interface Crumb { label: string; href?: string }

/** The palette's deepest tone at a given opacity, so overlays follow the active colour theme. */
const tint = (a: number) => `color-mix(in srgb, var(--color-forest-950) ${Math.round(a * 100)}%, transparent)`;

/**
 * Shared inner-page hero: a page-specific photograph under a deep forest overlay
 * (see data/heroes.ts), gold hairlines that draw in. Each page varies the
 * *content layout beneath it*, not this shell. Without a `heroKey` it falls
 * back to the text-only version with slow drifting light.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  heroKey,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  heroKey?: HeroKey;
}) {
  const img = heroKey ? heroes[heroKey] : undefined;
  const o = img?.overlay ?? 0.65;

  return (
    <section
      className={`surface-dark grain relative isolate overflow-hidden pt-[calc(var(--header-h)+3.5rem)] ${
        img ? "flex min-h-[30rem] flex-col justify-end pb-16 sm:min-h-[34rem] lg:min-h-[38rem] lg:pb-24" : "pb-16 lg:pb-24"
      }`}
    >
      {img ? (
        <>
          <Image
            src={img.src}
            alt=""
            fill
            priority
            sizes="100vw"
            className={isLowRes(img) ? "-z-30 scale-[1.06] object-cover blur-[3px]" : "-z-30 object-cover"}
            style={{ objectPosition: img.position }}
          />
          {/* legibility overlays: left-to-right for the text column, bottom-up to seat the content */}
          <div aria-hidden className="absolute inset-0 -z-20" style={{ background: `linear-gradient(90deg, ${tint(Math.min(o + 0.2, 0.95))} 0%, ${tint(o)} 45%, ${tint(Math.max(o - 0.3, 0.25))} 100%)` }} />
          <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-t from-forest-950/70 via-transparent to-forest-950/40" />
        </>
      ) : (
        <div aria-hidden className="pointer-events-none absolute -right-1/4 -top-1/3 -z-10 h-[90vmin] w-[90vmin] rounded-full bg-forest-700/50 blur-[120px] anim-drift" />
      )}

      <div className="container-x">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="anim-fade mb-10 text-small text-sage">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden className="text-gold-500">/</span>}
                  {c.href ? <Link href={c.href} className="link-underline hover:text-ivory">{c.label}</Link> : <span aria-current="page" className="text-ivory">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="anim-rise" style={{ "--d": "80ms" } as React.CSSProperties}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
        <h1 className="text-h1 anim-rise mt-6 max-w-4xl text-balance" style={{ "--d": "180ms" } as React.CSSProperties}>
          {title}
        </h1>
        {intro && (
          <p className="text-lead anim-rise mt-8 max-w-2xl text-ivory/90" style={{ "--d": "300ms" } as React.CSSProperties}>
            {intro}
          </p>
        )}
        {children && <div className="anim-rise mt-10" style={{ "--d": "420ms" } as React.CSSProperties}>{children}</div>}
      </div>
      <div aria-hidden className="anim-line-x absolute inset-x-0 bottom-0 h-px bg-gold-500/40" style={{ "--d": "500ms" } as React.CSSProperties} />
    </section>
  );
}
