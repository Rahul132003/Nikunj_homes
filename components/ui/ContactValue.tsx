import { Tbp } from "@/components/ui/Typography";

/**
 * A contact detail: a real link when it has an href, plain text when it is a real value without one
 * (e.g. office hours), and the labelled "[… – to be provided]" placeholder while it is still missing.
 */
export function ContactValue({ text, href, className }: { text: string; href?: string | null; className?: string }) {
  if (href) {
    return (
      <a href={href} className={className ?? "link-underline font-semibold"}>
        {text}
      </a>
    );
  }
  if (text.startsWith("[")) return <Tbp>{text}</Tbp>;
  return <span className={className}>{text}</span>;
}
