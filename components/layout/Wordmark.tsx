import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Nikunj Homes logo. The artwork has an opaque light background, so it sits on
 * a small light plate that reads on both dark and light surfaces. `tone` is
 * kept for API compatibility with existing callers.
 */
export function Wordmark({ className }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span className={cn("inline-flex rounded-[3px] bg-[#fefefe] px-2 py-1", className)}>
      <Image
        src="/images/nikunj/logo.png"
        alt="Nikunj Homes"
        width={2172}
        height={724}
        sizes="(min-width: 640px) 150px, 120px"
        className="h-9 w-auto sm:h-11"
        priority
      />
    </span>
  );
}
