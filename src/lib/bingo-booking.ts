import { BASKET_MEALS, MAX_GUESTS, type BingoSchedule } from "./bingo-data";
import { formatTime } from "./events";

export type BingoBooking = {
  date: string;
  guests: number;
  name: string;
  email: string;
  phone: string;
  meals: Record<string, number>;
  notes: string;
}

export type BingoErrors = Partial<Record<"date" | "guests" | "name" | "email" | "phone" | "meals" | "notes", string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{7,20}$/;

export function toIsoDate(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function parseIsoDate(s: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const d = new Date(+m[1], +m[2] - 1, +m[3]);
  return toIsoDate(d) === s ? d : null;
}

/** The night's times if Disco Bingo is on that date (a regular night that isn't blocked, or an extra night). */
export function nightOn(d: Date, schedule: BingoSchedule): { startTime: string; endTime: string } | null {
  const iso = toIsoDate(d);
  const extra = schedule.extra.find((n) => n.date === iso);

  if (extra) {
    return extra;
  }
  if (schedule.blocked.includes(iso)) {
    return null;
  }
  return schedule.weekly.find((n) => n.day === d.getDay()) ?? null;
}

/** "7pm - 11pm" for the night on that date, or "" if there isn't one. */
export function nightTime(d: Date, schedule: BingoSchedule): string {
  const night = nightOn(d, schedule);
  return night ? `${formatTime(night.startTime)} - ${formatTime(night.endTime)}` : "";
}

export function isBookable(d: Date, today: Date, schedule: BingoSchedule): boolean {
  const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return day >= t && nightOn(day, schedule) !== null;
}

/** Narrow the API response into a BingoSchedule, or null if it doesn't look right. */
export function coerceSchedule(raw: unknown): BingoSchedule | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const r = raw as Record<string, unknown>;
  const TIME_RE = /^\d{2}:\d{2}$/;
  const isNight = (n: unknown): n is Record<string, unknown> =>
    !!n && typeof n === "object" && TIME_RE.test(String((n as Record<string, unknown>).startTime)) && TIME_RE.test(String((n as Record<string, unknown>).endTime));

  if (!Array.isArray(r.weekly) || !Array.isArray(r.blocked) || !Array.isArray(r.extra)) {
    return null;
  }

  return {
    weekly: r.weekly.filter(isNight).filter((n) => Number.isInteger(n.day)).map((n) => ({ day: n.day as number, startTime: n.startTime as string, endTime: n.endTime as string })),
    blocked: r.blocked.filter((d): d is string => typeof d === "string" && parseIsoDate(d) !== null),
    extra: r.extra.filter(isNight).filter((n) => typeof n.date === "string" && parseIsoDate(n.date) !== null).map((n) => ({ date: n.date as string, startTime: n.startTime as string, endTime: n.endTime as string })),
  }
}

export function validateBooking(b: BingoBooking, schedule: BingoSchedule, today = new Date()): BingoErrors {
  const e: BingoErrors = {};
  const date = parseIsoDate(b.date);

  if (!date) {
    e.date = "Pick a night.";
  } else if (!isBookable(date, today, schedule)) {
    e.date = "There's no Disco Bingo that night - pick one of the highlighted dates.";
  }

  if (!Number.isInteger(b.guests) || b.guests < 1) {
    e.guests = "At least one person, please.";
  } else if (b.guests > MAX_GUESTS) {
    e.guests = `For more than ${MAX_GUESTS} people, get in touch about a private event.`;
  }

  if (!b.name.trim()) {
    e.name = "Tell us who the booking is for.";
  } else if (b.name.length > 100) {
    e.name = "That name is a bit long.";
  }

  if (!EMAIL_RE.test(b.email.trim())) {
    e.email = "Enter a valid email address.";
  }

  if (!PHONE_RE.test(b.phone.trim())) {
    e.phone = "Enter a valid phone number.";
  }

  const ids = new Set(BASKET_MEALS.map((m) => m.id));

  for (const [id, qty] of Object.entries(b.meals)) {
    if (!ids.has(id) || !Number.isInteger(qty) || qty < 0 || qty > 200) {
      e.meals = "Check your meal quantities.";
      break;
    }
  }

  if (b.notes.length > 2000) {
    e.notes = "Keep it under 2000 characters.";
  }
  return e;
}

/** Narrow unknown JSON into a BingoBooking (type only - run validateBooking afterwards). */
export function coerceBooking(raw: unknown): BingoBooking | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const r = raw as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const meals: Record<string, number> = {}

  if (r.meals && typeof r.meals === "object") {
    for (const [k, v] of Object.entries(r.meals as Record<string, unknown>)) {
      if (typeof v === "number") {
        meals[k] = v;
      }
    }
  }

  return {
    date: str(r.date),
    guests: typeof r.guests === "number" ? r.guests : NaN,
    name: str(r.name),
    email: str(r.email),
    phone: str(r.phone),
    meals,
    notes: str(r.notes),
  }
}

export const formatGBP = (n: number) => `£${n.toFixed(2)}`;

/** Basket meals as readable lines for the booking email, e.g. "Fish & Chips: 2", in menu order. */
export function formatBasketMeals(meals: Record<string, number>): string {
  return BASKET_MEALS
    .filter((m) => (meals[m.id] ?? 0) > 0)
    .map((m) => `${m.name}: ${meals[m.id]}`)
    .join("\n") || "None selected";
}
