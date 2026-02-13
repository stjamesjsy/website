import { CONTACT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL } from "@/constants";
import { PropsWithChildren } from "react";
import { FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";
import { FiClock, FiMail, FiMapPin } from "react-icons/fi";
import { ContactForm } from "../ContactForm";
import { ContactOrBook } from "../ContactOrBook";
import SocialLink from "../SocialLink";
import styles from "./styles.module.css";

export default function ContactSection({ includeBooking }: any) {
    return (
        <div className={styles.contactContent}>
            <div className={styles.col}>
                {includeBooking ? <ContactOrBook /> : <ContactForm />}
            </div>
            <div className={styles.col}>
                <div className={styles.contactDetails}>
                    <ContactItem title="Address" icon={<FiMapPin color="var(--stjames-yellow)" />}>
                        5 Rue de Funchal, St Helier, JE2 4TT
                    </ContactItem>
                    <ContactItem title="Opening Hours" icon={<FiClock color="var(--stjames-yellow)" />}>
                        Monday - Sunday: 7:30 PM - 02:00 AM
                    </ContactItem>
                    <ContactItem title="Get In Touch" icon={<FiMail color="var(--stjames-yellow)" />}>
                        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                    </ContactItem>
                    <div className={styles.socialLinks}>
                        <SocialLink href={FACEBOOK_URL} icon={<FaFacebook color="white" />} />
                        <SocialLink href={INSTAGRAM_URL} icon={<FaInstagram color="white" />} />
                        <SocialLink href={`mailto:${CONTACT_EMAIL}`} icon={<FaEnvelope color="white" />} />
                    </div>
                </div>
            </div>
        </div>
    )
}

function ContactItem({ title, children, icon }: PropsWithChildren<{ title: string; icon: any }>) {
    return (
        <div className={styles.contactItem}>
            <div className={styles.contactItemIcon}>{icon}</div>
            <div>
                <div className={styles.contactItemTitle}>{title}</div>
                <div className={styles.contactItemContent}>{children}</div>
            </div>
        </div>
    )
}