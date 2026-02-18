import { PropsWithChildren } from "react";
import styles from "./styles.module.css";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FaStar } from "react-icons/fa";
import ContactSection from "@/components/ContactSection";

export default function VenueHire() {
    return (
        <div className="page">
            <div className="page-content">
                <Navbar />
                <Container>
                    <div className={styles.welcomeSection}>
                        <div className={`${styles.col} ${styles.infoCol}`}>
                            <h1 className={styles.title}>Venue Hire</h1>
                            <p style={{ marginBottom: "20px" }}>
                                Looking for a great venue in the heart of St Helier? St James is a versatile space that’s perfect for all kinds of events - from birthday parties and work socials to live music and DJ nights.
                            </p>
                            <p>
                                Located at 5 Rue de Funchal, St Helier, we’re just a short walk away from the town centre.
                            </p>
                            <div className={styles.infoWrapper}>
                                <div className={styles.infoBox}>
                                    <div className={styles.infoIcon}><FaStar color="var(--stjames-yellow)" /></div>
                                    <div>
                                        <div className={styles.infoTitle}>Prime Location</div>
                                        <div>Central St Helier, near Minden Place car park</div>
                                    </div>
                                </div>
                                <div className={styles.infoBox}>
                                    <div className={styles.infoIcon}><FaStar color="var(--stjames-yellow)" /></div>
                                    <div>
                                        <div className={styles.infoTitle}>Licensed Hours</div>
                                        <div>11:00 AM – 02:00 AM, 7 days a week (however we usually open from 07:30 PM)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.col}>
                            <img src="/images/front.png" alt="venue hire" />
                        </div>
                    </div>
                </Container>
                <div className={styles.clubRoomSection}>
                    <Container>
                        <div className={styles.upstairsAtStJames}>Upstairs at St James</div>
                        <h2>The Function Room</h2>
                        <p>
                            Our premier hire space – ideal for private events any day of the week. Perfect for Bands, DJ Events, Birthdays & more!
                        </p>
                        <ul>
                            <ListItem>Stage</ListItem>
                            <ListItem>Private Bar</ListItem>
                            <ListItem>DJ Booth</ListItem>
                            <ListItem>Sound & Lighting System</ListItem>
                            <ListItem>90 person capacity</ListItem>
                            <ListItem>Seating Available</ListItem>
                            <ListItem>Customizable Space</ListItem>
                            <ListItem>Free Wi-Fi</ListItem>
                            <ListItem>Buffet available upon request</ListItem>
                        </ul>
                    </Container>
                </div>
                {/* <div className={styles.gallerySection}>
                    <Container>
                        <h2>Gallery</h2>
                        <p>Nothing here yet</p>
                    </Container>
                </div> */}
                <div className={styles.contactSection}>
                    <Container>
                        <div className={styles.upstairsAtStJames}>Want to make it official?</div>
                        <h2>Get in touch</h2>
                        <ContactSection />
                    </Container>
                </div>
            </div>
            <Footer />
        </div>
    )
}

function ListItem({ children }: PropsWithChildren) {
    return (
        <li className={styles.listItem}>
            <FaStar color="var(--stjames-yellow)" style={{ marginRight: "8px", minWidth: "16px", fontSize: "11px" }} />
            {children}
        </li>
    )
}