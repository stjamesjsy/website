import { useState } from "react";
import styles from "./styles.module.css";
import { ContactForm } from "../ContactForm";
import { BookingForm } from "../BookingForm";
import clsx from "clsx";
import { LuChevronLeft } from "react-icons/lu";

type Action = "contact" | "book" | null;
type BookingType = "discoBingo" | "sundayLunch" | "steakStone" | null;

interface BookingData {
    bookingType: BookingType;
    date: string;
    people: number;
    name: string;
    email: string;
    notes: string;
}

export function ContactOrBook() {
    const [action, setAction] = useState<Action>(null);
    const [bookingType, setBookingType] = useState<BookingType>(null);

    const resetAll = () => {
        setAction(null);
        setBookingType(null);
    }

    return (
        <div className={styles.wrapper}>

            {!action && (
                <div className={styles.choice}>
                    <button className={clsx(styles.button, styles.actionBtn)} onClick={() => setAction("contact")}>
                        Contact Us

                        <div className={styles.buttonSummary}>
                            For general enquiries
                        </div>
                    </button>
                    <button className={clsx(styles.button, styles.actionBtn)} onClick={() => setAction("book")}>
                        Book a Table

                        <div className={styles.buttonSummary}>
                            Disco Bingo, Sunday Lunch & Steak on the Stone
                        </div>
                    </button>
                </div>
            )}

            {action === "contact" && (
                <>
                    <button
                        className={styles.backBtn}
                        onClick={() => setAction(null)}
                        style={{ marginBottom: "20px" }}
                    >
                        <LuChevronLeft style={{ paddingTop: "5px" }} /> Back
                    </button>
                    <ContactForm />
                </>
            )}

            {action === "book" && !bookingType && (
                <div className={styles.choice}>
                    <button className={styles.backBtn} onClick={resetAll}>
                        <LuChevronLeft style={{ paddingTop: "5px" }} /> Back
                    </button>

                    <button className={styles.button} onClick={() => setBookingType("discoBingo")}>
                        Disco Bingo

                        <div className={styles.buttonSummary}>
                            Every Friday & Sunday
                        </div>
                    </button>
                    <button className={styles.button} onClick={() => setBookingType("sundayLunch")}>
                        Sunday Lunch

                        <div className={styles.buttonSummary}>
                            Every Sunday
                        </div>
                    </button>
                    <button className={styles.button} onClick={() => setBookingType("steakStone")}>
                        Steak on the Stone

                        <div className={styles.buttonSummary}>
                            Every Thursday
                        </div>
                    </button>
                </div>
            )}

            {action === "book" && bookingType && (
                <>
                    <button
                        className={styles.backBtn}
                        onClick={resetAll}
                        style={{ marginBottom: "20px" }}
                    >
                        <LuChevronLeft style={{ paddingTop: "5px" }} /> Back
                    </button>

                    <BookingForm bookingType={bookingType} />
                </>
            )}
        </div>
    );
}