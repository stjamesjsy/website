import { PropsWithChildren } from "react";
import styles from "./styles.module.css";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function FAQs() {
    return (
        <div className="page">
            <div className="page-content">
                <Navbar />
                <Container>
                    <h1 className={styles.title}>Frequently Asked Questions</h1>
                    <div className={styles.items}>
                        <Item title="Is there an age restriction?">
                            18+ (Unless stated otherwise). ID may be required.
                        </Item>
                        <Item title="Where are you located?">
                            We are located at 5 Rue de Funchal, St Helier, JE2 4TT, near Minden Place carpark.
                        </Item>
                        <Item title="What is the dress code?">
                            The dress code is smart casual.

                             <ul style={{ marginLeft: "30px", marginTop: "10px" }}>
                                <li>No joggers or informal shorts (Thursday - Sunday only)</li>
                                <li>No hats</li>
                                <li>No football shirts</li>
                                <li>No dirty work clothes</li>
                             </ul>
                        </Item>
                        <Item title="Is there parking nearby?">
                            Yes, Minden Place multi storey carpark is less than a 1 minute walk around the corner.
                        </Item>
                         <Item title="How do I book Disco Bingo?">
                            Please <a href="/#contact">contact us</a> to book!
                        </Item>
                        <Item title="What are your opening hours?">
                            Our opening hours are 7:30 PM – 02:00 AM, every day! <br/> <br/>The times may be different for Disco Bingo or Sunday Lunch - this section will be updated soon.
                        </Item>
                          <Item title="Where are you located?">
                            We are located at 5 Rue de Funchal, St Helier, JE2 4TT, near Minden Place carpark.
                        </Item>
                         <Item title="Do you accept event bookings outside of normal hours?">
                            Please <Link href="/#contact" style={{ color: "var(--stjames-yellow)" }}>contact us</Link>, depending on the event this may be possible.
                        </Item>
                        <Item title="Do you have a cloakroom?">
                            Unfortunately we do not
                        </Item>
                        <Item title="Do you have free Wi-Fi?">
                            Yes! The details can be found at the bar, ask the bar staff if you need help!
                        </Item>
                        <Item title="What entertainment do you offer?">
                            <ul style={{ marginLeft: "30px" }}>
                                <li>Karaoke every Thursday, Saturday & Sunday</li>
                                <li>Disco Bingo every Friday & Sunday</li>
                                <li>Live DJ every Friday</li>
                            </ul>
                        </Item>
                        <Item title="Can I vape inside?">
                            Yes! No smoking, though.
                        </Item>
                        <Item title="I've left something in St James, how can I get it back?">
                            You can come in any day from 7:30 PM or <Link href="/#contact" style={{ color: "var(--stjames-yellow)" }}>contact us</Link>.
                        </Item>
                    </div>
                    <p className={styles.contactUs}>Still not sure? <a href="/#contact">Get in touch</a>.</p>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

function Item({ title, children }: PropsWithChildren<{ title: string }>) {
    return (
        <div className={styles.item}>
            <div className={styles.itemTitle}>{title}</div>
            <div className={styles.itemText}>{children}</div>
        </div>
    )
}