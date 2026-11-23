"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Star } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, type ReactNode } from "react";
import { TICKER } from "../../lib/data";
import { Footer } from "./footer";
import { Header } from "./header";
import { EASE_OUT, FadeUp } from "./motion";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {/* <MobileBookPill /> */}
    </>
  );
}

function MobileBookPill() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 480));

  if (pathname === "/disco-bingo") {
    return null;
  }

  return (
    <motion.div
      className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:hidden"
      initial={false}
      animate={{ y: show ? 0 : 96, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      aria-hidden={!show}
    >
      <Link href="/disco-bingo#book" tabIndex={show ? 0 : -1} className="sj-btn sj-btn-solid h-12 w-full max-w-sm shadow-[0_12px_40px_-8px_rgba(0,0,0,0.8)]">
        Book a table
      </Link>
    </motion.div>
  );
}

export function StarMark({ size = 22, className = "" }: { size?: number; className?: string }) {
  return <Star size={size} className={`shrink-0 fill-sj-yellow text-sj-yellow ${className}`} aria-hidden="true" />;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`sj-eyebrow ${className}`}>{children}</p>;
}

export function Heading({ eyebrow, lines, as: Tag = "h2", className = "", center = false, yellowSameLine = false }: { eyebrow?: string; lines: [string, string?]; as?: "h1" | "h2"; className?: string; center?: boolean; yellowSameLine?: boolean; }) {
  return (
    <FadeUp y={20} className={`flex flex-col gap-4 ${center ? "items-center text-center" : ""} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}

      <Tag className="sj-h2 text-white">
        <span className={yellowSameLine ? "" : "block"}>{lines[0]}</span>
        
        {lines[1] && (
          <>
            {yellowSameLine ? " " : null}
            <span className={yellowSameLine ? "text-sj-yellow" : "block text-sj-yellow"}>
              {lines[1]}
            </span>
          </>
        )}
      </Tag>
    </FadeUp>
  );
}

export function Ticker({ items = TICKER, tone = "yellow" }: { items?: string[]; tone?: "yellow" | "dark" }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-6 pr-6 md:gap-8 md:pr-8">
          <span className="sj-display whitespace-nowrap text-2xl md:text-3xl">{t}</span>
          <Star size={18} className={`sj-twinkle shrink-0 ${tone === "yellow" ? "fill-sj-ink text-sj-ink" : "fill-sj-yellow text-sj-yellow"}`} aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`relative overflow-hidden py-4 md:py-5 ${tone === "yellow" ? "bg-sj-yellow text-sj-ink" : "border-y border-sj-line bg-sj-night text-white"}`}>
      <div className="sj-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
