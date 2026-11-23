"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IMG, NAV_ITEMS, SITE } from "../../lib/data";
import { FacebookIcon, InstagramIcon } from "./icons";
import { EASE_OUT } from "./motion";

export function Logo({ className = "h-8 w-auto md:h-10" }: { className?: string }) {
  return <Image src={`${IMG}/logo.png`} alt="St. James" width={1280} height={311} preload className={className} />;
}

function isActive(href: string, pathname: string) {
  if (href.startsWith("/#")) {
    return false;
  }
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function Burger({ open }: { open: boolean }) {
  const t = { duration: 0.35, ease: EASE_OUT }

  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
      <motion.line initial={false} animate={open ? { x1: 5, y1: 5, x2: 21, y2: 21 } : { x1: 3, y1: 8, x2: 23, y2: 8 }} transition={t} />
      <motion.line initial={false} animate={open ? { x1: 5, y1: 21, x2: 21, y2: 5 } : { x1: 9, y1: 18, x2: 23, y2: 18 }} transition={t} />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    if (!open) {
      return;
    }
    
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,border-color,backdrop-filter] duration-300 ${
          solid ? "border-b border-sj-line bg-sj-bg/85 backdrop-blur-md" : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="sj-container flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link href="/" aria-label="St James - home" onClick={() => setOpen(false)} className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href, pathname);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative rounded-full px-4 py-2 text-[17px] transition-colors ${active ? "font-bold text-white" : "text-white/80 hover:text-white"}`}
                >
                  {item.label}
                  <span
                    className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-sj-yellow transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/disco-bingo#book" className="sj-btn sj-btn-solid hidden h-11 sm:inline-flex">
              Book a table
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="sj-menu"
              onClick={() => setOpen((o) => !o)}
              className={`sj-hit-44 -mr-2 p-2 transition-colors lg:hidden ${open ? "text-sj-yellow" : "text-white"}`}
            >
              <Burger open={open} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="sj-menu"
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-sj-night pt-[var(--header-h)] lg:hidden"
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <nav aria-label="Mobile" className="sj-container relative flex flex-1 flex-col justify-center gap-1 py-10">
              {NAV_ITEMS.map((item, i) => {
                const active = isActive(item.href, pathname);

                return (
                  <motion.div key={item.href} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.12 + i * 0.05 }}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`sj-display block py-2 text-[clamp(2.75rem,13vw,4.5rem)] transition-colors ${active ? "text-sj-yellow" : "text-white hover:text-sj-yellow"}`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
            
            <motion.div
              className="sj-container relative flex flex-col gap-6 border-t border-sj-line py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/disco-bingo#book" onClick={() => setOpen(false)} className="sj-btn sj-btn-solid w-full">
                Book a table
              </Link>
              <div className="flex items-center justify-between text-sm text-sj-muted">
                <span>{SITE.addressLine}</span>

                <span className="flex gap-1">
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="St James on Instagram" className="sj-hit-44 p-2 text-white hover:text-sj-yellow">
                    <InstagramIcon size={20} />
                  </a>
                  <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="St James on Facebook" className="sj-hit-44 p-2 text-white hover:text-sj-yellow">
                    <FacebookIcon size={20} />
                  </a>
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
