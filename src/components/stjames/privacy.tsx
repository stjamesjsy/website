"use client";

import { motion } from "motion/react";
import { EASE_OUT, FadeUp } from "../ui/motion";
import { SiteShell } from "../ui/ui";

export function PrivacyPage() {
  return (
    <SiteShell>
      <section className="relative overflow-x-clip pb-24 pt-[calc(var(--header-h)+3rem)] md:pb-32 lg:pt-[calc(var(--header-h)+5rem)]">
        <div className="sj-container relative">
          <div className="mb-12 flex flex-col gap-6 md:mb-16">
            <div className="flex flex-col gap-6">
              <h1 className="sj-display flex gap-6 text-[clamp(2.5rem,7vw,6rem)] leading-[0.95] text-white">
                <span className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, ease: EASE_OUT, delay: 0.1 }}
                  >
                    Privacy
                  </motion.span>
                </span>

                <span className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block text-sj-yellow"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
                  >
                    Policy
                  </motion.span>
                </span>
              </h1>

              <FadeUp className="text-sm font-medium text-white/45">
                Last updated: 16 January 2025
              </FadeUp>
            </div>
          </div>

          <div className="relative">
            <div className="flex max-w-4xl flex-col gap-10">
              <FadeUp className="flex flex-col gap-4">
                <h2 className="text-xl font-extrabold text-white">
                  Information we collect
                </h2>

                <p className="leading-relaxed text-white/65">
                  Our website includes a contact form which allows us to
                  respond to your enquiries. The information you provide may
                  be used to get in touch with you or to manage bookings for
                  events such as Disco Bingo, Steak on the Stone, or Sunday
                  Lunch.
                </p>
              </FadeUp>

              <FadeUp className="flex flex-col gap-4">
                <h2 className="text-xl font-extrabold text-white">
                  Cookies and analytics
                </h2>

                <p className="leading-relaxed text-white/65">
                  We use Google Analytics to collect anonymous usage data,
                  such as page views and general visitor behaviour. This data
                  helps us understand how the site is used and improve the
                  user experience.
                </p>
              </FadeUp>

              <FadeUp className="flex flex-col gap-4">
                <h2 className="text-xl font-extrabold text-white">
                  Your consent
                </h2>

                <p className="leading-relaxed text-white/65">
                  By using this website and submitting the contact form, you
                  consent to the collection and use of your information as
                  described here, including the use of cookies by Google
                  Analytics in accordance with their privacy policies.
                </p>
              </FadeUp>

              <FadeUp className="flex flex-col gap-4">
                <h2 className="text-xl font-extrabold text-white">
                  Sharing your information
                </h2>

                <p className="leading-relaxed text-white/65">
                  We do not share your personal information with third parties
                  for marketing purposes. We also do not offer user accounts
                  or require sign-ups.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
