"use client";

import { ArrowRight, Briefcase, CalendarDays, FileText, UtensilsCrossed, Wine } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { BINGO_HERO, BINGO_STEPS } from "../../lib/bingo-data";
import { SITE } from "../../lib/data";
import { EASE_OUT, FadeUp } from "../ui/motion";
import { Eyebrow, Heading, SiteShell, StarMark } from "../ui/ui";
import { BingoBookingForm } from "./bingo-form";

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const cardY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  const fade = (delay: number) => ({
    initial: {
      opacity: 0, y: 14
    },
    animate: {
      opacity: 1, y: 0
    },
    transition: {
      duration: 0.8, ease: EASE_OUT, delay
    }
  });

  return (
    <section ref={ref} className="relative overflow-hidden pb-20 pt-[calc(var(--header-h)+3rem)] md:pb-28 lg:pt-[calc(var(--header-h)+5rem)]">
      <div className="sj-container relative grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="flex flex-col items-start gap-6">
          <h1 className="sj-display text-[clamp(4.5rem,12vw,10rem)] text-white">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: EASE_OUT, delay: 0.15 }}>
                {BINGO_HERO.title}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block text-sj-yellow" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: EASE_OUT, delay: 0.27 }}>
                {BINGO_HERO.accent}
              </motion.span>
            </span>
          </h1>
          <motion.p className="max-w-lg text-lg leading-8 text-white/75" {...fade(0.5)}>
            {BINGO_HERO.body}
          </motion.p>
          <motion.div className="flex flex-wrap gap-x-6 gap-y-2 text-white" {...fade(0.6)}>
            <span className="flex items-center gap-2">
              <StarMark size={18} /> <b>Fridays</b> 7pm - 11pm
            </span>
            <span className="flex items-center gap-2">
              <StarMark size={18} /> <b>Sundays</b> 5pm - 9pm
            </span>
          </motion.div>
          <motion.div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row" {...fade(0.7)}>
            <a href="#book" className="sj-btn sj-btn-solid h-14 px-9 text-base">
              Book a table
            </a>
            <a href="#how-it-works" className="sj-btn sj-btn-ghost h-14 px-9 text-base">
              How it works
            </a>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            className="relative aspect-[1640/1240] overflow-hidden rounded-[1.75rem] border border-sj-line"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.2 }}
          >
            <motion.div className="absolute inset-[-10%]" style={{ y: photoY }}>
              <Image src={BINGO_HERO.image} alt="The Disco Bingo room at St James, set up with tables and a stage" fill preload sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-sj-bg/60 to-transparent" />
          </motion.div>
          {/* <motion.div
            className="absolute -bottom-10 -left-4 w-[58%] overflow-hidden rounded-2xl border-4 border-sj-bg shadow-2xl md:-left-10"
            style={{ y: cardY }}
            initial={{ opacity: 0, rotate: -14, x: -30 }}
            animate={{ opacity: 1, rotate: -6, x: 0 }}
            transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.55 }}
          >
            <div className="relative aspect-[760/420]">
              <Image src={BINGO_HERO.card} alt="" fill sizes="360px" className="object-cover" />
            </div>
          </motion.div> */}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative scroll-mt-[var(--header-h)] overflow-hidden bg-sj-plum py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(139,92,246,0.3),transparent_50%)]" />
      <div className="sj-container relative">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Heading eyebrow="How it works" lines={["Eyes down,", "dabbers ready."]} />
        </div>
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {BINGO_STEPS.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: (i % 4) * 0.06 }}
              className={`group flex h-full flex-col gap-4 rounded-[1.25rem] border border-white/10 bg-sj-bg/50 p-6 backdrop-blur transition-colors hover:border-sj-yellow/50 ${i === BINGO_STEPS.length - 1 ? "sm:col-span-2 lg:col-span-1" : ""}`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sj-yellow text-2xl font-black text-sj-ink">
                {i + 1}
              </span>
              <h3 className="text-xl font-extrabold text-white">{s.title}</h3>
              <p className="text-white/70">{s.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ScheduleMeals() {
  const cards = [
    { icon: CalendarDays, title: "Friday", body: "7pm - 11pm" },
    { icon: CalendarDays, title: "Sunday", body: "5pm - 9pm" },
    { icon: UtensilsCrossed, title: "Basket meals", body: "Sold on the night - no need to pre-book." },
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="sj-container grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-8">
          <Heading eyebrow="Schedule & meals" lines={["Two nights", "a week."]} />
          <FadeUp className="max-w-lg text-lg text-white/75">
            Basket meals are available throughout. They're sold on-site and don't need to be pre-booked - but if you're a bigger group, tell us roughly what you fancy when you book so the kitchen's ready.
          </FadeUp>
          <FadeUp className="flex flex-col gap-3 sm:flex-row">
            <a href={SITE.foodMenu} target="_blank" rel="noopener noreferrer" className="sj-btn sj-btn-outline">
              <FileText size={16} aria-hidden="true" /> Food menu
            </a>
            <a href={SITE.wineMenu} target="_blank" rel="noopener noreferrer" className="sj-btn sj-btn-ghost">
              <Wine size={16} aria-hidden="true" /> Wine menu
            </a>
          </FadeUp>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map(({ icon: Icon, title, body }, i) => (
            <FadeUp key={title} y={24} delay={i * 0.06} className={i === 2 ? "sm:col-span-2" : ""}>
              <div className="sj-card flex h-full flex-col gap-4 p-6 md:p-8">
                <Icon className="text-sj-yellow" size={26} aria-hidden="true" />
                <p className="sj-h3 text-white">{title}</p>
                <p className="text-lg text-white/70">{body}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section id="book" className="relative scroll-mt-[var(--header-h)] overflow-x-clip border-t border-sj-line bg-sj-night py-24 md:py-32">
      <div className="sj-container relative grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,760px)] lg:gap-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:self-start">
          <div className="flex flex-col gap-8">
            <Heading eyebrow="Booking required" lines={["Book a", "table."]} />
            <FadeUp className="flex flex-col gap-4 text-white/75">
              <p>You're booking a table for Disco Bingo. Pick your night, tell us how many are coming, and we'll confirm by email.</p>
              <p>Bingo books are bought on the night.</p>
            </FadeUp>
            <FadeUp className="flex flex-col gap-3">
              {["Fridays 7pm - 11pm", "Sundays 5pm - 9pm"].map((t) => (
                <p key={t} className="flex items-center gap-3 font-semibold text-white">
                  <StarMark size={18} /> {t}
                </p>
              ))}
            </FadeUp>
            <FadeUp className="text-sm text-white/50">
              Questions about a booking? Email{" "}
              <a href={`mailto:${SITE.bookingsEmail}`} className="text-sj-yellow hover:underline">
                {SITE.bookingsEmail}
              </a>
            </FadeUp>
          </div>
        </div>
        <FadeUp y={24}>
          <BingoBookingForm />
        </FadeUp>
      </div>
    </section>
  );
}

function Corporate() {
  return (
    <section className="py-24 md:py-28">
      <div className="sj-container">
        <FadeUp y={24}>
          <div className="relative overflow-hidden rounded-[2rem] bg-sj-yellow px-6 py-14 text-sj-ink md:px-14 md:py-16">
            <div aria-hidden="true" className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[28px] border-sj-ink/10" />
            <div aria-hidden="true" className="absolute -bottom-32 right-40 h-64 w-64 rounded-full border-[20px] border-sj-ink/5" />
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="flex max-w-2xl flex-col gap-4">
                <p className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.25em]">
                  <Briefcase size={16} aria-hidden="true" /> Corporate Disco Bingo
                </p>
                <h2 className="sj-h2">Bring the office.</h2>
                <p className="text-lg">
                  Looking to host a corporate night? Disco Bingo can be booked for private corporate events. Please contact us from an official company email address with any queries.
                </p>
              </div>
              <a href={`mailto:${SITE.email}?subject=Corporate%20Disco%20Bingo`} className="sj-btn sj-btn-ink group h-14 shrink-0 px-8 text-base">
                Contact us <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

export function DiscoBingoPage() {
  return (
    <SiteShell>
      <Hero />
      <div className="bg-sj-yellow h-6" />
      <HowItWorks />
      <ScheduleMeals />
      <Booking />
      <Corporate />
    </SiteShell>
  );
}
