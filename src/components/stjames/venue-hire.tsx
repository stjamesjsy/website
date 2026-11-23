"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { AirVent, ArrowUpRight, Beer, Disc3, Lightbulb, Mic2, Settings2, Users, UtensilsCrossed, Wifi, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { ContactForm } from "./contact-form";
import { SITE, VENUE } from "../../lib/data";
import { EASE_OUT, FadeUp } from "../ui/motion";
import { Eyebrow, Heading, SiteShell, StarMark, Ticker } from "../ui/ui";

const FEATURE_ICONS: LucideIcon[] = [Users, AirVent, Mic2, Beer, Lightbulb, Settings2, Wifi, Disc3, UtensilsCrossed];

function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = (delay: number) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE_OUT, delay } });

  return (
    <section ref={ref} className="relative overflow-hidden pb-20 pt-[calc(var(--header-h)+3rem)] md:pb-28 lg:pt-[calc(var(--header-h)+5rem)]">
      {/* <div aria-hidden="true" className="sj-glow pointer-events-none absolute -left-60 top-20 h-[640px] w-[640px]" /> */}
      <div className="sj-container relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start gap-7">
          <h1 className="sj-display text-[clamp(4rem,10vw,8.5rem)] text-white">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: EASE_OUT, delay: 0.15 }}>
                Venue
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block text-sj-yellow" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: EASE_OUT, delay: 0.27 }}>
                Hire
              </motion.span>
            </span>
          </h1>
          {VENUE.intro.map((p, i) => (
            <motion.p key={p} className="max-w-xl text-lg leading-8 text-white/75" {...fade(0.45 + i * 0.08)}>
              {p}
            </motion.p>
          ))}
          <motion.dl className="flex flex-col gap-5" {...fade(0.65)}>
            {VENUE.facts.map((f) => (
              <div key={f.title} className="flex gap-4">
                <StarMark size={28} className="mt-0.5" />
                <div>
                  <dt className="font-bold text-white">{f.title}</dt>
                  <dd className="text-white/70">{f.body}</dd>
                </div>
              </div>
            ))}
          </motion.dl>
          <motion.div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row" {...fade(0.75)}>
            <a href={SITE.brochure} target="_blank" rel="noopener noreferrer" className="sj-btn sj-btn-solid group h-14 px-8 text-base">
              Check out the brochure <ArrowUpRight size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href="#enquire" className="sj-btn sj-btn-ghost h-14 px-8 text-base">
              Enquire
            </a>
          </motion.div>
        </div>
        <motion.div
          className="relative aspect-[1200/921] overflow-hidden rounded-[1.75rem] border border-sj-line shadow-2xl"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.2 }}
        >
          <motion.div className="absolute inset-[-8%]" style={{ y: imgY }}>
            <Image src={VENUE.image} alt="The front of St James at 5 Rue de Funchal, St Helier" fill preload sizes="(min-width: 1024px) 600px, 100vw" className="object-cover" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function FunctionRoom() {
  const { room } = VENUE;
  
  return (
    <section className="relative overflow-hidden bg-sj-plum py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(139,92,246,0.3),transparent_55%)]" />
      <div className="sj-container relative grid gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-8">
          <Heading eyebrow={room.eyebrow} lines={["The Function", "Room"]} />
          <FadeUp className="text-lg leading-8 text-white/75">{room.body}</FadeUp>
          <FadeUp className="flex items-end gap-4">
            <span className="sj-display text-[7rem] text-sj-yellow md:text-[9rem]">{room.capacity}</span>
            <span className="pb-4 text-lg font-bold uppercase leading-tight tracking-widest text-white">
              guests
              <br />
              <span className="text-white/50">maximum</span>
            </span>
          </FadeUp>
        </div>
        <ul className="grid gap-3 self-center sm:grid-cols-2 xl:grid-cols-3">
          {room.features.map((f, i) => {
            const Icon = FEATURE_ICONS[i] ?? Users;

            return (
              <motion.li
                key={f}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: EASE_OUT, delay: (i % 3) * 0.06 }}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-sj-bg/50 p-4 backdrop-blur transition-colors hover:border-sj-yellow/50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sj-yellow/10 text-sj-yellow transition-colors group-hover:bg-sj-yellow group-hover:text-sj-ink">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className="font-semibold leading-5 text-white">{f}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Enquire() {
  return (
    <section id="enquire" className="relative scroll-mt-[var(--header-h)] overflow-hidden py-24 md:py-32">
      {/* <div aria-hidden="true" className="sj-glow pointer-events-none absolute -right-40 bottom-0 h-[600px] w-[600px]" /> */}
      <div className="sj-container relative grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-6">
          <Heading eyebrow="Want to make it official?" lines={["Get in", "touch."]} />
          <FadeUp className="flex flex-col gap-4 text-white/75">
            <p>Tell us the date, rough numbers and what you're planning. We're open to events outside normal hours too - depending on the event, it may be possible.</p>
            <p>
              <span className="font-bold text-white">{SITE.addressLine}</span>
              <br />
              <a href={`mailto:${SITE.email}`} className="text-sj-yellow hover:underline">
                {SITE.email}
              </a>
            </p>
          </FadeUp>
        </div>
        <FadeUp y={24}>
          <div className="sj-card p-6 md:p-10">
            <ContactForm source="venue-hire" defaultSubject="Function Room hire" submitLabel="Send enquiry" />
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export function VenueHirePage() {
  return (
    <SiteShell>
      <Intro />
      <Ticker items={["Birthdays", "Work socials", "Live music", "DJ nights", "Bands", "Private parties"]} />
      <FunctionRoom />
      <Enquire />
    </SiteShell>
  );
}
