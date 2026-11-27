import { IMG } from "./data";

/** A regular weekly Disco Bingo night. day: 0 = Sunday … 6 = Saturday. Times are HH:mm (24h). */
export type BingoNight = { day: number; startTime: string; endTime: string };

/** A one-off extra night added in the admin site, e.g. over Christmas. */
export type BingoExtraNight = { date: string; startTime: string; endTime: string };

/**
 * Which nights can be booked. Loaded from the API (set in the admin site) - see useBingoSchedule.
 * blocked = regular nights that aren't running (yyyy-mm-dd).
 */
export type BingoSchedule = { weekly: BingoNight[]; blocked: string[]; extra: BingoExtraNight[] };

/** Used until the API responds, or if it can't be reached: the regular Friday and Sunday nights. */
export const DEFAULT_BINGO_SCHEDULE: BingoSchedule = {
  weekly: [
    { day: 5, startTime: "19:00", endTime: "23:00" },
    { day: 0, startTime: "17:00", endTime: "21:00" }
  ],
  blocked: [],
  extra: []
}

export const BINGO_HERO = {
  title: "Disco",
  accent: "Bingo",
  body: "The ultimate music bingo experience! Grab your bingo cards, dabbers, and get ready for rounds of your favourite hits - from 80s classics to school disco anthems.",
  image: `${IMG}/disco-bingo-hero.png`,
  card: `${IMG}/disco-bingo-card.png`
}

export const BINGO_STEPS = [
  { title: "Cards & dabbers", body: "Every player gets their own bingo cards and a dabber." },
  { title: "Five themed rounds", body: "Play a book of five rounds, each with its own theme - 80s, School Disco, Pop Hits and more." },
  { title: "Hear it, see it", body: "Songs play over the speakers and go up on screen." },
  { title: "Dab it", body: "If the song's on your card, dab it." },
  { title: "Call bingo!", body: "First to fill their card calls bingo. Cards are verified, and the prize is split if there are multiple winners." },
  { title: "The pot grows", body: "Prize money increases every round." },
  { title: "Final round", body: "Buy additional bingo books before the final round to push the prize fund even higher." }
];

export type BasketMeal = { id: string; name: string; price: number };

/** Basket meal menu with prices (GBP). Quantities in the booking form are an indication only. */
export const BASKET_MEALS: BasketMeal[] = [
  { id: "prawn-tempura", name: "Prawn Tempura", price: 9.5 },
  { id: "fish-chips", name: "Fish & Chips", price: 9.5 },
  { id: "scampi", name: "Whole Tail Breaded Scampi", price: 9.5 },
  { id: "chicken-goujons", name: "Southern Fried Chicken Goujons", price: 9.5 },
  { id: "gf-chicken-goujons", name: "Gluten Free Chicken Goujons", price: 9.5 },
  { id: "spring-rolls", name: "Vegetarian Spring Rolls", price: 9.5 },
  { id: "falafel", name: "Sweet Potato Falafel", price: 9.5 },
  { id: "halloumi-fries", name: "Halloumi Fries", price: 9.5 },
  { id: "chips", name: "Chips", price: 5 },
  { id: "onion-rings", name: "Onion Rings", price: 5 }
];

export const MAX_GUESTS = 100;
