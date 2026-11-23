import DOMPurify from "isomorphic-dompurify";

// Links from the admin editor open in a new tab - make sure they can't reach back into this page.
DOMPurify.addHook("afterSanitizeAttributes", (node) => {
  if (node.tagName === "A" && node.getAttribute("target") === "_blank") {
    node.setAttribute("rel", "noopener noreferrer");
  }
});

export type SiteEvent = {
  id: string;
  createdAt: string;
  siteId: string;
  name: string;
  /** yyyy-mm-dd */
  date: string;
  /** HH:mm (24h) */
  startTime: string;
  /** HH:mm (24h) - may be past midnight, e.g. "01:20". */
  endTime: string;
  image: string | null;
  imageWidth: number | null;
  imageHeight: number | null;
  /** Rich-text HTML written in the admin site. */
  description: string;
}

/** Parses yyyy-mm-dd as a local date, so it doesn't shift a day in timezones behind UTC. */
export function eventDate(e: SiteEvent): Date {
  const [y, m, d] = e.date.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function isToday(e: SiteEvent, now = new Date()): boolean {
  return eventDate(e).toDateString() === now.toDateString();
}

/** "16:25" → "4:25pm", "21:00" → "9pm" - matches the copy style used across the site. */
export function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);

  if (Number.isNaN(h)) {
    return t;
  }

  const suffix = h < 12 ? "am" : "pm";
  const hour = h % 12 || 12;

  return m ? `${hour}:${String(m).padStart(2, "0")}${suffix}` : `${hour}${suffix}`;
}

export function formatTimeRange(e: SiteEvent): string {
  return e.endTime ? `${formatTime(e.startTime)} - ${formatTime(e.endTime)}` : `From ${formatTime(e.startTime)}`;
}

/** Strips anything unsafe from the admin-written description before it's rendered as HTML. */
export function sanitizeDescription(html: string): string {
  return DOMPurify.sanitize(html, { ADD_ATTR: ["target"] });
}
