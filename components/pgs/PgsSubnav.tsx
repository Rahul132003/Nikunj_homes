"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const items = [
  { id: "story", label: "Story" },
  { id: "features", label: "Features" },
  { id: "nature", label: "Nature" },
  { id: "clubhouse", label: "Clubhouse" },
  { id: "site-visit", label: "Site visit" },
  { id: "layout", label: "Layout plan" },
  { id: "location", label: "Location" },
  { id: "enquire", label: "Enquire" },
];

/** Slim in-page navigation for the long project page. Desktop only; hidden until past the hero. */
export function PgsSubnav() {
  const [active, setActive] = useState<string>("");
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.5] },
    );
    items.forEach((i) => { const el = document.getElementById(i.id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <nav
      aria-label="On this page"
      className={cn(
        "fixed inset-x-0 top-[var(--header-h)] z-40 hidden border-b border-hairline bg-ivory/95 backdrop-blur-md transition-[opacity,transform] duration-500 lg:block",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
      )}
      aria-hidden={!shown}
    >
      <ul className="container-x flex items-center gap-8 py-3 text-[0.75rem] font-bold uppercase tracking-[0.14em]">
        <li className="font-display text-[1.25rem] font-medium normal-case tracking-normal text-pgs-green">PGS GREENS</li>
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              tabIndex={shown ? 0 : -1}
              aria-current={active === i.id ? "location" : undefined}
              className={cn("link-underline py-1 text-muted hover:text-forest-900", active === i.id && "text-forest-900 after:scale-x-100")}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
