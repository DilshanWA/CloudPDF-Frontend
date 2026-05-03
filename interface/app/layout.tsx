import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: {
    default: 'Free PDF Converter — Convert PDF to Word, Excel, JPG',
    template: '%s | PDF Converter'
  },
  description: 'Convert PDF files online for free. Fast, secure, no signup required. Supports Word, Excel, JPG, PNG and more.',
  keywords: ['pdf converter', 'pdf to word', 'pdf to excel', 'free pdf converter'],
  authors: [{ name: 'Dilshan' }],
  creator: 'Dilshan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cloudpdf.app',
    title: 'Free PDF Converter',
    description: 'Convert PDF files online for free.',
    siteName: 'PDF Converter',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free PDF Converter',
    description: 'Convert PDF files online for free.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://cloudpdf.app',
  },
}

export const viewpoint = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
}



export const fonts = { geist, geistMono, }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-screen overflow-hidden flex flex-col">
        <Header />
        <main className="flex-1 overflow-hidden flex">
          {children}
        </main>
      </body>
    </html>
  );
}
