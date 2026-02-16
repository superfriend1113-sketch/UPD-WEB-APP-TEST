import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Bebas_Neue, DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const dmMono = DM_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
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
        className={`${inter.variable} ${bebasNeue.variable} ${dmSans.variable} ${dmMono.variable} font-body antialiased flex flex-col min-h-screen bg-[#f5f2eb]`}
      >
        <AuthProvider>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
