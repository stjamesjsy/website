import { PropsWithChildren } from "react";
import styles from "./styles.module.css";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { FaStar } from "react-icons/fa";
import { BookingForm } from "@/components/BookingForm";

export default function SundayLunch() {
    return (
        <div className="page">
            <div className="page-content">
                <Navbar />

                <Container>
                    <div className={styles.heroSection}>
                        <div className={styles.heroText}>
                            <h1 className={styles.title}>Sunday Lunch</h1>
                            <p>
                               Sunday Lunch at St James is back!
                            </p>
                            <p>
                                Join us every Sunday from 12:30pm to 3pm for a relaxed, welcoming lunch with great food, good company, and that classic Sunday atmosphere.
                            </p>
                        </div>
                        <div className={styles.heroImage}>
                            <img src="/images/disco-bingo/1.png" alt="Disco Bingo Fun" />
                        </div>
                    </div>
                </Container>

                <div className={styles.menuSection}>
                    <Container>
                        <h2>Food Menu</h2>
                        <div className={styles.grid}>
                            <div>
                                <div className={styles.sectionLabel}>Main Menu</div>

                                <MenuItem
                                    title="2 slices of meat"
                                    price="19.50"
                                    description="Your choice of meats arrive with a tray of seasonal vegetables, Roast Potatoes and Yorkshire Puddings"
                                />
                                <MenuItem
                                    title="Vegetarian dish of the day"
                                    price="18.50"
                                    description="Served with all the trimmings"
                                />
                            </div>
                            <div>
                                <div className={styles.sectionLabel}>Kids Menu</div>

                                <MenuItem
                                    title="1 slice of meat"
                                    price="11.50"
                                    description="Served with all the trimmings"
                                />
                                <MenuItem
                                    title="Fish fingers"
                                    price="8.50"
                                    description="Served with chips"
                                />
                                <MenuItem
                                    title="Chicken goujons"
                                    price="8.50"
                                    description="Served with chips"
                                />
                            </div>
                        </div>
                    </Container>
                </div>

                <Container>
                    <div className={styles.bookingSection}>
                        <h2>Book Your Spot</h2>
                        <BookingForm bookingType="sundayLunch" />
                    </div>
                </Container>
            </div>
            <Footer />
        </div>
    )
}

function MenuItem({ title, price, description }: any) {
    return (
        <div className={styles.menuItem}>
            <div className={styles.line}>
                <span className={styles.menuItemTitle}>{title}</span>
                <span className={styles.dots}></span>
                <span className={styles.price}>£{price}</span>
            </div>
            <p className={styles.description}>{description}</p>
        </div>
    );
}