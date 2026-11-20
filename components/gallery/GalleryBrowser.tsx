"use client";

import { SmoothImage } from "@/components/ui/SmoothImage";
import { useMemo, useState } from "react";
import { legal } from "@/data/company";
import { pgsGreens, type ProjectImage } from "@/data/projects";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type Tab = "all" | "nature" | "clubhouse" | "plan" | "previous" | "nikunj";

const f = pgsGreens;

interface Item extends ProjectImage { tab: Exclude<Tab, "all" | "nikunj"> }

const items: Item[] = [
  ...f.natureInspired.map((n): Item => ({ ...n.image, caption: n.title, tab: "nature" })),
  { ...f.hero.mood, caption: "Inspired by nature", tab: "nature" },
  { ...f.hero.forest, caption: "Forest path", tab: "nature" },
  { ...f.clubhouse.featureImage, caption: "Pool pavilion", tab: "clubhouse" },
  ...f.clubhouse.images.map((i): Item => ({ ...i, tab: "clubhouse" })),
  { src: "/images/pgs-greens/plan/layout-plan.webp", alt: "Layout plan of PGS GREENS", width: 3105, height: 2188, caption: "Layout plan", tab: "plan" },
  { ...f.locationMap, caption: "Location map", tab: "plan" },
  ...f.previousProjects.map((p): Item => ({ ...p.image, caption: p.name, tab: "previous" })),
];

const tabs: { id: Tab; label: string }[] = [
  { id: "all", label: "PGS GREENS — all" },
  { id: "nature", label: "Nature" },
  { id: "clubhouse", label: "Clubhouse" },
  { id: "plan", label: "Plan & location" },
  { id: "previous", label: "Previous projects" },
  { id: "nikunj", label: "Nikunj Homes" },
];

/** Editorial rhythm: wide + narrow, narrow + wide, then an even pair (desktop); one column on phones. */
const SPANS = [
  { col: "md:col-span-8", h: "h-[19rem] sm:h-[24rem] md:h-[30rem]", sizes: "(min-width:768px) 66vw, 95vw" },
  { col: "md:col-span-4", h: "h-[19rem] sm:h-[24rem] md:h-[30rem]", sizes: "(min-width:768px) 33vw, 95vw" },
  { col: "md:col-span-4", h: "h-[19rem] sm:h-[24rem] md:h-[30rem]", sizes: "(min-width:768px) 33vw, 95vw" },
  { col: "md:col-span-8", h: "h-[19rem] sm:h-[24rem] md:h-[30rem]", sizes: "(min-width:768px) 66vw, 95vw" },
  { col: "md:col-span-6", h: "h-[19rem] sm:h-[24rem] md:h-[28rem]", sizes: "(min-width:768px) 50vw, 95vw" },
  { col: "md:col-span-6", h: "h-[19rem] sm:h-[24rem] md:h-[28rem]", sizes: "(min-width:768px) 50vw, 95vw" },
] as const;

/** Small source images (catalogue thumbnails) are never blown up to a wide tile: they sit three to a row. */
const SMALL = { col: "md:col-span-4", h: "h-[19rem] sm:h-[22rem] md:h-[24rem]", sizes: "(min-width:768px) 33vw, 95vw" } as const;

const nikunjSlots = ["Nikunj Homes office exterior", "Nikunj Homes team", "Residential property photo", "Commercial property photo", "Industrial property photo", "Farm house property photo"];

export function GalleryBrowser() {
  const [tab, setTab] = useState<Tab>("all");
  const [open, setOpen] = useState<number | null>(null);
  const shown = useMemo(() => (tab === "all" ? items : items.filter((i) => i.tab === tab)), [tab]);

  // wide/narrow rhythm is assigned to full-size photographs only
  const tiles = useMemo(() => {
    let k = 0;
    return shown.map((im) => ({ im, span: im.width < 700 ? SMALL : SPANS[k++ % SPANS.length] }));
  }, [shown]);

  return (
    <div>
      <div role="tablist" aria-label="Gallery categories" className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            aria-controls="gallery-panel"
            onClick={() => setTab(t.id)}
            className={cn(
              "min-h-11 rounded-[2px] border px-5 text-[0.8125rem] font-semibold tracking-[0.06em] uppercase transition-colors duration-300",
              tab === t.id ? "border-forest-900 bg-forest-900 text-ivory" : "border-forest-900/25 text-forest-900 hover:border-forest-900",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id="gallery-panel" role="tabpanel" className="mt-10">
        {tab === "nikunj" ? (
          <>
            <p className="mb-6 max-w-2xl border-l-2 border-bronze bg-ivory-200 px-5 py-4 text-small text-charcoal">No Nikunj Homes photography has been supplied yet. These slots show where it will appear.</p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {nikunjSlots.map((s) => <li key={s}><ImagePlaceholder label={`${s} – to be provided`} ratio="4 / 3" className="text-forest-700" /></li>)}
            </ul>
          </>
        ) : (
          <ul className={cn("grid gap-4 sm:gap-6", tab === "plan" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-12")}>
            {tiles.map(({ im, span }, idx) => {
              const wide = tab === "plan";
              return (
                <li key={im.src} className={cn(!wide && span.col)}>
                  <Reveal className="h-full">
                    <button
                      type="button"
                      onClick={() => setOpen(idx)}
                      aria-label={`Open image: ${im.caption}`}
                      className={cn("group relative block w-full overflow-hidden bg-forest-900/10", !wide && span.h)}
                      style={wide ? { aspectRatio: `${im.width} / ${im.height}` } : undefined}
                    >
                      <SmoothImage
                        src={im.src}
                        alt={im.alt}
                        fill
                        sizes={wide ? "(min-width:1280px) 1100px, 95vw" : span.sizes}
                        className={cn(wide ? "object-contain" : "object-cover", "transition-transform duration-[1800ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none")}
                      />
                      {/* caption bar: always legible, lifts on hover */}
                      <span aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-forest-950/80 via-forest-950/25 to-transparent" />
                      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-left sm:p-7">
                        <span>
                          {/* decorative index drawn with CSS content, so it is not part of the button's text */}
                          <span aria-hidden data-n={String(idx + 1).padStart(2, "0")} className="block font-display text-[0.9375rem] text-gold-400 [font-variant-numeric:lining-nums] before:content-[attr(data-n)]" />
                          <span className="mt-1 block font-display text-[1.5rem] leading-tight text-ivory sm:text-[1.875rem]">{im.caption}</span>
                        </span>
                        <span aria-hidden className="grid h-11 w-11 shrink-0 translate-y-2 place-items-center rounded-full bg-gold-400 text-forest-950 opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none">
                          <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3h5v5M17 3l-6 6M8 4H4v12h12v-4" /></svg>
                        </span>
                      </span>
                    </button>
                  </Reveal>
                </li>
              );
            })}
          </ul>        )}
      </div>

      <p className="mt-8 text-small text-muted">{legal.cataloguePhotographyNote}</p>
      <Lightbox images={shown} index={open} onClose={() => setOpen(null)} onIndex={setOpen} note={legal.cataloguePhotographyNote} />
    </div>
  );
}
