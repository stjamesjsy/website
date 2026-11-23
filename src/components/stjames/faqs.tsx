"use client";

import { ArrowRight, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useId, useState } from "react";
import { FAQS, SITE, type Faq } from "../../lib/data";
import { EASE_OUT, FadeUp } from "../ui/motion";
import { SiteShell, StarMark } from "../ui/ui";

function FaqItem({ faq, open, onToggle, i }: { faq: Faq; open: boolean; onToggle: () => void; i: number }) {
  const id = useId();
  
  return (
    <motion.li
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: Math.min(i, 6) * 0.03 }}
      className={`rounded-2xl border transition-colors ${open ? "border-sj-yellow/50 bg-sj-card" : "border-sj-line bg-sj-card/50 hover:border-white/20"}`}
    >
      <h3>
        <button type="button" id={`${id}-q`} aria-expanded={open} aria-controls={`${id}-a`} onClick={onToggle} className="flex w-full items-center justify-between gap-6 p-5 text-left md:p-6">
          <span className={`text-lg font-bold transition-colors md:text-xl ${open ? "text-sj-yellow" : "text-white"}`}>{faq.q}</span>
          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${open ? "rotate-45 bg-sj-yellow text-sj-ink" : "bg-white/5 text-white"}`}>
            <Plus size={18} aria-hidden="true" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          >
            <div className="flex flex-col gap-3 px-5 pb-6 text-white/75 md:px-6">
              {faq.a.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {faq.list && (
                <ul className="flex flex-col gap-2">
                  {faq.list.map((l) => (
                    <li key={l} className="flex items-start gap-3">
                      <StarMark size={16} className="mt-1" /> {l}
                    </li>
                  ))}
                </ul>
              )}
              {faq.after?.map((p) => (
                <p key={p}>{p}</p>
              ))}
              {faq.link && (
                <Link href={faq.link.href} className="group inline-flex w-fit items-center gap-2 font-bold text-sj-yellow">
                  {faq.link.label} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export function FaqsPage() {
  const [open, setOpen] = useState<number | null>(0);
  
  return (
    <SiteShell>
      <section className="relative overflow-x-clip pb-24 pt-[calc(var(--header-h)+3rem)] md:pb-32 lg:pt-[calc(var(--header-h)+5rem)]">
        <div aria-hidden="true" className="sj-glow-violet pointer-events-none absolute -right-60 top-0 h-[700px] w-[700px]" />
        <div className="sj-container relative mb-12 flex flex-col gap-6 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-6">
            <h1 className="sj-display text-[clamp(2rem,5vw,4rem)] leading-[0.95] text-white">
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EASE_OUT, delay: 0.1 }}
                >
                  Frequently
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block text-sj-yellow"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
                >
                  asked questions.
                </motion.span>
              </span>
            </h1>
          </div>
        </div>
        <div className="sj-container relative grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div className="order-last lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:order-first lg:self-start">
            <div className="flex flex-col gap-6">
              <FadeUp className="sj-card flex flex-col gap-4 p-6">
                <p className="text-lg font-extrabold text-white">Still got a question?</p>
                <p className="text-white/65">Drop us a message and the manager will get back to you.</p>

                <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
                  <Link href="/#contact" className="sj-btn sj-btn-solid">
                    Contact us
                  </Link>
                  <a href={`mailto:${SITE.email}`} className="sj-btn sj-btn-ghost">
                    Email
                  </a>
                </div>
              </FadeUp>
            </div>
          </div>
          <ul className="flex flex-col gap-3">
            {FAQS.map((f, i) => (
              <FaqItem key={f.q} faq={f} i={i} open={open === i} onToggle={() => setOpen((o) => (o === i ? null : i))} />
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  );
}
