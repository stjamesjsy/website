import Navbar from "@/components/Navbar";
import styles from "./styles.module.css";
import Footer from "@/components/Footer";
import Container from "@/components/Container";
import events, { Event, formatDateParts } from "@/events";
import { PropsWithChildren, useEffect, useState } from "react";
import { FaCalendar, FaClock } from "react-icons/fa";
import { FiCalendar, FiClock } from "react-icons/fi";
import { GetStaticPaths, GetStaticProps } from "next";

interface Props {
    event: Event | null;
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = events.map((e) => ({ params: { id: e.id } }));

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
    const id = ctx.params?.id as string;
    const event = events.find((e) => e.id === id) || null;

    return {
        props: {
            event
        }
    }
}

export default function EventPage({ event }: Props) {
    if (!event) {
        return <div>Event not found</div>;
    }
    return (
        <div className="page">
            <div className="page-content">
                <Navbar homepage />

                <div className={styles.hero}>
                    <div className={styles.heroBg} style={{ backgroundImage: `url(${event.headerImageUrl})` || "" }} />
                    <Container>
                        <div className={styles.heroContent}>
                            <div className={styles.dateSquare}>
                                <div className={styles.dateDay}>{formatDateParts(event.date).day}</div>
                                <div className={styles.dateMonth}>{formatDateParts(event.date).month}</div>
                            </div>
                            <h1>{event.title}</h1>
                            <p className={styles.summary}>
                                {event.summary}
                            </p>
                        </div>
                    </Container>
                </div>
                <div className={styles.mainContent}>
                    <Container>
                        <div className={styles.mainContentInner}>
                            <div>
                                <h2>About Event</h2>
                                <p className={styles.eventDescription} dangerouslySetInnerHTML={{ __html: event.description }} />
                            </div>
                            <div className={styles.sidebar}>
                                <div className={styles.infoCard}>
                                    <h3>Event Details</h3>

                                    <SidebarItem title="Time" icon={<FiClock color="var(--stjames-purple)" />}>
                                        {event.time}
                                    </SidebarItem>
                                    <SidebarItem title="Date" icon={<FiCalendar color="var(--stjames-purple)" />}>
                                        {formatDateParts(event.date).formattedDate}
                                    </SidebarItem>
                                    <SidebarItem title="Category" icon={<FiCalendar color="var(--stjames-purple)" />}>
                                        {event.category}
                                    </SidebarItem>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            <Footer />
        </div>
    )
}

function SidebarItem({ title, children, icon }: PropsWithChildren<{ title: string; icon: any }>) {
    return (
        <div className={styles.sidebarItem}>
            <div className={styles.sidebarItemIcon}>{icon}</div>
            <div>
                <div className={styles.sidebarItemTitle}>{title}</div>
                <div className={styles.sidebarItemValue}>{children}</div>
            </div>
        </div>
    )
}