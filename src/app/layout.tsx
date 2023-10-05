import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'

const nunito = Nunito({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Travel Roosts',
  description: `Travel Roosts - Your Nest Away from Home! Find the perfect place to stay at an amazing price in over 191 countries.`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
