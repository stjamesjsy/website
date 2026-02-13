import { PropsWithChildren } from "react";
import styles from "./styles.module.css";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FaStar } from "react-icons/fa";
import { BookingForm } from "@/components/BookingForm";

export default function DiscoBingo() {
    return (
        <div className="page">
            <div className="page-content">
                <Navbar />

                <Container>
                    <div className={styles.heroSection}>
                        <div className={styles.heroText}>
                            <h1 className={styles.title}>Disco Bingo</h1>
                            <p>
                                The ultimate music bingo experience! Grab your bingo cards, dabbers, and get ready for rounds of your favourite hits – from 80s classics to school disco anthems.
                            </p>
                            <p>
                                Located at 5 Rue de Funchal, St Helier – just a short walk from the town centre.
                            </p>
                        </div>
                        <div className={styles.heroImage}>
                            <img src="/images/disco-bingo/1.png" alt="Disco Bingo Fun" />
                        </div>
                    </div>
                </Container>

                <div className={styles.infoSection}>
                    <Container>
                        <h2>How It Works</h2>
                        <ul>
                            <ListItem>Each player gets bingo cards and dabbers</ListItem>
                            <ListItem>Play a book of 5 rounds with different themes (80s, School Disco, Pop Hits, etc.)</ListItem>
                            <ListItem>Songs are played over the speakers and shown on screen</ListItem>
                            <ListItem>Dab the song if it’s on your card</ListItem>
                            <ListItem>The first person to fill their card calls bingo – card verified and split if multiple winners</ListItem>
                            <ListItem>Prize money increases each round</ListItem>
                            <ListItem>In the final round, you can purchase additional bingo books to increase the prize fund further</ListItem>
                        </ul>
                    </Container>
                </div>

                <Container>
                    <div className={styles.grid}>
                        <div className={styles.scheduleSection}>
                            <h2>Schedule & Meals</h2>
                            <p>
                                <strong>Friday:</strong> 7 PM – 11 PM<br />
                                <strong>Sunday:</strong> 5 PM – 8 PM
                            </p>
                            <br />
                            <p>
                                Basket meals available on Fridays for £12.90. <a className={styles.link} href="/files/BasketMeals.pdf">View Menu</a>. Meals sold on-site and do not require pre-booking.
                            </p>
                        </div>

                        <div className={styles.corporateSection}>
                            <h2>Corporate Disco Bingo</h2>
                            <p>
                                Looking to host a corporate night? Disco Bingo can be booked for private corporate events.
                                <br/><br/><a className={styles.link} href="/#contact">Contact us</a> to arrange your event.
                            </p>
                        </div>
                    </div>
                </Container>

                <Container>
                    <div className={styles.bookingSection}>
                        <h2>Book Your Spot</h2>
                        <BookingForm bookingType="discoBingo" />
                    </div>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

function ListItem({ children }: PropsWithChildren) {
    return (
        <li className={styles.listItem}>
            <FaStar color="var(--stjames-yellow)" style={{ marginRight: "8px", minWidth: "16px", fontSize: "20px" }} />
            {children}
        </li>
    );
}