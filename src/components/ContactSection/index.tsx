import { CONTACT_EMAIL, FACEBOOK_URL, INSTAGRAM_URL } from "@/constants";
import { PropsWithChildren } from "react";
import { FaEnvelope, FaFacebook, FaInstagram } from "react-icons/fa";
import { FiClock, FiMail, FiMapPin } from "react-icons/fi";
import { ContactForm } from "../ContactForm";
import { ContactOrBook } from "../ContactOrBook";
import SocialLink from "../SocialLink";
import styles from "./styles.module.css";
import Link from "next/link";

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
                        We are open every day between 19:30 - 02:00 
                        
                        <div style={{ marginBottom: "10px" }} />

                        <div style={{ fontSize: "13px" }}>
                            We open earlier for Disco Bingo, Steak on the Stone & Sunday Lunch. See more info on our <Link href="/faqs">FAQs page</Link>.
                        </div>
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
    );
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