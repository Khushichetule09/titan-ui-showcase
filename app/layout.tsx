'use client';

import React from "react"
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import LenisScroll from '@/components/lenis-scroll'

const playfair = Playfair_Display({ subsets: ["latin"], weight: ['400', '600', '700'] });
const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ fontFamily: `${inter.style.fontFamily}, sans-serif` }} className="scroll-smooth-custom">
      <body className={`${inter.className} bg-black text-cream antialiased min-h-screen`} style={{ '--font-serif': playfair.style.fontFamily } as React.CSSProperties}>
        <LenisScroll>
          {children}
        </LenisScroll>
        <Analytics />
      </body>
    </html>
  )
}
