import Link from "next/link";
import { NAV_ITEMS, OPENING_HOURS, SITE } from "../../lib/data";
import { Logo } from "./header";
import { FacebookIcon, InstagramIcon } from "./icons";

const HEAD = "mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-sj-yellow";
const LINK = "text-white/75 transition-colors hover:text-sj-yellow";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-sj-line bg-sj-night">
      <div className="sj-container relative grid gap-12 py-16 md:grid-cols-2 md:py-20 lg:grid-cols-12">
        <div className="flex flex-col gap-6 lg:col-span-4">
          <Logo className="h-9 w-fit md:h-12" />
          <p className="max-w-xs text-white/60">Karaoke &bull; Disco Bingo &bull; Nightclub. Your night starts here.</p>

          <div className="flex gap-2">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="St James on Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-sj-yellow hover:bg-sj-yellow hover:text-sj-ink">
              <InstagramIcon size={18} />
            </a>
            <a href={SITE.facebook} target="_blank" rel="noopener noreferrer" aria-label="St James on Facebook" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:border-sj-yellow hover:bg-sj-yellow hover:text-sj-ink">
              <FacebookIcon size={18} />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <p className={HEAD}>Explore</p>

          <ul className="flex flex-col gap-3">
            {NAV_ITEMS.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={LINK}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <p className={HEAD}>Opening hours</p>

          <dl className="flex flex-col gap-3">
            {OPENING_HOURS.map(([d, h]) => (
              <div key={d} className="flex flex-col">
                <dt className="font-semibold text-white">{d}</dt>
                <dd className="text-white/60">{h}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-3">
          <p className={HEAD}>Find us</p>

          <address className="flex flex-col gap-3 not-italic">
            <a href={SITE.maps} target="_blank" rel="noopener noreferrer" className={LINK}>
              {SITE.address.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </a>
            <span className="flex flex-col">
              <a href={`mailto:${SITE.email}`} className="text-sj-yellow hover:underline">
                {SITE.email}
              </a>
              <span className="text-sm text-white/45">General enquiries</span>
            </span>
            <span className="flex flex-col">
              <a href={`mailto:${SITE.bookingsEmail}`} className="text-sj-yellow hover:underline">
                {SITE.bookingsEmail}
              </a>
              <span className="text-sm text-white/45">Bingo bookings only</span>
            </span>
          </address>
        </div>
      </div>
      <div className="border-t border-sj-line">
        <div className="sj-container flex flex-col gap-3 py-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} St James. All rights reserved.</p>
          <a href={SITE.privacy} className="transition-colors hover:text-sj-yellow">
            Privacy policy
          </a>
        </div>
      </div>
    </footer>
  );
}
