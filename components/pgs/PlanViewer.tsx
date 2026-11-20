"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PLAN_IMAGE, getPlotDetails, plotHotspots } from "@/data/plots";
import { legal } from "@/data/company";
import { Button } from "@/components/ui/Button";
import { Tbp } from "@/components/ui/Typography";
import { cn } from "@/lib/cn";
import { PGS_ENQUIRE_EVENT } from "@/lib/events";

/* Content coordinate system: the plan is laid out 1000 px wide and scaled by CSS transform. */
const CW = 1000;
const CH = Math.round((CW * PLAN_IMAGE.height) / PLAN_IMAGE.width);
const MIN_Z = 1;
const MAX_Z = 8;
const HOT = 12; // hotspot diameter in content px (≈ the circles printed on the plan)

interface View { z: number; x: number; y: number }
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

export function PlanViewer() {
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 0, h: 0 });
  const [view, setView] = useState<View>({ z: 1, x: 0, y: 0 });
  const [selected, setSelected] = useState<string | null>(null);
  const [animate, setAnimate] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const initialised = useRef(false);
  const animTimer = useRef<number | undefined>(undefined);

  const fit = box.w && box.h ? Math.min(box.w / CW, box.h / CH) : 1;
  // Initial zoom: fill the frame's height (1 on wide desktop frames, >1 on narrow phones).
  const z0 = box.w ? Math.max(MIN_Z, box.h / CH / fit) : 1;
  const scale = fit * view.z;

  /* keep the plan inside the frame (centred when smaller than it) */
  const constrain = useCallback(
    (v: View): View => {
      const s = fit * v.z;
      const cw = CW * s, ch = CH * s;
      const x = cw <= box.w ? (box.w - cw) / 2 : clamp(v.x, box.w - cw, 0);
      const y = ch <= box.h ? (box.h - ch) / 2 : clamp(v.y, box.h - ch, 0);
      return { z: v.z, x, y };
    },
    [fit, box.w, box.h],
  );

  /* measure the frame */
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setBox({ w: el.clientWidth, h: el.clientHeight }));
    ro.observe(el);
    setBox({ w: el.clientWidth, h: el.clientHeight });
    return () => ro.disconnect();
  }, []);

  /* first layout: centre the plan at its initial zoom */
  useEffect(() => {
    if (!box.w || initialised.current) return;
    initialised.current = true;
    setView(constrain({ z: z0, x: 0, y: 0 }));
  }, [box.w, z0, constrain]);

  /* re-constrain on resize */
  useEffect(() => {
    if (initialised.current) setView((v) => constrain(v));
  }, [box.w, box.h, constrain]);

  const tween = useCallback(() => {
    setAnimate(true);
    window.clearTimeout(animTimer.current);
    animTimer.current = window.setTimeout(() => setAnimate(false), 700);
  }, []);

  /* zoom keeping the point (cx, cy) in frame coordinates fixed */
  const zoomAt = useCallback(
    (factor: number, cx: number, cy: number, smooth = false) => {
      setView((v) => {
        const nz = clamp(v.z * factor, MIN_Z, MAX_Z);
        const ratio = nz / v.z;
        return constrain({ z: nz, x: cx - (cx - v.x) * ratio, y: cy - (cy - v.y) * ratio });
      });
      if (smooth) tween();
    },
    [constrain, tween],
  );

  const reset = useCallback(() => {
    tween();
    setView(constrain({ z: z0, x: 0, y: 0 }));
    setSelected(null);
  }, [constrain, tween, z0]);

  const focusPlot = useCallback(
    (id: string) => {
      const p = plotHotspots.find((h) => h.id === id);
      if (!p) return;
      setSelected(id);
      tween();
      setView((v) => {
        const z = Math.max(v.z, Math.min(MAX_Z, z0 * 2.6));
        const s = fit * z;
        return constrain({ z, x: box.w / 2 - ((p.x / 100) * CW) * s, y: box.h / 2 - ((p.y / 100) * CH) * s });
      });
    },
    [box.w, box.h, constrain, fit, tween, z0],
  );

  /* ctrl/⌘ + wheel zooms; plain wheel keeps scrolling the page (native, non-passive listener) */
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      const r = el.getBoundingClientRect();
      zoomAt(Math.exp(-e.deltaY * 0.0022), e.clientX - r.left, e.clientY - r.top);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoomAt]);

  /* pointer: drag to pan, two fingers to pinch */
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const drag = useRef<{ x: number; y: number; vx: number; vy: number; moved: boolean } | null>(null);
  const pinch = useRef<{ dist: number; z: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragged = useRef(false);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest("[data-controls]")) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    dragged.current = false;
    if (pointers.current.size === 1) drag.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y, moved: false };
    if (pointers.current.size === 2) {
      const [a, b] = [...pointers.current.values()];
      pinch.current = { dist: Math.hypot(a.x - b.x, a.y - b.y), z: view.z };
      drag.current = null;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const r = boxRef.current!.getBoundingClientRect();

    if (pointers.current.size === 2 && pinch.current) {
      const [a, b] = [...pointers.current.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y);
      const target = clamp(pinch.current.z * (dist / pinch.current.dist), MIN_Z, MAX_Z);
      zoomAt(target / view.z, (a.x + b.x) / 2 - r.left, (a.y + b.y) / 2 - r.top);
      dragged.current = true;
      return;
    }
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x, dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) < 5) return;
    if (!d.moved) {
      d.moved = true;
      setDragging(true);
      try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); } catch { /* noop */ }
    }
    dragged.current = true;
    setView((v) => constrain({ ...v, x: d.vx + dx, y: d.vy + dy }));
  };

  const endPointer = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) { drag.current = null; setDragging(false); }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = 70;
    const cx = box.w / 2, cy = box.h / 2;
    switch (e.key) {
      case "ArrowLeft": setView((v) => constrain({ ...v, x: v.x + step })); break;
      case "ArrowRight": setView((v) => constrain({ ...v, x: v.x - step })); break;
      case "ArrowUp": setView((v) => constrain({ ...v, y: v.y + step })); break;
      case "ArrowDown": setView((v) => constrain({ ...v, y: v.y - step })); break;
      case "+": case "=": zoomAt(1.4, cx, cy, true); break;
      case "-": case "_": zoomAt(1 / 1.4, cx, cy, true); break;
      case "0": reset(); break;
      case "Escape": setSelected(null); return;
      default: return;
    }
    e.preventDefault();
  };

  /* panel */
  const ids = useMemo(() => plotHotspots.map((p) => p.id), []);
  const idx = selected ? ids.indexOf(selected) : -1;
  const step = (dir: 1 | -1) => focusPlot(ids[(idx + dir + ids.length) % ids.length] ?? ids[0]);
  const details = selected ? getPlotDetails(selected) : null;
  const sel = selected ? plotHotspots.find((p) => p.id === selected) : null;
  const zoomedIn = view.z > z0 + 0.02;

  const onSearch = (v: string) => {
    setQuery(v);
    const m = ids.find((id) => id.toLowerCase() === v.trim().toLowerCase());
    if (m) focusPlot(m);
  };

  const enquire = () => selected && window.dispatchEvent(new CustomEvent(PGS_ENQUIRE_EVENT, { detail: { plot: selected } }));

  const ctl =
    "flex h-11 w-11 items-center justify-center border border-forest-900/20 bg-ivory text-forest-900 transition-colors hover:bg-forest-900 hover:text-ivory disabled:opacity-40";

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      {/* ------------------------------ viewer ------------------------------ */}
      <div className="lg:col-span-8">
        <div
          ref={boxRef}
          role="group"
          tabIndex={0}
          aria-label="Interactive layout plan. Use the plot selector beside the plan, or arrow keys to pan, plus and minus to zoom, zero to reset."
          aria-describedby="plan-help"
          data-lenis-prevent-wheel
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
          onKeyDown={onKeyDown}
          className={cn(
            "relative h-[26rem] w-full select-none overflow-hidden border border-forest-900/15 bg-pgs-wash sm:h-[34rem] lg:aspect-[1000/705] lg:h-auto",
            dragging ? "cursor-grabbing" : zoomedIn ? "cursor-grab" : "cursor-default",
          )}
          style={{ touchAction: zoomedIn ? "none" : "pan-y" }}
        >
          <div
            className="absolute left-0 top-0 will-change-transform"
            style={{
              width: CW,
              height: CH,
              transformOrigin: "0 0",
              transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${scale})`,
              transition: animate && !dragging ? "transform 650ms cubic-bezier(0.22,1,0.36,1)" : "none",
            }}
          >
            <Image
              src={PLAN_IMAGE.src}
              alt={PLAN_IMAGE.alt}
              width={PLAN_IMAGE.width}
              height={PLAN_IMAGE.height}
              unoptimized
              draggable={false}
              className="pointer-events-none block h-full w-full"
            />

            {/* hotspots */}
            {plotHotspots.map((p) => {
              const on = selected === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  tabIndex={-1}
                  aria-label={`Plot ${p.id}`}
                  aria-pressed={on}
                  onClick={() => { if (!dragged.current) focusPlot(p.id); }}
                  onPointerEnter={() => setHover(p.id)}
                  onPointerLeave={() => setHover((h) => (h === p.id ? null : h))}
                  className="absolute rounded-full"
                  style={{ left: `${p.x}%`, top: `${p.y}%`, width: HOT, height: HOT, transform: "translate(-50%, -50%)" }}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -inset-[2px] rounded-full border-2 transition-opacity duration-300",
                      on ? "border-forest-950 bg-pgs-lime/55 opacity-100" : "border-forest-950 bg-pgs-wash/60 opacity-0",
                      hover === p.id && !on && "opacity-100",
                    )}
                  />
                </button>
              );
            })}

            {/* selected marker + label: constant on-screen size via counter-scale */}
            {sel && (
              <div
                aria-hidden
                className="pointer-events-none absolute"
                style={{ left: `${sel.x}%`, top: `${sel.y}%`, transform: `translate(-50%, -50%) scale(${1 / scale})` }}
              >
                <span key={sel.id} className="anim-ping absolute left-1/2 top-1/2 -ml-[18px] -mt-[18px] block h-9 w-9 rounded-full border-2 border-forest-950" style={{ animationIterationCount: 3 }} />
                <span className="absolute bottom-[26px] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[2px] bg-forest-950 px-2.5 py-1 text-[0.75rem] font-bold tracking-wide text-pgs-wash shadow-lg">
                  Plot {sel.id}
                </span>
              </div>
            )}
          </div>

          {/* hover label for non-selected plots */}
          {hover && hover !== selected && (() => {
            const p = plotHotspots.find((h) => h.id === hover)!;
            return (
              <span
                aria-hidden
                className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-[2px] bg-forest-950 px-2 py-0.5 text-[0.6875rem] font-bold text-ivory"
                style={{ left: view.x + ((p.x / 100) * CW) * scale, top: view.y + ((p.y / 100) * CH) * scale - 14 }}
              >
                Plot {p.id}
              </span>
            );
          })()}

          {/* controls */}
          <div data-controls className="absolute bottom-3 left-3 z-20 flex flex-col gap-px">
            <button type="button" className={ctl} aria-label="Zoom in" onClick={() => zoomAt(1.5, box.w / 2, box.h / 2, true)} disabled={view.z >= MAX_Z}>
              <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M8 2v12M2 8h12" /></svg>
            </button>
            <button type="button" className={ctl} aria-label="Zoom out" onClick={() => zoomAt(1 / 1.5, box.w / 2, box.h / 2, true)} disabled={view.z <= MIN_Z}>
              <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 8h12" /></svg>
            </button>
            <button type="button" className={ctl} aria-label="Reset plan view" onClick={reset}>
              <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2.5 8a5.5 5.5 0 1 0 1.8-4.1M2.5 2.5v3h3" /></svg>
            </button>
          </div>
          <p data-controls className="pointer-events-none absolute right-3 top-3 z-20 hidden max-w-[16rem] rounded-[2px] bg-forest-950/85 px-3 py-1.5 text-[0.75rem] leading-snug text-ivory sm:block">
            Drag to pan · Ctrl + scroll to zoom
          </p>
        </div>

        <p id="plan-help" className="mt-3 text-small text-muted">
          <span className="sm:hidden">Pinch to zoom, drag to pan. </span>
          Select a numbered plot, or choose one from the list. Keyboard: arrow keys pan, + / − zoom, 0 resets.
        </p>
      </div>

      {/* ------------------------------ panel ------------------------------ */}
      <aside aria-label="Plot details" className="lg:col-span-4">
        <div className="border border-forest-900/15 bg-white p-6 sm:p-8">
          <label htmlFor="plot-search" className="text-eyebrow text-label">Find a plot</label>
          <div className="mt-3 flex gap-2">
            <input
              id="plot-search"
              list="plot-ids"
              value={query}
              onChange={(e) => onSearch(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); onSearch(query); } }}
              placeholder="Plot no., e.g. 17 or 43A"
              autoComplete="off"
              className="min-h-12 w-full rounded-[2px] border border-field-border bg-white px-4 text-base text-charcoal placeholder:text-muted/80 focus-visible:border-pgs-olive-deep"
            />
            <datalist id="plot-ids">{ids.map((id) => <option key={id} value={id} />)}</datalist>
          </div>

          <div aria-live="polite" className="mt-7 min-h-[15.5rem]">
            {sel && details ? (
              <div>
                <p className="text-eyebrow text-muted">Selected</p>
                <p className="mt-1 font-display text-[3.5rem] font-medium leading-none text-forest-900">Plot {sel.id}</p>
                <dl className="mt-6 divide-y divide-hairline border-y border-hairline text-[0.9375rem]">
                  {([["Size", details.size], ["Price", details.price], ["Status", details.status]] as const).map(([k, v]) => (
                    <div key={k} className="grid grid-cols-[4.5rem_1fr] gap-3 py-3">
                      <dt className="text-muted">{k}</dt>
                      <dd>{k === "Price" ? <span className="font-semibold text-forest-900">{v}</span> : <Tbp>{v}</Tbp>}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button onClick={enquire} arrow>Enquire about plot {sel.id}</Button>
                </div>
                <div className="mt-5 flex items-center justify-between text-small">
                  <button type="button" onClick={() => step(-1)} className="link-underline font-semibold text-forest-900">← Previous</button>
                  <button type="button" onClick={() => setSelected(null)} className="link-underline text-muted">Clear</button>
                  <button type="button" onClick={() => step(1)} className="link-underline font-semibold text-forest-900">Next →</button>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-forest-900/25 p-6 text-[0.9375rem] text-muted">
                <p className="font-display text-[1.75rem] leading-tight text-forest-900">No plot selected</p>
                <p className="mt-3">Select a number on the plan, or search above. Size and status will show here once PGS Group provides them. Price is on request.</p>
              </div>
            )}
          </div>

          <details className="group mt-6 border-t border-hairline pt-5">
            <summary className="flex cursor-pointer list-none items-center justify-between text-small font-semibold text-forest-900">
              Browse all plots
              <svg aria-hidden viewBox="0 0 10 6" className="h-1.5 w-2.5 transition-transform duration-300 group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 1l4 4 4-4" /></svg>
            </summary>
            <div data-lenis-prevent className="mt-4 grid max-h-56 grid-cols-5 gap-1.5 overflow-y-auto pr-1 sm:grid-cols-6 lg:grid-cols-5">
              {ids.map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={selected === id}
                  onClick={() => focusPlot(id)}
                  className={cn(
                    "min-h-9 rounded-[2px] border text-[0.8125rem] font-semibold transition-colors",
                    selected === id ? "border-forest-900 bg-forest-900 text-ivory" : "border-hairline text-forest-900 hover:border-forest-900",
                  )}
                >
                  {id}
                </button>
              ))}
            </div>
          </details>
        </div>

        <ul className="mt-6 space-y-2.5 text-small text-muted">
          <li className="flex items-center gap-3"><span aria-hidden className="h-3 w-3 rounded-full border border-forest-950 bg-white" />Numbered plots, as printed on the developer’s plan</li>
          <li className="flex items-center gap-3"><span aria-hidden className="h-1.5 w-3 bg-[#8a4a2b]" />Internal roads, 30–35 ft wide (as per developer)</li>
          <li className="flex items-center gap-3"><span aria-hidden className="h-3 w-3 bg-[#c8453b]" />Clubhouse area, as shown on the plan</li>
          <li className="pt-1">Availability colours will appear here once status is provided.</li>
        </ul>
        <p className="mt-5 text-small text-muted">Layout plan as per developer’s catalogue. Not to scale. {legal.formDisclaimer}</p>
      </aside>
    </div>
  );
}
