import { FormEvent, useState } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

const submitUrl = "https://formsubmit.co/ajax/22df9bd1beabb23825d1afb4c0ce1f66";

enum SubmitState {
    Idle,
    Submitting,
    Success,
    Error
}

function randomNumbers() {
    const nums = new Set();
    while (nums.size < 6) {
        nums.add(Math.floor(Math.random() * 49) + 1);
    }
}

export function ContactForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [state, setState] = useState<SubmitState>(SubmitState.Idle);

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();

        if (state === SubmitState.Submitting) {
            return;
        }

        setState(SubmitState.Submitting);

        try {
            const response = await fetch(submitUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    _subject: `New website submission (${randomNumbers()})`,
                    name,
                    email,
                    subject,
                    message
                })
            });

            const data = await response.json();

            if (data.success !== "false") {
                console.log("Contact form submitted successfuly", data);

                setState(SubmitState.Success);
            } else {
                console.log("Error submitting contact form", data);
                setState(SubmitState.Error);
            }
        } catch (e) {
            console.error("Error submitting contact form", e);
            setState(SubmitState.Error);
        }
    }

    return (
        <form className={styles.contactForm} onSubmit={submitForm}>
            {state === SubmitState.Error && (
                <div className={clsx(styles.formError, styles.banner)}>
                    Failed to submit. Please try again later.
                </div>
            )}
            {state === SubmitState.Success && (
                <div className={clsx(styles.formSuccess, styles.banner)}>
                    Your message has been sent successfully!
                </div>
            )}

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Name</div>
                <input
                    type="text"
                    className={styles.input}
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Email</div>
                <input
                    type="email"
                    className={styles.input}
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Subject</div>
                <input
                    type="text"
                    className={styles.input}
                    value={subject}
                    required
                    onChange={(e) => setSubject(e.target.value)}
                />
            </div>

            <div className={styles.field}>
                <div className={styles.fieldLabel}>Message</div>
                <textarea
                    rows={6}
                    className={styles.input}
                    value={message}
                    required
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className={clsx(styles.button, styles.contactSubmitButton)}
                disabled={state === SubmitState.Submitting || state === SubmitState.Success}
            >
                Send Message
            </button>
        </form>
    )
}