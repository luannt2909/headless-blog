import { Inter } from 'next/font/google'
import './globals.css'
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleTagManager } from '@next/third-parties/google'
import React from "react";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <GoogleTagManager gtmId="G-3XLSDQGJ3E" />
    <body className={inter.className}>
      {children}
      <SpeedInsights/>
      </body>
    </html>
  )
}
