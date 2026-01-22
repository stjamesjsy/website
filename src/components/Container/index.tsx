import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

interface ContainerProps {
    noPadding?: boolean;
}

export default function Container({ children, noPadding }: PropsWithChildren<ContainerProps>) {
    return (
        <div
            className={`${styles.container} ${noPadding ? styles.noPaddingY : ""}`}
        >
            {children}
        </div>
    );
}
