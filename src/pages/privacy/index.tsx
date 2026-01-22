import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import styles from "./styles.module.css";
import Link from "next/link";

export default function PrivacyPolicy() {
    return (
        <div className="page">
            <div className="page-content">
                <Navbar />
                <Container>
                    <div className={styles.content}>
                        <h1>Privacy Policy</h1>
                        <p>
                            Last Updated: 16-01-2025
                        </p>
                        <p>
                            We respect your privacy and are committed to protecting your personal information.
                        </p>
                        <p>
                            Our website includes a contact form which allows us to respond to your enquiries. The information you provide may be used to get in touch with you or to manage bookings for events such as Disco Bingo, Steak on the Stone, or Sunday Lunch.
                        </p>
                        <p>
                            We use Google Analytics to collect anonymous usage data, such as page views and general visitor behavior. This data helps us understand how the site is used and improve the user experience.
                        </p>
                        <p>
                            By using this website and submitting the contact form, you consent to the collection and use of your information as described here, including the use of cookies by Google Analytics in accordance with their privacy policies.
                        </p>
                        <p>
                            We do not share your personal information with third parties for marketing purposes. We also do not offer user accounts or require sign-ups.
                        </p>
                        <p>
                            If you have any questions about our privacy practices, please feel free to <Link href="/#contact" style={{ color: "var(--stjames-yellow)" }}>contact us</Link>.
                        </p>
                    </div>
                </Container>
                <Footer />
            </div>
        </div>
    )
}