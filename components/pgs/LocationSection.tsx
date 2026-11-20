"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { formatDriveTime, pgsGreens } from "@/data/projects";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { Reveal } from "@/components/motion/Reveal";

const MAX = 30; // minutes — longest time in the list; bars are scaled against it

/**
 * Location map (the catalogue's schematic) beside drive times. Every time is the
 * developer's and labelled so; "proposed" items stay "proposed". Bars are a visual
 * aid only (scaleX, transform-only) — the time is always stated in text.
 */
export function LocationSection() {
  const f = pgsGreens;
  const reduce = useReducedMotion();
  return (
    <section id="location" aria-labelledby="location-heading" className="section-y">
      <div className="container-x">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal><Eyebrow>Location</Eyebrow></Reveal>
            <Reveal delay={0.08}><Heading id="location-heading" className="mt-6 text-forest-900">{f.locationLine}</Heading></Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <figure>
              <div className="relative max-h-[44rem] w-full overflow-hidden bg-pgs-wash" style={{ aspectRatio: `${f.locationMap.width} / ${f.locationMap.height}` }}>
                <Image src={f.locationMap.src} alt={f.locationMap.alt} fill sizes="(min-width:1024px) 58vw, 100vw" className="object-contain" />
              </div>
              <figcaption className="mt-3 text-small text-muted">{f.locationAttribution}</figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-h4 text-forest-900">Location highlights</h3>
                <span className="text-eyebrow rounded-[2px] bg-pgs-wash px-3 py-1.5 text-forest-900">As per developer</span>
              </div>
            </Reveal>
            <ul className="mt-6 divide-y divide-hairline border-y border-hairline">
              {f.locationHighlights.map((h, i) => (
                <li key={h.id} className="py-5">
                  <Reveal delay={i * 0.05}>
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-[1rem] font-semibold text-forest-900">
                        {h.status === "proposed" && <span className="mr-2 rounded-[2px] border border-dashed border-pgs-green px-1.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wider text-pgs-green">Proposed</span>}
                        {h.place}
                      </p>
                      {h.minutes === null ? (
                        <p className="shrink-0 text-small font-semibold text-forest-900">Walking distance</p>
                      ) : (
                        <p className="shrink-0 font-display text-[1.625rem] leading-none text-forest-900">
                          {h.minutes}<span className="ml-1 font-sans text-small text-muted">min{h.mode === "drive" ? " drive" : ""}</span>
                        </p>
                      )}
                    </div>
                    {h.minutes !== null && (
                      <div aria-hidden className="mt-3 h-1 bg-forest-900/10">
                        <motion.div
                          className="h-full origin-left bg-pgs-olive"
                          initial={{ scaleX: reduce ? h.minutes / MAX : 0 }}
                          whileInView={{ scaleX: h.minutes / MAX }}
                          viewport={{ once: true, amount: 1 }}
                          transition={{ duration: 1.1, delay: 0.15 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    )}
                    <span className="sr-only">{formatDriveTime(h)}, as per developer{h.status === "proposed" ? ", proposed" : ""}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-small text-muted">
              Drive times are the developer’s and may vary with traffic and route. Items marked “proposed” are not yet built. Bars show relative time only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
