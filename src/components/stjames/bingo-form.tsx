"use client";

import { Check, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { coerceSchedule, formatBasketMeals, formatGBP, isBookable, nightTime, parseIsoDate, toIsoDate, validateBooking, type BingoBooking, type BingoErrors } from "../../lib/bingo-booking";
import { BASKET_MEALS, DEFAULT_BINGO_SCHEDULE, MAX_GUESTS, type BingoSchedule } from "../../lib/bingo-data";
import { formatTime } from "../../lib/events";
import { SITE } from "../../lib/data";
import { EASE_OUT } from "../ui/motion";
import { SiteNotice } from "../ui/site-notice";
import { formatPrettyDate, randomNumbers } from "@/lib/utils";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const LONG_DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SHORT_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const LABEL = "text-sm font-bold text-white";

/**
 * Which nights can be booked: the regular nights, minus any blocked in the admin site, plus any extra nights.
 * Starts with the regular Friday and Sunday nights so the calendar works straight away (or if the API is down).
 */
function useBingoSchedule(): BingoSchedule {
  const [schedule, setSchedule] = useState<BingoSchedule>(DEFAULT_BINGO_SCHEDULE);

  useEffect(() => {
    if (!SITE.bingoUrl) {
      return;
    }

    const controller = new AbortController();

    fetch(SITE.bingoUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Bingo request failed (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        const loaded = coerceSchedule(data);

        if (loaded) {
          setSchedule(loaded);
        }
      })
      .catch(() => {
        // Keep the regular nights
      });

    return () => controller.abort();
  }, []);

  return schedule;
}

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function longDate(d: Date) {
  return `${LONG_DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

function FieldError({ id, children }: { id: string; children?: string }) {
  return (
    <AnimatePresence initial={false}>
      {children && (
        <motion.p id={id} role="alert" className="text-sm text-red-300" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Stepper({ value, onChange, min, max, label, size = "lg" }: { value: number; onChange: (n: number) => void; min: number; max: number; label: string; size?: "lg" | "sm" }) {
  const lg = size === "lg";
  const btn = `sj-hit-44 flex ${lg ? "h-12 w-12" : "h-9 w-9"} shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-sj-yellow hover:bg-sj-yellow hover:text-sj-ink disabled:pointer-events-none disabled:opacity-25`;
  return (
    <div className={`inline-flex w-fit items-center gap-1 rounded-full ${lg ? "border border-white/12 bg-white/[0.03] p-1" : ""}`} role="group" aria-label={label}>
      <button type="button" className={btn} onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label={`Fewer - ${label}`}>
        <Minus size={lg ? 18 : 15} aria-hidden="true" />
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => {
          const n = Number.parseInt(e.target.value, 10);
          onChange(Number.isNaN(n) ? min : Math.min(max, Math.max(min, n)));
        }}
        className={`${lg ? "h-12 w-16 text-lg" : "h-9 w-10 text-base"} bg-transparent text-center font-bold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${value > 0 && !lg ? "text-sj-yellow" : ""}`}
      />
      <button type="button" className={btn} onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label={`More - ${label}`}>
        <Plus size={lg ? 18 : 15} aria-hidden="true" />
      </button>
    </div>
  );
}

function Calendar({ value, onChange, invalid, schedule }: { value: string; onChange: (iso: string) => void; invalid: boolean; schedule: BingoSchedule }) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const atFirst = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();

  const cells = useMemo(() => {
    const lead = (month.getDay() + 6) % 7;
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    return [...Array<null>(lead).fill(null), ...Array.from({ length: count }, (_, i) => new Date(month.getFullYear(), month.getMonth(), i + 1))];
  }, [month]);

  const shift = (n: number) => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + n, 1));
  const navBtn = "sj-hit-44 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-sj-yellow hover:text-sj-yellow disabled:opacity-25 disabled:hover:border-white/15 disabled:hover:text-white";

  return (
    <div className={`rounded-2xl border bg-white/[0.02] p-4 transition-colors sm:p-6 ${invalid ? "border-red-400/70" : "border-white/10"}`}>
      <div className="mb-5 flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} disabled={atFirst} aria-label="Previous month" className={navBtn}>
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <p className="text-lg font-extrabold text-white" aria-live="polite">
          {MONTHS[month.getMonth()]} <span className="font-normal text-white/50">{month.getFullYear()}</span>
        </p>
        <button type="button" onClick={() => shift(1)} aria-label="Next month" className={navBtn}>
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2" role="group" aria-label="Choose a date">
        {DAYS.map((d) => (
          <span key={d} aria-hidden="true" className="pb-1 text-center text-xs font-semibold uppercase tracking-wider text-white/40">
            {d}
          </span>
        ))}
        {cells.map((d, i) => {
          if (!d) return <span key={`blank-${i}`} />;
          const iso = toIsoDate(d);
          const ok = isBookable(d, today, schedule);
          const selected = iso === value;
          return (
            <button
              key={iso}
              type="button"
              disabled={!ok}
              aria-pressed={selected}
              aria-label={`${longDate(d)}${ok ? ` - ${nightTime(d, schedule)}` : " — unavailable"}`}
              onClick={() => onChange(iso)}
              className={`relative flex h-11 items-center justify-center rounded-xl sm:h-12 text-sm font-bold transition-all sm:text-base ${selected
                ? "scale-105 bg-sj-yellow text-sj-ink shadow-[0_6px_24px_-6px_rgba(255,222,89,0.7)]"
                : ok
                  ? "bg-white/[0.06] text-white ring-1 ring-inset ring-sj-yellow/40 hover:bg-sj-yellow/15 hover:ring-sj-yellow"
                  : "text-white/20"
                }`}
            >
              {d.getDate()}
              {ok && !selected && <span aria-hidden="true" className="absolute bottom-1.5 h-1 w-1 rounded-full bg-sj-yellow" />}
            </button>
          );
        })}
      </div>
      <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/55">
        {schedule.weekly.map((n) => (
          <span key={n.day}>
            <span className="font-semibold text-white">{SHORT_DAYS[n.day]}</span> {formatTime(n.startTime)} – {formatTime(n.endTime)}
          </span>
        ))}
      </p>
    </div>
  );
}

function Field({ label, htmlFor, error, errorId, hint, children }: { label: string; htmlFor?: string; error?: string; errorId: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5">
      {htmlFor ? (
        <label htmlFor={htmlFor} className={LABEL}>
          {label}
        </label>
      ) : (
        <p className={LABEL}>{label}</p>
      )}
      {hint && <p className="-mt-1 text-sm leading-6 text-white/55">{hint}</p>}
      {children}
      <FieldError id={errorId}>{error}</FieldError>
    </div>
  );
}

function StepTitle({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sj-yellow text-sm font-black text-sj-ink">{n}</span>
      <h3 className="text-xl font-extrabold text-white">{children}</h3>
    </div>
  );
}

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent"; booking: BingoBooking } | { kind: "error"; message: string };

const EMPTY_MEALS = Object.fromEntries(BASKET_MEALS.map((m) => [m.id, 0])) as Record<string, number>;

export function BingoBookingForm() {
  const uid = useId();
  const schedule = useBingoSchedule();
  const [pickedDate, setDate] = useState("");
  // A night picked before the schedule loaded may turn out to be blocked, so it's dropped
  const picked = parseIsoDate(pickedDate);
  const date = picked && isBookable(picked, new Date(), schedule) ? pickedDate : "";
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [meals, setMeals] = useState<Record<string, number>>(EMPTY_MEALS);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<BingoErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const mealCount = Object.values(meals).reduce((a, b) => a + b, 0);
  const mealTotal = BASKET_MEALS.reduce((sum, m) => sum + m.price * (meals[m.id] ?? 0), 0);
  const selectedDate = date ? new Date(`${date}T12:00:00`) : null;

  const booking: BingoBooking = { date, guests, name, email, phone, meals, notes };


  const clear = (key: keyof BingoErrors) => errors[key] && setErrors((e) => ({ ...e, [key]: undefined }));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateBooking(booking, schedule);
    setErrors(found);

    if (Object.keys(found).length) {
      const first = (["date", "guests", "name", "email", "phone", "meals", "notes"] as const).find((k) => found[k]);
      document.getElementById(`${uid}-${first}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus({ kind: "sending" });

    try {
      const res = await fetch(SITE.contactFormUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `New Disco Bingo Booking (${randomNumbers()})`,
          type: "stjames-booking",

          "Booking Type": "Disco Bingo",
          "Date": formatPrettyDate(booking.date),
          "Number of People": booking.guests,
          "Name": booking.name,
          "Email": booking.email,
          "Phone Number": booking.phone,
          "Basket Meals": formatBasketMeals(booking.meals),
          "Additional Details": booking.notes,
        }),
      });

      const data = (await res.json().catch(() => ({})));
      
      if (res.ok && data?.success !== false) {
        setStatus({ kind: "sent", booking });
        return;
      }

      setStatus({ kind: "error", message: data.error ?? "Please check the highlighted fields." });
    } catch {
      setStatus({ kind: "error", message: "We couldn't send your booking." });
    }
  }

  function reset() {
    setDate("");
    setGuests(2);
    setMeals(EMPTY_MEALS);
    setNotes("");
    setErrors({});
    setStatus({ kind: "idle" });
  }

  if (status.kind === "sent") {
    const b = status.booking;
    const d = new Date(`${b.date}T12:00:00`);
    return (
      <motion.div
        className="sj-card relative flex flex-col items-start gap-8 overflow-hidden p-6 sm:p-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        role="status"
      >
        <motion.span
          className="flex h-16 w-16 items-center justify-center rounded-full bg-sj-yellow text-sj-ink"
          initial={{ scale: 0.4, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
        >
          <Check size={30} strokeWidth={3} aria-hidden="true" />
        </motion.span>
        <div className="relative flex flex-col gap-6">
          <h3 className="sj-h2 text-white">
            Booking sent
          </h3>
          <p className="max-w-lg text-lg leading-8 text-white/80">
            Thanks {b.name.trim().split(" ")[0]} - we've got your request for {b.guests} {b.guests === 1 ? "person" : "people"} on {longDate(d)} ({nightTime(d, schedule)}). We'll confirm your table by
            email at <span className="text-white">{b.email.trim()}</span>.
          </p>
        </div>
        <button type="button" onClick={reset} className="sj-btn sj-btn-outline">
          Make another booking
        </button>
      </motion.div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <form noValidate onSubmit={submit} className="sj-card flex flex-col gap-10 p-5 sm:p-8 lg:p-10" aria-describedby={`${uid}-status`}>
      <SiteNotice placement="bingo" className="-mb-4" />
      <section className="flex flex-col gap-6" aria-labelledby={`${uid}-s1`}>
        <span id={`${uid}-s1`} className="contents">
          <StepTitle n={1}>Pick your night</StepTitle>
        </span>
        <div id={`${uid}-date`}>
          <Field label="Date" error={errors.date} errorId={`${uid}-date-error`}>
            <Calendar
              schedule={schedule}
              value={date}
              invalid={!!errors.date}
              onChange={(iso) => {
                setDate(iso);
                clear("date");
              }}
            />
          </Field>
        </div>
        <div id={`${uid}-guests`}>
          <Field label="Number of people" error={errors.guests} errorId={`${uid}-guests-error`}>
            <Stepper
              value={guests}
              min={1}
              max={MAX_GUESTS}
              label="Number of people"
              onChange={(n) => {
                setGuests(n);
                clear("guests");
              }}
            />
          </Field>
        </div>
      </section>

      <section className="flex flex-col gap-6 border-t border-white/10 pt-10">
        <StepTitle n={2}>Your details</StepTitle>
        <div className="grid gap-6 md:grid-cols-2">
          <div id={`${uid}-name`} className="md:col-span-2">
            <Field label="Name" htmlFor={`${uid}-name-input`} error={errors.name} errorId={`${uid}-name-error`}>
              <input
                id={`${uid}-name-input`}
                className="sj-input"
                autoComplete="name"
                value={name}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                onChange={(e) => {
                  setName(e.target.value);
                  clear("name");
                }}
              />
            </Field>
          </div>
          <div id={`${uid}-email`}>
            <Field label="Email" htmlFor={`${uid}-email-input`} error={errors.email} errorId={`${uid}-email-error`}>
              <input
                id={`${uid}-email-input`}
                type="email"
                className="sj-input"
                autoComplete="email"
                value={email}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clear("email");
                }}
              />
            </Field>
          </div>
          <div id={`${uid}-phone`}>
            <Field label="Phone number" htmlFor={`${uid}-phone-input`} error={errors.phone} errorId={`${uid}-phone-error`}>
              <input
                id={`${uid}-phone-input`}
                type="tel"
                className="sj-input"
                autoComplete="tel"
                value={phone}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? `${uid}-phone-error` : undefined}
                onChange={(e) => {
                  setPhone(e.target.value);
                  clear("phone");
                }}
              />
            </Field>
          </div>
        </div>
      </section>

      <section id={`${uid}-meals`} className="flex flex-col gap-5 border-t border-white/10 pt-10">
        <StepTitle n={3}>Basket meals</StepTitle>
        <p className="-mt-2 text-sm leading-6 text-white/55">
          Optional - just a heads-up for the kitchen on bigger tables. All payment and final orders are taken on the night. Add how many of each your group fancies.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {BASKET_MEALS.map((m) => {
            const qty = meals[m.id] ?? 0;
            return (
              <li
                key={m.id}
                className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2.5 transition-colors ${qty ? "border-sj-yellow/50 bg-sj-yellow/[0.06]" : "border-white/8 bg-white/[0.02]"}`}
              >
                <span className="flex min-w-0 flex-col">
                  <span className="text-[15px] font-semibold leading-5 text-white">{m.name}</span>
                  <span className="text-sm text-white/50">{formatGBP(m.price)}</span>
                </span>
                <Stepper
                  size="sm"
                  value={qty}
                  min={0}
                  max={200}
                  label={m.name}
                  onChange={(n) => {
                    setMeals((prev) => ({ ...prev, [m.id]: n }));
                    clear("meals");
                  }}
                />
              </li>
            );
          })}
        </ul>
        <p className="flex items-center justify-between rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-white/60" aria-live="polite">
          <span>
            {mealCount} {mealCount === 1 ? "meal" : "meals"}
          </span>
          <span>
            Approx. <span className="font-bold text-sj-yellow">{formatGBP(mealTotal)}</span> · paid on the night
          </span>
        </p>
        <FieldError id={`${uid}-meals-error`}>{errors.meals}</FieldError>
      </section>

      <section id={`${uid}-notes`} className="flex flex-col gap-5 border-t border-white/10 pt-10">
        <StepTitle n={4}>Anything else?</StepTitle>
        <Field label="Additional details (optional)" htmlFor={`${uid}-notes-input`} error={errors.notes} errorId={`${uid}-notes-error`}>
          <textarea
            id={`${uid}-notes-input`}
            rows={4}
            className="sj-input h-auto resize-y py-3 leading-7"
            placeholder="Celebrating something? Accessibility or dietary needs?"
            value={notes}
            aria-invalid={!!errors.notes}
            onChange={(e) => {
              setNotes(e.target.value);
              clear("notes");
            }}
          />
        </Field>
      </section>

      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-sj-night/60 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <p className="text-sm leading-6 text-white/60">
          {selectedDate ? (
            <>
              <span className="font-bold text-white">{longDate(selectedDate)}</span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> · </span>
              {nightTime(selectedDate, schedule)} · {guests} {guests === 1 ? "person" : "people"}
            </>
          ) : (
            "Choose a night to continue."
          )}
        </p>
        <button type="submit" disabled={sending} className="sj-btn sj-btn-solid h-14 w-full px-10 text-base disabled:cursor-wait disabled:opacity-70 sm:w-auto">
          {sending ? "Sending…" : "Request booking"}
        </button>
      </div>

      <div id={`${uid}-status`} aria-live="assertive">
        {status.kind === "error" && (
          <p className="rounded-xl border border-red-400/50 bg-red-500/10 px-4 py-3 text-sm leading-6 text-white">
            {status.message} You can also email{" "}
            <a href={`mailto:${SITE.bookingsEmail}?subject=Disco%20Bingo%20booking`} className="font-semibold text-sj-yellow underline underline-offset-2">
              {SITE.bookingsEmail}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}


