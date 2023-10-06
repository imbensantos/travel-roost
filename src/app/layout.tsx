import type { Metadata } from 'next'
import { League_Spartan } from 'next/font/google'

import './globals.css'
import Navbar from '@components/Navbar'

const leagueSpartan = League_Spartan({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Travel Roost',
  description: `Travel Roost - Your Nest Away from Home! Find the perfect place to stay at an amazing price in over 191 countries.`,
  icons: {icon: "/images/logo.svg"}
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={leagueSpartan.className}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
