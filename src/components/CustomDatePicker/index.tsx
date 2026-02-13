import { useState } from "react";
import styles from "./styles.module.css";
import { allowedDays, BookingType } from "../BookingForm";

interface Props {
    bookingType: BookingType;
    value: string;
    onChange: (date: string) => void;
}

export function CustomDatePicker({ bookingType, value, onChange }: Props) {
    const [current, setCurrent] = useState(new Date());

    const year = current.getFullYear();
    const month = current.getMonth();

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, month, i + 1);
        const isPast = date < new Date(today.toDateString());
        const allowed = allowedDays[bookingType].includes(date.getDay());
        return { date, allowed: allowed && !isPast };
    });

    const format = (d: Date) =>
        `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    return (
        <div className={styles.datePicker}>
            <div className={styles.dateHeader}>
                <button
                    type="button"
                    className={styles.button}
                    onClick={() => setCurrent(new Date(year, month - 1, 1))}
                >
                    ←
                </button>
                <strong>
                    {current.toLocaleString("default", { month: "long" })} {year}
                </strong>
                <button
                    type="button"
                    className={styles.button}
                    onClick={() => setCurrent(new Date(year, month + 1, 1))}
                >
                    →
                </button>
            </div>

            <div className={styles.calendarGrid}>
                {["M", "T", "W", "T", "F", "S", "S"].map(d => (
                    <div key={d} className={styles.calendarDayLabel}>{d}</div>
                ))}

                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}

                {days.map(({ date, allowed }) => {
                    const formatted = format(date);
                    const selected = value === formatted;

                    return (
                        <button
                            key={formatted}
                            type="button"
                            disabled={!allowed}
                            className={`${styles.calendarDay}
                                ${allowed ? styles.available : styles.disabled}
                                ${selected ? styles.selected : ""}`}
                            onClick={() => onChange(formatted)}
                        >
                            {date.getDate()}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}