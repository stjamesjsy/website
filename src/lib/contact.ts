export type ContactMessage = { name: string; email: string; subject: string; message: string; source: string };
export type ContactErrors = Partial<Record<keyof ContactMessage, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(m: ContactMessage): ContactErrors {
  const e: ContactErrors = {}

  if (!m.name.trim()) {
    e.name = "Tell us your name.";
  } else if (m.name.length > 100) {
    e.name = "That name is a bit long.";
  }

  if (!EMAIL_RE.test(m.email.trim())) {
    e.email = "Enter a valid email address.";
  }

  if (!m.subject.trim()) {
    e.subject = "Add a subject.";
  } else if (m.subject.length > 150) {
    e.subject = "Keep the subject under 150 characters.";
  }

  if (m.message.trim().length < 10) {
    e.message = "Tell us a little more (at least 10 characters).";
  } else if (m.message.length > 4000) {
    e.message = "Keep it under 4000 characters.";
  }
  return e;
}

export function coerceContact(raw: unknown): ContactMessage | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const r = raw as Record<string, unknown>;
  const s = (v: unknown) => (typeof v === "string" ? v : "");

  return {
    name: s(r.name),
    email: s(r.email),
    subject: s(r.subject),
    message: s(r.message),
    source: s(r.source).slice(0, 60)
  }
}
