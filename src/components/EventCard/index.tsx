import { Event, formatDateParts } from "@/events";
import styles from "./styles.module.css";

export default function EventCard({ event }: { event: Event }) {
    return (
        <a
            href={`/events/${event.id}`}
            className={styles.card}
            style={{ backgroundImage: `url(${event.imageUrl})` }}
        >
            <div className={styles.info}>
                <h3 className={styles.title}>{event.title}</h3>
                <p className={styles.date}>{formatDateParts(event.date).formattedDate}</p>
            </div>
        </a>
    )
}