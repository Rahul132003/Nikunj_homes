import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { company, siteUrl } from "@/data/company";
import { organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd } from "@/components/ui/JsonLd";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"], // the only weight the design uses — fewer font files to load
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${company.name} | Real estate in Faridabad, Delhi-NCR`,
    template: `%s | ${company.name}`,
  },
  description: company.description,
  applicationName: company.name,
  openGraph: {
    type: "website",
    siteName: company.name,
    locale: "en_IN",
    title: `${company.name} | Real estate in Faridabad, Delhi-NCR`,
    description: company.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#131b2e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${display.variable} ${sans.variable}`}>
      <body>
        <MotionConfig reducedMotion="user">
          <a
            href="#main"
            className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-[2px] bg-gold-500 px-5 py-3 font-semibold text-forest-950"
          >
            Skip to content
          </a>
          <SmoothScroll />
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
          <JsonLd data={organizationJsonLd} />
        </MotionConfig>
      </body>
    </html>
  );
}
