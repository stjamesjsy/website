import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import styles from "./styles.module.css";
import Link from "next/link";
import { FACEBOOK_URL } from "@/constants";

export default function CompTerms() {
    return (
        <div className="page">
            <div className="page-content">
                <Navbar />
                <Container>
                    <div className={styles.content}>
                        <h1>Steak on the Stone Launch Competition – Terms & Conditions</h1>

                        <p><strong>Created:</strong> 19/02/2026</p>

                        <h2>1. Promoter</h2>
                        <p>
                            This competition is run by St James (JK SILVESTRE LIMITED).
                        </p>

                        <h2>2. Eligibility</h2>
                        <ul>
                            <li>Open to residents of Jersey only</li>
                            <li>Entrants must be 18 years or over</li>
                            <li>Employees of St James and their immediate family members are not eligible</li>
                        </ul>

                        <h2>3. Competition Period</h2>
                        <ul>
                            <li>Starts: Friday 27th February 2026</li>
                            <li>Ends: Wednesday 25th March 2026 at 2:00pm</li>
                            <li>Entries submitted after this time will not be counted</li>
                            <li>The winner will be determined and contact by 7:00pm on the closing date</li>
                        </ul>

                        <h2>4. How to Enter</h2>
                        <ul>
                            <li>Like the competition post</li>
                            <li>Like St James Jersey on Facebook</li>
                            <li>Comment on the post and tag a friend you would share this prize with</li>
                        </ul>
                        <p>No purchase is necessary to enter.</p>

                        <h2>5. The Prize</h2>
                        <p>
                            One winner will receive Steak on the Stone for two people, including two drinks.
                        </p>

                        <h3>Main Course Choice (two mains)</h3>
                        <ul>
                            <li>10oz Sirloin (normally £21.50)</li>
                            <li>10oz Ribeye (normally £21.50)</li>
                            <li>7oz Fillet (normally £23.50)</li>
                            <li>9x Scallops (normally £20.50)</li>
                            <li>9x Gambas (normally £20.50)</li>
                            <li>Halloumi (normally £19.50)</li>
                        </ul>

                        <h3>Plus One Sauce Each (worth £2.95)</h3>
                        <ul>
                            <li>Peppercorn</li>
                            <li>Diane</li>
                            <li>Blue Cheese</li>
                        </ul>

                        <p>
                            All dishes are served with chips, corn on the cob, onion rings, button mushrooms,
                            tomato, garlic, and rock salt &amp; pepper mix.
                        </p>

                        <h3>Drink Choice (two drinks total)</h3>
                        <ul>
                            <li>Pint of Carling, Stella, Guinness, or Madri</li>
                            <li>Pint of Thatchers Gold, Apple &amp; Blackcurrant, Blood Orange, or Lemon</li>
                            <li>OR a large glass of house red, white, or rosé wine</li>
                        </ul>

                        <p>
                            Substitutions for this deal are at the discretion of St James (JK SILVESTRE LIMITED).
                        </p>

                        <h2>6. Prize Conditions</h2>
                        <ul>
                            <li>Steak on the Stone is available every Thursday from 6:00pm to 8:00pm</li>
                            <li>The prize must be claimed within 30 days of winning</li>
                            <li>The prize is non-transferable and no cash alternative is available</li>
                        </ul>

                        <h2>7. Winner Selection &amp; Contact</h2>
                        <ul>
                            <li>The winner will be selected at random after the competition closes</li>
                            <li>
                                The winner will be contacted by 7:00pm on the closing date via
                                the official St James Facebook (<Link href={FACEBOOK_URL} target="_blank" style={{ color: "var(--stjames-yellow)" }}>link</Link>) only
                            </li>
                            <li>
                                We will never ask for payment details or financial information
                            </li>
                        </ul>

                        <h2>8. General</h2>
                        <p>
                            By entering this competition, participants agree to these Terms &amp; Conditions.
                            St James (JK SILVESTRE LIMITED) reserves the right to amend or withdraw the competition at any time.
                        </p>

                        <h2>9. Contact</h2>
                        <p>
                            For any questions regarding this competition, please contact us via our Facebook page.
                        </p>
                    </div>
                </Container>
                <Footer />
            </div>
        </div>
    )
}