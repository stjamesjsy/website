import { SkeletonPage } from "@/components/SkeletonPage";
import { Toaster } from "@/components/ui/base/Toaster";
import { Footer } from "@/components/ui/layout/Footer";
import { Navbar } from "@/components/ui/layout/Navbar";
import "@/styles/globals.css";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type PageConfig = {

}

type AppPropsWithConfig = AppProps & {
    Component: AppProps["Component"] & {
        pageConfig?: PageConfig;
    }
}

export default function App({ Component, pageProps }: AppPropsWithConfig) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const pageConfig = Component.pageConfig ?? {};

    const router = useRouter();

    if (!mounted) {
        return (
            <ChakraProvider value={defaultSystem}>
                <SkeletonPage />
            </ChakraProvider>
        )
    }

    return (
        <ChakraProvider value={defaultSystem}>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />

            <Navbar />
            <Component {...pageProps} />
            <Footer />
            <Toaster />
        </ChakraProvider>
    )
}

