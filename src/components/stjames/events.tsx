"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, Clock } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { SITE } from "../../lib/data";
import { eventDate, formatTimeRange, isToday, sanitizeDescription, type SiteEvent } from "../../lib/events";
import { EASE_OUT, FadeUp } from "../ui/motion";
import { Eyebrow, Heading, StarMark } from "../ui/ui";
import { TonightBadge } from "./whats-on";

type EventsState = { status: "loading" } | { status: "error" } | { status: "ready"; events: SiteEvent[] };

function useEvents(): EventsState {
  const [state, setState] = useState<EventsState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    fetch(SITE.eventsUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Events request failed (${res.status})`);
        }
        return res.json() as Promise<SiteEvent[]>;
      })
      .then((events) => setState({ status: "ready", events: Array.isArray(events) ? events : [] }))
      .catch(() => {
        if (!controller.signal.aborted) {
          setState({ status: "error" });
        }
      });

    return () => controller.abort();
  }, []);

  return state;
}

function DateLine({ event }: { event: SiteEvent }) {
  const date = eventDate(event).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });

  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
      <span className="rounded-full bg-sj-yellow px-3 py-1 font-black uppercase tracking-wider text-sj-ink">{date}</span>
      <span className="flex items-center gap-2 font-semibold text-sj-yellow">
        <Clock size={16} aria-hidden="true" /> {formatTimeRange(event)}
      </span>
      {isToday(event) && <TonightBadge />}
    </p>
  );
}

/** Height (px) a description folds down to before "Show more" is needed - roughly five lines. */
const COLLAPSED_HEIGHT = 120;

function Description({ id, html }: { id: string; html: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const clean = useMemo(() => sanitizeDescription(html), [html]);

  useEffect(() => {
    const el = ref.current;

    if (!el) {
      return;
    }

    const measure = () => setOverflows(el.scrollHeight > COLLAPSED_HEIGHT + 24);
    const observer = new ResizeObserver(measure);

    observer.observe(el);
    measure();

    return () => observer.disconnect();
  }, [clean]);

  const folded = overflows && !open;

  return (
    <div className="flex flex-col items-start gap-3">
      <motion.div
        id={`event-${id}-description`}
        className="relative w-full overflow-hidden"
        initial={false}
        animate={{ height: folded ? COLLAPSED_HEIGHT : "auto" }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        style={folded ? { maskImage: "linear-gradient(to bottom, #000 55%, transparent)" } : undefined}
      >
        <div ref={ref} className="sj-rich" dangerouslySetInnerHTML={{ __html: clean }} />
      </motion.div>
      {overflows && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`event-${id}-description`}
          onClick={() => setOpen((o) => !o)}
          className="group inline-flex items-center gap-1.5 font-bold text-sj-yellow"
        >
          {open ? "Show less" : "Show more"}
          <ChevronDown size={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

function EventImage({ event, sizes, className = "" }: { event: SiteEvent; sizes: string; className?: string }) {
  const hasSize = event.imageWidth && event.imageHeight;

  if (!event.image) {
    return (
      <div aria-hidden="true" className={`relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-sj-plum ${className}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.35),transparent_60%)]" />
        <StarMark size={40} className="relative" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: hasSize ? `${event.imageWidth} / ${event.imageHeight}` : "4 / 5" }}>
      <Image src={event.image} alt={event.name} fill unoptimized sizes={sizes} className="object-cover" />
    </div>
  );
}

/** The next event up - gets the full width and its description shown inline. */
function FeaturedEvent({ event }: { event: SiteEvent }) {
  return (
    <article className={`sj-card grid gap-6 p-5 md:gap-10 md:p-6 ${event.image ? "md:grid-cols-[16rem_minmax(0,1fr)] lg:grid-cols-[20rem_minmax(0,1fr)]" : "md:px-10 md:py-10"}`}>
      {event.image && <EventImage event={event} sizes="(min-width: 1024px) 320px, (min-width: 768px) 256px, 100vw" className="w-full self-start rounded-2xl" />}
      <div className="flex min-w-0 flex-col gap-4 self-center">
        <Eyebrow>Next up</Eyebrow>
        <DateLine event={event} />
        <h3 className="sj-h3 text-balance text-[clamp(1.75rem,3.5vw,2.75rem)] text-white [overflow-wrap:anywhere]">{event.name}</h3>
        {event.description && <Description id={event.id} html={event.description} />}
      </div>
    </article>
  );
}

