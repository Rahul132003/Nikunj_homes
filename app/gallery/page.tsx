import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/PageHero";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";

export const metadata: Metadata = buildMetadata({
  title: "Gallery",
  description: "Images of PGS GREENS, a featured project by PGS Group, from the developer’s catalogue.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero heroKey="gallery"
        eyebrow="Gallery"
        title="A look at what’s featured."
        intro="Imagery for the featured project by PGS Group, taken from the developer’s catalogue. Nikunj Homes photography will be added here."
        crumbs={[{ label: "Home", href: "/" }, { label: "Gallery" }]}
      />
      <section className="section-y-sm">
        <div className="container-x"><GalleryBrowser /></div>
      </section>
    </>
  );
}
