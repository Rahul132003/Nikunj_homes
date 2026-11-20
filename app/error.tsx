"use client";

import { useEffect } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Button, LinkButton } from "@/components/ui/Button";

/** Friendly fallback if something unexpected breaks while a page renders. */
export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageHero eyebrow="Something went wrong" title="We couldn’t load this page." intro="This is on our side, not yours. Please try again, or head back to the home page.">
      <div className="flex flex-wrap gap-4">
        <Button variant="gold" onClick={() => retry()}>Try again</Button>
        <LinkButton href="/" variant="outline-light">Back to home</LinkButton>
      </div>
    </PageHero>
  );
}
