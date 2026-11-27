"use client";

import { useEffect, useState } from "react";
import { SITE } from "./data";

/** Where a message can be shown. popup = popup on the home page (HTML), bingo = top of the disco bingo booking form (plain text). */
export type MessagePlacement = "popup" | "bingo";

/**
 * A message set in the admin site for this place on the website, or null if there isn't one (or the API can't be
 * reached). popup is HTML (sanitise before showing), bingo is plain text (keep its line breaks).
 */
export function useSiteMessage(placement: MessagePlacement): string | null {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!SITE.messagesUrl) {
      return;
    }

    const controller = new AbortController();

    fetch(SITE.messagesUrl, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Messages request failed (${res.status})`);
        }
        return res.json();
      })
      .then((data) => {
        const value = data && typeof data === "object" ? (data as Record<string, unknown>)[placement] : null;
        setMessage(typeof value === "string" && value.trim() ? value.trim() : null);
      })
      .catch(() => {
        // No message
      });

    return () => controller.abort();
  }, [placement]);

  return message;
}
