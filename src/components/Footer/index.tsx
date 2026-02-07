import { CONTACT_EMAIL, FACEBOOK_URL, FOOD_MENU_URL, INSTAGRAM_URL } from "@/constants";
import { FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";
import Container from "../Container";
import SocialLink from "../SocialLink";
import styles from "./styles.module.css";

export default function Footer({ smallContainer }: { smallContainer?: boolean }) {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.links}>
                    <a href="/">Home</a>
                    {/* <a href="/gallery">Gallery</a> */}
                    <a href="/venue-hire">Venue Hire</a>
                    <a href="/faqs">FAQs</a>
                    {/* <a href={PRICE_LIST_URL} target="_blank">Price List</a> */}
                     <a href={FOOD_MENU_URL} target="_blank">Food Menu</a>
                    <a href="/privacy">Privacy Policy</a>
                </div>
                <div className={styles.socialLinks}>
                    <SocialLink href={FACEBOOK_URL} icon={<FaFacebook color="white" />} />
                    <SocialLink href={INSTAGRAM_URL} icon={<FaInstagram color="white" />} />
                    <SocialLink href={`mailto:${CONTACT_EMAIL}`} icon={<FaEnvelope color="white" />} />
                </div>
                <div className={styles.copyright}>Copyright &copy; {new Date().getFullYear()} St James. All rights reserved</div>
            </Container>
        </footer>
    )
}