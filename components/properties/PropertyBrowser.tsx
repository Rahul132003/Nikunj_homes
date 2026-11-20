"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { CategorySlug, Listing } from "@/data/properties";
import { listingKey, useShortlist } from "@/lib/shortlist";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { ListingCard } from "./ListingCard";

type Cat = { slug: CategorySlug; title: string };

/**
 * Search + filter for listings: free-text search, property type, and "saved only" (the visitor's shortlist).
 * The state is mirrored into the URL (?type=&q=&saved=1) so a filtered view can be shared or bookmarked.
 * Price is not a filter: every property is "Price on request".
 */
export function PropertyBrowser({ listings, categories }: { listings: Listing[]; categories: Cat[] }) {
  const [type, setType] = useState<"all" | CategorySlug>("all");
  const [q, setQ] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const { has, count } = useShortlist();
  const ready = useRef(false);

  // read the URL once on the client
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const t = p.get("type");
    if (t && categories.some((c) => c.slug === t)) setType(t as CategorySlug);
    setQ((p.get("q") ?? "").slice(0, 60));
    setSavedOnly(p.get("saved") === "1");
    ready.current = true;
  }, [categories]);

  // write it back (without adding history entries)
  useEffect(() => {
    if (!ready.current) return;
    const p = new URLSearchParams();
    if (type !== "all") p.set("type", type);
    if (q.trim()) p.set("q", q.trim());
    if (savedOnly) p.set("saved", "1");
    const qs = p.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [type, q, savedOnly]);

  // one analytics event per settled search (no search text is sent)
  useEffect(() => {
    if (!ready.current || !q.trim()) return;
    const t = setTimeout(() => track("Property search"), 1200);
    return () => clearTimeout(t);
  }, [q]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return listings.filter((l) => {
      if (type !== "all" && l.category !== type) return false;
      if (savedOnly && !has(listingKey(l.category, l.slug))) return false;
      if (!needle) return true;
      return [l.title, l.location, l.propertyType, l.summary, ...l.features].join(" ").toLowerCase().includes(needle);
    });
  }, [listings, type, q, savedOnly, has]);

  const filtered = type !== "all" || q.trim() !== "" || savedOnly;
  const reset = () => { setType("all"); setQ(""); setSavedOnly(false); };

  const chip = (active: boolean) =>
    cn(
      "min-h-11 rounded-full border px-5 text-small font-semibold transition-colors duration-300",
      active ? "border-forest-900 bg-forest-900 text-ivory" : "border-forest-900/25 bg-white text-forest-900 hover:border-forest-900",
    );

  return (
    <div>
      <form role="search" aria-label="Search properties" onSubmit={(e) => e.preventDefault()} className="grid gap-5 border border-hairline bg-white p-5 sm:p-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-5">
          <label htmlFor="pb-q" className="mb-2 block text-small font-semibold text-forest-900">Search</label>
          <input
            id="pb-q"
            type="search"
            value={q}
            maxLength={60}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Location, type or feature"
            autoComplete="off"
            className="min-h-12 w-full rounded-[2px] border border-field-border bg-white px-4 text-base text-charcoal placeholder:text-muted/80 focus-visible:border-forest-700"
          />
        </div>
        <fieldset className="lg:col-span-7">
          <legend className="mb-2 block text-small font-semibold text-forest-900">Property type</legend>
          <div className="flex flex-wrap gap-2">
            <button type="button" aria-pressed={type === "all"} onClick={() => setType("all")} className={chip(type === "all")}>All</button>
            {categories.map((c) => (
              <button key={c.slug} type="button" aria-pressed={type === c.slug} onClick={() => setType(c.slug)} className={chip(type === c.slug)}>{c.title}</button>
            ))}
            <button type="button" aria-pressed={savedOnly} onClick={() => setSavedOnly((v) => !v)} className={cn(chip(savedOnly), "inline-flex items-center gap-2")}>
              <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4" fill={savedOnly ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M12 20.5s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.6a4.3 4.3 0 0 1 7.5 2.7c0 5.6-7.5 10.2-7.5 10.2Z" /></svg>
              Saved{count > 0 ? ` (${count})` : ""}
            </button>
          </div>
        </fieldset>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p role="status" aria-live="polite" className="text-small text-muted">
          {results.length === 1 ? "1 property" : `${results.length} properties`}{filtered ? " match your filters" : ""}
        </p>
        {filtered && <button type="button" onClick={reset} className="link-underline text-small font-semibold text-forest-900">Clear filters</button>}
      </div>

      {results.length > 0 ? (
        <ul className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((l) => (
            <li key={`${l.category}/${l.slug}`}><ListingCard listing={l} /></li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 border border-dashed border-forest-900/25 p-8 sm:p-10">
          <p className="font-display text-[1.75rem] leading-tight text-forest-900">
            {savedOnly && count === 0 ? "You haven’t saved any properties yet." : "Nothing matches that yet."}
          </p>
          <p className="mt-3 max-w-xl text-muted">
            {savedOnly && count === 0
              ? "Tap the heart on any property to keep it here for later."
              : "Try a broader search, or tell us what you’re looking for — we’ll look beyond what’s listed."}
          </p>
          <div className="mt-6 flex flex-wrap gap-5">
            <button type="button" onClick={reset} className="link-underline text-small font-semibold text-forest-900">Clear filters</button>
            <Link href="/buy-invest" className="link-underline text-small font-semibold text-forest-900">Tell us what you need →</Link>
          </div>
        </div>
      )}
    </div>
  );
}
