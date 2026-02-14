import { FormEvent, useState } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import { CustomDatePicker } from "../CustomDatePicker";

const submitUrl = "https://formsubmit.co/ajax/22df9bd1beabb23825d1afb4c0ce1f66";
// const submitUrl = "https://formsubmit.co/ajax/luke@glitch.je";

export type BookingType = "discoBingo" | "sundayLunch" | "steakStone";

enum SubmitState {
    Idle,
    Submitting,
    Success,
    Error
}

export const allowedDays: Record<BookingType, number[]> = {
    discoBingo: [0, 5],      // Sunday (0), Friday (5)
    sundayLunch: [0],        // Sunday
    steakStone: [4],         // Thursday
}

const basketMenu = [
    "Prawns (filo or tempura)",
    "Fish and chips",
    "Whole tail breaded scampi",
    "Southern fried chicken goujons",
    "Gluten free chicken goujons",
    "Vegetarian spring rolls"
] as const;

type BasketItem = typeof basketMenu[number];

function formatPrettyDate(iso: string) {
    const date = new Date(iso);

    const day = date.getDate();
    const year = date.getFullYear();
    const month = date.toLocaleString("en-GB", { month: "long" });

    const suffix =
        day % 10 === 1 && day !== 11 ? "st" :
            day % 10 === 2 && day !== 12 ? "nd" :
                day % 10 === 3 && day !== 13 ? "rd" :
                    "th";

    return `${day}${suffix} ${month} ${year}`;
}

function randomNumbers(length = 6) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10); // 0-9
    }
    return result;
}