/** Every event after the next one - a poster tile with the description behind a toggle. */
function EventTile({ event }: { event: SiteEvent }) {
  const [open, setOpen] = useState(false);
  const clean = useMemo(() => sanitizeDescription(event.description ?? ""), [event.description]);
  const detailsId = `event-${event.id}-details`;

  return (
    <article className="sj-card flex flex-col overflow-hidden">
      <EventImage event={event} sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" className="w-full border-b border-sj-line" />
      <div className="flex flex-col gap-3 p-5">
        <DateLine event={event} />
        <h3 className="text-balance text-xl font-extrabold leading-tight text-white [overflow-wrap:anywhere]">{event.name}</h3>
        {clean && (
          <>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={detailsId}
              onClick={() => setOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 self-start font-bold text-sj-yellow"
            >
              {open ? "Hide details" : "Details"}
              <ChevronDown size={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  id={detailsId}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <div className="sj-rich pt-1 text-sm" dangerouslySetInnerHTML={{ __html: clean }} />
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </article>
  );
}

function EventSkeleton() {
  return (
    <div className="sj-card grid animate-pulse gap-6 p-5 md:grid-cols-[16rem_minmax(0,1fr)] md:gap-10 md:p-6 lg:grid-cols-[20rem_minmax(0,1fr)]" aria-hidden="true">
      <div className="aspect-[4/5] rounded-2xl bg-white/10" />
      <div className="flex flex-col gap-4 self-center">
        <div className="h-7 w-40 rounded-full bg-white/10" />
        <div className="h-8 w-2/3 rounded-full bg-white/10" />
        <div className="h-4 rounded-full bg-white/5" />
        <div className="h-4 w-5/6 rounded-full bg-white/5" />
      </div>
    </div>
  );
}

function NoEvents() {
  return (
    <FadeUp className="sj-card flex flex-col items-start gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-8">
      <p className="flex items-start gap-3 text-lg text-white/75">
        No events coming up right now - follow us for the latest announcements.
      </p>
      <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" className="sj-btn sj-btn-outline group shrink-0">
        Follow on Facebook <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
      </a>
    </FadeUp>
  );
}

export function Events() {
  const state = useEvents();

  return (
    <section id="events" className="relative scroll-mt-[var(--header-h)] overflow-x-clip border-t border-sj-line bg-sj-night py-24 md:py-32">
      <div aria-hidden="true" className="sj-glow pointer-events-none absolute -left-60 top-10 h-[640px] w-[640px]" />
      <div className="sj-container relative">
        <Heading eyebrow="Events" lines={["Coming", "up"]} yellowSameLine className="mb-12 md:mb-16" />

        <div aria-live="polite" aria-busy={state.status === "loading"}>
          {state.status === "loading" && <EventSkeleton />}

          {state.status === "ready" && state.events.length > 0 && (
            <div className="flex flex-col gap-12 md:gap-16">
              <FadeUp>
                <FeaturedEvent event={state.events[0]} />
              </FadeUp>

              {state.events.length > 1 && (
                <div className="flex flex-col gap-6">
                  <Eyebrow>Also coming up</Eyebrow>
                  <div className="grid items-start gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
                    {state.events.slice(1).map((e, i) => (
                      <FadeUp key={e.id} delay={(i % 4) * 0.06}>
                        <EventTile event={e} />
                      </FadeUp>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {(state.status === "error" || (state.status === "ready" && state.events.length === 0)) && <NoEvents />}
        </div>
      </div>
    </section>
  );
}
