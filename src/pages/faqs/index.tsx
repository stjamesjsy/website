import { PropsWithChildren } from "react";
import styles from "./styles.module.css";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Item } from "@/components/FaqItem";
import { Accordion } from "@/components/Accordion";

export default function FAQs() {
    return (
        <div className="page">
            <div className="page-content">
                <Navbar />
                <Container>
                    <h1 className={styles.title}>Frequently Asked Questions</h1>
                    <div className={styles.items}>
                        <Accordion>
                            <Item id="ageRest" title="Is there an age restriction?">
                                18+ (Unless stated otherwise). ID may be required.
                            </Item>
                            <Item id="whereLoc" title="Where are you located?">
                                We are located at 5 Rue de Funchal, St Helier, JE2 4TT, near Minden Place carpark.
                            </Item>
                            <Item id="dressCode" title="What is the dress code?">
                                The dress code is smart casual.

                                <ul style={{ marginLeft: "30px", marginTop: "10px" }}>
                                    <li>No joggers or informal shorts (Thursday - Sunday only)</li>
                                    <li>No hats</li>
                                    <li>No football shirts</li>
                                    <li>No dirty work clothes</li>
                                </ul>
                            </Item>
                            <Item id="parking" title="Is there parking nearby?">
                                Yes, Minden Place multi storey carpark is less than a 1 minute walk around the corner.
                            </Item>
                            <Item id="openHours" title="What are your opening hours?">
                                Our normal opening hours are 19:30 – 02:00, every day! For some events we have different opening hours: <br />
                                <br />
                                On Thursday, we open at 17:00 for Steak on the Stone (booking required)<br />
                                On Friday, we open at 17:00 for Disco Bingo (booking required)<br />
                                On Sunday, we open between 12:30 and 15:00 for Sunday Lunch (booking required)
                            </Item>
                            <Item id="promoter" title="I'm a promoter and I'd like to book an event">
                                Great! We offer our upstairs room for events. Please check out our  <Link href="/venue-hire" style={{ color: "var(--stjames-yellow)" }}>Venue Hire</Link> page and get in touch with the relevant details.
                            </Item>
                            <Item id="eventBookHours" title="Do you accept event bookings outside of normal hours?">
                                Please <Link href="/#contact" style={{ color: "var(--stjames-yellow)" }}>contact us</Link>, depending on the event this may be possible.
                            </Item>
                            <Item id="cloakroom" title="Do you have a cloakroom?">
                                Unfortunately we do not
                            </Item>
                            <Item id="freeWifi" title="Do you have free Wi-Fi?">
                                Yes! The details can be found at the bar, ask the bar staff if you need help!
                            </Item>
                            <Item id="entertainment" title="What entertainment do you offer?">
                                <ul style={{ marginLeft: "30px" }}>
                                    <li>Karaoke every Thursday, Saturday & Sunday</li>
                                    <li>Disco Bingo every Friday & Sunday</li>
                                    <li>Live DJ every Friday</li>
                                </ul>
                            </Item>
                            <Item id="vapeInside" title="Can I vape inside?">
                                Yes! No smoking, though.
                            </Item>
                            <Item id="lostProperty" title="I've left something in St James, how can I get it back?">
                                You can come in any day from 7:30 PM or <Link href="/#contact" style={{ color: "var(--stjames-yellow)" }}>contact us</Link>.
                            </Item>
                            <Item id="ids" title="What forms of ID do you accept?">
                                We except the following:

                                <ul style={{ marginLeft: "30px", marginTop: "10px", marginBottom: "10px" }}>
                                    <li>Full Jersey Driving license</li>
                                    <li>Passport</li>
                                </ul>

                                We do not accept provisional licenses or out of date forms of ID. We also not not accept photocopies, digital images or screenshots of IDs.
                            </Item>
                        </Accordion>
                    </div>
                    <p className={styles.contactUs}>Still not sure? <a href="/#contact">Get in touch</a>.</p>
                </Container>
            </div>
            <Footer />
        </div>
    )
}