"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Clock, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { NIGHTS, WEEK, type Night } from "../../lib/data";
import { EASE_OUT, FadeUp } from "../ui/motion";
import { Heading, StarMark } from "../ui/ui";

const noopSubscribe = () => () => {};
/** Monday-first index of today; null during server render so markup hydrates cleanly. */
export function useTodayIndex(): number | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => (new Date().getDay() + 6) % 7,
    () => null,
  );
}

export function TonightBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-sj-yellow px-2.5 py-1 text-[11px] font-black uppercase leading-none tracking-wider text-sj-ink">
      Tonight
    </span>
  );
}

function NightDetails({ night }: { night: Night }) {
  const actions = night.cta ?? [{ label: "Plan your visit", href: "/#visit" }];

  return (
    <div className="flex flex-col gap-4">
      <p className="flex items-center gap-2 font-semibold text-sj-yellow">
        <Clock size={16} aria-hidden="true" /> {night.when}
      </p>
      <p className="text-lg font-bold text-white">{night.intro}</p>
      <p className="text-white/70">{night.body}</p>
      <p className="flex items-start gap-2 text-white/90">
        <StarMark size={18} className="mt-0.5" /> {night.note}
      </p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        {actions.map((c, j) => (
          <Link key={c.href} href={c.href} className={`sj-btn group ${j === 0 ? "sj-btn-solid" : "sj-btn-outline"}`}>
            {c.label}
            {j === 0 && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function WhatsOn() {
  const today = useTodayIndex();
  const tonight = today === null ? -1 : NIGHTS.findIndex((n) => n.dayIdx.includes(today));
  const [picked, setPicked] = useState<number | null>(null);
  /** Mobile only: a second tap on the open row folds it away (desktop always shows the panel). */
  const [collapsed, setCollapsed] = useState(false);
  const pick = (i: number) => {
    setPicked(i);
    setCollapsed(false);
  };
  const active = picked ?? (tonight >= 0 ? tonight : 0);
  const night = NIGHTS[active];

  return (
    <section id="whats-on" className="relative scroll-mt-[var(--header-h)] overflow-x-clip py-24 md:py-32">
      <div aria-hidden="true" className="sj-glow-violet pointer-events-none absolute -right-60 top-20 h-[700px] w-[700px]" />
      <div className="sj-container relative">
        <div className="mb-12 flex flex-col gap-10 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <Heading eyebrow="Weekly entertainment" lines={["What's on"]} />
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          <ol className="border-b border-sj-line">
            {NIGHTS.map((n, i) => {
              const on = i === active;
              const open = on && !collapsed;
              const isTonight = today !== null && n.dayIdx.includes(today);
              
              return (
                <li key={n.id} id={n.id} className="scroll-mt-28 border-t border-sj-line">
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`night-${n.id}`}
                    onClick={() => (on ? setCollapsed((c) => !c) : pick(i))}
                    onMouseEnter={() => {
                      if (!on && window.matchMedia("(hover: hover)").matches) pick(i);
                    }}
                    onFocus={() => !on && pick(i)}
                    className="group grid w-full grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center py-6 text-left md:grid-cols-[1.5rem_minmax(0,1fr)_auto] md:py-8"
                  >
                    <span className={`self-start pt-2 text-sm font-black transition-colors md:text-base ${on ? "text-sj-yellow" : "text-white/30"}`}>
                      {/* {String(i + 1).padStart(2, "0")} */}
                    </span>
                    <span className="flex min-w-0 flex-col gap-3">
                      <span
                        className={`sj-display text-[clamp(2.25rem,5vw,4.25rem)] transition-colors duration-300 ${
                          on ? "text-sj-yellow" : "text-white lg:text-white/40 lg:group-hover:text-white"
                        }`}
                      >
                        {n.title}
                      </span>
                      <span className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                        <span className="rounded-full border border-white/15 px-3 py-1 font-bold uppercase tracking-wider text-white">{n.days}</span>
                        <span className="text-white/60">{n.when}</span>
                        {isTonight && <TonightBadge />}
                      </span>
                      <span className="hidden text-white/55 md:block">{n.line}</span>
                    </span>
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 md:h-12 md:w-12 ${
                        on ? "border-sj-yellow bg-sj-yellow text-sj-ink" : "border-white/15 text-white group-hover:border-sj-yellow/60"
                      }`}
                      aria-hidden="true"
                    >
                      <ArrowRight size={18} className={`hidden transition-transform duration-300 lg:block ${on ? "" : "-rotate-45"}`} />
                      <Plus size={18} className={`transition-transform duration-300 lg:hidden ${open ? "rotate-45" : ""}`} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`night-${n.id}`}
                        className="overflow-hidden lg:hidden"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE_OUT }}
                      >
                        <div className="flex flex-col gap-6 pb-8 md:pl-[4.5rem]">
                          <div className="relative aspect-[760/420] overflow-hidden rounded-2xl">
                            <Image src={n.image} alt={`${n.title} at St James`} fill sizes="100vw" className="object-cover" />
                          </div>
                          <NightDetails night={n} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)]" aria-live="polite">
              <div className="relative">
                <div aria-hidden="true" className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2deg] rounded-[1.5rem] bg-sj-yellow" />
                <div className="relative aspect-[760/420] overflow-hidden rounded-[1.5rem] border border-sj-line bg-sj-card">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={night.id}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE_OUT }}
                    >
                      <Image src={night.image} alt={`${night.title} at St James`} fill sizes="560px" className="object-cover" />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={night.id}
                  className="mt-10"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                >
                  <NightDetails night={night} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <FadeUp className="mt-10 flex flex-col gap-2 text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>Open every night from 7:30pm.</p>
          
          <Link href="/disco-bingo" className="group inline-flex items-center gap-1.5 font-bold text-sj-yellow">
            All about Disco Bingo <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </FadeUp>
      </div>
    </section>
  );
}
