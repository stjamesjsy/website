import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PropsWithChildren } from "react";

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
      <body className="stjames flex min-h-screen flex-col">{children}</body>
    </html>
  );
}
