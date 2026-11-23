"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import type { ReactNode, RefObject } from "react";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

export function FadeUp({
  children,
  y = 16,
  delay = 0,
  className,
}: {
  children: ReactNode;
  y?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

export function useSectionProgress(ref: RefObject<HTMLElement | null>): MotionValue<number> {
  return useScroll({ target: ref, offset: ["start end", "end start"] }).scrollYProgress;
}

export function useParallax(progress: MotionValue<number>, from: number | string, to: number | string) {
  return useTransform(progress, [0, 1], [from, to]);
}
