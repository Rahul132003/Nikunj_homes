"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ctaNav, primaryNav, type NavItem } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { Wordmark } from "./Wordmark";

const ease = [0.22, 1, 0.36, 1] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");
}

/* ------------------------------ Desktop item ------------------------------ */

function DesktopItem({ item, solid, pathname }: { item: NavItem; solid: boolean; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLLIElement>(null);
  const active = isActive(pathname, item.href);
  const linkTone = solid ? "text-forest-900" : "text-ivory";

  useEffect(() => setOpen(false), [pathname]);

  if (!item.children) {
    return (
      <li>
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={cn("link-underline py-2 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase", linkTone, active && "after:scale-x-100")}
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <div className="flex items-center gap-1.5">
        <Link
          href={item.href}
          aria-current={active ? "page" : undefined}
          className={cn("link-underline py-2 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase", linkTone, active && "after:scale-x-100")}
        >
          {item.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-label={`${item.label} menu`}
          onClick={() => setOpen((v) => !v)}
          className={cn("flex h-8 w-6 items-center justify-center", linkTone)}
        >
          <svg aria-hidden viewBox="0 0 10 6" className={cn("h-1.5 w-2.5 transition-transform duration-300", open && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="1.4">
            <path d="M1 1l4 4 4-4" />
          </svg>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.28, ease }}
            className="absolute left-1/2 top-full z-10 w-72 -translate-x-1/2 pt-3"
          >
            <ul className="surface-dark border-t-2 border-gold-500 py-2 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.5)]">
              {item.children.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="group block px-6 py-3 transition-colors hover:bg-forest-800">
                    <span className="font-display text-[1.375rem] leading-none">{c.label}</span>
                    {c.description && <span className="mt-1 block text-small text-sage">{c.description}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/* ------------------------------ Mobile menu ------------------------------- */

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Focus trap, Escape to close, lock body scroll
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const prev = document.activeElement as HTMLElement | null;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const f = focusables();
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = overflow;
      prev?.focus?.();
    };
  }, [open, onClose]);

  const flat: { label: string; href: string; sub?: boolean }[] = [];
  primaryNav.forEach((i) => {
    flat.push({ label: i.label, href: i.href });
    i.children?.forEach((c) => flat.push({ label: c.label, href: c.href, sub: true }));
  });
  flat.push({ label: ctaNav.label, href: ctaNav.href });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-lenis-prevent
          className="surface-dark grain fixed inset-0 z-[60] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease }}
        >
          <div className="container-x relative flex min-h-full flex-col pb-10 pt-6">
            <div className="flex items-center justify-between">
              <Link href="/" onClick={onClose}>
                <Wordmark />
              </Link>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-12 w-12 items-center justify-center text-ivory"
              >
                <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile" className="mt-10 flex-1">
              <ul>
                {flat.map((l, i) => {
                  const active = isActive(pathname, l.href);
                  return (
                    <motion.li
                      key={l.href}
                      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: reduce ? 0 : 0.12 + i * 0.045, ease }}
                      className={l.sub ? "pl-6" : ""}
                    >
                      <Link
                        href={l.href}
                        onClick={onClose}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex items-baseline gap-3 border-b border-white/10 py-3.5 font-display",
                          l.sub ? "text-[1.5rem] text-sage" : "text-[2rem] text-ivory",
                          active && "text-gold-400",
                        )}
                      >
                        {l.label}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* --------------------------------- Header --------------------------------- */

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const solid = scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500",
          solid ? "bg-ivory/95 shadow-[0_1px_0_0_var(--color-hairline)] backdrop-blur-md" : "bg-transparent",
        )}
      >
        {/* soft scrim: keeps the light header legible over any hero image; fades out once solid */}
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(var(--header-h)+2rem)] bg-gradient-to-b from-forest-950/60 via-forest-950/25 to-transparent transition-opacity duration-500",
            solid ? "opacity-0" : "opacity-100",
          )}
        />
        <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-8">
          <Link href="/" className="shrink-0">
            <Wordmark tone={solid ? "dark" : "light"} />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {primaryNav.map((item) => (
                <DesktopItem key={item.href} item={item} solid={solid} pathname={pathname} />
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={ctaNav.href}
              className={cn(
                "hidden min-h-11 items-center rounded-[2px] border px-6 text-[0.8125rem] font-semibold tracking-[0.08em] uppercase transition-colors duration-500 lg:inline-flex",
                solid
                  ? "border-forest-900 text-forest-900 hover:bg-forest-900 hover:text-ivory"
                  : "border-gold-500/70 text-ivory hover:bg-gold-500 hover:text-forest-950",
              )}
            >
              {ctaNav.label}
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className={cn("flex h-12 w-12 items-center justify-center lg:hidden", solid ? "text-forest-900" : "text-ivory")}
            >
              <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M3 8h18M3 16h12" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
