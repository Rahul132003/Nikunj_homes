import Link from "next/link";
import type { Listing } from "@/data/properties";
import { SmoothImage } from "@/components/ui/SmoothImage";
import { ShortlistButton } from "./ShortlistButton";

/** Refined listing card — image-led, hairline border, hover rule, save-to-shortlist. Sample listings are badged. */
export function ListingCard({ listing }: { listing: Listing }) {
  const cover = listing.images[0];
  return (
    <div className="group relative border border-hairline bg-white transition-colors duration-500 hover:border-forest-900">
      <Link href={`/properties/${listing.category}/${listing.slug}`} className="block">
        <div className="relative aspect-[3/2] overflow-hidden">
          <SmoothImage src={cover.src} alt={cover.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" />
          {listing.isTemplate && (
            <span className="text-eyebrow absolute left-4 top-4 bg-forest-900 px-3 py-1.5 text-ivory">Sample</span>
          )}
        </div>
        <div className="p-6">
          <p className="text-eyebrow text-label">{listing.propertyType}</p>
          <h3 className="mt-3 font-display text-[1.875rem] leading-tight text-forest-900">{listing.title}</h3>
          <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-hairline pt-5 text-small">
            <div><dt className="text-muted">Location</dt><dd className="mt-0.5 text-charcoal">{listing.location}</dd></div>
            <div><dt className="text-muted">Area</dt><dd className="mt-0.5 text-charcoal">{listing.area}</dd></div>
            <div className="col-span-2"><dt className="sr-only">Price</dt><dd className="font-semibold text-forest-900">{listing.price}</dd></div>
          </dl>
          <span className="mt-6 inline-flex items-center gap-3 text-[0.875rem] font-semibold text-forest-900">
            <span className="link-underline">View details</span>
            <svg aria-hidden viewBox="0 0 20 10" className="h-2.5 w-5 transition-transform duration-500 group-hover:translate-x-1.5" fill="none" stroke="currentColor" strokeWidth="1.25"><path d="M0 5h18M14 1l4 4-4 4" /></svg>
          </span>
        </div>
      </Link>
      {/* a sibling of the link (not inside it): a button must not live inside an anchor */}
      <ShortlistButton category={listing.category} slug={listing.slug} title={listing.title} className="absolute right-4 top-4 z-10" />
    </div>
  );
}
