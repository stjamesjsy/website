import { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document";
import Script from "next/script";

export default function Document() {
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-WCZTFPN1W9"
                    strategy="afterInteractive"
                />
                <Script id="gtag-init" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-WCZTFPN1W9');
                    `}
                </Script>
            </body>
        </Html>
    );
}