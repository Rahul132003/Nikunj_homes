import { PageHero } from "@/components/layout/PageHero";
import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageHero eyebrow="Error 404" title="This page could not be found." intro="The link may be out of date, or the page may have moved.">
      <div className="flex flex-wrap gap-4">
        <LinkButton href="/" variant="gold" arrow>Back to home</LinkButton>
        <LinkButton href="/properties" variant="outline-light">Browse properties</LinkButton>
      </div>
    </PageHero>
  );
}
