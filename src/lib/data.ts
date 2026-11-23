export const IMG = "/images";
export const LIVE = "https://stjamesjersey.com";

export type NavItem = { label: string; href: string }

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Disco Bingo", href: "/disco-bingo" },
  { label: "Venue Hire", href: "/venue-hire" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/#contact" }
];

export const SITE = {
  name: "St James",
  address: ["5 Rue de Funchal", "St Helier", "JE2 4TT"],
  addressLine: "5 Rue de Funchal, St Helier, JE2 4TT",
  email: "hello@stjamesjersey.com",
  bookingsEmail: "bookings@stjamesjersey.com",
  instagram: "https://instagram.com/stjamesjersey",
  facebook: "https://facebook.com/StJamesJsy",
  privacy: `/privacy`,
  maps: "https://www.google.com/maps/search/?api=1&query=St+James+5+Rue+de+Funchal+St+Helier+Jersey+JE2+4TT",
  mapEmbed: "https://www.google.com/maps?q=5+Rue+de+Funchal,+St+Helier,+Jersey+JE2+4TT&output=embed",
  brochure: `/files/CorporateBrochure-August2026.pdf`,
  foodMenu: `/files/FoodMenu-June2026.pdf`,
  wineMenu: `/files/WineMenu-June2026.pdf`,
  contactFormUrl: "https://mailer.glitch.je/api/contact",
  /** Set in .env - see .env.example. */
  eventsUrl: process.env.NEXT_PUBLIC_EVENTS_URL as string
}

export const OPENING_HOURS: [string, string][] = [
  ["Every day", "7:30pm - 2am"],
  ["Friday", "From 5pm for Disco Bingo"]
];

export type Night = {
  id: string;
  title: string;
  /** Monday-first weekday indexes (0 = Mon … 6 = Sun) the night runs on. */
  dayIdx: number[];
  /** One-line summary for the line-up row. */
  line: string;
  days: string;
  when: string;
  intro: string;
  body: string;
  note: string;
  image: string;
  cta?: { label: string; href: string }[];
}

export const NIGHTS: Night[] = [
  {
    id: "disco-bingo",
    title: "Disco Bingo",
    dayIdx: [4, 6],
    line: "Music bingo with prizes, from 80s classics to school disco anthems",
    days: "Fri & Sun",
    when: "Fri 7pm - 11pm · Sun 5pm - 9pm",
    intro: "The ultimate music bingo experience!",
    body: "Grab your bingo cards, dabbers, and get ready for rounds of your favourite hits - from 80s classics to school disco anthems.",
    note: "Basket meals & deals available - booking required.",
    image: `${IMG}/disco-bingo-card.png`,
    cta: [
      { label: "Book a table", href: "/disco-bingo#book" },
      { label: "More info", href: "/disco-bingo" }
    ]
  },
  {
    id: "karaoke",
    title: "Late Night Karaoke",
    dayIdx: [3, 5, 6],
    line: "Grab the mic til 2am - no booking required",
    days: "Thu, Sat & Sun",
    when: "11pm - 2am",
    intro: "St James is the home of Late Night Karaoke!",
    body: "Every Thursday, Saturday & Sunday from 11pm until 2am. Grab the mic, pick your song and own the room.",
    note: "No booking required. What will you sing?",
    image: `${IMG}/karaoke-card.png`
  },
  {
    id: "dj-moony",
    title: "DJ Moony",
    dayIdx: [4],
    line: "Charts, house, club classics, Afrobeats, R&B and DNB - free entry",
    days: "Friday",
    when: "From 11pm",
    intro: "Join us every Friday from 11pm with our resident DJ.",
    body: "DJ Moony plays the best of many genres including Charts, House, Club Classics, Afrobeats, R&B and DNB!",
    note: "Free entry all night.",
    image: `${IMG}/dj-moony-card.png`
  }
];

