"use client";

import Image from "next/image";
import { useState } from "react";
import { pgsGreens } from "@/data/projects";
import { legal } from "@/data/company";
import { Eyebrow, Heading } from "@/components/ui/Typography";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox } from "@/components/ui/Lightbox";

export function ClubhouseGallery() {
  const c = pgsGreens.clubhouse;
  const [open, setOpen] = useState<number | null>(null);
  // lightbox order: feature image first, then the five gallery images
  const all = [{ ...c.featureImage, caption: "Pool pavilion" }, ...c.images];

  const tile = (i: number, cls: string, sizes: string) => {
    const im = c.images[i];
    return (
      <button
        type="button"
        onClick={() => setOpen(i + 1)}
        aria-label={`Open image: ${im.caption}`}
        className={`group relative overflow-hidden bg-forest-800 ${cls}`}
      >
        <Image src={im.src} alt={im.alt} fill sizes={sizes} className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute bottom-4 left-5 flex items-center gap-3 font-display text-[1.625rem] leading-none text-ivory">
          <span aria-hidden className="h-px w-6 bg-pgs-lime transition-[width] duration-500 group-hover:w-10" />
          {im.caption}
        </span>
      </button>
    );
  };

  return (
    <>
      {/* cinematic break: the catalogue's pool page, with its own copy */}
      <section aria-label="A destination full of nature and luxury" className="surface-dark relative isolate flex min-h-[80svh] items-end overflow-hidden">
        <Parallax className="absolute inset-0 -z-20" amount={5}>
          <Image src={c.featureImage.src} alt={c.featureImage.alt} fill sizes="100vw" className="object-cover" />
        </Parallax>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-forest-950/10" />
        <div className="container-x relative pb-14 pt-40 lg:pb-20">
          <Reveal><h2 className="text-h1 max-w-3xl text-balance">{c.luxuryHeading}</h2></Reveal>
          <Reveal delay={0.1}><p className="text-lead mt-6 max-w-xl text-ivory/90">{c.luxuryText}</p></Reveal>
        </div>
      </section>

      <section id="clubhouse" aria-labelledby="clubhouse-heading" className="section-y">
        <div className="container-x">
          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal><Eyebrow>Clubhouse</Eyebrow></Reveal>
              <Reveal delay={0.08}><Heading id="clubhouse-heading" className="mt-6 text-forest-900">{c.heading}</Heading></Reveal>
            </div>
            <div className="space-y-4 lg:col-span-5 lg:col-start-8">
              {c.body.map((p, i) => <Reveal key={i} delay={0.1 + i * 0.06}><p className="text-muted">{p}</p></Reveal>)}
            </div>
          </div>

          {/* bento gallery */}
          <Reveal delay={0.1}>
            <div className="mt-14 grid h-auto grid-cols-2 gap-3 sm:gap-4 lg:h-[40rem] lg:grid-cols-4 lg:grid-rows-2">
              {tile(0, "col-span-2 row-span-2 aspect-[4/3] lg:aspect-auto", "(min-width:1024px) 50vw, 100vw")}
              {tile(1, "aspect-square lg:aspect-auto", "(min-width:1024px) 25vw, 50vw")}
              {tile(2, "aspect-square lg:aspect-auto", "(min-width:1024px) 25vw, 50vw")}
              {tile(3, "aspect-square lg:aspect-auto", "(min-width:1024px) 25vw, 50vw")}
              {tile(4, "aspect-square lg:aspect-auto", "(min-width:1024px) 25vw, 50vw")}
            </div>
          </Reveal>
          <p className="mt-5 text-small text-muted">{legal.cataloguePhotographyNote} Select an image to enlarge.</p>
        </div>
      </section>

      <Lightbox images={all} index={open} onClose={() => setOpen(null)} onIndex={setOpen} note={legal.cataloguePhotographyNote} />
    </>
  );
}
