"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { validateContact, type ContactErrors, type ContactMessage } from "../../lib/contact";
import { SITE } from "../../lib/data";
import { EASE_OUT } from "../ui/motion";
import { randomNumbers } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ source, defaultSubject = "", submitLabel = "Send message" }: { source: string; defaultSubject?: string; submitLabel?: string }) {
  const uid = useId();
  const [form, setForm] = useState<ContactMessage>({ name: "", email: "", subject: defaultSubject, message: "", source });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  const set = (k: keyof ContactMessage) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateContact(form);
    setErrors(found);

    if (Object.keys(found).length) {
      const first = (["name", "email", "subject", "message"] as const).find((k) => found[k]);
      document.getElementById(`${uid}-${first}`)?.focus();
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch(SITE.contactFormUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `New website submission (${randomNumbers()})`,
          type: "stjames",

          "Name": form.name,
          "Email": form.email,
          "Subject": form.subject,
          "Message": form.message
        }),
      });

      const data = (await res.json().catch(() => ({})));

      if (res.ok && data?.success !== false) {
        setStatus("sent");
        return;
      }
      
      setServerError(data.error ?? "Please check the highlighted fields.");
      setStatus("error");
    } catch {
      setServerError("We couldn't send your message.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <motion.div className="flex flex-col items-start gap-5 py-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE_OUT }} role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sj-yellow text-sj-ink">
          <Check size={26} strokeWidth={3} aria-hidden="true" />
        </span>
        <h3 className="sj-h3 text-white">Message sent - thanks {form.name.trim().split(" ")[0]}!</h3>
        <p className="text-white/70">We'll get back to you at {form.email.trim()} as soon as we can.</p>
        <button
          type="button"
          className="sj-btn sj-btn-ghost"
          onClick={() => {
            setForm({ name: "", email: "", subject: defaultSubject, message: "", source });
            setStatus("idle");
          }}
        >
          Send another
        </button>
      </motion.div>
    );
  }

  const field = (k: keyof ContactMessage, label: string, input: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => React.ReactNode, span = false) => (
    <div className={`flex flex-col gap-2.5 ${span ? "sm:col-span-2" : ""}`}>
      <label htmlFor={`${uid}-${k}`} className="text-sm font-bold text-white">
        {label}
      </label>
      {input({ id: `${uid}-${k}`, "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${uid}-${k}-err` : undefined })}
      <AnimatePresence initial={false}>
        {errors[k] && (
          <motion.p id={`${uid}-${k}-err`} role="alert" className="text-sm text-red-300" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {errors[k]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <form noValidate onSubmit={submit} className="grid gap-6 sm:grid-cols-2">
      {field("name", "Name", (p) => <input {...p} className="sj-input" autoComplete="name" value={form.name} onChange={(e) => set("name")(e.target.value)} />)}
      {field("email", "Email", (p) => <input {...p} type="email" className="sj-input" autoComplete="email" value={form.email} onChange={(e) => set("email")(e.target.value)} />)}
      {field("subject", "Subject", (p) => <input {...p} className="sj-input" value={form.subject} onChange={(e) => set("subject")(e.target.value)} />, true)}
      {field(
        "message",
        "Message",
        (p) => <textarea {...p} rows={5} className="sj-input h-auto resize-y py-3 leading-7" value={form.message} onChange={(e) => set("message")(e.target.value)} />,
        true,
      )}
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/45">
          Or email us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-sj-yellow hover:underline">
            {SITE.email}
          </a>
        </p>
        <button type="submit" disabled={status === "sending"} className="sj-btn sj-btn-solid group w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto">
          {status === "sending" ? "Sending…" : submitLabel}
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-400/50 bg-red-500/10 px-4 py-3 text-sm text-white sm:col-span-2">
          {serverError} You can email us directly at{" "}
          <a href={`mailto:${SITE.email}`} className="font-semibold text-sj-yellow underline">
            {SITE.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