/** What runs on each night of the week (Monday first). */
export const WEEK: { day: string; short: string; acts: { name: string; time: string; id: string }[] }[] = [
  { day: "Monday", short: "Mon", acts: [] },
  { day: "Tuesday", short: "Tue", acts: [] },
  { day: "Wednesday", short: "Wed", acts: [] },
  {
    day: "Thursday",
    short: "Thu",
    acts: [
      { name: "Karaoke", time: "11pm - 2am", id: "karaoke" }
    ]
  },
  {
    day: "Friday",
    short: "Fri",
    acts: [
      { name: "Disco Bingo", time: "7pm - 11pm", id: "disco-bingo" },
      { name: "DJ Moony", time: "11pm - late", id: "dj-moony" }
    ]
  },
  {
    day: "Saturday",
    short: "Sat",
    acts: [
      { name: "Karaoke", time: "11pm - 2am", id: "karaoke" }
    ]
  },
  {
    day: "Sunday",
    short: "Sun",
    acts: [
      { name: "Disco Bingo", time: "5pm - 9pm", id: "disco-bingo" },
      { name: "Karaoke", time: "11pm - 2am", id: "karaoke" }
    ]
  }
];

export const TICKER = [];

export const VENUE = {
  intro: [
    "Looking for a great venue in the heart of St Helier? St James is a versatile space that's perfect for all kinds of events - from birthday parties and work socials to live music and DJ nights.",
    "Located at 5 Rue de Funchal, St Helier, we're just a short walk away from the town centre."
  ],
  facts: [
    { title: "Prime Location", body: "Central St Helier, near Minden Place car park" },
    { title: "Licensed Hours", body: "11am - 2am, 7 days a week (we usually open from 7:30pm)" }
  ],
  room: {
    eyebrow: "Upstairs at St James",
    title: "The Function Room",
    body: "Our premier hire space - ideal for private events any day of the week (except Friday & Sunday). Perfect for bands, DJ events, birthdays & more!",
    capacity: 90,
    features: [
      "Maximum 90 guests",
      "Fully air conditioned throughout",
      "Stage",
      "Private bar",
      "Sound & lighting system",
      "Customisable space",
      "Free Wi-Fi available",
      "DJ booth",
      "Buffet available upon request"
    ]
  },
  // image: `${IMG}/venue-front.png`,
  image: `${IMG}/disco-bingo-hero.png`
};

export type Faq = { q: string; a: string[]; list?: string[]; after?: string[]; link?: { label: string; href: string } }

export const FAQS: Faq[] = [
  { q: "Is there an age restriction?", a: ["18+ (unless stated otherwise). ID may be required."] },
  { q: "Where are you located?", a: ["We are located at 5 Rue de Funchal, St Helier, JE2 4TT, near Minden Place car park."] },
  {
    q: "What is the dress code?",
    a: ["The dress code is smart casual."],
    list: ["No joggers or informal shorts (Thursday - Sunday only)", "No hats", "No football shirts", "No dirty work clothes"]
  },
  { q: "Is there parking nearby?", a: ["Yes - Minden Place multi-storey car park is less than a minute's walk around the corner."] },
  { q: "What are your opening hours?", a: ["Our normal opening hours are 7:30pm - 2am, every day!", "On Friday, we open at 5pm for Disco Bingo (booking required)."] },
  {
    q: "I'm a promoter and I'd like to book an event",
    a: ["Great! We offer our upstairs room for events. Please check out our Venue Hire page and get in touch."],
    link: { label: "Venue Hire", href: "/venue-hire" }
  },
  { q: "Do you accept event bookings outside of normal hours?", a: ["Please contact us - depending on the event this may be possible."], link: { label: "Contact us", href: "/#contact" } },
  { q: "Do you have a cloakroom?", a: ["Unfortunately we do not."] },
  { q: "Do you have free Wi-Fi?", a: ["Yes! The details can be found at the bar - ask the bar staff if you need help."] },
  {
    q: "What entertainment do you offer?",
    a: [],
    list: ["Karaoke every Thursday, Saturday & Sunday", "Disco Bingo every Friday & Sunday", "Live DJ every Friday"]
  },
  { q: "Can I vape inside?", a: ["Yes! No smoking, though."] },
  { q: "I've left something in St James, how can I get it back?", a: ["You can come in any day from 7:30pm, or contact us."], link: { label: "Contact us", href: "/#contact" } },
  {
    q: "What forms of ID do you accept?",
    a: ["We accept the following:"],
    list: ["Full Jersey driving licence", "Passport"],
    after: ["We do not accept provisional licences or out-of-date forms of ID. We also do not accept photocopies, digital images or screenshots."]
  }
];
