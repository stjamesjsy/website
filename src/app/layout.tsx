import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import { PropsWithChildren } from "react";

const GA_MEASUREMENT_ID = "G-WCZTFPN1W9";

export const metadata: Metadata = {
  title: {
    default: "St James Jersey - Karaoke, Disco Bingo & Nightclub",
    template: "%s | St James Jersey"
  },
  description: "Your night starts here - Disco Bingo, Late Night Karaoke, live DJs and good vibes at St James, 5 Rue de Funchal, St Helier, Jersey.",
}

export const viewport: Viewport = {
  themeColor: "#0a0e17"
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en-GB">
      <body className="stjames flex min-h-screen flex-col">
        {children}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
