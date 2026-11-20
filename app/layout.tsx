import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { company, siteUrl } from "@/data/company";
import { organizationJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { JsonLd } from "@/components/ui/JsonLd";
import { AnalyticsScripts } from "@/components/layout/AnalyticsScripts";

// Luxury pairing: Playfair Display (classic serif) for headings, Inter for body text.
const display = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  themeColor: "#1b1e23",
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
          <AnalyticsScripts />
        </MotionConfig>
      </body>
    </html>
  );
}
