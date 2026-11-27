"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { sanitizeDescription } from "../../lib/events";
import { useSiteMessage } from "../../lib/messages";
import { EASE_OUT } from "./motion";

const STORAGE_KEY = "sj-popup-dismissed";

/** Short fingerprint of the message, so changing it in the admin site shows it to everyone again. */
function fingerprint(text: string): string {
  let hash = 5381;

  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) + hash + text.charCodeAt(i)) | 0;
  }
  return (hash >>> 0).toString(36);
}

function wasDismissed(key: string): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === key;
  } catch {
    return false;
  }
}

function rememberDismissed(key: string) {
  try {
    localStorage.setItem(STORAGE_KEY, key);
  } catch {
    // Private browsing etc - it'll just show again next time
  }
}

/**
 * The popup set in the admin site (Website Messages → Popup). Each visitor sees it until they close it, then not again
 * unless the message changes.
 */
export function PopupMessage() {
  const html = useSiteMessage("popup");
  const clean = useMemo(() => (html ? sanitizeDescription(html) : ""), [html]);
  const key = useMemo(() => (clean ? fingerprint(clean) : ""), [clean]);
  const [closedKey, setClosedKey] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = !!key && closedKey !== key && !wasDismissed(key);

  function close() {
    rememberDismissed(key);
    setClosedKey(key);
  }

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const overflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div className="absolute inset-0 bg-sj-night/75 backdrop-blur-sm" onClick={close} aria-hidden="true" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Message from St James"
            className="sj-card relative flex max-h-[85svh] w-full max-w-lg flex-col overflow-hidden"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.45 }}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="sj-hit-44 absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-sj-card/80 text-white transition-colors hover:border-sj-yellow hover:text-sj-yellow"
            >
              <X size={18} aria-hidden="true" />
            </button>

            <div
              className="sj-rich overflow-y-auto p-6 pr-16 text-white/80 sm:p-8 sm:pr-16 [&_h1]:text-3xl [&_h1]:font-extrabold [&_h1]:leading-tight [&_h1]:text-white [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:text-white [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_hr]:border-white/10 [&_img]:h-auto [&_img]:max-w-full [&_img]:rounded-xl"
              dangerouslySetInnerHTML={{ __html: clean }}
            />

            <div className="border-t border-white/10 p-4 sm:px-8">
              <button type="button" onClick={close} className="sj-btn sj-btn-solid h-12 w-full">
                Got it
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
