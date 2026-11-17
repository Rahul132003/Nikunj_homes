"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Travel as a percentage of the element height, each way. Keep ≤ 8. */
  amount?: number;
  /** Slight over-scale so edges never show while travelling. */
  scale?: number;
}

/**
 * Subtle scroll parallax. Transform-only; disabled with prefers-reduced-motion.
 * Wrap an image in an `overflow-hidden` parent and put this inside it.
 */
export function Parallax({ children, className, amount = 6, scale = 1.12 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full will-change-transform"
        style={reduce ? undefined : { y, scale }}
      >
        {children}
      </motion.div>
    </div>
  );
}
