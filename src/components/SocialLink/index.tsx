import styles from "./styles.module.css";

interface Props {
    href: string;
    icon: any;
}

export default function SocialLink({ href, icon }: Props) {
    return (
        <a className={styles.link} href={href} target="_blank">
            {icon}
        </a>
    )
}