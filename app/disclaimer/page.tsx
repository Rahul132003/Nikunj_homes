import type { Metadata } from "next";
import { legal, pgsRelationship, tbp } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Tbp } from "@/components/ui/Typography";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description: "Disclaimer for project information shown on the Nikunj Homes website.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  const blocks: [string, string][] = [
    ["Project information", `${pgsRelationship.label}: PGS GREENS. ${pgsRelationship.disclaimer}`],
    ["No offer", legal.formDisclaimer],
    ["Images", legal.cataloguePhotographyNote],
    ["Distances and drive times", "Location highlights and drive times for PGS GREENS are the developer’s own figures (“as per developer”). Items marked “proposed” are not yet built."],
    ["Approvals and registrations", tbp("RERA / approval details for PGS GREENS and for Nikunj Homes")],
    ["Final wording", tbp("Final legal disclaimer wording – pending client confirmation")],
  ];
  return (
    <>
      <PageHero eyebrow="Legal" title="Disclaimer" crumbs={[{ label: "Home", href: "/" }, { label: "Disclaimer" }]} />
      <section className="section-y-sm">
        <div className="container-x max-w-3xl">
          {blocks.map(([h, t]) => (
            <section key={h} className="border-t border-hairline py-8">
              <h2 className="text-h3 text-forest-900">{h}</h2>
              <p className="mt-4 text-muted">{t.startsWith("[") ? <Tbp>{t}</Tbp> : t}</p>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
