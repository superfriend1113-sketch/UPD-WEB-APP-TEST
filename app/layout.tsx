import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Unlimited Perfect Deals - Best Deals from Top Retailers',
    template: '%s | Unlimited Perfect Deals',
  },
  description: 'Discover amazing deals from top retailers. Save money on electronics, fashion, home goods, and more.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://unlimitedperfectdeals.com',
    siteName: 'Unlimited Perfect Deals',
    title: 'Unlimited Perfect Deals - Best Deals from Top Retailers',
    description: 'Discover amazing deals from top retailers. Save money on electronics, fashion, home goods, and more.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Unlimited Perfect Deals',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unlimited Perfect Deals - Best Deals from Top Retailers',
    description: 'Discover amazing deals from top retailers. Save money on electronics, fashion, home goods, and more.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
