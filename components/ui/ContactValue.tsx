import { Tbp } from "@/components/ui/Typography";

/**
 * A contact detail: a real link when it has been supplied (href set), otherwise the
 * labelled "to be provided" placeholder.
 */
export function ContactValue({ text, href, className }: { text: string; href?: string | null; className?: string }) {
  if (href) {
    return (
      <a href={href} className={className ?? "link-underline font-semibold"}>
        {text}
      </a>
    );
  }
  return <Tbp>{text}</Tbp>;
}
