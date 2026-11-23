"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, CalendarCheck, ChevronDown, Clock, MailQuestion, MapPin, ParkingCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { ContactForm } from "./contact-form";
import { IMG, OPENING_HOURS, SITE, VENUE } from "../../lib/data";
import { EASE_OUT, FadeUp, useSectionProgress } from "../ui/motion";
import { Eyebrow, Heading, SiteShell, StarMark, Ticker } from "../ui/ui";
import { Events } from "./events";
import { WhatsOn } from "./whats-on";

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const letters = "ST JAMES".split("");

  return (
    <section ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden bg-sj-night">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <motion.div className="absolute inset-0" initial={{ scale: 1.2 }} animate={{ scale: 1.05 }} transition={{ duration: 2.4, ease: EASE_OUT }}>
          <Image src={`${IMG}/hero.png`} alt="" fill preload sizes="100vw" className="object-cover object-center" />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(10,14,23,0.1),rgba(10,14,23,0.55)_55%,rgba(10,14,23,0.95)_100%)]" />
      {/* <div aria-hidden="true" className="sj-glow-violet pointer-events-none absolute -left-40 top-1/4 h-[640px] w-[640px]" /> */}
      {/* <div aria-hidden="true" className="sj-glow pointer-events-none absolute -right-40 bottom-0 h-[560px] w-[560px]" /> */}

      <motion.div className="sj-container relative z-10 flex flex-col items-center pt-[var(--header-h)] text-center" style={{ y: contentY, opacity: fade }}>
        <h1 className="sj-display text-[clamp(4rem,12vw,15rem)] text-white" aria-label="St James">
          {letters.map((l, i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="inline-block"
              initial={{ opacity: 0, y: "40%", rotate: i % 2 ? 6 : -6 }}
              animate={{ opacity: 1, y: "0%", rotate: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.15 + i * 0.05 }}
            >
              {l === " " ? " " : l}
            </motion.span>
          ))}
        </h1>
        <motion.p
          className="mt-6 text-[clamp(0.95rem,2vw,1.375rem)] font-extralight uppercase tracking-[0.35em] text-white"
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.6 }}
        >
          Karaoke <span className="text-sj-yellow">·</span> Disco Bingo <span className="text-sj-yellow">·</span> Nightclub
        </motion.p>
        <motion.p className="mt-6 max-w-xl text-lg text-white/75" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.85 }}>
          Your night starts here - Disco Bingo, Karaoke, Live DJs, and good vibes!
        </motion.p>
        <motion.div className="mt-10 flex flex-col gap-3 sm:flex-row" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE_OUT, delay: 1 }}>
          <a href="#whats-on" className="sj-btn sj-btn-solid h-14 px-9 text-base">
            What's on
          </a>
          <Link href="/disco-bingo#book" className="sj-btn sj-btn-outline h-14 px-9 text-base">
            Book a table
          </Link>
        </motion.div>
      </motion.div>

      <motion.a
        href="#whats-on"
        aria-label="Scroll to what's on"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 p-3 text-white/70 hover:text-sj-yellow"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={26} aria-hidden="true" />
      </motion.a>
    </section>
  );
}

function VenueTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const p = useSectionProgress(ref);
  const imgY = useTransform(p, [0, 1], [40, -40]);
  const frameY = useTransform(p, [0, 1], [-20, 20]);

  return (
    <section className="relative overflow-hidden bg-sj-plum py-24 md:py-32">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(139,92,246,0.25),transparent_55%)]" />
      <div className="sj-container relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div ref={ref} className="relative order-last mx-auto w-full max-w-xl lg:order-first">
          <motion.div aria-hidden="true" className="absolute -inset-3 rotate-[-3deg] rounded-[1.75rem] border-2 border-sj-yellow md:-inset-4" style={{ y: frameY }} />
          <motion.div className="relative aspect-[1200/921] overflow-hidden rounded-[1.5rem] shadow-2xl" style={{ y: imgY }}>
            <Image src={VENUE.image} alt="The front of St James on Rue de Funchal" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
          </motion.div>
          <motion.div
            className="absolute -bottom-6 -right-2 flex h-28 w-28 flex-col items-center justify-center rounded-full bg-sj-yellow text-sj-ink shadow-xl md:-right-6 md:h-32 md:w-32"
            initial={{ scale: 0, rotate: -40 }}
            whileInView={{ scale: 1, rotate: 8 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.3 }}
          >
            <span className="sj-display text-4xl md:text-5xl">{VENUE.room.capacity}</span>
            <span className="text-[11px] font-black uppercase tracking-widest">guests</span>
          </motion.div>
        </div>
        <div className="flex flex-col gap-8">
          <Heading eyebrow="Venue hire" lines={["Your party.", "Our stage."]} />
          <FadeUp className="flex flex-col gap-4 text-lg text-white/75">
            <p>
              The Function Room upstairs has its own private bar, stage, DJ booth and full sound &amp; lighting - perfect for birthdays, work socials, bands and DJ events.
            </p>
          </FadeUp>
          <FadeUp className="flex flex-col gap-3">
            {["Private bar & stage", "Sound, lighting & DJ booth", "Fully air conditioned", "Buffet available on request"].map((t) => (
              <p key={t} className="flex items-center gap-3 font-semibold text-white">
                <StarMark size={20} /> {t}
              </p>
            ))}
          </FadeUp>
          <FadeUp className="flex flex-col gap-3 sm:flex-row">
            <Link href="/venue-hire" className="sj-btn sj-btn-solid group">
              Learn more <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="scroll-mt-[var(--header-h)] py-24 md:py-32">
      <div className="sj-container grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-10">
          <Heading lines={["Find", "us"]} yellowSameLine />
          <FadeUp className="flex flex-col gap-7">
            <div className="flex gap-4">
              <MapPin className="mt-1 shrink-0 text-sj-yellow" size={22} aria-hidden="true" />
              <div>
                <p className="font-bold text-white">Address</p>
                <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-sj-yellow">
                  {SITE.addressLine}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-1 shrink-0 text-sj-yellow" size={22} aria-hidden="true" />
              <div>
                <p className="font-bold text-white">Opening hours</p>
                {OPENING_HOURS.map(([d, h]) => (
                  <p key={d} className="text-white/70">
                    <span className="text-white">{d}</span> · {h}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <ParkingCircle className="mt-1 shrink-0 text-sj-yellow" size={22} aria-hidden="true" />
              <div>
                <p className="font-bold text-white">Parking</p>
                <p className="text-white/70">Minden Place multi-storey car park is less than a minute's walk around the corner.</p>
              </div>
            </div>
          </FadeUp>
          <FadeUp>
            <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className="sj-btn sj-btn-outline group">
              Get directions <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </FadeUp>
        </div>
        <FadeUp y={32} className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] border border-sj-line lg:min-h-full">
          <iframe
            title="Map showing St James, 5 Rue de Funchal, St Helier"
            src={SITE.mapEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 h-full w-full"
          />
        </FadeUp>
      </div>
    </section>
  );
}

function Contact() {
  const [open, setOpen] = useState(false);
  const option = "sj-card group flex w-full items-start gap-5 p-6 text-left transition-colors md:p-8";
  
  return (
    <section id="contact" className="relative scroll-mt-[var(--header-h)] overflow-hidden border-t border-sj-line bg-sj-night py-24 md:py-32">
      {/* <div aria-hidden="true" className="sj-glow pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2" /> */}
      <div className="sj-container relative flex flex-col items-center">
        <Heading lines={["Get in", "touch"]} yellowSameLine center />
        <FadeUp className="mt-4 text-center text-white/70">Please select an option below.</FadeUp>
        <div className="mt-12 grid w-full max-w-4xl gap-4 md:grid-cols-2">
          <FadeUp delay={0.05}>
            <button type="button" aria-expanded={open} aria-controls="general-enquiry" onClick={() => setOpen((o) => !o)} className={`${option} ${open ? "border-sj-yellow bg-sj-yellow/[0.07]" : "hover:border-sj-yellow/50"}`}>
              <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors ${open ? "bg-sj-yellow text-sj-ink" : "bg-white/5 text-sj-yellow"}`}>
                <MailQuestion size={22} aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="text-xl font-extrabold text-white">General enquiries</span>
                <span className="text-white/60">Speak to the manager with any general enquiries.</span>
              </span>
            </button>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link href="/disco-bingo#book" className={`${option} hover:border-sj-yellow/50`}>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/5 text-sj-yellow transition-colors group-hover:bg-sj-yellow group-hover:text-sj-ink">
                <CalendarCheck size={22} aria-hidden="true" />
              </span>
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-xl font-extrabold text-white">
                  Book a table <ArrowRight size={18} className="text-sj-yellow transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="text-white/60">Book a table for Disco Bingo.</span>
              </span>
            </Link>
          </FadeUp>
        </div>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="general-enquiry"
              className="w-full max-w-4xl overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <div className="sj-card mt-4 p-6 md:p-10">
                <Eyebrow className="mb-6">General enquiry</Eyebrow>
                <ContactForm source="home-general" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <div className="bg-sj-yellow h-6" />
      {/* <Ticker /> */}
      <WhatsOn />
      <Events />
      <VenueTeaser />
      {/* <Ticker tone="dark" items={["St James is the home of late night karaoke!", ""]} /> */}
      <Visit />
      <Contact />
    </SiteShell>
  );
}
