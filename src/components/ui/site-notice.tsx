"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSiteMessage, type MessagePlacement } from "../../lib/messages";
import { EASE_OUT } from "./motion";
import { StarMark } from "./ui";

/** A notice set in the admin site (Website Messages). Shows nothing when there isn't one. */
export function SiteNotice({ placement, className = "" }: { placement: MessagePlacement; className?: string }) {
  const message = useSiteMessage(placement);

  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.div
          role="note"
          className={`flex items-start gap-3 rounded-2xl border border-sj-yellow/40 bg-sj-yellow/[0.08] px-4 py-3.5 text-left text-[15px] leading-6 text-white backdrop-blur sm:px-5 ${className}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <StarMark size={18} className="mt-[3px]" />
          <p className="whitespace-pre-line">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
