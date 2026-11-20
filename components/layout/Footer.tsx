import Link from "next/link";
import { company } from "@/data/company";
import { footerNav } from "@/data/navigation";
import { Wordmark } from "./Wordmark";
import { ContactValue } from "@/components/ui/ContactValue";

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

const SOCIAL_ICONS = {
  instagram: { label: "Instagram", path: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" /></> },
  facebook: { label: "Facebook", path: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z" /> },
  linkedin: { label: "LinkedIn", path: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.01M12 17v-4a2.5 2.5 0 0 1 5 0v4M12 10v7" /></> },
  youtube: { label: "YouTube", path: <><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="m10 9.5 5 2.5-5 2.5Z" fill="currentColor" /></> },
} as const;

/** Social links: each icon appears only once its URL is set in data/company.ts (company.social). Nothing is invented. */
function Socials() {
  const links = (Object.keys(SOCIAL_ICONS) as (keyof typeof SOCIAL_ICONS)[])
    .map((k) => ({ k, url: company.social[k] as string | null }))
    .filter((l): l is { k: keyof typeof SOCIAL_ICONS; url: string } => !!l.url);
  if (links.length === 0) return null;
  return (
    <ul className="mt-8 flex gap-3" aria-label="Nikunj Homes on social media">
      {links.map(({ k, url }) => (
        <li key={k}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${SOCIAL_ICONS[k].label} (opens in a new tab)`}
            className="grid h-11 w-11 place-items-center rounded-full border border-gold-500/50 text-ivory transition-colors duration-300 hover:border-gold-400 hover:bg-gold-400 hover:text-forest-950"
          >
            <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round">{SOCIAL_ICONS[k].path}</svg>
          </a>
        </li>
      ))}
    </ul>
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
              <li><ContactValue text={company.contact.phone} href={company.contact.phoneHref} className="link-underline hover:text-ivory" /></li>
              <li><ContactValue text={company.contact.email} href={company.contact.emailHref} className="link-underline break-all hover:text-ivory" /></li>
            </ul>
            <Socials />
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
          <p className="lg:col-span-5">
            © {new Date().getFullYear()} Nikunj Homes. All rights reserved.
          </p>
          <p className="lg:col-span-2 lg:text-center">
            <a href="#main" className="link-underline inline-flex min-h-11 items-center gap-2 font-semibold text-ivory hover:text-gold-400">
              <svg aria-hidden viewBox="0 0 10 20" className="h-4 w-2" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M5 20V2M1 6l4-4 4 4" /></svg>
              Back to top
            </a>
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
