"use client";

import Image from "next/image";
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

const nikunjSlots = ["Nikunj Homes office exterior", "Nikunj Homes team", "Residential property photo", "Commercial property photo", "Industrial property photo", "Farm house property photo"];

export function GalleryBrowser() {
  const [tab, setTab] = useState<Tab>("all");
  const [open, setOpen] = useState<number | null>(null);
  const shown = useMemo(() => (tab === "all" ? items : items.filter((i) => i.tab === tab)), [tab]);

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
          <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>li]:mb-4 [&>li]:break-inside-avoid">
            {shown.map((im, idx) => (
              <li key={im.src}>
                <Reveal>
                  <button type="button" onClick={() => setOpen(idx)} aria-label={`Open image: ${im.caption}`} className="group relative block w-full overflow-hidden bg-forest-900/10">
                    <Image src={im.src} alt={im.alt} width={im.width} height={im.height} sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 95vw" className="h-auto w-full transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
                    <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                    <span className="absolute bottom-3 left-4 font-display text-[1.5rem] leading-none text-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">{im.caption}</span>
                  </button>
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-8 text-small text-muted">{legal.cataloguePhotographyNote}</p>
      <Lightbox images={shown} index={open} onClose={() => setOpen(null)} onIndex={setOpen} note={legal.cataloguePhotographyNote} />
    </div>
  );
}
