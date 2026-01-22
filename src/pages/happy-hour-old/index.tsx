import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import styles from "./styles.module.css";
import { ImageGallery } from "react-image-grid-gallery";

export default function HappyHour() {
    return (
        <div className="page">
            <div className="page-content">
                <Navbar homepage />

                <div className={styles.hero}>
                    <Container>
                      
                    </Container>
                </div>

                <Container>
                    <div className={styles.content}>
                        <div className={styles.header}>
                            <h1>Happy Hour</h1>
                            <p className={styles.summary}>Join us for Happy Hour every Sunday - Thursday from 8pm for unbeatable prices.</p>
                        </div>

                        <div className={styles.images}>
                            <img className={styles.image} src="/images/happyhour/1.png" />
                            <img className={styles.image} src="/images/happyhour/2.png" />
                            <img className={styles.image} src="/images/happyhour/3.png" />
                        </div>

                        <p className={styles.disclaimer}>
                            Please drink responsibly and know your limits. See <a href="https://www.drinkaware.co.uk" target="_blank">drinkaware.co.uk</a> for the facts about alcohol.
                        </p>
                    </div>
                </Container>
                <Footer />
            </div>
        </div>
    )
}