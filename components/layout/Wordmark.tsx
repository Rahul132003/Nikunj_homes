import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Nikunj Homes logo. The artwork has a dark-blue wordmark, so it always sits on a
 * light plate to stay legible over the dark header and footer.
 * The image's alt text is the accessible name.
 */
export function Wordmark({ className }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span className={cn("inline-flex rounded-[3px] bg-[#fefefe] px-2 py-1", className)}>
      <Image src="/images/nikunj/logo.png" alt="Nikunj Homes" width={256} height={85} priority className="h-9 w-auto sm:h-11" />
    </span>
  );
}