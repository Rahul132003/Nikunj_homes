import Link from "next/link";
import { company } from "@/data/company";
import { footerNav } from "@/data/navigation";
import { Wordmark } from "./Wordmark";
import { Tbp } from "@/components/ui/Typography";

function Col({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-eyebrow mb-5 text-gold-400">{title}</h2>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-underline text-[0.9375rem] text-ivory/90 hover:text-ivory">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="surface-dark grain relative isolate overflow-hidden">
      <div className="container-x relative pb-10 pt-20 lg:pt-28">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <Wordmark />
            </Link>
            <p className="mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-sage">{company.shortDescription}</p>
            <address className="mt-8 not-italic text-[0.9375rem] leading-relaxed text-ivory/90">
              <span className="text-eyebrow mb-2 block text-gold-400">Office</span>
              {company.address.line1}
              <br />
              {company.address.city}, {company.address.state}-{company.address.postalCode}
            </address>
            <ul className="mt-6 space-y-1.5 text-[0.9375rem] text-ivory/90">
              <li><Tbp>{company.contact.phone}</Tbp></li>
              <li><Tbp>{company.contact.email}</Tbp></li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-7">
            <Col title="Explore" links={footerNav.explore} />
            <Col title="Properties" links={footerNav.properties} />
            <Col title="Clients" links={footerNav.clients} />
            <Col title="Legal" links={footerNav.legal} />
          </div>
        </div>

        <div aria-hidden className="mt-16 h-px bg-gold-500/40" />

        <div className="mt-8 grid gap-6 text-small text-sage lg:grid-cols-12">
          <p className="lg:col-span-7">
            © {new Date().getFullYear()} Nikunj Homes. All rights reserved.
          </p>
          <p className="lg:col-span-5 lg:text-right">
            Designed &amp; developed by{" "}
            <a href="https://www.hashxlabs.com" target="_blank" rel="noopener noreferrer" className="link-underline font-semibold text-ivory hover:text-gold-400">
              HashX Labs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
