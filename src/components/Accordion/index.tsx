import { createContext, useContext, useState } from "react";

interface AccordionContextType {
    openId: string | null;
    toggle: (id: string) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

export function Accordion({ children }: { children: React.ReactNode }) {
    const [openId, setOpenId] = useState<string | null>(null);

    const toggle = (id: string) => {
        setOpenId(prev => (prev === id ? null : id));
    };

    return (
        <AccordionContext.Provider value={{ openId, toggle }}>
            {children}
        </AccordionContext.Provider>
    );
}

export function useAccordion() {
    const ctx = useContext(AccordionContext);
    if (!ctx) {
        throw new Error("Item must be used inside Accordion");
    }
    return ctx;
}
