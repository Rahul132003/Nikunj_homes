"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. Kept small — entrances should be felt, not seen. */
  y?: number;
  as?: "div" | "li" | "section" | "article" | "p" | "span";
}

/**
 * Single, restrained entrance: 24px rise + fade, once, when ~15% in view.
 * Animates transform + opacity only. With reduced motion it becomes a plain fade.
 */
export function Reveal({ children, className, delay = 0, y = 24, as = "div" }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -6% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.9, delay: reduce ? 0 : delay, ease }}
    >
      {children}
    </Comp>
  );
}

/** A hairline that draws itself (scaleX) when it scrolls into view. */
export function RuleReveal({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className={`rule-grow ${className ?? ""}`}
      initial={{ scaleX: reduce ? 1 : 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.2, delay, ease }}
    />
  );
}
