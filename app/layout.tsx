import React from "react"
import type { Metadata, Viewport } from 'next'
import { Caveat_Brush, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import LenisScroll from '@/components/lenis-scroll'
import { CartProvider } from '@/app/context/CartContext'

const caveatBrush = Caveat_Brush({ subsets: ["latin"], weight: ['400'] });
const outfit = Outfit({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

export const metadata: Metadata = {
  title: 'Titan - Timeless Elegance & Craftsmanship',
  description: 'Discover Titan premium watches, wall clocks, and smart timepieces. Precision engineering meets timeless elegance.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1a1a1a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ fontFamily: `${outfit.style.fontFamily}, sans-serif` }} className="scroll-smooth-custom">
      <body className={`${outfit.className} bg-black text-cream antialiased min-h-screen`} style={{ '--font-serif': caveatBrush.style.fontFamily } as React.CSSProperties}>
        <LenisScroll>
          <CartProvider>
            {children}
          </CartProvider>
        </LenisScroll>
        <Analytics />
      </body>
    </html>
  )
}
