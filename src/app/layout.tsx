import type { Metadata, Viewport } from "next";
import { Big_Shoulders, Geist, Pirata_One } from "next/font/google";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const shoulders = Big_Shoulders({
  subsets: ["latin"],
  weight: "800", // the only weight used (.display)
  variable: "--font-shoulders",
  adjustFontFallback: false,
  fallback: ["Arial Narrow", "sans-serif"],
  display: "swap",
});
const pirata = Pirata_One({ subsets: ["latin"], weight: "400", variable: "--font-pirata", display: "swap" });

const title = "La Raza Tattoo | Tattoo Shop on 5th Avenue, Playa del Carmen";
const description =
  "Affordable, professional tattoos on 5th Avenue & 50th Street in Playa del Carmen. Rated 4.8 on Google. Send your idea on WhatsApp and get your tattoo quote.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  keywords: [
    "tattoo shop Playa del Carmen",
    "tattoo 5th Avenue Playa del Carmen",
    "affordable tattoo Playa del Carmen",
    "tattoo studio Quinta Avenida",
    "La Raza Tattoo",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0d0b0a",
  colorScheme: "dark",
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${shoulders.variable} ${pirata.variable}`}>
      <body>
        <JsonLd />
        <MotionProvider>{children}</MotionProvider>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
