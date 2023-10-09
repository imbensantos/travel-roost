import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import './globals.css'
import Navbar from '@components/Navbar'
import RegisterModal from '@components/Modals/RegisterModal'
import ToasterProvider from '@providers/ToasterProvider'

const leagueSpartan = Nunito({
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
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
