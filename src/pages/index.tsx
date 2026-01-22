import Container from "@/components/Container";
import EventCard from "@/components/EventCard";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import events from "@/events";
import styles from "./styles.module.css";
import { PropsWithChildren, useRef } from "react";
import clsx from "clsx";
import SocialLink from "@/components/SocialLink";
import { FiClock, FiMail, FiMapPin } from "react-icons/fi";
import { FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";
import ContactSection from "@/components/ContactSection";
import { FOOD_MENU_URL } from "@/constants";

export default function Index() {
    const contactRef = useRef<HTMLDivElement>(null);

    const scrollToContact = () => {
        contactRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    return (
        <div className="page">
            <div className={clsx("page-content", styles.pageBackground)}>
                <Navbar homepage />

                <div className={styles.hero}>
                    <div className={styles.heroBg} />
                    <div className={styles.heroContent}>
                        <Container>
                            <h1>Welcome to</h1>
                            <h1>St James</h1>
                            <p className={styles.tagline}>
                                Your night starts here - Disco Bingo, Karaoke, Live DJs, and good vibes!
                            </p>
                        </Container>
                    </div>
                </div>

                <div className={styles.discoBingo}>
                    <Container>
                        <div className={styles.sectionGrid}>
                            <div>
                                <p className={styles.discoBingoSmall}>Introducing</p>
                                <h2 className={styles.sectionHeader}>Disco Bingo</h2>
                                <p className={styles.discoBingoDesc}>
                                    One of Jersey's best nights out, now at St James.
                                </p>
                                <button
                                    className={styles.button}
                                    onClick={scrollToContact}
                                >
                                    Book Now
                                </button>
                            </div>
                            <img className={styles.sectionGridImage} src="/images/disco-bingo/1.png" />
                        </div>
                    </Container>
                </div>

                <div className={styles.foodSection}>
                    <Container>
                        <div className={styles.sectionGrid}>
                            <div>
                                <p className={styles.discoBingoSmall}>Now Serving</p>
                                <h2 className={styles.sectionHeader}>Steak on the Stone</h2>
                                <p className={styles.steakDesc}>
                                    A fun and flavour-packed dining experience where your food is served on a blazing hot volcanic stone at your table. Each dish is prepared fresh by you, giving you full control to cook your steak just the way you like it.
                                    <br /><br />
                                    The stone is heated to an impressive 440°C (please don’t touch) and is presented on a bamboo board, keeping your meal hot and sizzling while you enjoy every bite.
                                </p>
                                <div className={styles.buttonGroup}>
                                    <button
                                        className={styles.button}
                                        onClick={scrollToContact}
                                    >
                                        Book Now
                                    </button>
                                    <a
                                        className={styles.button}
                                        href={FOOD_MENU_URL}
                                    >
                                        View Menu
                                    </a>
                                </div>
                            </div>
                            <img className={clsx(styles.sectionGridImage, styles.steakImage)} src="/images/food/steak-1.jpg" />
                        </div>
                    </Container>
                </div>

                <div className={styles.foodSection}>
                    <Container>
                        <div className={styles.sectionGrid}>
                            <div>
                                <p className={styles.discoBingoSmall}>Every Sunday</p>
                                <h2 className={styles.sectionHeader}>Sunday Lunch</h2>
                                <p className={styles.steakDesc}>
                                    Enjoy a traditional Sunday carvery, featuring your choice of succulent meats, a generous tray of seasonal vegetables, crispy roast potatoes, and classic Yorkshire puddings.
                                    <br /><br />
                                    Kids’ options available too.
                                </p>
                                <div className={styles.buttonGroup}>
                                    <button
                                        className={styles.button}
                                        onClick={scrollToContact}
                                    >
                                        Book Now
                                    </button>
                                    <a
                                        className={styles.button}
                                        href={FOOD_MENU_URL}
                                    >
                                        View Menu
                                    </a>
                                </div>
                            </div>
                            <img className={clsx(styles.sectionGridImage, styles.steakImage)} src="/images/food/sunday-lunch-1.jpg" />
                        </div>
                    </Container>
                </div>

                <div className={styles.contactSection} id="contact" ref={contactRef}>
                    <Container>
                        <h2>Contact Us</h2>

                        <p className={styles.contactSubtitle}>
                            Contact us to reserve your table for Disco Bingo, Steak on the Stone, or Sunday Lunch, or to discuss any other enquiries by using the form below, via email or by messaging our Facebook page.
                        </p>

                        <ContactSection />
                    </Container>
                </div>

                {/* <div className={styles.eventsSection}>
                    <Container>
                        <h2>What's on this week</h2>

                        <div className={styles.eventsGrid}>
                            {events.length === 0 && <p>No upcoming events</p>}
                            {events.map(event => <EventCard key={event.id} event={event} />)}
                        </div>
                    </Container>
                </div> */}
            </div >
            <Footer />
        </div >
    )
}