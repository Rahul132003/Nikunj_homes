import type { Metadata } from "next";
import { company, tbp } from "@/data/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { Tbp } from "@/components/ui/Typography";

export const metadata: Metadata = buildMetadata({
  title: "Privacy",
  description: "How Nikunj Homes handles details submitted through its enquiry forms.",
  path: "/privacy",
});

const sections = [
  ["Who we are", `${company.name}, ${company.address.full}.`],
  ["What we collect", tbp("Categories of personal data collected – confirm with the firm")],
  ["How we use it", tbp("Purposes of use – e.g. responding to enquiries")],
  ["Sharing", tbp("Who the data is shared with, if anyone")],
  ["Retention", tbp("How long enquiries are kept")],
  ["Your rights and contact", tbp("Privacy contact and rights wording")],
] as const;

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy" intro="A placeholder structure. The firm’s final privacy wording is to be provided." crumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <section className="section-y-sm">
        <div className="container-x max-w-3xl">
          <p className="mb-10 border-l-2 border-bronze bg-ivory-200 px-5 py-4 text-small text-charcoal">Draft structure only. This page must be completed and reviewed before launch.</p>
          {sections.map(([h, t]) => (
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
