"use client";

import { useEffect, useRef, useState } from "react";
import { company } from "@/data/company";

/**
 * Floating WhatsApp click-to-chat. Reads the number from data/company.ts.
 * While the number is a placeholder, it shows the placeholder instead of
 * opening a chat — so no wrong number can ever be dialled.
 */
export function WhatsAppButton() {
  const [note, setNote] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { number, defaultMessage, placeholder } = company.whatsapp;

  useEffect(() => {
    if (!note) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent && e.key !== "Escape") return;
      if (e instanceof MouseEvent && ref.current?.contains(e.target as Node)) return;
      setNote(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [note]);

  const onClick = () => {
    if (!number) return setNote((v) => !v);
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(defaultMessage)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-7 sm:right-7">
      {note && (
        <div role="status" className="surface-dark max-w-60 rounded-[2px] border border-gold-500/60 px-4 py-3 text-small shadow-xl">
          <p className="font-semibold">WhatsApp</p>
          <p className="mt-1 text-sage">{placeholder}</p>
        </div>
      )}
      <button
        type="button"
        onClick={onClick}
        aria-label="Chat with Nikunj Homes on WhatsApp"
        aria-expanded={number ? undefined : note}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-gold-500 bg-forest-900 text-ivory shadow-[0_12px_30px_-10px_rgb(0_0_0/0.55)] transition-[background-color,transform] duration-500 hover:bg-forest-700 hover:-translate-y-0.5 focus-visible:outline-gold-400"
      >
        <svg aria-hidden viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor">
          <path d="M16.04 4C9.4 4 4.02 9.37 4.02 16c0 2.12.55 4.18 1.6 6L4 28l6.18-1.6A11.96 11.96 0 0 0 16.04 28C22.66 28 28 22.63 28 16S22.66 4 16.04 4Zm0 21.9c-1.8 0-3.56-.49-5.1-1.4l-.37-.22-3.67.95.98-3.57-.24-.37A9.86 9.86 0 0 1 6.1 16c0-5.47 4.46-9.9 9.94-9.9 5.47 0 9.9 4.43 9.9 9.9s-4.43 9.9-9.9 9.9Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48a9.1 9.1 0 0 1-1.66-2.07c-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.88.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </button>
    </div>
  );
}
