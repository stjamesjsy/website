import { IMG } from "./data";

/** Days of the week Disco Bingo runs (0 = Sunday … 6 = Saturday) and their session times. */
export const BINGO_SESSIONS: Record<number, { day: string; time: string }> = {
  5: { day: "Friday", time: "7pm - 11pm" },
  0: { day: "Sunday", time: "5pm - 9pm" }
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
