import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteInfo } from "@/lib/site";
import { CartProvider } from "@/context/CartContext";
import RfqDrawer from "@/components/RfqDrawer";
import RfqTrigger from "@/components/RfqTrigger";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const site = getSiteInfo();

export const metadata: Metadata = {
  title: `${site.name}`,
  description: site.description,
  icons: {
    icon: "/logo/pat.png",
    shortcut: "/logo/pat.png",
    apple: "/logo/pat.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager / Google Analytics */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtm.js?id=GTM-KHSX6B9T"
        />
        <Script id="google-analytics-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          `}
        </Script>
      </head>
      <body
        className={`${grotesk.variable} ${inter.variable} font-body antialiased flex min-h-screen flex-col bg-canvas`}
      >
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KHSX6B9T"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <RfqDrawer />
          <RfqTrigger />
        </CartProvider>
      </body>
    </html>
  );
}