export function BookingForm({ bookingType }: { bookingType: BookingType }) {
    const [date, setDate] = useState("");
    const [people, setPeople] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [notes, setNotes] = useState("");

    const [basketItems, setBasketItems] = useState<Record<BasketItem, string>>(
        Object.fromEntries(basketMenu.map(item => [item, ""])) as Record<BasketItem, string>
    );

    const [state, setState] = useState<SubmitState>(SubmitState.Idle);

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();

        if (state === SubmitState.Submitting) {
            return;
        }
        if (!date) {
            alert("Please select a date!")
            return;
        }

        setState(SubmitState.Submitting);

        const selectedBasketItems = Object.entries(basketItems)
            .filter(([, qty]) => Number(qty) > 0)
            .map(([item, qty]) => `${item}: ${qty}`)
            .join("\n") || "None selected";

        try {
            const response = await fetch(submitUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    _subject: `New ${formatType()} booking (${randomNumbers()})`,
                    "Booking Type": formatType(),
                    "Date": formatPrettyDate(date),
                    "Number of People": people,
                    "Name": name,
                    "Email": email,
                    "Phone Number": phone,
                    "Basket Meals": bookingType === "discoBingo" ? selectedBasketItems : undefined,
                    "Additional Details": notes
                })
            });

            const data = await response.json();

            if (data.success !== "false") {
                setState(SubmitState.Success);
            } else {
                setState(SubmitState.Error);
            }
        } catch {
            setState(SubmitState.Error);
        }
    }

    const updateBasketItem = (item: BasketItem, value: string) => {
        setBasketItems(prev => ({
            ...prev,
            [item]: value
        }));
    };

    const formatType = () => {
        switch (bookingType) {
            case "discoBingo": return "Disco Bingo";
            case "steakStone": return "Steak on the Stone";
            case "sundayLunch": return "Sunday Lunch";
        }
        return "Unknown";
    }

    const handleDateChange = (value: string) => {
        const day = new Date(value).getDay();

        if (!allowedDays[bookingType].includes(day)) {
            alert("That date is not available for this booking type.");
            return;
        }

        setDate(value);
    }

    const today = new Date().toISOString().split("T")[0];

    return (
        <form className={styles.contactForm} onSubmit={submitForm}>

            {state === SubmitState.Error && (
                <div className={clsx(styles.formError, styles.banner)}>
                    Failed to submit booking. Please try again.
                </div>
            )}

            {state === SubmitState.Success && (
                <>
                    <div className={clsx(styles.formSuccess, styles.banner)}>
                        Your booking request has been sent!
                    </div>

                    <div className={styles.contactYouText}>
                        We will contact you to confirm the booking or if we require further information.
                    </div>

                    <table className={styles.formDetails}>
                        <tbody>
                            <tr>
                                <td className={styles.formDetailsHeading}>Booking Type</td>
                                <td>{formatType()}</td>
                            </tr>
                            <tr>
                                <td className={styles.formDetailsHeading}>Date</td>
                                <td>{formatPrettyDate(date)}</td>
                            </tr>
                            <tr>
                                <td className={styles.formDetailsHeading}>Number of People</td>
                                <td>{people}</td>
                            </tr>
                            <tr>
                                <td className={styles.formDetailsHeading}>Name</td>
                                <td>{name}</td>
                            </tr>
                            <tr>
                                <td className={styles.formDetailsHeading}>Email</td>
                                <td>{email}</td>
                            </tr>
                            {bookingType === "discoBingo" && (
                                <tr>
                                    <td className={styles.formDetailsHeading}>Basket Meals</td>
                                    <td>
                                        {Object.entries(basketItems).some(([, qty]) => Number(qty) > 0)
                                            ? (
                                                <ul style={{ paddingLeft: "20px" }}>
                                                    {Object.entries(basketItems)
                                                        .filter(([, qty]) => Number(qty) > 0)
                                                        .map(([item, qty]) => (
                                                            <li key={item}>{item} × {qty}</li>
                                                        ))}
                                                </ul>
                                            )
                                            : "None selected"}
                                    </td>
                                </tr>
                            )}
                            <tr>
                                <td className={styles.formDetailsHeading}>Notes</td>
                                <td>{notes}</td>
                            </tr>
                        </tbody>
                    </table>
                </>
            )}

            {state !== SubmitState.Success && (
                <>
                    <div className={styles.youAreBooking}>You are booking {formatType()}</div>

                    {bookingType === "discoBingo" && (
                        <div className={styles.cashWarning}>
                            Please note that Bingo cards can only be bought with CASH! There is a cash point nearby at NatWest Bath Street if needed.
                        </div>
                    )}

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Date</div>
                        {/* <input
                    type="date"
                    className={styles.input}
                    required
                    value={date}
                    min={today}
                    onChange={(e) => setDate(e.target.value)}
                /> */}
                        <CustomDatePicker
                            bookingType={bookingType}
                            value={date}
                            onChange={setDate}
                        />
                        <div className={styles.fieldHint}>
                            {bookingType === "discoBingo" && "Available Fridays & Sundays"}
                            {bookingType === "sundayLunch" && "Available Sundays only"}
                            {bookingType === "steakStone" && "Available Thursdays only"}
                        </div>
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Number of people</div>
                        <input
                            type="number"
                            min={1}
                            className={styles.input}
                            required
                            value={people}
                            onChange={(e) => setPeople(Number(e.target.value))}
                        />
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Name</div>
                        <input
                            type="text"
                            className={styles.input}
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Email</div>
                        <input
                            type="email"
                            className={styles.input}
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>Phone Number</div>
                        <input
                            type="tel"
                            className={styles.input}
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    {bookingType === "discoBingo" && (
                        <div className={styles.field}>
                            <div className={styles.fieldLabel}>
                                Basket meals (optional)
                            </div>

                            <div className={styles.fieldHint}>
                                Just to give the kitchen an idea for larger tables.
                                All payment and final orders are taken on the day.
                                <div style={{ paddingTop: "5px" }} />
                                Enter the amounts of each meal you want for your group.
                            </div>

                            <div className={styles.basketMenu}>
                                {basketMenu.map(item => (
                                    <div key={item} className={styles.basketItem}>
                                        <span>{item} (£12.90)</span>
                                        <input
                                            type="number"
                                            min={0}
                                            inputMode="numeric"
                                            pattern="[0-9]*"
                                            placeholder="0"
                                            className={styles.basketQty}
                                            value={basketItems[item]}
                                            onChange={(e) => {
                                                updateBasketItem(item, e.target.value);
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className={styles.field}>
                        <div className={styles.fieldLabel}>
                            Additional details (optional)
                        </div>
                        <textarea
                            rows={4}
                            className={styles.input}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className={clsx(styles.button, styles.contactSubmitButton)}
                        disabled={state === SubmitState.Submitting}
                    >
                        Submit Booking
                    </button>
                </>
            )}
        </form>
    );
}