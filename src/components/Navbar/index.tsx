import { useState } from "react";
import { FaBars } from "react-icons/fa";
import styles from "./styles.module.css";
import Container from "../Container";

const items = [
    { label: "Home", href: "/" },
    { label: "Venue Hire", href: "/venue-hire" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/#contact" },
    // { label: "Gallery", href: "/gallery" }
]

interface Props {
    homepage?: boolean;
}

export default function Navbar({ homepage }: Props) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className={`${styles.navbar} ${homepage ? styles.homepage : ""} ${homepage && mobileOpen ? styles.homepageOpen : ""}`}>
            <Container noPadding>
                <div className={styles.content}>
                    <a href="/" className={styles.logo}>
                        <img src="/images/logo.png" alt="logo" />
                    </a>

                    <nav className={styles.desktopNav}>
                        {items.map((item) => (
                            <a key={item.href} href={item.href} className={styles.navItem}>
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <button
                        className={styles.mobileMenuButton}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        <FaBars />
                    </button>
                </div>
            </Container>

            {mobileOpen && (
                <div className={styles.mobileDropdown}>
                    {items.map((item) => (
                        <a key={item.href} href={item.href} className={styles.dropdownItem}>
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}