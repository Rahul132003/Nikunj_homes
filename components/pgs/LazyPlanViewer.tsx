"use client";

import dynamic from "next/dynamic";

/**
 * The interactive plan is below the fold and script-heavy (pan/zoom/pinch + 149 hotspots),
 * so it loads after the page is interactive. The placeholder matches its frame so nothing jumps.
 */
const Plan = dynamic(() => import("./PlanViewer").then((m) => m.PlanViewer), {
  ssr: false,
  loading: () => (
    <div aria-busy="true" aria-label="Loading interactive layout plan" className="grid gap-8 lg:grid-cols-12">
      <div className="card h-[26rem] sm:h-[34rem] lg:col-span-8 lg:aspect-[1000/705] lg:h-auto" />
      <div className="card hidden h-[28rem] lg:col-span-4 lg:block" />
    </div>
  ),
});

export function LazyPlanViewer() {
  return <Plan />;
}