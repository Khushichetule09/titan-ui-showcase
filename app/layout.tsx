import React from "react"
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({ subsets: ["latin"], weight: ['400', '600', '700'] });
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Luxé Studio - Premium Design & Consulting',
  description: 'Elevate your brand with luxury design and strategic consulting services. Crafted for excellence.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: '#1a1a1a',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" style={{ fontFamily: `${inter.style.fontFamily}, sans-serif` }} className="scroll-smooth-custom">
      <body className={`${inter.className} bg-black text-cream antialiased min-h-screen`} style={{ '--font-serif': playfair.style.fontFamily } as React.CSSProperties}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
