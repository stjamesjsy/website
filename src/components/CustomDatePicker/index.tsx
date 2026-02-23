import { useState } from "react";
import styles from "./styles.module.css";
import { allowedDays, BookingType } from "../BookingForm";

export interface ExcludedDate {
    date: string;
    reason?: string;
}

interface Props {
    bookingType: BookingType;
    value: string;
    onChange: (date: string) => void;
    excludedDates?: ExcludedDate[];
}

export function CustomDatePicker({
    bookingType,
    value,
    onChange,
    excludedDates = [],
}: Props) {
    const [current, setCurrent] = useState(new Date());

    const year = current.getFullYear();
    const month = current.getMonth();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDay = (new Date(year, month, 1).getDay() + 6) % 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const format = (d: Date) =>
        `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;

    const getExcluded = (dateStr: string) =>
        excludedDates.find(d => d.date === dateStr);

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const date = new Date(year, month, i + 1);
        date.setHours(0, 0, 0, 0);

        const formatted = format(date);
        const isPast = date < today;
        const allowedByDay = allowedDays[bookingType].includes(date.getDay());
        const excluded = getExcluded(formatted);

        return {
            date,
            formatted,
            excluded,
            allowedByDay,
            allowed: allowedByDay && !isPast && !excluded
        }
    });

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
                    <div key={d} className={styles.calendarDayLabel}>
                        {d}
                    </div>
                ))}

                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} />
                ))}
                {days.map(({ date, formatted, allowed, excluded, allowedByDay }) => {
                    const selected = value === formatted;

                    return (
                        <button
                            key={formatted}
                            type="button"
                            disabled={!allowed}
                            title={excluded?.reason}
                            className={[
                                styles.calendarDay,
                                allowed ? styles.available : styles.disabled,
                                excluded ? styles.excluded : "",
                                selected ? styles.selected : "",
                            ].join(" ")}
                            onClick={() => allowed && onChange(formatted)}
                        >
                            {date.getDate()}
                            {excluded && allowedByDay && (
                                <span className={styles.cross} />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}