import ContactSection from "@/components/ContactSection";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FOOD_MENU_URL } from "@/constants";
import clsx from "clsx";
import { useRef } from "react";
import styles from "./styles.module.css";

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
                                A Great Place to Meet, Eat and be Entertained!
                            </p>
                            <p className={styles.tagline2}>
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
                                <a
                                    className={styles.button}
                                    href="/disco-bingo"
                                >
                                    More Info
                                </a>
                            </div>
                            <img className={styles.sectionGridImage} src="/images/disco-bingo/1.png" />
                        </div>
                    </Container>
                </div>

                <div className={styles.foodSection}>
                    <Container>
                        <div className={styles.sectionGrid}>
                            <div>
                                <p className={styles.discoBingoSmall}>The home of</p>
                                <h2 className={styles.sectionHeader}>Late Night Karaoke</h2>
                                <p className={styles.steakDesc}>
                                    St James is the home of late night karaoke - every Thursday, Saturday & Sunday from 11pm until 2am.
                                    <br /><br />
                                    No booking required. What will you sing?
                                </p>
                            </div>
                            <img className={clsx(styles.sectionGridImage, styles.steakImage)} src="/images/karaoke-alt.png" />
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
                                    <br /><br />
                                    Served every Thursday.
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

                        <ContactSection includeBooking />
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