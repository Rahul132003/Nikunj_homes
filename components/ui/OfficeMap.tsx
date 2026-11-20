import { company } from "@/data/company";

/**
 * Map of the Nikunj Homes office. Uses Google Maps' keyless embed, searched by the office address, so no API
 * key is needed. It loads lazily (only when scrolled near), and "Open in Google Maps" is always available.
 */
export function OfficeMap({ className }: { className?: string }) {
  const q = encodeURIComponent(company.address.full);
  return (
    <figure className={className}>
      <div className="relative aspect-[16/11] overflow-hidden border border-hairline bg-ivory-200">
        <iframe
          title={`Map showing the Nikunj Homes office at ${company.address.full}`}
          src={`https://www.google.com/maps?q=${q}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 text-small text-muted">
        <span>{company.address.full}</span>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${q}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline font-semibold text-forest-900"
        >
          Open in Google Maps
        </a>
      </figcaption>
    </figure>
  );
}
