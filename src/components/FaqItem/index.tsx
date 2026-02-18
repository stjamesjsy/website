import { PropsWithChildren } from "react";
import styles from "./styles.module.css";
import { useAccordion } from "@/components/Accordion";
import { LuArrowUp, LuPlus, LuX } from "react-icons/lu";

interface Props {
    id: string;
    title: string;
}

export function Item({ id, title, children }: PropsWithChildren<Props>) {
    const { openId, toggle } = useAccordion();
    const isOpen = openId === id;

    return (
        <div className={styles.item}>
            <div
                className={styles.header}
                onClick={() => toggle(id)}
                aria-expanded={isOpen}
            >
                <div className={styles.title}>{title}</div>

                {isOpen ? "—" : <LuPlus />}
            </div>

            {isOpen && (
                <div className={styles.text}>
                    {children}
                </div>
            )}
        </div>
    );
}
