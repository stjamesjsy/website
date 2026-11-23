import { BASKET_MEALS, BINGO_SESSIONS, MAX_GUESTS } from "./bingo-data";

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

export function isBookable(d: Date, today: Date): boolean {
  const day = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return day >= t && d.getDay() in BINGO_SESSIONS;
}

export function validateBooking(b: BingoBooking, today = new Date()): BingoErrors {
  const e: BingoErrors = {};
  const date = parseIsoDate(b.date);

  if (!date) {
    e.date = "Pick a Friday or Sunday.";
  } else if (!isBookable(date, today)) {
    e.date = "Disco Bingo runs on Fridays and Sundays - pick an upcoming one.";
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
