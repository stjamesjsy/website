import ContactSection from "@/components/ContactSection";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FOOD_MENU_URL } from "@/constants";
import clsx from "clsx";
import { useRef } from "react";
import styles from "./styles.module.css";
import { LuChevronDown } from "react-icons/lu";

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

                {/* <div className={styles.hero}>
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
                </div> */}

                <div className={styles.hero}>
                    <div className={styles.heroBg} />
                    <div className={styles.heroContent}>
                        <Container>
                            <div className={styles.heroInner}>
                                <div className={styles.heroInnerContent}>
                                    <h1>ST JAMES</h1>
                                    <p className={styles.tagline}>
                                        Karaoke · Disco Bingo · Nightclub
                                    </p>
                                    <p className={styles.tagline2}>
                                       Your night starts here - Disco Bingo, Karaoke, Live DJs, and good vibes!
                                    </p>

                                    <div className={styles.heroButtons}>
                                        <a href="#disco-bingo" className={clsx(styles.button, styles.buttonBlue)}>
                                            What's on
                                        </a>
                                        <a href="#contact" className={styles.button}>
                                            Book a table 
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <button className={styles.scrollButton}>
                        <LuChevronDown />
                    </button>
                </div>

                <div id="disco-bingo" className={styles.discoBingoSection}>
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

                <div id="karaoke" className={styles.karaokeSection}>
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
                            <img className={clsx(styles.sectionGridImage)} src="/images/karaoke.png" />
                        </div>
                    </Container>
                </div>

                <div id="contact" className={styles.contactSection} ref={contactRef}>
                    <Container>
                        <h2>Contact Us</h2>

                        <p className={styles.contactSubtitle}>
                            Contact us to reserve your table for Disco Bingo or to discuss any other enquiries by using the form below, via email or by messaging our Facebook page.
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