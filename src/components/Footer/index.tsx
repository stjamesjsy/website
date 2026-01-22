import { FaEnvelope, FaFacebook, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import SocialLink from "../SocialLink";
import styles from "./styles.module.css";
import Container from "../Container";
import { CONTACT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL, PRICE_LIST_URL } from "@/constants";

export default function Footer({ smallContainer }: { smallContainer?: boolean }) {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.links}>
                    <a href="/">Home</a>
                    <a href="/gallery">Gallery</a>
                    <a href="/venue-hire">Venue Hire</a>
                    <a href="/faqs">FAQs</a>
                    <a href={PRICE_LIST_URL} target="_blank">Price List</a>
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