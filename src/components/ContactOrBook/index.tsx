import { useState } from "react";
import styles from "./styles.module.css";
import { ContactForm } from "../ContactForm";
import { BookingForm } from "../BookingForm";
import clsx from "clsx";

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

    const [booking, setBooking] = useState<BookingData>({
        bookingType: null,
        date: "",
        people: 1,
        name: "",
        email: "",
        notes: "",
    });

    const resetAll = () => {
        setAction(null);
        setBookingType(null);
    };

    const backFromBookingForm = () => {
        setBookingType(null);
    };

    const updateBooking = (field: keyof BookingData, value: any) => {
        setBooking(prev => ({ ...prev, [field]: value }));
    };

    const submitBooking = () => {
        const payload = {
            ...booking,
            bookingType,
        };

        console.log("SEND TO FORMSUBMIT:", payload);
    };

    return (
        <div className={styles.wrapper}>

            {!action && (
                <div className={styles.choice}>
                    <button className={clsx(styles.button, styles.actionBtn)} onClick={() => setAction("contact")}>
                        Contact Us
                    </button>
                    <button className={clsx(styles.button, styles.actionBtn)} onClick={() => setAction("book")}>
                        Book a Table
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
                        {"<"} Back
                    </button>
                    <ContactForm />
                </>
            )}

            {action === "book" && !bookingType && (
                <div className={styles.choice}>
                    <button className={styles.backBtn} onClick={resetAll}>
                        {"<"} Back
                    </button>

                    <button className={styles.button} onClick={() => setBookingType("discoBingo")}>
                        Disco Bingo
                    </button>
                    {/* <button className={styles.button} onClick={() => setBookingType("sundayLunch")}>
                        Sunday Lunch
                    </button>
                    <button className={styles.button} onClick={() => setBookingType("steakStone")}>
                        Steak on the Stone
                    </button> */}
                </div>
            )}

            {action === "book" && bookingType && (
                <>
                    <button className={styles.backBtn} onClick={resetAll}>
                        {"<"} Back
                    </button>

                    <BookingForm bookingType={bookingType} />
                </>
            )}
        </div>
    );
}