import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "@/styles/globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { NavigationShell } from "@/components/layout/NavigationShell";
import { Footer } from "@/components/layout/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Dalify — Premium Organic Spices, Grains & Pulses",
    template: "%s | Dalify",
  },
  description:
    "Shop premium organic spices, grains, pulses, and instant mixes. " +
    "Farm-fresh staples delivered to your door across India.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://dalify.in",
  ),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Dalify",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-warm-white text-charcoal font-body antialiased">
        <AnnouncementBar />
        <NavigationShell />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
